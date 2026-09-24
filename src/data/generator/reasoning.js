import { mulberry32, randInt, pick, shuffle, q, num } from './rng.js'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function letter(i) {
  return LETTERS[((i % 26) + 26) % 26]
}

const MP = 26 // wrapper for letter math

function genOptions(r, answer, fmt, makeAlt) {
  const set = new Set([answer])
  let guard = 0
  while (set.size < 4 && guard < 120) {
    guard++
    set.add(makeAlt(r))
  }
  const arr = [...set]
  return { options: arr.map(fmt), correctIndex: arr.indexOf(answer) }
}

// --------------------------- templates ---------------------------
// Each template(r, n) -> question|null (using iteration n for variety)

function tArithSeries(r, n) {
  const neg = randInt(r, 0, 1)
  const start = neg ? randInt(r, 15, 45) : randInt(r, 3, 50)
  let d = randInt(r, 2, 14)
  if (neg) d = -d
  const terms = [0, 1, 2, 3].map((i) => start + i * d)
  const ans = start + 4 * d
  const text = `Find the next term of the series: ${terms.join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, num, (rr) => {
    const off = [1, 2, 3, 4][randInt(rr, 0, 3)] * (d >= 0 ? 1 : -1)
    return ans + off + randInt(rr, -3, 3) + (n % 5)
  })
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Each term increases by ${d}, so the next term is ${ans}.` })
}

function tMulSeries(r, n) {
  const ratio = pick(r, [2, 3, 4, 5, -2, -3])
  const start = randInt(r, 2, 8)
  const terms = [0, 1, 2, 3].map((i) => start * Math.pow(Math.abs(ratio), i) * (ratio > 0 ? 1 : (i % 2 ? -1 : 1)))
  const last = terms[3]
  const ans = last * ratio
  const text = `Find the next term: ${terms.join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, num, (rr) => {
    const j = randInt(rr, 1, 3)
    return ans + j * ratio * randInt(rr, 1, 2) + (n % 3)
  })
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Each term is multiplied by ${ratio}: ${last} × ${ratio} = ${ans}.` })
}

function tSquareSeries(r, n) {
  const b = randInt(r, 3, 22)
  const terms = [0, 1, 2, 3].map((i) => Math.pow(b + i, 2))
  const ans = Math.pow(b + 4, 2)
  const text = `Find the next term: ${terms.join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, num, (rr) => Math.pow(b + 4 + randInt(rr, -2, 2), 2) + (n % 2))
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Terms are the squares of consecutive numbers ${b}, ${b + 1}, ${b + 2}, ... so next is ${ans}.` })
}

function tCubeSeries(r, n) {
  const b = randInt(r, 2, 9)
  const terms = [0, 1, 2, 3].map((i) => Math.pow(b + i, 3))
  const ans = Math.pow(b + 4, 3)
  const text = `Find the next term: ${terms.join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, num, (rr) => Math.pow(b + 4 + randInt(rr, -1, 1), 3) + (n % 3))
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Terms are cubes of ${b}, ${b + 1}, ${b + 2}, ... so next is ${ans}.` })
}

function tFibSeries(r) {
  const a = randInt(r, 1, 9)
  const b = randInt(r, a, a + 9)
  const t = [a, b]
  for (let i = 2; i < 5; i++) t.push(t[i - 1] + t[i - 2])
  const ans = t[4] + t[3]
  const text = `Find the next term: ${t.slice(0, 5).join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, num, (rr) => ans + (1 + randInt(rr, 0, 4)) * (randInt(rr, 0, 1) ? 1 : -1))
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Each term is the sum of the two before it: ${t[3]} + ${t[4]} = ${ans}.` })
}

function tIncDiffSeries(r) {
  const start = randInt(r, 3, 25)
  const d = randInt(r, 2, 8)
  const t = [start]
  let cur = start
  for (let i = 1; i < 4; i++) {
    cur += i * d
    t.push(cur)
  }
  const ans = cur + 4 * d
  const text = `Find the next term: ${t.join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, num, (rr) => ans + randInt(rr, -9, 9) + (d === 2 ^ randInt(rr, 0, 1) ? 1 : 0))
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Differences increase by ${d} each time, so next is ${ans}.` })
}

function tOddNum(r) {
  const kind = randInt(r, 0, 4)
  let base = []
  let odd
  if (kind === 0) {
    // four primes, one composite
    const primes = shuffle(r, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]).slice(0, 4)
    odd = pick(r, [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28])
    base = [...primes, odd]
    const why = `${odd} is the only composite number here, the rest are prime.`
    return finish(r, base, odd, why)
  } else if (kind === 1) {
    const sq = shuffle(r, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289]).slice(0, 4)
    odd = pick(r, [5, 7, 11, 13, 17, 19, 23, 26, 29, 30, 34, 40, 47, 50])
    while (sq.includes(odd)) odd = pick(r, [5, 7, 11, 13, 17, 19, 23, 26, 29, 30, 34, 40, 47, 50])
    base = [...sq, odd]
    return finish(r, base, odd, `${odd} is not a perfect square.`)
  } else if (kind === 2) {
    const k = randInt(r, 3, 13)
    const a = randInt(r, 2, 25)
    const idx = randInt(r, 0, 3)
    base = [a * k, (a + 1) * k, (a + 2) * k, (a + 3) * k]
    odd = base[idx] + randInt(r, 1, k - 1)
    base[idx] = odd
    return finish(r, base, odd, `${odd} is not divisible by ${k}, the others are.`)
  } else if (kind === 3) {
    const seed = randInt(r, 2, 20)
    base = [seed * 2, seed * 2 + 2, seed * 2 + 4, seed * 2 + 6]
    const idx = randInt(r, 0, 3)
    odd = pick(r, [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23])
    base[idx] = odd
    return finish(r, base, odd, `${odd} is the only odd number in the group.`)
  } else {
    // three shares divisible by a rule, one doesn't
    const rule = randInt(r, 5, 14)
    const a = randInt(r, 3, 22)
    base = [a, a + 1, a + 2, a + 3].map((x) => x * rule)
    const idx = randInt(r, 0, 3)
    odd = base[idx] + randInt(r, 1, rule - 1)
    base[idx] = odd
    return finish(r, base, odd, `Only ${odd} is not a multiple of ${rule}.`)
  }

  function finish(rr, values, oddVal, why) {
    const items = shuffle(rr, values)
    return q(rr, {
      cat: 'reasoning',
      text: `Find the odd one out: ${items.join(', ')}`,
      options: items.map(num),
      correctIndex: items.indexOf(oddVal),
      explanation: why,
    })
  }
}

const WORD_GROUPS = [
  { same: ['Apple', 'Mango', 'Grapes', 'Banana'], odd: 'Potato' },
  { same: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'], odd: 'Sri Lanka' },
  { same: ['Rose', 'Lotus', 'Jasmine', 'Lily'], odd: 'Mango' },
  { same: ['India', 'China', 'Nepal', 'Bhutan'], odd: 'London' },
  { same: ['Tiger', 'Lion', 'Leopard', 'Cheetah'], odd: 'Cow' },
  { same: ['Red', 'Blue', 'Green', 'Yellow'], odd: 'Round' },
  { same: ['January', 'April', 'July', 'October'], odd: 'Sunday' },
  { same: ['Gold', 'Silver', 'Copper', 'Iron'], odd: 'Wood' },
  { same: ['Physics', 'Chemistry', 'Maths', 'Biology'], odd: 'Cricket' },
  { same: ['Hockey', 'Cricket', 'Football', 'Tennis'], odd: 'Piano' },
  { same: ['Chair', 'Table', 'Sofa', 'Bed'], odd: 'Bus' },
  { same: ['Mother', 'Father', 'Brother', 'Sister'], odd: 'Teacher' },
  { same: ['Mosquito', 'Ant', 'Bee', 'Butterfly'], odd: 'Sparrow' },
  { same: ['Pencil', 'Pen', 'Eraser', 'Sharpener'], odd: 'Umbrella' },
  { same: ['Sunday', 'Monday', 'Tuesday', 'Friday'], odd: 'May' },
  { same: ['Car', 'Bus', 'Truck', 'Bike'], odd: 'Train' },
  { same: ['Ganga', 'Yamuna', 'Godavari', 'Kaveri'], odd: 'Jim Corbett' },
  { same: ['Baseball', 'Cricket', 'Hockey', 'Football'], odd: 'Chess' },
  { same: ['Oxygen', 'Nitrogen', 'Hydrogen', 'Helium'], odd: 'Gold' },
  { same: ['Bihar', 'Odisha', 'Assam', 'Kerala'], odd: 'Kathmandu' },
  { same: ['Laptop', 'Mobile', 'Tablet', 'Desktop'], odd: 'Notebook' },
  { same: ['Rice', 'Wheat', 'Barley', 'Maize'], odd: 'Tomato' },
  { same: ['Shirt', 'Trousers', 'Socks', 'Shoes'], odd: 'Plate' },
  { same: ['Taj Mahal', 'Red Fort', 'Qutub Minar', 'India Gate'], odd: 'Eiffel Tower' },
  { same: ['Mahatma Gandhi', 'Nehru', 'Patel', 'Bose'], odd: 'Shakespeare' },
  { same: ['Mars', 'Jupiter', 'Saturn', 'Venus'], odd: 'Sun' },
  { same: ['Twitter', 'Facebook', 'Instagram', 'WhatsApp'], odd: 'Telescope' },
  { same: ['Cheque', 'Debit card', 'Credit card', 'UPI'], odd: 'Pencil' },
]
function tOddWord(r) {
  const g = pick(r, WORD_GROUPS)
  const items = shuffle(r, [...g.same, g.odd])
  return q(r, {
    cat: 'reasoning',
    text: `Which word is the odd one out?`,
    options: items,
    correctIndex: items.indexOf(g.odd),
    explanation: `${g.odd} does not belong to the group of ${g.same[0]}, ${g.same[1]}, ${g.same[2]} and ${g.same[3]}.`,
  })
}

function tAlphaSeries(r) {
  const start = randInt(r, 0, 18)
  const step = randInt(r, 2, 6)
  const seq = [0, 1, 2, 3].map((i) => letter(start + i * step))
  const ans = letter(start + 4 * step)
  const text = `Find the next term: ${seq.join(', ')}, ?`
  const { options, correctIndex } = genOptions(r, ans, String, (rr) => letter(start + 4 * step + randInt(rr, 1, 5)))
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Letters move forward by ${step} positions: next is ${ans}.` })
}

const CODE_WORDS = ['CAT', 'DOG', 'MAN', 'SUN', 'MOON', 'BOOK', 'PEN', 'BAG', 'CUP', 'TEA', 'HAT', 'FOX', 'JAR', 'KIT', 'LOG', 'NET', 'OIL', 'PIG', 'RED', 'BIT', 'CAP', 'EAT', 'FAN', 'GET', 'HOT', 'INK', 'JOB', 'KEY', 'LIP', 'MAP', 'NAP', 'OWL', 'PAL', 'QUIZ', 'RUG', 'SIT', 'TOY', 'VAN', 'WEB', 'YAK']
function shift(str, k) {
  return str
    .split('')
    .map((c) => {
      const i = c.charCodeAt(0) - 65
      return String.fromCharCode(65 + (((i + k) % 26) + 26) % 26)
    })
    .join('')
}
function tCoding(r) {
  const w1 = pick(r, CODE_WORDS)
  let w2 = pick(r, CODE_WORDS)
  let guard = 0
  while (w2 === w1 && guard++ < 20) w2 = pick(r, CODE_WORDS)
  const k = randInt(r, 1, 5)
  const coded1 = shift(w1, k)
  const correct = shift(w2, k)
  const alts = new Set([correct])
  let g = 0
  while (alts.size < 4 && g++ < 30) alts.add(shift(w2, (k + randInt(r, 1, 7)) % 26))
  const opts = shuffle(r, [...alts])
  return q(r, {
    cat: 'reasoning',
    text: `In a certain code, ${w1} is written as ${coded1}. How is ${w2} written in that code?`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanation: `Each letter is moved ${k} places forward: ${w2} → ${correct}.`,
  })
}

function tAnalogy(r) {
  const pairs = [
    ['Doctor', 'Hospital', 'Teacher', 'School'],
    ['Book', 'Author', 'Painting', 'Painter'],
    ['Bird', 'Nest', 'Dog', 'Kennel'],
    ['Hand', 'Glove', 'Foot', 'Sock'],
    ['Pen', 'Ink', 'Car', 'Petrol'],
    ['River', 'Bank', 'Ocean', 'Beach'],
    ['Lion', 'Den', 'Bee', 'Hive'],
    ['Chief Minister', 'State', 'Prime Minister', 'Nation'],
    ['Mango', 'Fruit', 'Rose', 'Flower'],
    ['Chalk', 'Board', 'Pen', 'Paper'],
    ['Cow', 'Calf', 'Dog', 'Puppy'],
    ['Pearl', 'Oyster', 'Coal', 'Mine'],
    ['Spider', 'Web', 'Grahak', 'Money'], // Grahak->Customer awkward: use below
  ].filter((p) => p[2] !== 'Grahak')
  const extra = [
    ['Success', 'Failure', 'Day', 'Night'],
    ['Lion', 'Roar', 'Dog', 'Bark'],
    ['Sky', 'Blue', 'Grass', 'Green'],
    ['Stitch', 'Cloth', 'Brick', 'Wall'],
    ['Poet', 'Poem', 'Composer', 'Music'],
    ['Carpenter', 'Wood', 'Blacksmith', 'Iron'],
    ['Chef', 'Food', 'Tailor', 'Clothes'],
    ['Dance', 'Stage', 'Act', 'Theatre'],
    ['Water', 'Tank', 'Milk', 'Pot'],
    ['College', 'Student', 'Hospital', 'Patient'],
    ['Money', 'Wallet', 'Books', 'Bag'],
    ['Celsius', 'Temperature', 'Kilogram', 'Weight'],
    ['Ounce', 'Weight', 'Inch', 'Length'],
    ['Bicycle', 'Wheel', 'Clock', 'Needle'],
  ]
  const all = [...pairs, ...extra]
  const [a, b, c, d] = pick(r, all)
  const distractors = shuffle(r, all.filter((p) => p[0] !== a)).slice(0, 11).map((p) => p[3])
  const uniq = [...new Set(distractors)].filter((x) => x !== d).slice(0, 3)
  const opts = shuffle(r, [d, ...uniq])
  return q(r, {
    cat: 'reasoning',
    text: `${a} : ${b} :: ${c} : ?`,
    options: opts,
    correctIndex: opts.indexOf(d),
    explanation: `${a} is to ${b} as ${c} is to ${d}.`,
  })
}

function tBlood(r) {
  const frames = [
    { s: (who) => `Pointing to a person, Ravi said, "He is the son of my mother." How is the person related to Ravi?`, ans: 'Brother' },
    { s: (who) => `Pointing to a lady, Ravi said, "She is the mother of my son." How is the lady related to Ravi?`, ans: 'Wife' },
    { s: (who) => `Pointing to a man, Ravi said, "He is the father of my father." How is the man related to Ravi?`, ans: 'Grandfather' },
    { s: (who) => `Pointing to a girl, Ravi said, "She is the daughter of my uncle." How is the girl related to Ravi?`, ans: 'Cousin' },
    { s: (who) => `Ravi's mother is the daughter of X. How is X related to Ravi?`, ans: 'Grandmother' },
    { s: (who) => `${who} is the son of Ravi's father. If they are not the same person, how is ${who} related to Ravi?`, ans: 'Brother' },
    { s: (who) => `The brother of my mother is my ____.`, ans: 'Uncle' },
    { s: (who) => `The sister of my father is my ____.`, ans: 'Aunt' },
    { s: (who) => `The father of my son is my ____.`, ans: 'Husband' },
    { s: (who) => `The daughter of my brother is my ____.`, ans: 'Niece' },
    { s: (who) => `The son of my sister is my ____.`, ans: 'Nephew' },
    { s: (who) => `The husband of my sister is my ____.`, ans: 'Brother-in-law' },
    { s: (who) => `The wife of my brother is my ____.`, ans: 'Sister-in-law' },
    { s: (who) => `${who} is the only child of Ravi and the father of Ravi is my grandfather. How is Ravi related to the speaker?`, ans: 'Father' },
    { s: (who) => `Pointing to a woman, Ravi said, "She is my mother's sister, but her mother is my grandmother." How is that woman related to Ravi?`, ans: 'Aunt' },
    { s: (who) => `If A's mother is B, and B's mother is C, then how is C related to A?`, ans: 'Grandmother' },
  ]
  const names = ['Kiran', 'Suresh', 'Meena', 'Arjun', 'Priya', 'Vikram']
  const f = pick(r, frames)
  const who = pick(r, names)
  const ans = f.ans
  const pool = ['Brother', 'Father', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother', 'Wife', 'Husband', 'Cousin', 'Niece', 'Nephew', 'Sister-in-law', 'Brother-in-law']
  const opts = shuffle(r, [...new Set([ans, ...pool.filter((p) => p !== ans).sort(() => Math.random() - 0.5).slice(0, 3)])])
  return q(r, {
    cat: 'reasoning',
    text: f.s(who),
    options: opts,
    correctIndex: opts.indexOf(ans),
    explanation: `Based on the described family relation, the answer is ${ans}.`,
  })
}

function tDirection(r) {
  const dirs = ['North', 'South', 'East', 'West']
  const start = pick(r, dirs)
  const steps = randInt(r, 1, 3)
  let cur = dirs.indexOf(start)
  const parts = []
  for (let i = 0; i < steps; i++) {
    const turn = pick(r, ['left', 'right'])
    const deg = pick(r, ['90', '90', '90', '180'])
    if (deg === '180') {
      cur = (cur + 2) % 4
      parts.push(`turns 180° ${i === 0 ? '' : ''}`)
    } else {
      // left: -1, right: +1 (N,E,S,W order)
      cur = (cur + (turn === 'left' ? 3 : 1)) % 4
      parts.push(`turns 90° ${turn}`)
    }
  }
  const ans = dirs[cur]
  const text = `A man starts facing ${start.toLowerCase() === 'north' ? 'North' : start}. He ${parts.join(', ')}. Which direction is he facing now?`
  const opts = shuffle(r, dirs)
  return q(r, {
    cat: 'reasoning',
    text,
    options: opts,
    correctIndex: opts.indexOf(ans),
    explanation: `Tracing the turns from ${start} leads facing ${ans}.`,
  })
}

function tClock(r) {
  const h = randInt(r, 1, 11)
  const m = pick(r, [0, 30, 15, 45])
  const ang = Math.min(Math.abs(30 * h - 5.5 * m), 360 - Math.abs(30 * h - 5.5 * m))
  const ans = ang
  const text = `What is the angle between the hands of a clock at ${h}:${String(m).padStart(2, '0')}?`
  const { options, correctIndex } = genOptions(r, ans, (x) => `${x}°`, (rr) => {
    const c = randInt(rr, 0, 3)
    return (ang + [30, 60, 90, 180][c]) % 360
  })
  return q(r, { cat: 'reasoning', text, options, correctIndex, explanation: `Angle = |30×H − 5.5×M| = ${ans}°.` })
}

function tCalendar(r) {
  function zeller(day, month, year) {
    const m = month < 3 ? month + 12 : month
    const y = month < 3 ? year - 1 : year
    const k = y % 100
    const j = Math.floor(y / 100)
    const h = (day + Math.floor((13 * (m + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) + 5 * j) % 7
    return h // 0 Saturday ... 6 Friday
  }
  const names = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const day = randInt(r, 1, 27)
  const month = randInt(r, 1, 12)
  const year = randInt(r, 2001, 2030)
  const ans = names[zeller(day, month, year)]
  const opts = shuffle(r, names)
  return q(r, {
    cat: 'reasoning',
    text: `What day of the week was ${day} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1]} ${year}?`,
    options: opts,
    correctIndex: opts.indexOf(ans),
    explanation: `By calendar computation, ${day}/${month}/${year} was a ${ans}.`,
  })
}

// --------------------------- builder ---------------------------
const TEMPLATES = [
  tArithSeries, tMulSeries, tSquareSeries, tCubeSeries, tFibSeries, tIncDiffSeries,
  tOddNum, tOddWord, tAlphaSeries, tCoding, tAnalogy, tBlood, tDirection, tClock, tCalendar,
]

export function generateReasoning(seed, target = 1000) {
  const r = mulberry32(seed)
  const map = new Map()
  const maxPasses = target * 12 + 2000
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
  let i = 0
  return [...map.values()].map((qq) => ({ id: `gr${i++}_` + seed, ...qq }))
}