// SSC Quiz Prep — self-hosted auth + progress sync backend.
// Zero npm dependencies: Node 22 built-ins only (http, crypto, fs).
//
// Run:   node index.mjs            (default port 4000)
// Env:   PORT, JWT_SECRET          (JWT_SECRET persisted to data/.jwt-secret on first run)
//
// Endpoints:
//   POST /api/auth/register  { name, email, password }  -> { token, user }
//   POST /api/auth/login     { email, password }        -> { token, user }
//   GET  /api/me                                          -> { user }
//   GET  /api/progress                                     -> { progress }
//   PUT  /api/progress        { progress }                -> { ok }
//
// Free hosting: Render.com / Railway.app (point them at `server/index.mjs`).

import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'node:crypto'

const DIR = dirname(fileURLToPath(import.meta.url))
const DATA = join(DIR, 'data')
const USERS_FILE = join(DATA, 'users.json')
const PROGRESS_FILE = join(DATA, 'progress.json')
const SECRET_FILE = join(DATA, '.jwt-secret')
const PORT = Number(process.env.PORT) || 4000

mkdirSync(DATA, { recursive: true })

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
  appendFileSync(join(DATA, 'server.log'), `[${new Date().toISOString()}] ${msg}\n`)
}

// ---- Password hashing (scrypt) ----
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 32).toString('hex')
  return `${salt}:${hash}`
}
function verifyPassword(password, stored) {
  const [salt, hash] = String(stored).split(':')
  if (!salt || !hash) return false
  const candidate = scryptSync(password, salt, 32)
  const expected = Buffer.from(hash, 'hex')
  return candidate.length === expected.length && timingSafeEqual(candidate, expected)
}

// ---- JWT (HS256, no deps) ----
function getSecret() {
  if (existsSync(SECRET_FILE)) return readFileSync(SECRET_FILE, 'utf8').trim()
  const secret = randomBytes(32).toString('hex')
  writeFileSync(SECRET_FILE, secret)
  return secret
}
const SECRET = getSecret()

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

// ---- Helpers ----
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
  return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt }
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''))
}

function issueToken(user) {
  return sign({
    sub: user.id,
    name: user.name,
    email: user.email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
  })
}

function authUser(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const payload = verify(token)
  if (!payload) return null
  const users = dbUsers().users
  return users.find((u) => u.id === payload.sub) || null
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

    // ---- Auth ----
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
        return send(res, 409, { error: 'This email is already registered.' })
      }

      const user = {
        id: randomBytes(8).toString('hex'),
        name,
        email,
        hash: hashPassword(password),
        createdAt: new Date().toISOString(),
      }
      db.users.push(user)
      writeJson(USERS_FILE, db)
      log(`registered ${email}`)
      return send(res, 201, { token: issueToken(user), user: publicUser(user) })
    }

    if (path === '/api/auth/login' && req.method === 'POST') {
      const body = await readBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')

      const user = dbUsers().users.find((u) => u.email === email)
      if (!user || !verifyPassword(password, user.hash)) {
        return send(res, 401, { error: 'Incorrect email or password.' })
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
      log(`progress saved ${user.email} (${Object.keys(progress).length} keys)`)
      return send(res, 200, { ok: true })
    }

    if (path === '/api/health') {
      return send(res, 200, { ok: true })
    }

    send(res, 404, { error: 'Not found' })
  } catch (err) {
    send(res, 400, { error: err.message || 'Bad request' })
  }
})

server.listen(PORT, () => {
  console.log('✅ SSC Quiz server running on http://localhost:' + PORT)
  console.log('   Register:  POST /api/auth/register')
  console.log('   Login:     POST /api/auth/login')
  console.log('   Progress:  GET/PUT /api/progress (Bearer token)')
})