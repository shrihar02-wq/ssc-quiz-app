import { mulberry32, randInt, pick, q } from './rng.js'

const gcd = (a, b) => (b ? gcd(b, a % b) : a)
const lcm = (a, b) => (a * b) / gcd(a, b)

function optSet(r, ans, makeAlt) {
  const set = new Set([ans])
  let guard = 0
  while (set.size < 4 && guard < 200) {
    guard++
    const c = makeAlt(r)
    if (c >= 0 && Number.isFinite(c)) set.add(c)
  }
  const arr = [...set]
  return { options: arr.map(String), correctIndex: arr.indexOf(ans) }
}

// format numbers cleanly (avoid floating noise when needed)
const fmt$ = (x) => (Number.isInteger(x) ? `₹${x}` : `₹${x.toFixed(2)}`)
const fmtPct = (x) => (Number.isInteger(x) ? `${x}%` : `${x.toFixed(2)}%`)

function tPctOf(r) {
  const p = pick(r, [5, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 80])
  const n = pick(r, [100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2400])
  const ans = (p * n) / 100
  const text = `What is ${p}% of ₹${n}?`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + (randInt(rr, 1, 12) * n) / 100)
  return q(r, { cat: 'quant', text, options: options.map((s) => `₹${s}`), correctIndex, explanation: `${p}% of ${n} = (${p}/100) × ${n} = ₹${ans}.` })
}

function tPctOfNum(r) {
  const p = pick(r, [5, 10, 15, 20, 25, 30, 40, 50, 75])
  const n = randInt(r, 20, 120)
  const ans = (p * n) / 100
  const text = `What is ${p}% of ${n}?`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, 1, 9))
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `(${p}/100) × ${n} = ${ans}.` })
}

function tNumIsPctOf(r) {
  const p = pick(r, [10, 20, 25, 40, 50, 60, 75, 80])
  const ans = pick(r, [25, 40, 50, 80, 96, 100, 120, 150, 160, 200, 250, 300])
  const num = (p * ans) / 100
  const text = `${num} is what percentage of ${ans}?`
  const { options, correctIndex } = optSet(r, p, (rr) => p + randInt(rr, -9, 9))
  return q(r, { cat: 'quant', text, options: options.map((s) => `${s}%`), correctIndex, explanation: `(${num} / ${ans}) × 100 = ${p}%.` })
}

function tPctInc(r) {
  const base = pick(r, [100, 200, 250, 300, 400, 500, 600, 800, 1000])
  const p = pick(r, [5, 10, 15, 20, 25, 30, 40, 50])
  const inc = (base * p) / 100
  const newv = base + inc
  const text = `A price rises from ₹${base} to ₹${newv}. What is the percentage increase?`
  const { options, correctIndex } = optSet(r, p, (rr) => p + randInt(rr, 1, 4) * 5)
  return q(r, { cat: 'quant', text, options: options.map((s) => `${Math.round(s)}%`), correctIndex, explanation: `Increase = ₹${inc}; (${inc}/${base}) × 100 = ${p}%.` })
}

function tAvgList(r) {
  const n = randInt(r, 3, 6)
  const m = pick(r, [5, 8, 10, 12, 15, 20, 25, 30])
  const arr = []
  for (let i = 0; i < n; i++) arr.push(m + randInt(r, -8, 8))
  const ans = Math.round(arr.reduce((a, b) => a + b, 0) / n * 10) / 10
  const text = `Find the average of: ${arr.join(', ')}`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -6, 6))
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `Average = sum ÷ count = (${arr.join(' + ')}) / ${n} = ${ans}.` })
}

function tAvgConsec(r) {
  const a = randInt(r, 2, 40)
  const n = pick(r, [4, 5, 6, 8, 10])
  const sum = (n / 2) * (2 * a + (n - 1))
  const ans = sum / n
  const text = `Find the average of the first ${n} integers starting from ${a} (${Array.from({ length: Math.min(n, 4) }).map((_, i) => a + i).join(', ')}${n > 4 ? ' …' : ''}).`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, 1, 5))
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `Average = (first + last)/2 = (${a} + ${a + n - 1})/2 = ${ans}.` })
}

function tLCM(r) {
  let a = randInt(r, 4, 30)
  let b = randInt(r, 4, 30)
  if (gcd(a, b) === 1 && randInt(r, 0, 1)) {
    b = b + 10 // avoid always coprime for variety
  }
  const ans = lcm(a, b)
  const text = `Find the LCM of ${a} and ${b}.`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, 1, 9) * randInt(rr, 2, 5))
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `LCM(${a}, ${b}) = ${a}×${b} / HCF = ${ans}.` })
}

function tHCF(r) {
  const g = randInt(r, 2, 15)
  const a = g * randInt(r, 2, 15)
  const b = g * randInt(r, 2, 15)
  const ans = gcd(a, b)
  const text = `Find the HCF of ${a} and ${b}.`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -4, 4) || 1)
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `HCF(${a}, ${b}) = ${ans}.` })
}

function tProfit(r) {
  const cp = pick(r, [100, 200, 250, 300, 400, 500, 800, 1000])
  const p = pick(r, [5, 10, 15, 20, 25, 30, 40, 50])
  const sp = cp + (cp * p) / 100
  const ans = p
  const text = `An article is bought for ₹${cp} and sold for ₹${sp}. What is the profit percentage?`
  const { options, correctIndex } = optSet(r, ans, (rr) => p + randInt(rr, -4, 4))
  return q(r, { cat: 'quant', text, options: options.map((s) => `${s}%`), correctIndex, explanation: `Profit = ₹${sp} − ₹${cp}; percentage = (${sp - cp}/${cp}) × 100 = ${p}%.` })
}

function tLoss(r) {
  const cp = pick(r, [200, 300, 400, 500, 600, 800, 1000])
  const p = pick(r, [5, 10, 15, 20, 25])
  const sp = cp - (cp * p) / 100
  const ans = p
  const text = `An article is bought for ₹${cp} and sold for ₹${sp}. What is the loss percentage?`
  const { options, correctIndex } = optSet(r, ans, (rr) => p + randInt(rr, -3, 3))
  return q(r, { cat: 'quant', text, options: options.map((s) => `${s}%`), correctIndex, explanation: `Loss = ₹${cp} − ₹${sp}; percentage = (${cp - sp}/${cp}) × 100 = ${p}%.` })
}

function tSI(r) {
  const P = pick(r, [1000, 2000, 5000, 8000, 10000, 15000, 20000])
  const R = pick(r, [2, 3, 4, 5, 6, 8, 10])
  const T = pick(r, [1, 2, 3, 4, 5])
  const ans = (P * R * T) / 100
  const text = `Find the simple interest on ₹${P} at ${R}% per annum for ${T} years.`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + (P * R) / 100)
  const uniq = [...new Set(options)]
  return q(r, { cat: 'quant', text, options: uniq.map((s) => `₹${s}`), correctIndex: uniq.indexOf(String(ans)), explanation: `SI = P × R × T / 100 = ${P}×${R}×${T}/100 = ₹${ans}.` })
}

function tCI(r) {
  const P = pick(r, [1000, 2000, 5000, 10000, 20000])
  const R = pick(r, [2, 5, 10, 20])
  const ans = +(P * Math.pow(1 + R / 100, 2)).toFixed(2)
  const text = `What will ₹${P} amount to after 2 years at ${R}% per annum compounded annually?`
  const { options, correctIndex } = optSet(r, ans, (rr) => +(P * Math.pow(1 + R / 100, 2) + randInt(rr, 1, 9) * 10).toFixed(2))
  return q(r, { cat: 'quant', text, options: options.map((s) => `₹${s}`), correctIndex, explanation: `Amount = P(1 + r/100)² = ${P}(1.${R})² = ₹${ans}.` })
}

function tRatio(r) {
  const a = randInt(r, 2, 9)
  const b = randInt(r, 3, 12)
  const k = randInt(r, 2, 20)
  const x = a * k
  const y = b * k
  const text = `${a} : ${b} :: ${x} : ?`
  const ans = y
  const { options, correctIndex } = optSet(r, ans, (rr) => y + randInt(rr, -6, 6))
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `Cross-multiply: ? = ${b} × ${x} ÷ ${a} = ${y}.` })
}

function tSpeed(r) {
  const d = pick(r, [60, 90, 120, 150, 180, 200, 240, 300])
  const h = pick(r, [1, 2, 3, 4, 5])
  const ans = d / h
  const text = `A train covers ${d} km in ${h} hours. Find its speed.`
  const { options, correctIndex } = optSet(r, ans, (rr) => (d - randInt(rr, 5, 30)) / h)
  return q(r, { cat: 'quant', text, options: options.map((s) => `${s} km/h`), correctIndex, explanation: `Speed = distance / time = ${d} / ${h} = ${ans} km/h.` })
}

function tTime(r) {
  const s = pick(r, [30, 40, 50, 60, 80, 90, 100])
  const h = pick(r, [1, 2, 3, 4])
  const d = s * h
  const text = `How long will it take to cover ${d} km at ${s} km/h?`
  const ans = h
  const { options, correctIndex } = optSet(r, ans, (rr) => h + randInt(rr, -1, 2))
  return q(r, { cat: 'quant', text, options: options.map((s2) => `${s2} h`), correctIndex, explanation: `Time = distance / speed = ${d} / ${s} = ${h} hours.` })
}

function tSimplify(r) {
  const form = randInt(r, 0, 5)
  let text, ans
  if (form === 0) {
    const a = randInt(r, 20, 99); const b = randInt(r, 5, 19); const c = randInt(r, 5, 19)
    ans = a + b * c; text = `Simplify: ${a} + ${b} × ${c}`
    return finishSimple(r, text, ans)
  } else if (form === 1) {
    const a = randInt(r, 12, 50); const b = randInt(r, 6, 25); const c = randInt(r, 2, 9)
    ans = a * (b + c); text = `Simplify: ${a} × (${b} + ${c})`
    return finishSimple(r, text, ans)
  } else if (form === 2) {
    const a = randInt(r, 20, 99); let b = randInt(r, 3, 18); const c = randInt(r, 5, 30)
    if (b > c) { const t = b; b = c; c = t }
    ans = a - b * c; text = `Simplify: ${a} − ${b} × ${c}`
    return finishSimple(r, text, ans)
  } else if (form === 3) {
    const a = randInt(r, 5, 20); const b = randInt(r, 5, 20); const k = randInt(r, 2, 9)
    ans = a + b; text = `Find the value of x: x × ${k} = ${(a + b) * k}`
    return finishSolve(r, text, ans)
  } else {
    const a = randInt(r, 10, 50); const b = randInt(r, 6, 30)
    ans = a - b; text = `Find the value of x: x + ${b} = ${a}`
    return finishSolve(r, text, ans)
  }

  function finishSimple(rr, t, an) {
    const { options, correctIndex } = optSet(rr, an, (rrr) => an + randInt(rrr, -8, 8) || 1)
    return q(rr, { cat: 'quant', text: t, options, correctIndex, explanation: `Following BODMAS, the result is ${an}.` })
  }
  function finishSolve(rr, t, an) {
    const { options, correctIndex } = optSet(rr, an, (rrr) => an + randInt(rrr, -5, 5) || 1)
    return q(rr, { cat: 'quant', text: t, options, correctIndex, explanation: `Solving gives x = ${an}.` })
  }
}

function tPowers(r) {
  const form = randInt(r, 0, 2)
  if (form === 0) {
    const b = randInt(r, 4, 20); const ans = b * b
    const text = `${b}² = ?`
    const { options, correctIndex } = optSet(r, ans, (rr) => Math.pow(b + randInt(rr, -2, 2), 2))
    return q(r, { cat: 'quant', text, options, correctIndex, explanation: `${b}² = ${b} × ${b} = ${ans}.` })
  } else if (form === 1) {
    const b = randInt(r, 3, 10); const ans = b * b * b
    const text = `${b}³ = ?`
    const { options, correctIndex } = optSet(r, ans, (rr) => Math.pow(b + randInt(rr, -1, 1), 3))
    return q(r, { cat: 'quant', text, options, correctIndex, explanation: `${b}³ = ${b} × ${b} × ${b} = ${ans}.` })
  } else {
    const a = randInt(r, 2, 9); const b = randInt(r, 2, 4)
    const ans = Math.pow(a, b)
    const text = `${a}^${b} = ?`
    const { options, correctIndex } = optSet(r, ans, (rr) => Math.pow(a, b + randInt(rr, -1, 1)))
    return q(r, { cat: 'quant', text, options, correctIndex, explanation: `${a}^${b} = ${ans}.` })
  }
}

function tUnitary(r) {
  const m = pick(r, [3, 4, 5, 6, 8])
  const cost = m * pick(r, [5, 8, 10, 12, 15, 20, 25])
  const n = pick(r, [7, 9, 10, 12, 15, 20])
  const ans = (cost / m) * n
  const text = `If ${m} items cost ₹${cost}, what is the cost of ${n} items?`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + (cost / m) * randInt(rr, 1, 4))
  return q(r, { cat: 'quant', text, options: options.map((s) => `₹${s}`), correctIndex, explanation: `One item costs ₹${cost / m}; ${n} items cost ₹${ans}.` })
}

function tSumNat(r) {
  const form = randInt(r, 0, 2)
  if (form === 0) {
    const n = pick(r, [10, 20, 30, 50, 100]); const ans = (n * (n + 1)) / 2
    const text = `Find the sum of the first ${n} natural numbers.`
    const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -5, 5) || 1)
    return q(r, { cat: 'quant', text, options, correctIndex, explanation: `Sum = n(n+1)/2 = ${n}×${n + 1}/2 = ${ans}.` })
  } else if (form === 1) {
    const n = pick(r, [5, 8, 10, 12, 15]); const ans = n * n
    const text = `Find the sum of the first ${n} odd numbers.`
    const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -4, 4) || 1)
    return q(r, { cat: 'quant', text, options, correctIndex, explanation: `Sum of first n odd numbers = n² = ${n}² = ${ans}.` })
  } else {
    const n = pick(r, [5, 8, 10, 12]); const ans = n * (n + 1)
    const text = `Find the sum of the first ${n} even numbers.`
    const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -4, 4) || 1)
    return q(r, { cat: 'quant', text, options, correctIndex, explanation: `Sum of first n even numbers = n(n+1) = ${ans}.` })
  }
}

function tDiscount(r) {
  const mp = pick(r, [100, 200, 250, 400, 500, 800, 1000])
  const d = pick(r, [5, 10, 15, 20, 25, 30])
  const ans = mp - (mp * d) / 100
  const text = `A shopkeeper gives a discount of ${d}% on an item marked ₹${mp}. What is the selling price?`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -15, 15) || 1)
  return q(r, { cat: 'quant', text, options: options.map((s) => `₹${s}`), correctIndex, explanation: `Discount = ${d}% of ${mp} = ₹${(mp * d) / 100}; SP = ${mp} − ₹${(mp * d) / 100} = ₹${ans}.` })
}

function tAge(r) {
  const sum = pick(r, [40, 50, 60, 70, 80, 90, 100])
  const d = pick(r, [4, 6, 8, 10, 12])
  const a = (sum + d) / 2
  const b = (sum - d) / 2
  const whichA = randInt(r, 0, 1)
  const ans = whichA ? a : b
  const text = `The sum of the ages of A and B is ${sum} years. A is ${d} years older than B. What is ${whichA ? "A's" : "B's"} age?`
  const { options, correctIndex } = optSet(r, ans, (rr) => ans + randInt(rr, -4, 4) || 1)
  return q(r, { cat: 'quant', text, options, correctIndex, explanation: `${whichA ? 'A' : 'B'} = (sum ± diff)/2 = (${sum} ${whichA ? '+' : '−'} ${d})/2 = ${ans} years.` })
}

const TEMPLATES = [
  tPctOf, tPctOfNum, tNumIsPctOf, tPctInc, tAvgList, tAvgConsec, tLCM, tHCF,
  tProfit, tLoss, tSI, tCI, tRatio, tSpeed, tTime, tSimplify, tPowers, tUnitary,
  tSumNat, tDiscount, tAge,
]

export function generateQuant(seed, target = 1000) {
  const r = mulberry32(seed)
  const map = new Map()
  const maxPasses = target * 10 + 3000
  let n = 0
  while (map.size < target && n < maxPasses) {
    const tmpl = TEMPLATES[n % TEMPLATES.length]
    let qq = null
    try {
      qq = tmpl(r, n)
    } catch {
      qq = null
    }
    if (qq && qq.options.length === 4 && !map.has(qq.text)) {
      map.set(qq.text, qq)
    }
    n++
  }
  return [...map.values()].map((qq, i) => ({ id: `gq${i}_${seed}`, ...qq }))
}