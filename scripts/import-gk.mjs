// Import a tab-separated GK bank into src/data/custom/*.json
//
//   node scripts/import-gk.mjs <file.txt> <cat> [out.json]
//
// File format (one question per line, tab-separated):
//   question \t optionA \t optionB \t optionC \t optionD \t answerIndex
//
// answerIndex is 0..3 pointing at the correct option. Invalid lines are
// skipped and reported. Writes src/data/custom/<name>.<cat>.json

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(here, '..', 'src', 'data', 'custom')

const ALLOWED = {
  history: 'history',
  polity: 'polity',
  geography: 'geography',
  economy: 'economy',
  science: 'science',
  'static-gk': 'static-gk',
  'static gk': 'static-gk',
  reasoning: 'reasoning',
  quant: 'quant',
  english: 'english',
}

function main() {
  const [file, catArg, out] = process.argv.slice(2)
  if (!file || !catArg) {
    console.error('Usage: node scripts/import-gk.mjs <file.txt|json> <cat> [outName]')
    process.exit(1)
  }
  const cat = ALLOWED[catArg.toLowerCase()]
  if (!cat) {
    console.error(`Unknown category "${catArg}". Use one of: ${Object.keys(ALLOWED).join(', ')}`)
    process.exit(1)
  }
  if (!existsSync(file)) {
    console.error(`File not found: ${file}`)
    process.exit(1)
  }

  const raw = readFileSync(file, 'utf8')
  const questions = []
  let skipped = 0

  const lines = raw.split(/\r?\n/)
  for (const line of lines) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue

    // support JSON arrays too
    if (t.startsWith('[')) {
      try {
        for (const q of JSON.parse(raw)) {
          const p = clean(q, cat)
          if (p) questions.push(p)
          else skipped++
        }
      } catch {
        skipped++
      }
      break
    }

    const parts = t.split('\t').map((s) => s.trim())
    if (parts.length !== 6) {
      skipped++
      continue
    }
    const [text, a, b, c, d, ans] = parts
    const q = clean(
      { text, options: [a, b, c, d], answer: Number(ans), explanation: '' },
      cat
    )
    if (q) questions.push(q)
    else skipped++
  }

  const name = (out || file.replace(/\.[^.]+$/, '').replace(/^.*\//, '').replace(/[^a-zA-Z0-9_-]/g, '-'))
  const target = join(OUT_DIR, `${name}.${cat}.json`)
  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(target, JSON.stringify(questions, null, 2))

  console.log(`Imported ${questions.length} questions into ${target}`)
  console.log(`Skipped ${skipped} invalid rows.`)
}

function clean(q, cat) {
  if (!q || typeof q.text !== 'string' || !q.text.trim()) return null
  const opt = (q.options || []).map((o) => String(o).trim())
  if (opt.length !== 4 || new Set(opt).size !== 4) return null
  const ans = Number(q.answer)
  if (!Number.isInteger(ans) || ans < 0 || ans > 3) return null
  return {
    cat,
    text: q.text.trim(),
    options: opt,
    answer: ans,
    explanation: q.explanation ? String(q.explanation) : '',
  }
}

main()