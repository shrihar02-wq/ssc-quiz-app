import { mulberry32, randInt, pick, shuffle, q } from './rng.js'

const SYN_ANT = [
  ['abundant', 'plentiful', 'scarce'],
  ['artificial', 'synthetic', 'natural'],
  ['candid', 'frank', 'hypocritical'],
  ['meticulous', 'careful', 'careless'],
  ['ancient', 'antique', 'modern'],
  ['brave', 'courageous', 'cowardly'],
  ['annoy', 'irritate', 'soothe'],
  ['calm', 'peaceful', 'agitated'],
  ['cheap', 'inexpensive', 'costly'],
  ['coarse', 'rough', 'fine'],
  ['combine', 'unite', 'separate'],
  ['common', 'ordinary', 'rare'],
  ['conceal', 'hide', 'reveal'],
  ['constant', 'steady', 'variable'],
  ['decrease', 'decline', 'increase'],
  ['easy', 'simple', 'difficult'],
  ['empty', 'vacant', 'occupied'],
  ['enemy', 'foe', 'friend'],
  ['expand', 'extend', 'contract'],
  ['famous', 'renowned', 'obscure'],
  ['fragile', 'delicate', 'sturdy'],
  ['frequent', 'regular', 'rare'],
  ['generous', 'liberal', 'stingy'],
  ['genuine', 'authentic', 'fake'],
  ['humble', 'modest', 'arrogant'],
  ['immense', 'huge', 'tiny'],
  ['irritate', 'provoke', 'please'],
  ['lazy', 'indolent', 'industrious'],
  ['loyal', 'faithful', 'disloyal'],
  ['merge', 'blend', 'separate'],
  ['merry', 'jovial', 'sad'],
  ['obstinate', 'stubborn', 'flexible'],
  ['optimistic', 'hopeful', 'pessimistic'],
  ['ordinary', 'common', 'extraordinary'],
  ['patient', 'tolerant', 'impatient'],
  ['polite', 'courteous', 'rude'],
  ['precise', 'exact', 'vague'],
  ['previous', 'prior', 'following'],
  ['prompt', 'quick', 'slow'],
  ['prudent', 'wise', 'reckless'],
  ['quiet', 'silent', 'noisy'],
  ['random', 'arbitrary', 'planned'],
  ['rapid', 'swift', 'slow'],
  ['reluctant', 'unwilling', 'eager'],
  ['rigid', 'stiff', 'flexible'],
  ['sacred', 'holy', 'profane'],
  ['seldom', 'rarely', 'often'],
  ['serene', 'tranquil', 'turbulent'],
  ['sincere', 'honest', 'insincere'],
  ['transparent', 'clear', 'opaque'],
  ['vacant', 'empty', 'occupied'],
  ['vivid', 'bright', 'dull'],
  ['wealthy', 'affluent', 'poor'],
  ['witty', 'clever', 'dull'],
  ['zealous', 'enthusiastic', 'apathetic'],
]

const IDIOMS = [
  ['a piece of cake', 'a very easy task'],
  ['to beat around the bush', 'to avoid the main point'],
  ['once in a blue moon', 'very rarely'],
  ['to bite the dust', 'to fail or die'],
  ['break the ice', 'to start a conversation'],
  ['burn the midnight oil', 'to work late into the night'],
  ['cost an arm and a leg', 'to be very expensive'],
  ['hit the nail on the head', 'to speak exactly right'],
  ['let the cat out of the bag', 'to reveal a secret'],
  ['under the weather', 'feeling unwell'],
  ['the ball is in your court', 'it is your turn to act'],
  ['to pull someone\'s leg', 'to tease someone'],
  ['to cry over spilt milk', 'to regret what cannot be undone'],
  ['to get cold feet', 'to become nervous before doing something'],
  ['to see eye to eye', 'to agree completely'],
  ['to cut corners', 'to do something cheaply or carelessly'],
  ['to throw in the towel', 'to give up'],
  ['to steal someone\'s thunder', 'to take credit for another\'s work'],
  ['to be on cloud nine', 'to be extremely happy'],
  ['to add insult to injury', 'to worsen a bad situation'],
  ['in the same boat', 'in the same situation'],
  ['to call it a day', 'to stop working'],
  ['to jump to conclusions', 'to decide without facts'],
  ['to take with a grain of salt', 'to not take too seriously'],
  ['to give the benefit of the doubt', 'to believe someone despite doubt'],
  ['to go the extra mile', 'to make more effort than required'],
  ['to be out of the woods', 'to be past the danger'],
  ['to keep an eye on', 'to watch carefully'],
  ['to break the news', 'to tell bad news gently'],
  ['to spill the beans', 'to reveal a secret'],
  ['to face the music', 'to accept the consequences'],
  ['to be all ears', 'to listen eagerly'],
  ['to put in a nutshell', 'to summarise briefly'],
  ['to hit the sack', 'to go to bed'],
  ['to burn one\'s boats', 'to leave no way to retreat'],
  ['to keep one\'s word', 'to keep a promise'],
  ['to lend an ear', 'to listen sympathetically'],
  ['to turn a deaf ear', 'to ignore'],
  ['to smell a rat', 'to suspect something is wrong'],
  ['to take to task', 'to rebuke or scold'],
  ['to wash one\'s hands off', 'to refuse responsibility'],
  ['to be in hot water', 'to be in trouble'],
  ['to beat a retreat', 'to withdraw or desist'],
  ['to bell the cat', 'to do a dangerous job'],
  ['to pick holes in', 'to find faults with'],
]

const ONE_WORD = [
  ['one who cannot read or write', 'illiterate'],
  ['a person who loves his country', 'patriot'],
  ['a building where books are kept', 'library'],
  ['one who does not believe in God', 'atheist'],
  ['to speak in favour of something', 'advocate'],
  ['a period of ten years', 'decade'],
  ['a government by the people', 'democracy'],
  ['a government by one ruler', 'autocracy'],
  ['one who speaks many languages', 'polyglot'],
  ['the study of the earth', 'geography'],
  ['the study of ancient life (fossils)', 'palaeontology'],
  ['a person who writes plays', 'playwright'],
  ['a person who eats too much', 'glutton'],
  ['one who never makes mistakes', 'infallible'],
  ['a place where arms and ammunition are stored', 'arsenal'],
  ['a doctor who treats diseases of the heart', 'cardiologist'],
  ['a small piece of land connected by a strip of land', 'isthmus'],
  ['a person who abandons his own country', 'emigrant'],
  ['a person who settles in another country', 'immigrant'],
  ['one who walks in sleep', 'somnambulist'],
  ['one who derives pleasure from hurting others', 'sadist'],
  ['a person indifferent to pleasure or pain', 'stoic'],
  ['a speech made without preparation', 'extempore'],
  ['that which lasts forever', 'eternal'],
  ['that which cannot be corrected', 'incorrigible'],
  ['that which cannot be avoided', 'inevitable'],
  ['words written on a tombstone', 'epitaph'],
  ['a list of books in a library', 'catalogue'],
  ['one who loves mankind', 'philanthropist'],
  ['hatred of mankind', 'misanthropy'],
  ['a woman who has lost her husband and not remarried', 'widow'],
  ['a man engaged to be married', 'fiance'],
  ['a child without parents', 'orphan'],
  ['one who is very fond of money', 'avaricious'],
  ['the art of public speaking', 'oratory'],
  ['a short funny story', 'anecdote'],
  ['an institution for orphans', 'orphanage'],
  ['a place where bees are kept', 'apiary'],
  ['government by the rich', 'plutocracy'],
  ['government by the nobility', 'aristocracy'],
  ['a place where coins are made', 'mint'],
  ['a person who works for free', 'volunteer'],
  ['one who is sixty years old', 'sexagenarian'],
  ['the science of birds', 'ornithology'],
  ['a first attempt or performance', 'debut'],
]

const PREPS = [
  ['She is good ___ mathematics.', 'at', ['in', 'on', 'with']],
  ['He lives ___ Delhi.', 'in', ['at', 'on', 'into']],
  ['The meeting starts ___ 10 a.m.', 'at', ['in', 'on', 'for']],
  ['The exams are held ___ March.', 'in', ['at', 'on', 'during']],
  ['I am going ___ the market.', 'to', ['at', 'in', 'for']],
  ['She is fond ___ music.', 'of', ['to', 'for', 'in']],
  ['The dog jumped ___ the wall.', 'over', ['on', 'at', 'into']],
  ['This book is related ___ science.', 'to', ['with', 'for', 'from']],
  ['He was absent ___ school yesterday.', 'from', ['in', 'at', 'on']],
  ['Divide this money ___ the two brothers.', 'between', ['among', 'into', 'by']],
  ['The teacher is satisfied ___ her students.', 'with', ['at', 'of', 'from']],
  ['We travelled ___ bus.', 'by', ['on', 'in', 'of']],
  ['She has been here ___ Monday.', 'since', ['for', 'from', 'at']],
  ['He is afraid ___ spiders.', 'of', ['from', 'with', 'about']],
  ['The thief entered ___ the window.', 'through', ['in', 'on', 'by']],
  ['I am angry ___ him.', 'with', ['at', 'on', 'from']],
  ['The gift is intended ___ you.', 'for', ['to', 'at', 'on']],
  ['Success depends ___ hard work.', 'on', ['at', 'in', 'with']],
  ['She congratulated me ___ my success.', 'on', ['for', 'at', 'in']],
  ['The cat was hiding ___ the bed.', 'under', ['in', 'on', 'at']],
  ['He ran ___ the street.', 'across', ['in', 'into', 'on']],
  ['We are proud ___ our team.', 'of', ['about', 'for', 'on']],
  ['She took her watch ___ the drawer.', 'from', ['out', 'in', 'of']],
  ['He reminded me ___ my promise.', 'of', ['for', 'about', 'to']],
  ['The child was allergic ___ peanuts.', 'to', ['from', 'with', 'at']],
  ['I prefer tea ___ coffee.', 'to', ['from', 'than', 'over']],
  ['She is married ___ a doctor.', 'to', ['with', 'from', 'of']],
  ['The bridge is made ___ stone.', 'of', ['from', 'with', 'by']],
  ['Butter is made ___ milk.', 'from', ['of', 'with', 'in']],
  ['She was accused ___ theft.', 'of', ['for', 'with', 'by']],
  ['He is interested ___ art.', 'in', ['at', 'of', 'for']],
  ['The train arrived ___ time.', 'on', ['in', 'at', 'by']],
  ['She goes to office ___ foot.', 'on', ['by', 'with', 'in']],
  ['He is weak ___ mathematics.', 'in', ['at', 'of', 'from']],
  ['The food is good ___ taste.', 'in', ['at', 'of', 'to']],
  ['She has a great affection ___ her parents.', 'for', ['with', 'at', 'on']],
  ['He is popular ___ his neighbours.', 'with', ['at', 'to', 'in']],
  ['The poet is known ___ his lyrics.', 'for', ['with', 'of', 'at']],
  ['She is married and has full control ___ her life.', 'over', ['on', 'at', 'in']],
  ['He was rewarded ___ his honesty.', 'for', ['with', 'at', 'on']],
  ['I am not satisfied ___ your work.', 'with', ['at', 'in', 'from']],
  ['She arrived ___ the station at noon.', 'at', ['in', 'on', 'for']],
  ['We stayed ___ a hotel.', 'in', ['at', 'on', 'into']],
  ['The painting was hung ___ the wall.', 'on', ['in', 'at', 'over']],
  ['He surrendered ___ the police.', 'to', ['at', 'with', 'into']],
  ['They quarrelled ___ a trifle.', 'over', ['on', 'at', 'with']],
  ['She is senior ___ me in service.', 'to', ['than', 'from', 'of']],
  ['We should abide ___ rules.', 'by', ['with', 'at', 'to']],
  ['He is an expert ___ driving.', 'at', ['in', 'on', 'by']],
  ['The ship was wrecked ___ the coast.', 'off', ['on', 'at', 'in']],
  ['Please write ___ ink.', 'in', ['with', 'by', 'at']],
  ['She has a prejudice ___ the rich.', 'against', ['for', 'to', 'at']],
  ['The employees are loyal ___ their firm.', 'to', ['with', 'for', 'at']],
  ['He was elected ___ the committee.', 'to', ['in', 'on', 'at']],
  ['The committee consists ___ five members.', 'of', ['with', 'in', 'from']],
]

const SPELL = [
  'accommodation', 'necessary', 'separate', 'embarrass', 'misspell', 'committee',
  'occurrence', 'privilege', 'maintenance', 'recommend', 'guarantee', 'harass',
  'conscience', 'existence', 'independent', 'millennium', 'occurrence', 'parallel',
  'personnel', 'possession', 'recommend', 'rhythm', 'schedule', 'successful',
  'temperature', 'tomorrow', 'vacuum', 'calendar', 'definitely', 'disappoint',
  'government', 'immediately', 'knowledge', 'library', 'mountain', 'occasion',
  'professor', 'questionnaire', 'restaurant', 'separate', 'television', 'vehicle',
  'wednesday', 'yesterday', 'alcohol', 'beautiful', 'business', 'children',
  'describe', 'environment', 'exciting', 'favourite', 'height', 'important',
  'language', 'machine', 'natural', 'opposite', 'possible', 'quiet', 'research',
  'soldier', 'usually', 'weather', 'whether', 'window', 'wonderful', 'apostrophe',
  'believe', 'celsius', 'eighth', 'familiar', 'grammar', 'history', 'jealous',
  'kernel', 'luxury', 'miserable', 'nervous', 'obvious', 'particular', 'recognise',
]

function typos(r, word) {
  const set = new Set()
  let guard = 0
  while (set.size < 3 && guard < 300) {
    guard++
    const mode = randInt(r, 0, 2)
    let v = word.split('')
    if (v.length < 3) continue
    if (mode === 0) {
      // duplicate a letter
      const i = randInt(r, 0, v.length - 1)
      v = [...v.slice(0, i), v[i], ...v.slice(i)]
    } else if (mode === 1) {
      // swap two adjacent letters
      const i = randInt(r, 0, v.length - 2)
      ;[v[i], v[i + 1]] = [v[i + 1], v[i]]
    } else {
      // drop a consonant letter
      const candidates = v.map((c, i) => (/[bcdfghjklmnpqrstvwxyz]/.test(c) ? i : -1)).filter((i) => i >= 0)
      if (!candidates.length) continue
      const i = candidates[randInt(r, 0, candidates.length - 1)]
      v = [...v.slice(0, i), ...v.slice(i + 1)]
    }
    const out = v.join('')
    if (out !== word) set.add(out)
  }
  return [...set].slice(0, 3)
}

const IRREGULAR = ['criterion', 'datum', 'phenomenon', 'analysis', 'basis', 'crisis', 'thesis', 'parenthesis', 'ellipsis', 'axis', 'alumnus', 'cactus', 'nucleus', 'focus', 'radius', 'memorandum', 'curriculum', 'medium', 'bacterium', 'stimulus']
const RULE_PLURALS = [
  ['cat', 'cats'], ['dog', 'dogs'], ['book', 'books'], ['pen', 'pens'],
  ['bus', 'buses'], ['box', 'boxes'], ['match', 'matches'], ['brush', 'brushes'],
  ['city', 'cities'], ['berry', 'berries'], ['baby', 'babies'], ['fly', 'flies'],
  ['knife', 'knives'], ['wolf', 'wolves'], ['life', 'lives'], ['wife', 'wives'],
  ['child', 'children'], ['foot', 'feet'], ['tooth', 'teeth'], ['man', 'men'],
  ['woman', 'women'], ['mouse', 'mice'], ['sheep', 'sheep'], ['deer', 'deer'],
]

const PASSIVE_VERB = [
  ['write', 'wrote', 'written'],
  ['eat', 'ate', 'eaten'],
  ['build', 'built', 'built'],
  ['drive', 'drove', 'driven'],
  ['drink', 'drank', 'drunk'],
  ['see', 'saw', 'seen'],
  ['take', 'took', 'taken'],
  ['give', 'gave', 'given'],
  ['break', 'broke', 'broken'],
  ['send', 'sent', 'sent'],
  ['teach', 'taught', 'taught'],
  ['know', 'knew', 'known'],
  ['draw', 'drew', 'drawn'],
  ['sell', 'sold', 'sold'],
  ['find', 'found', 'found'],
  ['throw', 'threw', 'thrown'],
  ['buy', 'bought', 'bought'],
  ['catch', 'caught', 'caught'],
  ['choose', 'chose', 'chosen'],
  ['speak', 'spoke', 'spoken'],
  ['hold', 'held', 'held'],
  ['produce', 'produced', 'produced'],
  ['complete', 'completed', 'completed'],
  ['repair', 'repaired', 'repaired'],
]

const GRAMMAR_FILL = [
  ['She ___ to school every day.', 'goes', ['go', 'going', 'gone']],
  ['They ___ playing football now.', 'are', ['is', 'was', 'were']],
  ['I ___ finished my homework.', 'have', ['has', 'am', 'do']],
  ['He ___ the movie last night.', 'watched', ['watch', 'watches', 'watching']],
  ['We ___ visit our grandparents next week.', 'will', ['are', 'were', 'did']],
  ['She ___ not like coffee.', 'does', ['do', 'is', 'am']],
  ['The children ___ sleeping.', 'were', ['is', 'am', 'has']],
  ['By this time tomorrow, I ___ completed the work.', 'will have', ['have', 'had', 'has']],
  ['She ___ her keys somewhere in the house.', 'has lost', ['lose', 'losing', 'losted']],
  ['If it rains, we ___ not go out.', 'will', ['would', 'are', 'did']],
  ['He has been working here ___ ten years.', 'for', ['since', 'at', 'from']],
  ['The train had already left when we ___ the station.', 'reached', ['reach', 'reaches', 'reaching']],
  ['I look forward to ___ you again.', 'meeting', ['meet', 'met', 'meets']],
  ['Neither of the boys ___ present.', 'was', ['were', 'are', 'is']],

  ['She ___ her work before the guests arrived.', 'had finished', ['has finished', 'finishes', 'will finish']],
  ['We ___ each other for ages.', 'have known', ['know', 'knew', 'are knowing']],
  ['The scientist ___ a new discovery last year.', 'made', ['makes', 'make', 'will make']],
  ['He prefers tea ___ coffee.', 'to', ['from', 'than', 'over']],
  ['The injured man ___ to hospital soon.', 'was taken', ['is taking', 'taken', 'has take']],
  ['She asked me where I ___ from.', 'came', ['come', 'comes', 'coming']],
  ['Hardly had he arrived ___ it began to rain.', 'when', ['than', 'then', 'that']],
  ['He is senior ___ me in the department.', 'to', ['than', 'from', 'of']],
  ['The committee ___ issued its report.', 'has', ['have', 'were', 'are']],
  ['Each of the students ___ given a book.', 'was', ['were', 'are', 'have']],
  ['No sooner did he speak ___ everyone clapped.', 'than', ['then', 'when', 'and']],
  ['She behaves as if she ___ the chief.', 'were', ['was', 'is', 'be']],
  ['It is high time we ___ home.', 'went', ['go', 'goes', 'had gone']],
  ['He said that he ___ back the next day.', 'would come', ['will come', 'comes', 'came']],
]

const NOT_BELONG = [
  ['happy', 'joyful', 'cheerful', 'melancholy'],
  ['brave', 'courageous', 'fearless', 'cowardly'],
  ['large', 'huge', 'enormous', 'tiny'],
  ['rapid', 'swift', 'quick', 'slow'],
  ['silent', 'quiet', 'noiseless', 'loud'],
  ['polite', 'courteous', 'civil', 'rude'],
  ['rich', 'wealthy', 'affluent', 'poor'],
  ['clever', 'intelligent', 'smart', 'dull'],
  ['cold', 'chilly', 'freezing', 'boiling'],
  ['dark', 'dim', 'gloomy', 'bright'],
  ['wet', 'damp', 'moist', 'dry'],
  ['strong', 'powerful', 'mighty', 'weak'],
  ['ancient', 'old', 'antique', 'new'],
  ['beautiful', 'pretty', 'lovely', 'ugly'],
  ['thin', 'slim', 'slender', 'fat'],
]

export function generateEnglish(seed, target = 1000) {
  const r = mulberry32(seed)
  const map = new Map()
  const add = (qq) => {
    if (qq && qq.options.length === 4 && new Set(qq.options).size === 4 && !map.has(qq.text)) map.set(qq.text, qq)
  }

  const vocabPool = SYN_ANT.flatMap(([w, s, a]) => [w, s, a])
  const fence = (pool) => pool.filter(Boolean)

  // synonyms
  for (const [w, s] of SYN_ANT) {
    const dis = fence(shuffle(r, vocabPool).filter((x) => x !== s && x !== w)).slice(0, 3)
    const opts = shuffle(r, [s, ...dis])
    add(q(r, { cat: 'english', text: `Choose the word most similar in meaning to "${w}".`, options: opts, correctIndex: opts.indexOf(s), explanation: `${w} means ${s}.` }))
  }
  // antonyms
  for (const [w, s, a] of SYN_ANT) {
    const dis = fence(shuffle(r, vocabPool).filter((x) => x !== a && x !== w)).slice(0, 3)
    const opts = shuffle(r, [a, ...dis])
    add(q(r, { cat: 'english', text: `Choose the word opposite in meaning to "${w}".`, options: opts, correctIndex: opts.indexOf(a), explanation: `${w} is opposite of ${a}.` }))
  }
  // fill synonym
  for (const [w, s] of SYN_ANT.slice(0, 40)) {
    const dis = fence(shuffle(r, vocabPool).filter((x) => x !== s)).slice(0, 3)
    const opts = shuffle(r, [s, ...dis])
    add(q(r, { cat: 'english', text: `He is known for his ${w} nature, that is, he is very ___.`, options: opts, correctIndex: opts.indexOf(s), explanation: `${w} = ${s}.` }))
  }

  // idioms
  for (const [idiom, mean] of IDIOMS) {
    const dis = fence(shuffle(r, IDIOMS.map((x) => x[1])).filter((x) => x !== mean)).slice(0, 3)
    const opts = shuffle(r, [mean, ...dis])
    add(q(r, { cat: 'english', text: `What does the idiom "${idiom}" mean?`, options: opts, correctIndex: opts.indexOf(mean), explanation: `"${idiom}" means "${mean}".` }))
  }

  // one-word substitution
  for (const [phr, word] of ONE_WORD) {
    const dis = fence(shuffle(r, ONE_WORD.map((x) => x[1])).filter((x) => x !== word)).slice(0, 3)
    const opts = shuffle(r, [word, ...dis])
    add(q(r, { cat: 'english', text: `Give one word for: "${phr}".`, options: opts, correctIndex: opts.indexOf(word), explanation: `The term for "${phr}" is "${word}".` }))
  }

  // prepositions
  for (const [sent, c, disProp] of PREPS) {
    const opts = shuffle(r, [c, ...disProp])
    add(q(r, { cat: 'english', text: `Fill in the blank: ${sent}`, options: opts, correctIndex: opts.indexOf(c), explanation: `The correct preposition here is "${c}".` }))
  }

  // spelling
  const spellSeen = new Set()
  for (const w of SPELL) {
    if (spellSeen.has(w)) continue
    spellSeen.add(w)
    const bad = typos(r, w)
    if (bad.length < 3) continue
    const opts = shuffle(r, [w, ...bad])
    add(q(r, { cat: 'english', text: `Choose the correctly spelt word.`, options: opts, correctIndex: opts.indexOf(w), explanation: `The correct spelling is "${w}".` }))
  }

  // plurals irregular
  for (const w of IRREGULAR) {
    const fake = shuffle(r, [w + 's', w + 'es', w.slice(0, -2) + 'a', w.slice(0, -1) + 'ii', w.replace(/is$/, 'es')]).slice(0, 3)
    const correct = w === 'criterion' ? 'criteria' : w === 'datum' ? 'data' : w === 'phenomenon' ? 'phenomena' : w === 'analysis' ? 'analyses' : w === 'basis' ? 'bases' : w === 'crisis' ? 'crises' : w === 'thesis' ? 'theses' : w === 'parenthesis' ? 'parentheses' : w === 'ellipsis' ? 'ellipses' : w === 'axis' ? 'axes' : w === 'alumnus' ? 'alumni' : w === 'cactus' ? 'cacti' : w === 'nucleus' ? 'nuclei' : w === 'focus' ? 'foci' : w === 'radius' ? 'radii' : w === 'memorandum' ? 'memoranda' : w === 'curriculum' ? 'curricula' : w === 'medium' ? 'media' : w === 'bacterium' ? 'bacteria' : 'stimuli'
    const opts = shuffle(r, [...new Set([correct, ...fake])])
    if (opts.length !== 4) continue
    add(q(r, { cat: 'english', text: `What is the plural of "${w}"?`, options: opts, correctIndex: opts.indexOf(correct), explanation: `The plural of "${w}" is "${correct}".` }))
  }
  for (const [s, pl] of RULE_PLURALS) {
    const bads = shuffle(r, [pl + 'es', s + 'ies', s + 's', pl + ' a', pl + 'en']).slice(0, 3)
    const opts = shuffle(r, [...new Set([pl, ...bads])])
    if (opts.length !== 4) continue
    add(q(r, { cat: 'english', text: `What is the plural of "${s}"?`, options: opts, correctIndex: opts.indexOf(pl), explanation: `The plural of "${s}" is "${pl}".` }))
  }

  // passive voice
  const subj = ['Ram', 'The chef', 'The workers', 'The teacher', 'The gardener']
  const obj = ['a letter', 'the meal', 'the bridge', 'the answer', 'the plants', 'the ball', 'the song', 'the problem']
  let vc = 0
  for (const [v, past, pp] of PASSIVE_VERB) {
    const t = pick(r, obj)
    const S = pick(r, subj)
    const form = vc % 3
    let text, correct, opts
    if (form === 0) {
      text = `Convert to passive voice: "${S} ${v}s ${t}."`
      correct = `${cap(t)} is ${pp} by ${S}.`
      const bads = [t + ' is ' + past + ' by ' + S + '.', t + ' was ' + pp + ' by ' + S + '.', t + ' has ' + pp + ' by ' + S + '.']
      opts = shuffle(r, [correct, ...new Set(bads)])
    } else if (form === 1) {
      text = `Convert to passive voice: "${S} ${v}s ${t}."`
      const c2 = `${cap(t)} is ${pp} by ${S}.`
      const bads = [t + ' was ' + pp + ' by ' + S + '.', t + ' is ' + past + ' by ' + S + '.', t + ' were ' + pp + ' by ' + S + '.']
      opts = shuffle(r, [c2, ...new Set(bads)])
      correct = c2
    } else {
      text = `Convert to passive voice: "${S} ${past} ${t}."`
      correct = `${cap(t)} was ${pp} by ${S}.`
      const bads = [t + ' is ' + pp + ' by ' + S + '.', t + ' was ' + past + ' by ' + S + '.', t + ' were ' + pp + ' by ' + S + '.']
      opts = shuffle(r, [correct, ...new Set(bads)])
    }
    if (opts.length === 4) add(q(r, { cat: 'english', text, options: opts, correctIndex: opts.indexOf(correct), explanation: `Passive construction uses the past participle "${pp}".` }))
    vc++
  }

  // grammar fill
  for (const [sent, c, dis] of GRAMMAR_FILL) {
    const opts = shuffle(r, [c, ...dis])
    add(q(r, { cat: 'english', text: `Fill in the blank: ${sent}`, options: opts, correctIndex: opts.indexOf(c), explanation: `The correct option is "${c}".` }))
  }

  // not-belong
  for (const grp of NOT_BELONG) {
    const opts = grp
    const odd = opts[3]
    add(q(r, { cat: 'english', text: `Which word does NOT belong to the group?`, options: opts, correctIndex: opts.indexOf(odd), explanation: `${odd} is the odd one out; the others mean the same thing.` }))
  }

  // opposite analogies: A : antonym(A) :: B : ?
  const antPairs = SYN_ANT
  for (let i = 0; i < antPairs.length; i++) {
    const [a1, , a2] = antPairs[i]
    for (let j = 0; j < antPairs.length; j++) {
      if (j === i) continue
      const [b1, , b2] = antPairs[j]
      const dis = fence(shuffle(r, antPairs.map((x) => x[2])).filter((x) => x !== b2)).slice(0, 3)
      const opts = shuffle(r, [b2, ...dis])
      add(q(r, {
        cat: 'english',
        text: `${a1} : ${a2} :: ${b1} : ?`,
        options: opts,
        correctIndex: opts.indexOf(b2),
        explanation: `${a1} is the opposite of ${a2}; so the opposite of ${b1} is ${b2}.`,
      }))
    }
  }

  // synonym analogies: A : synonym(A) :: B : ?
  for (let i = 0; i < antPairs.length; i++) {
    const [a1, a1s] = antPairs[i]
    for (let j = 0; j < antPairs.length; j++) {
      if (j === i) continue
      const [b1, b1s] = antPairs[j]
      const dis = fence(shuffle(r, antPairs.map((x) => x[1])).filter((x) => x !== b1s)).slice(0, 3)
      const opts = shuffle(r, [b1s, ...dis])
      add(q(r, {
        cat: 'english',
        text: `${a1} : ${a1s} :: ${b1} : ?`,
        options: opts,
        correctIndex: opts.indexOf(b1s),
        explanation: `${a1s} is a synonym of ${a1}; so the synonym of ${b1} is ${b1s}.`,
      }))
    }
  }

  // anagram unscramble
  const anagramWords = [...new Set([...ONE_WORD.map((x) => x[1]).filter((x) => x.length > 3 && x.length < 9), ...SPELL.filter((x) => x.length > 3 && x.length < 9)])]
  for (const w of anagramWords) {
    let scrambled = shuffle(r, w.split('')).join('')
    let guard = 0
    while (scrambled === w && guard++ < 20) scrambled = shuffle(r, w.split('')).join('')
    const dis = fence(shuffle(r, anagramWords).filter((x) => x !== w)).slice(0, 3)
    const opts = shuffle(r, [w, ...dis])
    add(q(r, {
      cat: 'english',
      text: `Arrange the letters to form a meaningful English word: ${scrambled.toUpperCase()}`,
      options: opts,
      correctIndex: opts.indexOf(w),
      explanation: `The word is "${w}".`,
    }))
  }

  return [...map.values()].map((qq, i) => ({ id: `ge${i}_${seed}`, ...qq }))
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}