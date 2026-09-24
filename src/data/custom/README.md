# Custom Question Banks (Bulk GK Import)

The GK topics (History, Polity, Geography, Economy, Science, Static GK) ship
with ~50 hand-curated questions each. Reasoning, Quant and English auto-generate
~1,000 each — but factual GK can't be fabricated by a generator, so it's curated.

To grow any GK topic to **1,000+ questions**, drop real question banks here.

## Format

Each `*.json` file in this folder is an array of questions:

```json
[
  {
    "cat": "history",
    "text": "Who founded the Maurya Empire?",
    "options": ["Chandragupta Maurya", "Ashoka", "Bindusara", "Harsha"],
    "answer": 0,
    "explanation": "Chandragupta founded it in 322 BCE."
  }
]
```

- `cat`: one of `history | polity | geography | economy | science | static-gk`
  (also `reasoning | quant | english` if you want to replace those).
- `options`: exactly **4 distinct** options.
- `answer`: 0–3 index of the correct option (validated — bad questions are
  skipped automatically).
- `explanation`: optional.

## Converting a plain-text bank

Put a TSV/TXT file with lines like:

```
Who founded the Maurya Empire?<TAB>Chandragupta Maurya<TAB>Ashoka<TAB>Bindusara<TAB>Harsha<TAB>0
```

then run:

```bash
node scripts/import-gk.mjs mybank.txt history
```

It writes `src/data/custom/mybank.history.json` and prints how many valid
questions were added. Rebuild (`npm run build`) and the bank grows immediately.

## Why GK can't be auto-generated

Math/logic/spelling questions have answers that are *computed*, so a generator
can produce thousands that are 100% correct. Facts like dates, names and places
can't be computed — a generator would silently invent wrong answers. That's why
they're hand-curated (and why the app tells you the real count). Bulk-importing
verified banks is the safe way to scale them.