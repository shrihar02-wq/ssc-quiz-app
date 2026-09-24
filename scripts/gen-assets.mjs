// Generates branded icons + splash PNGs (pure Node, no deps).
// Encodes PNG manually (zlib + CRC32) and rasterises rounded rects,
// circles, gradients and the lightning bolt with 2x2 supersampling AA.
//
//   NODE_ENV="" node scripts/gen-assets.mjs

import zlib from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const BASE = path.join(ROOT, 'dev', 'gen-assets') // scratch, not written by default

// ---------------- PNG encoding ----------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4)
  out.writeUInt32BE(data.length, 0)
  out.write(type, 4, 'latin1')
  data.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}

function encodePNG(w, h, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  const stride = w * 4
  const raw = Buffer.alloc((stride + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0 // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }
  const idat = zlib.deflateSync(raw, { level: 9 })
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ---------------- rasteriser ----------------
function canvas(w, h) {
  return Buffer.alloc(w * h * 4)
}

function blend(buf, i, r, g, b, a) {
  if (a <= 0) return
  const sA = a / 255
  const dA = buf[i + 3] / 255
  const oA = sA + dA * (1 - sA)
  if (oA <= 0) return
  buf[i] = (r * sA + buf[i] * dA * (1 - sA)) / oA
  buf[i + 1] = (g * sA + buf[i + 1] * dA * (1 - sA)) / oA
  buf[i + 2] = (b * sA + buf[i + 2] * dA * (1 - sA)) / oA
  buf[i + 3] = Math.round(oA * 255)
}

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]

const lerp = (a, b, t) => a + (b - a) * t
const colorAt = (stops, t) => {
  t = Math.max(0, Math.min(1, t))
  for (let i = 0; i < stops.length - 1; i++) {
    if (t <= stops[i + 1].t) {
      const [a, b] = [stops[i].c, stops[i + 1].c]
      const p = (t - stops[i].t) / (stops[i + 1].t - stops[i].t || 1)
      return [lerp(a[0], b[0], p), lerp(a[1], b[1], p), lerp(a[2], b[2], p)]
    }
  }
  return stops[stops.length - 1].c
}

const inRoundedRect = (x, y, x0, y0, x1, y1, r) => {
  const cx = Math.max(x0 + r, Math.min(x, x1 - r))
  const cy = Math.max(y0 + r, Math.min(y, y1 - r))
  const dx = x - cx
  const dy = y - cy
  return dx * dx + dy * dy <= r * r && x >= x0 && x <= x1 && y >= y0 && y <= y1
}

const inCircle = (x, y, cx, cy, r) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r

function inAnnulus(x, y, cx, cy, r1, r2) {
  const d = (x - cx) ** 2 + (y - cy) ** 2
  return d >= r1 * r1 && d <= r2 * r2
}

function inPoly(x, y, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// coverage by 2x2 supersampling at pixel (px,py)
function cov(px, py, test) {
  let n = 0
  for (const dx of [-0.25, 0.25])
    for (const dy of [-0.25, 0.25]) if (test(px + dx, py + dy)) n++
  return n / 4
}

function fillGradient(buf, w, h, x0, y0, x1, y1, r, stops) {
  for (let py = 0; py < h; py++)
    for (let px = 0; px < w; px++) {
      if (!inRoundedRect(px + 0.5, py + 0.5, x0, y0, x1, y1, r)) continue
      const t = (py - y0) / (y1 - y0 || 1)
      const [r_, g, b] = colorAt(stops, t)
      blend(buf, (py * w + px) * 4, r_, g, b, 255)
    }
}

function fillPoly(buf, w, h, poly, color) {
  const c = hex(color)
  for (let py = 0; py < h; py++)
    for (let px = 0; px < w; px++) {
      const a = cov(px, py, (x, y) => inPoly(x, y, poly))
      if (a > 0) blend(buf, (py * w + px) * 4, c[0], c[1], c[2], Math.round(255 * a))
    }
}

function circleClip(buf, w, h) {
  const cx = w / 2
  const r = w / 2
  for (let py = 0; py < h; py++)
    for (let px = 0; px < w; px++) {
      const i = (py * w + px) * 4
      const a = cov(px, py, (x, y) => inCircle(x, y, cx, cx, r - 0.5))
      buf[i + 3] = Math.round((buf[i + 3] / 255) * a * 255)
    }
}

function drawGhostCircle(buf, w, h, cx, cy, r1, r2) {
  for (let py = 0; py < h; py++)
    for (let px = 0; px < w; px++) {
      const a = cov(px, py, (x, y) => inAnnulus(x, y, cx, cy, r1, r2))
      if (a > 0) blend(buf, (py * w + px) * 4, 255, 255, 255, Math.round(120 * a))
    }
}

// ---------------- design ----------------
const STOPS = [
  { t: 0, c: hex('#4f46e5') },
  { t: 0.55, c: hex('#7c3aed') },
  { t: 1, c: hex('#a855f7') },
]

// lightning bolt (unit-ish coordinates; fitted below)
const BOLT = [
  [0.62, 0.06],
  [0.24, 0.58],
  [0.47, 0.58],
  [0.4, 0.94],
  [0.8, 0.42],
  [0.55, 0.42],
]

function fitBolt(outW, outH, box) {
  // box: {x, y, w, h} in output pixels; fit bolt bbox preserving aspect
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const [x, y] of BOLT) {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x)
    minY = Math.min(minY, y); maxY = Math.max(maxY, y)
  }
  const bw = maxX - minX
  const bh = maxY - minY
  const scale = Math.min(box.w / bw, box.h / bh)
  const ow = bw * scale
  const oh = bh * scale
  const ox = box.x + (box.w - ow) / 2
  const oy = box.y + (box.h - oh) / 2
  return BOLT.map(([x, y]) => [ox + (x - minX) * scale, oy + (y - minY) * scale])
}

function iconPNG(size, opts = {}) {
  const { round = false, fgOnly = false, splash = false } = opts
  const buf = canvas(size, size)
  if (splash) {
    fillGradient(buf, size, size, 0, 0, size, size, 0, STOPS)
    drawGhostCircle(buf, size, size, size * 0.9, size * 0.12, size * 0.08, size * 0.34)
    drawGhostCircle(buf, size, size, size * 0.1, size * 0.95, size * 0.06, size * 0.3)
    const box = { x: size * 0.34, y: size * 0.38, w: size * 0.32, h: size * 0.24 }
    fillPoly(buf, size, size, fitBolt(size, size, box), '#ffffff')
  } else if (fgOnly) {
    // adaptive foreground: transparent bg, bolt inside safe zone
    const box = { x: size * 0.24, y: size * 0.28, w: size * 0.52, h: size * 0.44 }
    fillPoly(buf, size, size, fitBolt(size, size, box), '#ffffff')
  } else {
    fillGradient(buf, size, size, size * 0.06, size * 0.06, size * 0.94, size * 0.94, size * 0.22, STOPS)
    const box = { x: size * 0.3, y: size * 0.32, w: size * 0.4, h: size * 0.34 }
    fillPoly(buf, size, size, fitBolt(size, size, box), '#ffffff')
  }
  if (round) circleClip(buf, size, size)
  return encodePNG(size, size, buf)
}

function writePNG(file, png) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, png)
}

// splash rasterised directly at each requested size
function splashPNG(w, h) {
  const buf = canvas(w, h)
  fillGradient(buf, w, h, 0, 0, w, h, 0, STOPS)
  drawGhostCircle(buf, w, h, w * 0.92, h * 0.1, w * 0.09, w * 0.36)
  drawGhostCircle(buf, w, h, w * 0.08, h * 0.94, w * 0.06, w * 0.3)
  const box = { x: w * 0.36, y: h * 0.4, w: w * 0.28, h: h * 0.2 }
  fillPoly(buf, w, h, fitBolt(w, h, box), '#ffffff')
  return encodePNG(w, h, buf)
}

const RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res')

const JOBS = [
  // --- Android launcher icons ---
  ...[['mdpi', 48], ['hdpi', 72], ['xhdpi', 96], ['xxhdpi', 144], ['xxxhdpi', 192]].map(([d, s]) => [
    path.join(RES, `mipmap-${d}`, 'ic_launcher.png'), iconPNG(s),
  ]),
  ...[['mdpi', 48], ['hdpi', 72], ['xhdpi', 96], ['xxhdpi', 144], ['xxxhdpi', 192]].map(([d, s]) => [
    path.join(RES, `mipmap-${d}`, 'ic_launcher_round.png'), iconPNG(s, { round: true }),
  ]),
  ...[['mdpi', 108], ['hdpi', 162], ['xhdpi', 216], ['xxhdpi', 324], ['xxxhdpi', 432]].map(([d, s]) => [
    path.join(RES, `mipmap-${d}`, 'ic_launcher_foreground.png'), iconPNG(s, { fgOnly: true }),
  ]),
  // --- Splash screens (portrait + landscape + base) ---
  ...[
    ['port-mdpi', 320, 480], ['port-hdpi', 480, 800], ['port-xhdpi', 720, 1280],
    ['port-xxhdpi', 960, 1600], ['port-xxxhdpi', 1280, 1920],
  ].map(([d, w, h]) => [path.join(RES, `drawable-${d}`, 'splash.png'), splashPNG(w, h)]),
  ...[
    ['land-mdpi', 480, 320], ['land-hdpi', 800, 480], ['land-xhdpi', 1280, 720],
    ['land-xxhdpi', 1600, 960], ['land-xxxhdpi', 1920, 1280],
  ].map(([d, w, h]) => [path.join(RES, `drawable-${d}`, 'splash.png'), splashPNG(w, h)]),
  [path.join(RES, 'drawable', 'splash.png'), splashPNG(480, 320)],
  // --- PWA icons ---
  [path.join(ROOT, 'public', 'icon-192.png'), iconPNG(192)],
  [path.join(ROOT, 'public', 'icon-512.png'), iconPNG(512)],
]

for (const [file, png] of JOBS) writePNG(file, png)

// --- adaptive icon background colour ---
fs.writeFileSync(
  path.join(RES, 'values', 'ic_launcher_background.xml'),
  '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#4F46E5</color>\n</resources>\n'
)

console.log(`Generated ${JOBS.length} PNG assets`)