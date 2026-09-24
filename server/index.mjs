// SSC Quiz Prep — self-hosted auth + progress sync backend.
// Zero npm dependencies: Node 22 built-ins only.
//
// Run:   node index.mjs                (default port 4000)
// Env:
//   PORT, JWT_SECRET
//   NODE_ENV=production on Render (disables the dev OTP-in-response fallback)
//
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM  (to really send
//   OTP emails — e.g. Gmail: smtp.gmail.com / 465 / your email / an App Password)
//
// Endpoints:
//   POST /api/auth/register   { name, email, password } -> { otpSent, ... }
//   POST /api/auth/verify-otp { email, otp }            -> { token, user }
//   POST /api/auth/resend-otp { email }                 -> { otpSent, ... }
//   POST /api/auth/login      { email, password }       -> { token, user }
//   GET  /api/me                                          -> { user }
//   GET  /api/progress                                     -> { progress }
//   PUT  /api/progress        { progress }                -> { ok }

import { createServer } from 'node:http'
import {
  readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  randomBytes, createHash, scryptSync, timingSafeEqual, createHmac,
} from 'node:crypto'
import net from 'node:net'
import tls from 'node:tls'

const DIR = dirname(fileURLToPath(import.meta.url))
const DATA = join(DIR, 'data')
const USERS_FILE = join(DATA, 'users.json')
const PROGRESS_FILE = join(DATA, 'progress.json')
const SECRET_FILE = join(DATA, '.jwt-secret')
const PORT = Number(process.env.PORT) || 4000
// Dev fallback: with DEV_OTP_MODE=true (Render env), the OTP is returned in
// the response and shown in-app so the app works without SMTP. Off by default
// in production — real email is preferred. Requires explicit opt-in.
const DEV_MODE = process.env.NODE_ENV !== 'production' || process.env.DEV_OTP_MODE === 'true'

mkdirSync(DATA, { recursive: true })

// ---- SMTP config (email OTP delivery) ----
const SMTP = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.MAIL_FROM,
}
const SMTP_READY = !!(SMTP.host && SMTP.user && SMTP.pass && SMTP.from)

const OTP_TTL_MS = 10 * 60 * 1000 // 10 minutes
const OTP_MAX_TRIES = 5
const otps = new Map() // email -> { hash, exp, tries }

// ---- File helpers ----
function readJson(file, fallback) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}
function writeJson(file, data) {
  writeFileSync(file, JSON.stringify(data, null, 2))
  log(`saved ${file.split('/').pop()}`)
}
function dbUsers() {
  return readJson(USERS_FILE, { users: [] })
}
function dbProgress() {
  return readJson(PROGRESS_FILE, {})
}
function log(msg) {
  try {
    appendFileSync(join(DATA, 'server.log'), `[${new Date().toISOString()}] ${msg}\n`)
  } catch { /* no-op */ }
}

// ---- Storage for the JWT secret ----
function getSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  if (existsSync(SECRET_FILE)) return readFileSync(SECRET_FILE, 'utf8').trim()
  const secret = randomBytes(32).toString('hex')
  writeFileSync(SECRET_FILE, secret)
  return secret
}
const SECRET = getSecret()

// ---- Password (scrypt) ----
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 32).toString('hex')
  return `${salt}:${hash}`
}
function verifyPassword(password, stored) {
  const [salt, hash] = String(stored).split(':')
  if (!salt || !hash) return false
  const a = scryptSync(password, salt, 32)
  const b = Buffer.from(hash, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

// ---- OTP ----
function newOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}
function otpHash(code) {
  return createHmac('sha256', SECRET).update(String(code)).digest('hex')
}
function storeOtp(email, code) {
  otps.set(email, { hash: otpHash(code), exp: Date.now() + OTP_TTL_MS, tries: 0 })
}
function checkOtp(email, code) {
  const rec = otps.get(email)
  if (!rec) return { ok: false, error: 'No OTP found. Request a new code.' }
  if (Date.now() > rec.exp) {
    otps.delete(email)
    return { ok: false, error: 'This code has expired. Request a new one.' }
  }
  rec.tries += 1
  if (rec.tries > OTP_MAX_TRIES) {
    otps.delete(email)
    return { ok: false, error: 'Too many wrong attempts. Request a new code.' }
  }
  const a = Buffer.from(otpHash(code), 'hex')
  const b = Buffer.from(rec.hash, 'hex')
  if (a.length === b.length && timingSafeEqual(a, b)) {
    otps.delete(email)
    return { ok: true }
  }
  return { ok: false, error: 'Incorrect code. Please try again.' }
}

// ---- SMTP send (implicit TLS 465 or STARTTLS 587, no deps) ----
function smtpTalk(sock, expectOk = true) {
  return new Promise((resolve, reject) => {
    let buf = ''
    const onData = (chunk) => {
      buf += chunk.toString('latin1')
      if (buf.endsWith('\r\n')) {
        const lines = buf.replace(/\r/g, '').split('\n').filter(Boolean)
        const code = parseInt(lines[0].slice(0, 3), 10)
        if (lines[0].length >= 3 && lines[0][3] === ' ') {
          sock.removeListener('data', onData)
          if (expectOk && (code < 200 || code >= 300)) {
            reject(new Error(`SMTP ${code}: ${lines[0]}`))
          } else {
            resolve(code)
          }
        }
      }
    }
    sock.on('data', onData)
    sock.on('error', reject)
  })
}
function smtpWrite(sock, line) {
  sock.write(line + '\r\n')
}
function smtpSend({ host, port, user, pass, from, to, subject, html }) {
  return new Promise((resolve, reject) => {
    const secure = port === 465
    const timeout = setTimeout(() => reject(new Error('SMTP timed out')), 15000)
    let done = false

    const mail = (s) => new Promise(async (res, rej) => {
      try {
        smtpWrite(s, 'AUTH LOGIN')
        await smtpTalk(s)
        smtpWrite(s, Buffer.from(user).toString('base64'))
        await smtpTalk(s)
        smtpWrite(s, Buffer.from(pass).toString('base64'))
        await smtpTalk(s)
        smtpWrite(s, `MAIL FROM:<${from}>`)
        await smtpTalk(s)
        smtpWrite(s, `RCPT TO:<${to}>`)
        await smtpTalk(s)
        smtpWrite(s, 'DATA')
        await smtpTalk(s)
        const msg = [
          `From: SSC Quiz Prep <${from}>`,
          `To: <${to}>`,
          `Subject: ${subject}`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=UTF-8',
          '',
          html,
          '.',
        ].join('\r\n')
        s.write(msg + '\r\n')
        await smtpTalk(s)
        smtpWrite(s, 'QUIT')
        await smtpTalk(s).catch(() => null)
        res()
      } catch (e) {
        rej(e)
      }
    })

    const finish = (s, err) => {
      if (done) return
      done = true
      clearTimeout(timeout)
      try {
        s.destroy()
      } catch { /* no-op */ }
      if (err) {
        // try to still close cleanly first
        return reject(err)
      }
      resolve(true)
    }

    const start = async (s) => {
      try {
        await smtpTalk(s)
        smtpWrite(s, 'EHLO ssc-quiz')
        await smtpTalk(s)

        if (secure) {
          await mail(s)
          return finish(s)
        }
        // plain port (587 etc.) — try STARTTLS, fall back to plain if unsupported
        smtpWrite(s, 'STARTTLS')
        const st = await smtpTalk(s).catch(() => null)
        if (st === 220) {
          const upgraded = tls.connect({ socket: s, rejectUnauthorized: false })
          await new Promise((res, rej) => {
            upgraded.on('secureConnect', res)
            upgraded.on('error', rej)
          })
          await mail(upgraded)
          return finish(upgraded)
        }
        await mail(s)
        return finish(s)
      } catch (e) {
        finish(s, e)
      }
    }

    if (secure) {
      const sock = tls.connect({ host, port, rejectUnauthorized: false })
      sock.on('secureConnect', () => start(sock))
      sock.on('error', (e) => finish(sock, e))
    } else {
      const sock = net.connect({ host, port })
      sock.on('connect', () => start(sock))
      sock.on('error', (e) => finish(sock, e))
    }
  })
}

function sendOtpEmail(email, code) {
  return smtpSend({
    host: SMTP.host,
    port: SMTP.port,
    user: SMTP.user,
    pass: SMTP.pass,
    from: SMTP.from,
    to: email,
    subject: 'Your SSC Quiz Prep verification code',
    html: `<div style="font-family:Arial;max-width:480px;margin:auto;border:1px solid #eee;border-radius:14px;padding:28px">
      <h2 style="margin:0 0 8px;color:#4f46e5">SSC Quiz Prep</h2>
      <p>Your email verification code is:</p>
      <div style="font-size:30px;font-weight:800;letter-spacing:8px;color:#312e81;padding:12px;background:#eef2ff;border-radius:10px;text-align:center">${code}</div>
      <p style="color:#666;font-size:13px">This code expires in 10 minutes.</p></div>`,
  })
}

function sendOtp(email) {
  const code = newOtp()
  storeOtp(email, code)
  if (!SMTP_READY) {
    // Dev fallback: log the code. On a public server this path is refused below.
    log(`DEV OTP for ${email}: ${code}`)
    return { otpSent: false, dev: true, code: DEV_MODE ? code : null }
  }
  sendOtpEmail(email, code).catch((e) => log(`smtp error ${email}: ${e.message}`))
  return { otpSent: true, dev: false }
}

// ---- JWT ----
function b64url(s) {
  return Buffer.from(s).toString('base64url')
}
function sign(payload) {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64url(JSON.stringify(payload))
  const sig = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${sig}`
}
function verify(token) {
  try {
    const [h, b, s] = String(token).split('.')
    const expected = createHmac('sha256', SECRET).update(`${h}.${b}`).digest('base64url')
    if (!timingSafeEqual(Buffer.from(s), Buffer.from(expected))) return null
    const payload = JSON.parse(Buffer.from(b, 'base64url').toString())
    if (payload.exp && payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

// ---- HTTP helpers ----
function send(res, code, data) {
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  res.end(JSON.stringify(data))
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (c) => {
      raw += c
      if (raw.length > 2e6) reject(new Error('payload too large'))
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}
function publicUser(u) {
  return {
    id: u.id, name: u.name, email: u.email, verified: !!u.verified, createdAt: u.createdAt,
  }
}
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''))
}
function issueToken(user) {
  return sign({
    sub: user.id, name: user.name, email: user.email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
  })
}
function authUser(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const payload = verify(token)
  if (!payload) return null
  return dbUsers().users.find((u) => u.id === payload.sub) || null
}
// ---- Server ----
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
    const path = url.pathname

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      })
      return res.end()
    }

    // ---- Register (creates unverified user + sends OTP) ----
    if (path === '/api/auth/register' && req.method === 'POST') {
      const body = await readBody(req)
      const name = String(body.name || '').trim()
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')

      if (!name || name.length < 2) return send(res, 400, { error: 'Please enter your name.' })
      if (!validEmail(email)) return send(res, 400, { error: 'Please enter a valid email.' })
      if (password.length < 6) return send(res, 400, { error: 'Password must be at least 6 characters.' })

      const db = dbUsers()
      if (db.users.some((u) => u.email === email)) {
        return send(res, 409, { error: 'This email is already registered. Please log in.' })
      }

      if (!SMTP_READY && !DEV_MODE) {
        return send(res, 500, {
          error: 'Email service is not configured on the server yet.',
        })
      }

      const user = {
        id: randomBytes(8).toString('hex'),
        name, email,
        hash: hashPassword(password),
        verified: false,
        createdAt: new Date().toISOString(),
      }
      db.users.push(user)
      writeJson(USERS_FILE, db)
      log(`registered ${email}`)

      const dev = sendOtp(email)
      if (dev.dev && DEV_MODE) {
        return send(res, 201, { otpSent: false, devOtp: dev.code, email })
      }
      return send(res, 201, { otpSent: true, email })
    }

    // ---- Verify OTP ----
    if (path === '/api/auth/verify-otp' && req.method === 'POST') {
      const body = await readBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const code = String(body.otp || '').trim()

      const user = dbUsers().users.find((u) => u.email === email)
      if (!user) return send(res, 404, { error: 'Account not found.' })
      const r = checkOtp(email, code)
      if (!r.ok) return send(res, 400, { error: r.error })

      user.verified = true
      const db = dbUsers()
      const i = db.users.findIndex((u) => u.email === email)
      db.users[i] = user
      writeJson(USERS_FILE, db)
      log(`verified ${email}`)
      return send(res, 200, { token: issueToken(user), user: publicUser(user) })
    }

    // ---- Resend OTP ----
    if (path === '/api/auth/resend-otp' && req.method === 'POST') {
      const body = await readBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const user = dbUsers().users.find((u) => u.email === email)
      if (!user) return send(res, 404, { error: 'Account not found.' })
      if (user.verified) return send(res, 400, { error: 'This email is already verified.' })

      if (!SMTP_READY && !DEV_MODE) {
        return send(res, 500, { error: 'Email service is not configured on the server yet.' })
      }
      const dev = sendOtp(email)
      if (dev.dev && DEV_MODE) return send(res, 200, { otpSent: false, devOtp: dev.code, email })
      return send(res, 200, { otpSent: true, email })
    }

    // ---- Login ----
    if (path === '/api/auth/login' && req.method === 'POST') {
      const body = await readBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')

      const user = dbUsers().users.find((u) => u.email === email)
      if (!user || !verifyPassword(password, user.hash)) {
        return send(res, 401, { error: 'Incorrect email or password.' })
      }
      if (!user.verified) {
        if (SMTP_READY || DEV_MODE) {
          const dev = sendOtp(email)
          return send(res, 403, {
            error: 'Please verify your email to continue.',
            needsOtp: true,
            email,
            otpSent: !(dev.dev && DEV_MODE),
            ...(dev.dev && DEV_MODE ? { devOtp: dev.code } : {}),
          })
        }
        return send(res, 403, { error: 'Please verify your email to continue.' })
      }
      log(`login ${email}`)
      return send(res, 200, { token: issueToken(user), user: publicUser(user) })
    }

    if (path === '/api/me' && req.method === 'GET') {
      const user = authUser(req)
      if (!user) return send(res, 401, { error: 'Not authorised.' })
      return send(res, 200, { user: publicUser(user) })
    }

    // ---- Progress (authorised) ----
    if (path === '/api/progress' && req.method === 'GET') {
      const user = authUser(req)
      if (!user) return send(res, 401, { error: 'Not authorised.' })
      const all = dbProgress()
      return send(res, 200, { progress: all[user.id] || {} })
    }

    if (path === '/api/progress' && req.method === 'PUT') {
      const user = authUser(req)
      if (!user) return send(res, 401, { error: 'Not authorised.' })
      const body = await readBody(req)
      const progress = body.progress
      if (!progress || typeof progress !== 'object') {
        return send(res, 400, { error: 'Body must be { progress: {...} }' })
      }
      const all = dbProgress()
      all[user.id] = progress
      writeJson(PROGRESS_FILE, all)
      return send(res, 200, { ok: true })
    }

    if (path === '/api/health') {
      return send(res, 200, { ok: true, smtp: SMTP_READY, dev: DEV_MODE })
    }

    send(res, 404, { error: 'Not found' })
  } catch (err) {
    send(res, 400, { error: err.message || 'Bad request' })
  }
})

function banner() {
  console.log('✅ SSC Quiz server running on http://localhost:' + PORT)
  console.log(`   Email OTP: ${SMTP_READY ? `SMTP ready (${SMTP.host})` : DEV_MODE ? 'dev mode (OTP returned in API response) — set DEV_OTP_MODE=false + SMTP_* for real email' : 'NOT configured — registration disabled. Set SMTP_* envs or DEV_OTP_MODE=true to enable.'}`)
  console.log('   Register/Verify:  POST /api/auth/register + /api/auth/verify-otp')
  console.log('   Login:            POST /api/auth/login')
  console.log('   Progress:         GET/PUT /api/progress (Bearer token)')
}
server.listen(PORT, banner)