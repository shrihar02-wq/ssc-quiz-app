export const SUBJECTS = [
  {
    id: 'history',
    name: 'History',
    emoji: '🏛️',
    color: '#b91c1c',
    blurb: 'Ancient, Medieval & Modern India',
  },
  {
    id: 'polity',
    name: 'Polity & Constitution',
    emoji: '⚖️',
    color: '#1d4ed8',
    blurb: 'Constitution, Fundamental Rights, Govt',
  },
  {
    id: 'geography',
    name: 'Geography',
    emoji: '🌍',
    color: '#15803d',
    blurb: 'Physical, Indian & World Geography',
  },
  {
    id: 'economy',
    name: 'Economy',
    emoji: '📊',
    color: '#b45309',
    blurb: 'Indian Economy, Banking & Budget',
  },
  {
    id: 'science',
    name: 'General Science',
    emoji: '🔬',
    color: '#0e7490',
    blurb: 'Physics, Chemistry & Biology',
  },
  {
    id: 'static-gk',
    name: 'Static GK',
    emoji: '📚',
    color: '#6d28d9',
    blurb: 'Awards, Books, Sports & More',
  },
  {
    id: 'reasoning',
    name: 'Reasoning',
    emoji: '🧠',
    color: '#a21caf',
    blurb: 'Series, Analogies, Logic & Blood Relations',
  },
  {
    id: 'quant',
    name: 'Quantitative Aptitude',
    emoji: '🔢',
    color: '#065f46',
    blurb: 'Arithmetic, Percentages & Averages',
  },
  {
    id: 'english',
    name: 'English',
    emoji: '✍️',
    color: '#be123c',
    blurb: 'Vocabulary, Grammar & Comprehension',
  },
]

export const CATEGORY = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]))

const MOCK_EVENLY = SUBJECTS.filter((s) => s.id !== 'english') // mock tests focus on non-English sections

export const QUESTIONS = [
  // ---------------- HISTORY ----------------
  { id: 'h1', cat: 'history', text: 'The Jallianwala Bagh massacre took place in which year?', options: ['1917', '1919', '1921', '1923'], answer: 1, explanation: 'The massacre happened on 13 April 1919 in Amritsar under General Dyer.' },
  { id: 'h2', cat: 'history', text: 'Who founded the Indian National Congress in 1885?', options: ['Dadabhai Naoroji', 'Bal Gangadhar Tilak', 'A.O. Hume', 'W.C. Bonnerjee'], answer: 2, explanation: 'A.O. Hume, a retired British civil servant, founded the INC; W.C. Bonnerjee was its first president.' },
  { id: 'h3', cat: 'history', text: 'The Quit India Movement was launched in which year?', options: ['1930', '1935', '1940', '1942'], answer: 3, explanation: 'It was launched by Mahatma Gandhi on 8 August 1942 during the Second World War.' },
  { id: 'h4', cat: 'history', text: 'The first Battle of Panipat was fought between Babur and which ruler?', options: ['Rana Sanga', 'Ibrahim Lodi', 'Sher Shah Suri', 'Hemu'], answer: 1, explanation: 'In 1526 Babur defeated Ibrahim Lodi, founding the Mughal Empire in India.' },
  { id: 'h5', cat: 'history', text: 'The Dandi March or Salt Satyagraha was undertaken in which year?', options: ['1928', '1929', '1930', '1931'], answer: 2, explanation: 'Gandhiji marched from Sabarmati to Dandi in March-April 1930 to break the salt law.' },
  { id: 'h6', cat: 'history', text: 'Who was the first Governor-General of independent India?', options: ['C. Rajagopalachari', 'Lord Mountbatten', 'Lord Canning', 'Rajendra Prasad'], answer: 1, explanation: 'Lord Mountbatten served from 1947 to 1948; C. Rajagopalachari was the first Indian Governor-General.' },
  { id: 'h7', cat: 'history', text: 'The Kalinga War, after which Ashoka embraced Buddhism, was fought in which year (BCE)?', options: ['321', '305', '261', '232'], answer: 2, explanation: 'The Kalinga War (c. 261 BCE) deeply affected Ashoka and led to his conversion to Buddhism.' },
  { id: 'h8', cat: 'history', text: 'The Battle of Plassey (1757) was fought between the East India Company and whom?', options: ['Tipu Sultan', 'Siraj-ud-Daulah', 'Shah Alam II', 'Mir Qasim'], answer: 1, explanation: 'Robert Clive defeated Nawab Siraj-ud-Daulah of Bengal in 1757, aided by Mir Jafar\'s betrayal.' },
  { id: 'h9', cat: 'history', text: 'The capital of India was shifted from Calcutta to Delhi in which year?', options: ['1905', '1911', '1919', '1931'], answer: 1, explanation: 'It was announced at the Delhi Durbar of December 1911 by King George V.' },
  { id: 'h10', cat: 'history', text: 'Who founded the Arya Samaj in 1875?', options: ['Swami Vivekananda', 'Raja Ram Mohan Roy', 'Swami Dayanand Saraswati', 'Dayananda... none'], answer: 2, explanation: 'Swami Dayanand Saraswati founded the Arya Samaj to reform Hindu society.' },
  { id: 'h11', cat: 'history', text: 'The partition of Bengal in 1905 was carried out during the tenure of which Viceroy?', options: ['Lord Curzon', 'Lord Ripon', 'Lord Minto', 'Lord Hardinge'], answer: 0, explanation: 'Lord Curzon partitioned Bengal in 1905, which sparked the Swadeshi Movement.' },
  { id: 'h12', cat: 'history', text: 'The Non-Cooperation Movement was launched by Gandhiji in which year?', options: ['1919', '1920', '1922', '1925'], answer: 1, explanation: 'It was launched in 1920 and suspended in 1922 after the Chauri Chaura incident.' },
  { id: 'h13', cat: 'history', text: 'Mohenjo-daro, a major Harappan site, is located in which present-day region?', options: ['Gujarat, India', 'Punjab, India', 'Sindh, Pakistan', 'Rajasthan, India'], answer: 2, explanation: 'Mohenjo-daro, an Indus Valley (Harappan) Civilisation site, lies in Sindh, Pakistan.' },
  { id: 'h14', cat: 'history', text: 'Which Mughal emperor built the Taj Mahal?', options: ['Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'], answer: 2, explanation: 'Shah Jahan built the Taj Mahal (1632-1653) in memory of his wife Mumtaz Mahal.' },
  { id: 'h15', cat: 'history', text: 'The Simon Commission, which met with nationwide protest, visited India in which year?', options: ['1928', '1930', '1932', '1935'], answer: 0, explanation: 'The all-British Simon Commission arrived in 1928 and faced the "Simon Go Back" protests.' },
  { id: 'h16', cat: 'history', text: 'Home Rule League was founded by Bal Gangadhar Tilak and whom?', options: ['Gopal Krishna Gokhale', 'Annie Besant', 'Lala Lajpat Rai', 'Subhas Chandra Bose'], answer: 1, explanation: 'Tilak founded one Home Rule League in 1916 and Annie Besant founded another.' },

  // ---------------- POLITY ----------------
  { id: 'p1', cat: 'polity', text: 'The Fundamental Rights in the Indian Constitution are borrowed from which country?', options: ['United Kingdom', 'USA', 'Ireland', 'Canada'], answer: 1, explanation: 'Fundamental Rights (Bill of Rights) were borrowed from the USA.' },
  { id: 'p2', cat: 'polity', text: 'The Directive Principles of State Policy are borrowed from which country?', options: ['USA', 'Australia', 'Ireland', 'France'], answer: 2, explanation: 'Directive Principles (Part IV) are drawn from the Irish Constitution.' },
  { id: 'p3', cat: 'polity', text: 'The Right to Equality is enshrined in which Articles?', options: ['Articles 14-18', 'Articles 19-22', 'Articles 23-24', 'Articles 25-28'], answer: 0, explanation: 'Right to Equality covers Articles 14 to 18 of the Constitution.' },
  { id: 'p4', cat: 'polity', text: 'Who appoints the Chief Justice of India?', options: ['Prime Minister', 'Parliament', 'President of India', 'Law Minister'], answer: 2, explanation: 'The President of India appoints the Chief Justice and other judges of the Supreme Court.' },
  { id: 'p5', cat: 'polity', text: 'The minimum age for election as President of India is?', options: ['30 years', '35 years', '40 years', '25 years'], answer: 1, explanation: 'Article 58 requires the President to be at least 35 years of age.' },
  { id: 'p6', cat: 'polity', text: 'The maximum strength of the Rajya Sabha is?', options: ['238', '245', '250', '255'], answer: 2, explanation: 'The Rajya Sabha can have a maximum of 250 members (238 elected + 12 nominated).' },
  { id: 'p7', cat: 'polity', text: 'The President\'s Rule under Article 356 can be imposed for a maximum initial period of?', options: ['3 months', '6 months', '1 year', '2 years'], answer: 1, explanation: 'Initially for 6 months; it can be extended up to 3 years with parliamentary approval.' },
  { id: 'p8', cat: 'polity', text: 'The procedure for amending the Constitution is given in which Article?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 368'], answer: 3, explanation: 'Article 368 lays down the amendment procedure.' },
  { id: 'p9', cat: 'polity', text: 'How many Anglo-Indian members could be nominated by the President to the Lok Sabha (before abolition)?', options: ['1', '2', '3', '4'], answer: 1, explanation: 'Article 331 allowed up to 2 Anglo-Indian members; the provision was later removed in 2019.' },
  { id: 'p10', cat: 'polity', text: 'A National Emergency under the Constitution is proclaimed under which Article?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 365'], answer: 0, explanation: 'National emergency (Article 352) can be declared on grounds of war, external aggression or armed rebellion.' },
  { id: 'p11', cat: 'polity', text: 'The Indian Constitution was adopted on?', options: ['26 January 1950', '26 November 1949', '15 August 1947', '26 November 1950'], answer: 1, explanation: 'Adopted on 26 November 1949 and it commenced on 26 January 1950.' },
  { id: 'p12', cat: 'polity', text: 'Panchayati Raj was given constitutional status by which Amendment?', options: ['71st', '72nd', '73rd', '74th'], answer: 2, explanation: 'The 73rd Amendment (1992) constitutionalised rural local self-government (Panchayats).' },
  { id: 'p13', cat: 'polity', text: 'Which of the following is a Fundamental Duty?', options: ['Right to work', 'Right to education', 'Protecting the environment', 'Right to property'], answer: 2, explanation: 'One of the Fundamental Duties (Article 51A) is to protect and improve the natural environment.' },
  { id: 'p14', cat: 'polity', text: 'The Right to Information (RTI) Act was enacted in which year?', options: ['2002', '2005', '2008', '2010'], answer: 1, explanation: 'The RTI Act, 2005 gives citizens the right to access information held by public authorities.' },
  { id: 'p15', cat: 'polity', text: 'Who is the final authority for interpreting the Constitution?', options: ['The President', 'The Parliament', 'The Supreme Court', 'The Attorney General'], answer: 2, explanation: 'The Supreme Court is the final interpreter and guardian of the Constitution.' },
  { id: 'p16', cat: 'polity', text: 'Financial Emergency is proclaimed under which Article?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 368'], answer: 2, explanation: 'Financial Emergency is provided for under Article 360 of the Constitution.' },

  // ---------------- GEOGRAPHY ----------------
  { id: 'g1', cat: 'geography', text: 'The Tropic of Cancer passes through how many states of India?', options: ['6', '7', '8', '9'], answer: 2, explanation: 'It passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura and Mizoram.' },
  { id: 'g2', cat: 'geography', text: 'The longest river of India is?', options: ['Godavari', 'Yamuna', 'Ganga', 'Brahmaputra'], answer: 2, explanation: 'The Ganga (Ganges), about 2,525 km long, is the longest river flowing through India.' },
  { id: 'g3', cat: 'geography', text: 'The highest mountain peak located in India is?', options: ['Mount Everest', 'K2 (Godwin Austen)', 'Kangchenjunga', 'Nanda Devi'], answer: 1, explanation: 'K2 (8,611 m), entirely within Indian-administered territory, is India\'s highest peak.' },
  { id: 'g4', cat: 'geography', text: 'Largest state of India by area is?', options: ['Madhya Pradesh', 'Uttar Pradesh', 'Maharashtra', 'Rajasthan'], answer: 3, explanation: 'Rajasthan is the largest Indian state by area (about 342,239 sq km).' },
  { id: 'g5', cat: 'geography', text: 'The Sardar Sarovar Dam is built across which river?', options: ['Godavari', 'Narmada', 'Tapi', 'Krishna'], answer: 1, explanation: 'The Sardar Sarovar Dam is built on the Narmada river in Gujarat.' },
  { id: 'g6', cat: 'geography', text: 'The Nilgiri Hills form the meeting point of which mountain ranges?', options: ['Himalayas and Vindhyas', 'Western and Eastern Ghats', 'Aravallis and Satpura', 'Western and Eastern Himalayas'], answer: 1, explanation: 'The Nilgiris join the Western Ghats and Eastern Ghats in Tamil Nadu/Kerala/Karnataka.' },
  { id: 'g7', cat: 'geography', text: 'The Standard Meridian of India is?', options: ['82°30\'E', '80°00\'E', '85°00\'E', '75°30\'E'], answer: 0, explanation: 'IST is based on the 82.5°E meridian, passing near Allahabad (Prayagraj).' },
  { id: 'g8', cat: 'geography', text: 'The river known as the "Sorrow of Bengal" is?', options: ['Hooghly', 'Damodar', 'Teesta', 'Mahananda'], answer: 1, explanation: 'The Damodar, prone to floods, is called the "Sorrow of Bengal".' },
  { id: 'g9', cat: 'geography', text: 'Majuli, the largest river island in the world, is located in which state?', options: ['West Bengal', 'Bihar', 'Assam', 'Odisha'], answer: 2, explanation: 'Majuli (Assam) is a river island in the Brahmaputra.' },
  { id: 'g10', cat: 'geography', text: 'The highest waterfall in India is?', options: ['Jog Falls', 'Kunchikal Falls', 'Shivanasamudra', 'Dudhsagar'], answer: 0, explanation: 'Jog Falls (Sharavati river, Karnataka) is India\'s highest single-drop waterfall.' },
  { id: 'g11', cat: 'geography', text: 'Which Indian state has the longest coastline?', options: ['Tamil Nadu', 'Andhra Pradesh', 'Maharashtra', 'Gujarat'], answer: 3, explanation: 'Gujarat has the longest coastline (~1,600 km) among Indian states.' },
  { id: 'g12', cat: 'geography', text: 'Chilika Lake, the largest brackish-water lagoon in India, is in which state?', options: ['Kerala', 'Odisha', 'Andhra Pradesh', 'Tamil Nadu'], answer: 1, explanation: 'Chilika Lake is a large brackish water lagoon on the coast of Odisha.' },
  { id: 'g13', cat: 'geography', text: 'The southernmost point of India (in the Indian mainland) is?', options: ['Indira Point', 'Kanyakumari', 'Rameswaram', 'Pondicherry'], answer: 1, explanation: 'Kanyakumari is the southernmost point of mainland India; Indira Point is on Great Nicobar.' },
  { id: 'g14', cat: 'geography', text: 'The Thar Desert is mainly located in which state?', options: ['Gujarat', 'Punjab', 'Rajasthan', 'Haryana'], answer: 2, explanation: 'The Thar (Great Indian) Desert spans western Rajasthan.' },
  { id: 'g15', cat: 'geography', text: 'Natural deep-water harbour of India on the west coast is?', options: ['Kandla', 'Mumbai', 'Marmugao', 'Kochi'], answer: 1, explanation: 'Mumbai is India\'s largest natural deep-water harbour.' },
  { id: 'g16', cat: 'geography', text: 'The Andaman and Nicobar Islands are separated from Myanmar by which water body?', options: ['Gulf of Mannar', 'Ten-degree Channel', 'Palk Strait', 'Bay of Bengal... exact'], answer: 1, explanation: 'The Ten Degree Channel separates the Andamans and Nicobars; the islands lie near Myanmar\'s coast in the Bay of Bengal.' },

  // ---------------- ECONOMY ----------------
  { id: 'e1', cat: 'economy', text: 'NITI Aayog replaced which body in 2015?', options: ['Finance Commission', 'Planning Commission', 'Election Commission', 'National Development Council'], answer: 1, explanation: 'The Planning Commission was replaced by the NITI Aayog (National Institution for Transforming India) in 2015.' },
  { id: 'e2', cat: 'economy', text: 'The Reserve Bank of India was established in which year?', options: ['1930', '1935', '1947', '1949'], answer: 1, explanation: 'RBI was established on 1 April 1935 under the RBI Act, 1934; it was nationalised in 1949.' },
  { id: 'e3', cat: 'economy', text: 'GST (Goods and Services Tax) Council is chaired by?', options: ['Finance Minister of India', 'Governor of RBI', 'President of India', 'Commerce Minister'], answer: 0, explanation: 'The GST Council is chaired by the Union Finance Minister.' },
  { id: 'e4', cat: 'economy', text: 'The repo rate is the rate at which?', options: ['Banks keep deposits with RBI', 'RBI lends short-term funds to banks', 'Banks lend to customers', 'Government borrows from banks'], answer: 1, explanation: 'Repo rate is the rate at which RBI lends short-term funds to commercial banks against securities.' },
  { id: 'e5', cat: 'economy', text: 'Which of the following is an indirect tax?', options: ['Income tax', 'GST', 'Wealth tax', 'Corporation tax'], answer: 1, explanation: 'GST is an indirect tax; income, wealth and corporation tax are direct taxes.' },
  { id: 'e6', cat: 'economy', text: 'Who is regarded as the father of the Green Revolution in India?', options: ['Verghese Kurien', 'M.S. Swaminathan', 'Norman Borlaug', 'C. Subramaniam'], answer: 1, explanation: 'Dr. M.S. Swaminathan led India\'s Green Revolution in the 1960s.' },
  { id: 'e7', cat: 'economy', text: 'The headquarters of the Reserve Bank of India is at?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], answer: 1, explanation: 'RBI\'s central headquarters is in Mumbai, Maharashtra.' },
  { id: 'e8', cat: 'economy', text: 'The first Five Year Plan of India was based on which model?', options: ['Mahalanobis model', 'Harrod-Domar model', 'Lewis model', 'Rostow model'], answer: 1, explanation: 'The First Five Year Plan (1951-56) was based on the Harrod-Domar growth model.' },
  { id: 'e9', cat: 'economy', text: 'Which institution is the apex regulatory body of the Indian money market?', options: ['SEBI', 'NITI Aayog', 'Reserve Bank of India', 'NABARD'], answer: 2, explanation: 'RBI is the apex regulator of the money market, while regulators SEBI regulate securities.' },
  { id: 'e10', cat: 'economy', text: 'Gini coefficient is a measure of?', options: ['Poverty', 'Inflation', 'Income inequality', 'Unemployment'], answer: 2, explanation: 'The Gini coefficient measures income/wealth inequality within a distribution.' },
  { id: 'e11', cat: 'economy', text: 'GDP at factor cost excludes which of the following?', options: ['Indirect taxes', 'Wages', 'Profits', 'Rent'], answer: 0, explanation: 'GDP at factor cost excludes indirect taxes and includes subsidies (factor payments).' },
  { id: 'e12', cat: 'economy', text: 'Which of the following is NOT included in the calculation of GDP (to avoid double counting)?', options: ['Final goods', 'Intermediate goods', 'Services', 'Government spending'], answer: 1, explanation: 'Only final goods/services are counted in GDP; intermediate goods would lead to double counting.' },
  { id: 'e13', cat: 'economy', text: 'SEBI was given statutory status in which year?', options: ['1988', '1992', '1995', '1998'], answer: 1, explanation: 'Established in 1988, SEBI became a statutory body in 1992.' },
  { id: 'e14', cat: 'economy', text: 'In the formula GDP = C + I + G + (X - M), what does G represent?', options: ['Gold reserves', 'Government expenditure', 'Gross investment in G-secs', 'GST revenue'], answer: 1, explanation: 'GDP = Consumption + Investment + Government expenditure + Net exports (X - M).' },
  { id: 'e15', cat: 'economy', text: 'The headquarters of the World Bank is located at?', options: ['New York', 'Geneva', 'Washington D.C.', 'London'], answer: 2, explanation: 'The World Bank\'s headquarters is in Washington D.C., USA.' }, // fix apostrophe below
  { id: 'e16', cat: 'economy', text: 'Fiscal deficit means?', options: ['Total expenditure - total receipts excluding borrowings', 'Total revenue - total expenditure', 'Imports - exports', 'Borrowings - repayments'], answer: 0, explanation: 'Fiscal deficit = total expenditure minus total revenue receipts excluding borrowings.' },

  // ---------------- SCIENCE ----------------
  { id: 's1', cat: 'science', text: 'The chemical name of common salt is?', options: ['Sodium carbonate', 'Sodium chloride', 'Sodium bicarbonate', 'Sodium sulphate'], answer: 1, explanation: 'Common salt is sodium chloride (NaCl).' },
  { id: 's2', cat: 'science', text: 'Which gas is filled in electric bulbs?', options: ['Oxygen', 'Hydrogen', 'Argon', 'Carbon dioxide'], answer: 2, explanation: 'Argon, an inert gas, is used in bulbs to prevent the filament from oxidising.' },
  { id: 's3', cat: 'science', text: 'The human heart has how many chambers?', options: ['2', '3', '4', '5'], answer: 2, explanation: 'The human heart has four chambers: two atria and two ventricles.' },
  { id: 's4', cat: 'science', text: 'The energy currency of the cell is?', options: ['NADPH', 'Glucose', 'ATP', 'DNA'], answer: 2, explanation: 'ATP (adenosine triphosphate) is the energy currency of the cell.' },
  { id: 's5', cat: 'science', text: 'The plant cell wall is chiefly made of?', options: ['Protein', 'Cellulose', 'Starch', 'Lignin only'], answer: 1, explanation: 'The plant cell wall is composed mainly of cellulose.' },
  { id: 's6', cat: 'science', text: 'Which vitamin is synthesised in human skin in sunlight?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], answer: 3, explanation: 'Sunlight converts cholesterol in the skin to Vitamin D3.' },
  { id: 's7', cat: 'science', text: 'The SI unit of electric current is?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], answer: 1, explanation: 'Electric current is measured in ampere (A).' },
  { id: 's8', cat: 'science', text: 'The planet nearest to the Sun is?', options: ['Venus', 'Mars', 'Mercury', 'Earth'], answer: 2, explanation: 'Mercury is the closest planet to the Sun.' },
  { id: 's9', cat: 'science', text: 'The most abundant gas in Earth\'s atmosphere is?', options: ['Oxygen', 'Carbon dioxide', 'Argon', 'Nitrogen'], answer: 3, explanation: 'Nitrogen makes up about 78% of the Earth\'s atmosphere.' },
  { id: 's10', cat: 'science', text: 'The pH of pure water at 25°C is?', options: ['0', '5', '7', '14'], answer: 2, explanation: 'Pure water is neutral with pH 7.' },
  { id: 's11', cat: 'science', text: 'The speed of sound in air at room temperature is approximately?', options: ['343 m/s', '300 m/s', '1234 km/h...', '1000 m/s'], answer: 0, explanation: 'Sound travels at about 343 m/s in air at 20°C.' },
  { id: 's12', cat: 'science', text: 'The "powerhouse of the cell" is the?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], answer: 2, explanation: 'Mitochondria generate most of the cell\'s ATP, hence "powerhouse of the cell".' },
  { id: 's13', cat: 'science', text: 'Which vitamin deficiency causes scurvy?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin K'], answer: 2, explanation: 'Vitamin C (ascorbic acid) deficiency causes scurvy.' },
  { id: 's14', cat: 'science', text: 'Water is often called the?', options: ['Oxygen donor', 'Universal solvent', 'Universal acid', 'Neutral base of life'], answer: 1, explanation: 'Water is called the "universal solvent" because it dissolves more substances than any other liquid.' },
  { id: 's15', cat: 'science', text: 'The process by which green plants make their food is called?', options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Digestion'], answer: 2, explanation: 'Photosynthesis converts light energy into chemical energy in plants.' },
  { id: 's16', cat: 'science', text: 'Which instrument is used to measure blood pressure?', options: ['Stethoscope', 'Oscilloscope', 'Barometer', 'Sphygmomanometer'], answer: 3, explanation: 'A sphygmomanometer measures blood pressure.' },

  // ---------------- STATIC GK ----------------
  { id: 'sk1', cat: 'static-gk', text: 'Who was the Chairman of the Drafting Committee of the Indian Constitution?', options: ['Jawaharlal Nehru', 'Dr. B.R. Ambedkar', 'Rajendra Prasad', 'Sardar Patel'], answer: 1, explanation: 'Dr. B.R. Ambedkar chaired the Constituent Assembly\'s Drafting Committee.' },
  { id: 'sk2', cat: 'static-gk', text: 'The book "Gitanjali" was written by?', options: ['R.K. Narayan', 'Sarojini Naidu', 'Rabindranath Tagore', 'Premchand'], answer: 2, explanation: 'Rabindranath Tagore wrote Gitanjali, for which he won the Nobel Prize in 1913.' },
  { id: 'sk3', cat: 'static-gk', text: '"The Discovery of India" was authored by?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Bhagat Singh', 'Bal Gangadhar Tilak'], answer: 1, explanation: 'Jawaharlal Nehru wrote "The Discovery of India" during imprisonment (1942-46).' },
  { id: 'sk4', cat: 'static-gk', text: 'Who was among the first recipients of the Bharat Ratna in 1954?', options: ['Dr. B.R. Ambedkar', 'C. Rajagopalachari', 'Sardar Patel', 'Lal Bahadur Shastri'], answer: 1, explanation: 'The first Bharat Ratna (1954) went to C. Rajagopalachari, C.V. Raman and Sarvapalli Radhakrishnan.' },
  { id: 'sk5', cat: 'static-gk', text: 'The highest civilian award of India is?', options: ['Padma Vibhushan', 'Param Vir Chakra', 'Bharat Ratna', 'Ashoka Chakra'], answer: 2, explanation: 'Bharat Ratna is India\'s highest civilian award; Param Vir Chakra is a military gallantry award.' },
  { id: 'sk6', cat: 'static-gk', text: 'India\'s first satellite launched in 1975 was?', options: ['INSAT-1A', 'Aryabhata', 'Rohini', 'SLV-3'], answer: 1, explanation: 'Aryabhata, India\'s first satellite, was launched by the USSR in 1975.' },
  { id: 'sk7', cat: 'static-gk', text: 'The first Indian to win an individual Olympic gold medal was?', options: ['Milkha Singh', 'Abhinav Bindra', 'Rajyavardhan Rathore', 'Neeraj Chopra'], answer: 1, explanation: 'Abhinav Bindra (shooting, 2008 Beijing) was the first Indian individual Olympic gold medallist.' },
  { id: 'sk8', cat: 'static-gk', text: 'The national aquatic animal of India is?', options: ['Sea Turtle', 'Ganges River Dolphin', 'Whale Shark', 'Crocodile'], answer: 1, explanation: 'The Ganges River Dolphin is India\'s national aquatic animal.' },
  { id: 'sk9', cat: 'static-gk', text: '"Wings of Fire" is an autobiography of?', options: ['Vikram Sarabhai', 'A.P.J. Abdul Kalam', 'Homi Bhabha', 'Verghese Kurien'], answer: 1, explanation: '"Wings of Fire" is the autobiography of Dr. A.P.J. Abdul Kalam.' },
  { id: 'sk10', cat: 'static-gk', text: 'The first Chief of Defence Staff (CDS) of India was?', options: ['Gen. Bikram Singh', 'Gen. Bipin Rawat', 'Adm. Karambir Singh', 'Air Marshal B.S. Dhanoa'], answer: 1, explanation: 'General Bipin Rawat became the first CDS on 1 January 2020.' },
  { id: 'sk11', cat: 'static-gk', text: 'The 2011 ICC Cricket World Cup was won by India; the tournament was hosted by?', options: ['India only', 'India, Sri Lanka and Bangladesh', 'England and India', 'Australia and India'], answer: 1, explanation: 'The 2011 World Cup was co-hosted by India, Sri Lanka and Bangladesh.' },
  { id: 'sk12', cat: 'static-gk', text: 'Padma Awards are announced every year on?', options: ['Independence Day', 'Republic Day', 'Gandhi Jayanti', 'Constitution Day'], answer: 1, explanation: 'Padma Awards are announced each year on Republic Day (26 January).' },
  { id: 'sk13', cat: 'static-gk', text: 'The 1950s "Operation Flood" (White Revolution), the dairy movement, was led by?', options: ['M.S. Swaminathan', 'Verghese Kurien', 'Norman Borlaug', 'C. Subramaniam'], answer: 1, explanation: 'Dr. Verghese Kurien is the architect of Operation Flood / the White Revolution.' },
  { id: 'sk14', cat: 'static-gk', text: 'Who is called the "Missile Woman of India"?', options: ['Kiran Bedi', 'Kalpana Chawla', 'Tessy Thomas', 'N. Valarmathi'], answer: 2, explanation: 'Dr. Tessy Thomas is known as India\'s "Missile Woman" for directing Agni missile projects.' },
  { id: 'sk15', cat: 'static-gk', text: 'The national anthem "Jana Gana Mana" was first adopted in which year?', options: ['1947', '1948', '1950', '1952'], answer: 2, explanation: 'The Constituent Assembly adopted "Jana Gana Mana" as the National Anthem on 24 January 1950.' },
  { id: 'sk16', cat: 'static-gk', text: 'ISRO was established in which year?', options: ['1962', '1969', '1972', '1975'], answer: 1, explanation: 'ISRO was established on 15 August 1969; the Space Commission was formed in 1972.' },

  // ---------------- REASONING ----------------
  { id: 'r1', cat: 'reasoning', text: 'Find the next number in the series: 2, 6, 12, 20, 30, ?', options: ['36', '40', '42', '48'], answer: 2, explanation: 'Differences are +4, +6, +8, +10, so next difference is +12 → 42.' },
  { id: 'r2', cat: 'reasoning', text: 'Find the next number: 1, 1, 2, 3, 5, 8, ?', options: ['11', '12', '13', '15'], answer: 2, explanation: 'Each term is the sum of the previous two (Fibonacci): 5+8 = 13.' },
  { id: 'r3', cat: 'reasoning', text: 'Find the odd one out: 3, 5, 7, 9, 11, 13', options: ['5', '7', '9', '11'], answer: 2, explanation: 'All others are prime numbers; 9 is not prime.' },
  { id: 'r4', cat: 'reasoning', text: 'Complete the series: A, C, F, J, ?', options: ['M', 'N', 'O', 'P'], answer: 2, explanation: 'Letters advance by +2, +3, +4, +5 → J + 5 = O.' },
  { id: 'r5', cat: 'reasoning', text: 'In a certain code CAT is written as DBU. How is DOG written in that code?', options: ['EPH', 'EQH', 'DPH', 'EPI'], answer: 0, explanation: 'Each letter moves +1: D→E, O→P, G→H = EPH.' },
  { id: 'r6', cat: 'reasoning', text: 'Pointing to a man, Ravi says, "He is the only son of my mother." How is the man related to Ravi?', options: ['Brother', 'Father', 'Uncle', 'Ravi himself'], answer: 3, explanation: 'The only son of Ravi\'s mother is Ravi himself.' },
  { id: 'r7', cat: 'reasoning', text: 'Find the next number: 2, 5, 10, 17, 26, ?', options: ['35', '36', '37', '38'], answer: 2, explanation: 'Differences are +3, +5, +7, +9, so next is +11 → 37.' },
  { id: 'r8', cat: 'reasoning', text: 'Book : Publisher :: Film : ?', options: ['Audience', 'Producer', 'Screen', 'Cinema'], answer: 1, explanation: 'A publisher produces a book; a producer makes a film.' },
  { id: 'r9', cat: 'reasoning', text: 'Find the odd one out: Rice, Wheat, Tea, Barley', options: ['Rice', 'Wheat', 'Tea', 'Barley'], answer: 2, explanation: 'Rice, wheat and barley are cereals; tea is not a cereal crop.' },
  { id: 'r10', cat: 'reasoning', text: 'Find the next number: 3, 8, 13, 18, 23, ?', options: ['26', '27', '28', '30'], answer: 2, explanation: 'Each term increases by 5 → 23 + 5 = 28.' },
  { id: 'r11', cat: 'reasoning', text: 'Doctor : Hospital :: Teacher : ?', options: ['Classroom', 'School', 'Student', 'Chalk'], answer: 1, explanation: 'A doctor works in a hospital; a teacher works in a school.' },
  { id: 'r12', cat: 'reasoning', text: 'Find the odd one out: Mercury, Venus, Earth, Jupiter, Moon', options: ['Mercury', 'Jupiter', 'Moon', 'Venus'], answer: 2, explanation: 'The Moon is a satellite; the others are planets.' },
  { id: 'r13', cat: 'reasoning', text: 'If APPLE is written as ELPPA, then how is MANGO written?', options: ['OGNAN', 'OGNAM', 'OGMNA', 'ONAGN'], answer: 0, explanation: 'The letters are reversed: MANGO → OGNAN.' }, // fix below
  { id: 'r14', cat: 'reasoning', text: 'A man faces North. He turns 90° left, then 180° right. Which direction is he facing now?', options: ['North', 'South', 'East', 'West'], answer: 2, explanation: 'North → left is West → 180° right is East.' },
  { id: 'r15', cat: 'reasoning', text: 'What is the angle between the hands of a clock at 3:00?', options: ['60°', '90°', '120°', '180°'], answer: 1, explanation: 'At 3:00 the hour hand is at 3 and minute hand at 12 → 3 × 30° = 90°.' },
  { id: 'r16', cat: 'reasoning', text: 'If in a certain code PEN is written as 16-5-14, then how is ZIP written?', options: ['26-9-16', '26-8-16', '25-9-16', '26-9-15'], answer: 0, explanation: 'Letters are coded by alphabetical position: Z=26, I=9, P=16.' },

  // ---------------- QUANT ----------------
  { id: 'q1', cat: 'quant', text: 'What is 25% of 200?', options: ['25', '40', '50', '75'], answer: 2, explanation: '25% of 200 = (25/100) × 200 = 50.' },
  { id: 'q2', cat: 'quant', text: 'If the price of a product increases from ₹500 to ₹625, the percentage increase is?', options: ['20%', '25%', '30%', '35%'], answer: 1, explanation: 'Increase = 125; (125/500) × 100 = 25%.' },
  { id: 'q3', cat: 'quant', text: 'The average of the first five natural numbers is?', options: ['2.5', '3', '3.5', '4'], answer: 1, explanation: '(1+2+3+4+5)/5 = 15/5 = 3.' },
  { id: 'q4', cat: 'quant', text: 'If 3 pens cost ₹45, what is the cost of 8 pens?', options: ['₹105', '₹110', '₹115', '₹120'], answer: 3, explanation: 'One pen = ₹15; 8 pens = 8 × 15 = ₹120.' },
  { id: 'q5', cat: 'quant', text: '√144 + √81 = ?', options: ['15', '19', '21', '23'], answer: 2, explanation: '12 + 9 = 21.' },
  { id: 'q6', cat: 'quant', text: 'A train covers 120 km in 2 hours. Its speed is?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], answer: 2, explanation: 'Speed = distance/time = 120/2 = 60 km/h.' },
  { id: 'q7', cat: 'quant', text: 'Simple interest on ₹1000 at 5% per annum for 2 years is?', options: ['₹50', '₹100', '₹110', '₹500'], answer: 1, explanation: 'SI = (P×R×T)/100 = (1000×5×2)/100 = ₹100.' },
  { id: 'q8', cat: 'quant', text: 'The LCM of 12 and 18 is?', options: ['6', '24', '36', '72'], answer: 2, explanation: 'Multiples: 36 is the smallest common multiple of 12 and 18.' },
  { id: 'q9', cat: 'quant', text: '15% of a number is 45. The number is?', options: ['200', '250', '300', '400'], answer: 2, explanation: 'Number = 45 × (100/15) = 300.' },
  { id: 'q10', cat: 'quant', text: '2⁵ × 2³ = ?', options: ['2⁸', '2¹⁵', '4⁸', '2⁶'], answer: 0, explanation: 'Same base: add exponents → 2^(5+3) = 2⁸ = 256.' },
  { id: 'q11', cat: 'quant', text: 'The sum of the first 10 natural numbers is?', options: ['45', '50', '55', '60'], answer: 2, explanation: 'n(n+1)/2 = 10×11/2 = 55.' },
  { id: 'q12', cat: 'quant', text: 'A man buys an article for ₹400 and sells it for ₹480. His profit percentage is?', options: ['15%', '18%', '20%', '25%'], answer: 2, explanation: 'Profit = ₹80; (80/400) × 100 = 20%.' },
  { id: 'q13', cat: 'quant', text: 'The next prime number after 19 is?', options: ['21', '23', '25', '27'], answer: 1, explanation: '21 = 3×7, 25 = 5², 27 = 3³; 23 is prime.' },
  { id: 'q14', cat: 'quant', text: 'If a:b = 2:3 and b:c = 4:5, then a:c = ?', options: ['8:15', '2:5', '3:5', '5:8'], answer: 0, explanation: 'a:b = 2:3, b:c = 4:5 → a:c = (2×4):(3×5) = 8:15.' },
  { id: 'q15', cat: 'quant', text: 'The HCF of 24 and 36 is?', options: ['6', '8', '12', '18'], answer: 2, explanation: 'HCF of 24 and 36 is 12.' },
  { id: 'q16', cat: 'quant', text: 'A shopkeeper marks an item at ₹200 and gives a discount of 10%. The selling price is?', options: ['₹180', '₹185', '₹190', '₹195'], answer: 0, explanation: 'Discount = 10% of 200 = ₹20; SP = 200 - 20 = ₹180.' },

  // ---------------- ENGLISH ----------------
  { id: 'n1', cat: 'english', text: 'Choose the synonym of "meticulous".', options: ['Careless', 'Careful', 'Hasty', 'Quick'], answer: 1, explanation: 'Meticulous means showing great attention to detail, i.e. careful.' },
  { id: 'n2', cat: 'english', text: 'Choose the antonym of "abundant".', options: ['Plenty', 'Scarce', 'Lavish', 'Ample'], answer: 1, explanation: 'Abundant = plentiful; its opposite is scarce (insufficient).' },
  { id: 'n3', cat: 'english', text: 'The plural of "criterion" is?', options: ['criterions', 'criterias', 'criteria', 'critaria'], answer: 2, explanation: 'Criterion is of Greek origin; its plural is "criteria".' },
  { id: 'n4', cat: 'english', text: 'Choose the correctly spelt word.', options: ['Accomodation', 'Accommodation', 'Acommodation', 'Accomadation'], answer: 1, explanation: 'The correct spelling is "accommodation" (double c, double m).' },
  { id: 'n5', cat: 'english', text: 'One word for "one who cannot read or write" is?', options: ['Ignorant', 'Illiterate', 'Irrational', 'Foolish'], answer: 1, explanation: 'Illiterate = unable to read or write.' },
  { id: 'n6', cat: 'english', text: 'The idiom "a piece of cake" means?', options: ['A tasty dessert', 'A very easy task', 'A small share', 'An expensive thing'], answer: 1, explanation: '"A piece of cake" describes something very easy to do.' },
  { id: 'n7', cat: 'english', text: 'Fill in the blank: He is good ___ English.', options: ['in', 'on', 'at', 'with'], answer: 2, explanation: 'The correct preposition is "good at" a subject.' },
  { id: 'n8', cat: 'english', text: 'Fill in the blank: She has been living in Delhi ___ 2010.', options: ['for', 'from', 'since', 'during'], answer: 2, explanation: '"Since" is used with a point of time (2010).' },
  { id: 'n9', cat: 'english', text: 'Choose the synonym of "candid".', options: ['Secretive', 'Frank', 'Vague', 'Polite'], answer: 1, explanation: 'Candid means truthful and straightforward, i.e. frank.' },
  { id: 'n10', cat: 'english', text: 'Choose the antonym of "artificial".', options: ['Fake', 'Synthetic', 'Natural', 'Manufactured'], answer: 2, explanation: 'Artificial = made by humans; opposite = natural.' },
  { id: 'n11', cat: 'english', text: 'One word for "a person who loves his country" is?', options: ['Patriot', 'Philanthropist', 'Traitor', 'Nationalist act'], answer: 0, explanation: 'A patriot is a person who loves and supports his country.' },
  { id: 'n12', cat: 'english', text: 'The idiom "to beat around the bush" means?', options: ['To waste time', 'To avoid the main point', 'To work hard', 'To search carefully'], answer: 1, explanation: 'It means avoiding the main topic or speaking evasively.' },
  { id: 'n13', cat: 'english', text: 'Convert to passive voice: "Ram writes a letter."', options: ['A letter wrote by Ram.', 'A letter is written by Ram.', 'A letter was written by Ram.', 'A letter has written Ram.'], answer: 1, explanation: 'Passive of present simple: subject + is/are + past participle → "A letter is written by Ram."' },
  { id: 'n14', cat: 'english', text: 'Fill in the blank: The committee ___ issued its report.', options: ['have', 'has', 'are', 'were'], answer: 1, explanation: '"Committee" is a collective noun used as singular → "has".' },
  { id: 'n15', cat: 'english', text: 'Choose the word opposite in meaning to "ancient".', options: ['Old', 'Historic', 'Modern', 'Medieval'], answer: 2, explanation: 'Ancient = very old; opposite is modern.' },
  { id: 'n16', cat: 'english', text: 'Choose the correctly spelt word.', options: ['Necessarry', 'Neccesary', 'Necessary', 'Neccessary'], answer: 2, explanation: 'The correct spelling is "necessary".' },

  // ---------------- HISTORY (extra) ----------------
  { id: 'h17', cat: 'history', text: 'Who was the first Mughal emperor?', options: ['Humayun', 'Babur', 'Akbar', 'Sher Shah Suri'], answer: 1, explanation: 'Babur founded the Mughal Empire after the Battle of Panipat in 1526.' },
  { id: 'h18', cat: 'history', text: 'Din-i-Ilahi, a new religion, was founded by which emperor?', options: ['Humayun', 'Jahangir', 'Akbar', 'Shah Jahan'], answer: 2, explanation: 'Akbar propagated Din-i-Ilahi in 1582 to foster religious harmony.' },
  { id: 'h19', cat: 'history', text: 'The Qutub Minar was started by which ruler?', options: ['Iltutmish', 'Qutub-ud-din Aibak', 'Alauddin Khilji', 'Balban'], answer: 1, explanation: 'Qutub-ud-din Aibak commenced the Qutub Minar; Iltutmish completed it.' },
  { id: 'h20', cat: 'history', text: 'The Battle of Buxar (1764) was fought between the East India Company and whom?', options: ['Tipu Sultan', 'Mir Jafar', 'Combined forces of Mir Qasim, Shuja-ud-Daula & Shah Alam II', 'Hyder Ali'], answer: 2, explanation: 'In 1764 the Company defeated Mir Qasim, Shuja-ud-Daula and Shah Alam II jointly.' },
  { id: 'h21', cat: 'history', text: 'Who was the first President of the Indian National Congress?', options: ['A.O. Hume', 'W.C. Bonnerjee', 'Dadabhai Naoroji', 'Surendranath Banerjee'], answer: 1, explanation: 'W.C. Bonnerjee presided over the first INC session in Bombay in 1885.' },
  { id: 'h22', cat: 'history', text: 'The Swadeshi Movement was launched in which year?', options: ['1899', '1903', '1905', '1908'], answer: 2, explanation: 'The Swadeshi Movement began in 1905 against the partition of Bengal.' },
  { id: 'h23', cat: 'history', text: 'The Non-Cooperation Movement was withdrawn after which incident?', options: ['Jallianwala Bagh', 'Chauri Chaura', 'Kakori', 'Bardoli'], answer: 1, explanation: 'Gandhiji withdrew it in February 1922 after the Chauri Chaura violence.' },
  { id: 'h24', cat: 'history', text: 'Vande Mataram was composed by whom?', options: ['Rabindranath Tagore', 'Bankim Chandra Chatterjee', 'Sarojini Naidu', 'Subramania Bharati'], answer: 1, explanation: 'Bankim Chandra Chatterjee composed Vande Mataram in Anandamath.' },
  { id: 'h25', cat: 'history', text: 'The Lucknow Pact of 1916 was signed between the Congress and the?', options: ['British Government', 'Muslim League', 'Hindu Mahasabha', 'Justice Party'], answer: 1, explanation: 'It united the Congress and the Muslim League to demand self-government.' },
  { id: 'h26', cat: 'history', text: 'The Rowlatt Act, which provoked nationwide protest, was passed in which year?', options: ['1916', '1919', '1920', '1922'], answer: 1, explanation: 'The Rowlatt Act of 1919 allowed detention without trial, triggering protests.' },
  { id: 'h27', cat: 'history', text: 'Who was the first Prime Minister of independent India?', options: ['Sardar Patel', 'Jawaharlal Nehru', 'Rajendra Prasad', 'Subhas Chandra Bose'], answer: 1, explanation: 'Jawaharlal Nehru became the first Prime Minister on 15 August 1947.' },
  { id: 'h28', cat: 'history', text: 'The Frontier Gandhi, known for non-violence, was?', options: ['Maulana Azad', 'Khan Abdul Ghaffar Khan', 'Rafi Ahmed Kidwai', 'Sardar Patel'], answer: 1, explanation: 'Khan Abdul Ghaffar Khan of the NWFP was called the Frontier Gandhi.' },
  { id: 'h29', cat: 'history', text: 'Who founded the Servants of India Society in 1905?', options: ['Gopal Krishna Gokhale', 'Bal Gangadhar Tilak', 'Lala Lajpat Rai', 'B.G. Kher'], answer: 0, explanation: 'Gopal Krishna Gokhale founded it to train national workers.' },
  { id: 'h30', cat: 'history', text: 'The Delhi Sultan who shifted the capital from Delhi to Daulatabad was?', options: ['Alauddin Khilji', 'Muhammad-bin-Tughlaq', 'Firoz Shah Tughlaq', 'Ibrahim Lodi'], answer: 1, explanation: 'Muhammad-bin-Tughlaq moved the capital to Daulatabad (in the Deccan) around 1327.' },
  { id: 'h31', cat: 'history', text: 'The Raja Raja Chola built the Brihadeeswarar temple at which city?', options: ['Madurai', 'Thanjavur', 'Kanchipuram', 'Rameswaram'], answer: 1, explanation: 'Raja Raja Chola I built the great temple of Thanjavur in the 11th century.' },
  { id: 'h32', cat: 'history', text: 'In the First Battle of Tarain (1191), who defeated Muhammad Ghori?', options: ['Prithviraj Chauhan', 'Jaichand', 'Hemu', 'Bakhtiyar Khilji'], answer: 0, explanation: 'Prithviraj Chauhan defeated Ghori in 1191 but was defeated the next year.' },
  { id: 'h33', cat: 'history', text: 'The Sepoy Mutiny of 1857 first broke out at which place?', options: ['Delhi', 'Meerut', 'Kanpur', 'Lucknow'], answer: 1, explanation: 'It erupted at Meerut on 10 May 1857 and then spread to Delhi and beyond.' },
  { id: 'h34', cat: 'history', text: 'Who was the Mughal emperor in India during the revolt of 1857?', options: ['Bahadur Shah II', 'Akbar II', 'Shah Alam II', 'Jahandar Shah'], answer: 0, explanation: 'Bahadur Shah Zafar (II) was nominally the leader of the 1857 revolt.' },
  { id: 'h35', cat: 'history', text: '"Swaraj is my birthright" is a slogan associated with whom?', options: ['Gandhiji', 'Bal Gangadhar Tilak', 'Subhas Chandra Bose', 'Bhagat Singh'], answer: 1, explanation: 'Tilak coined this electrifying slogan for the masses.' },
  { id: 'h36', cat: 'history', text: 'The historic Dandi March (1930) was undertaken by whom?', options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Subhas Chandra Bose', 'Sardar Patel'], answer: 1, explanation: 'Gandhiji marched to Dandi to break the salt law in 1930.' },
  { id: 'h37', cat: 'history', text: 'The Vedic texts are composed in which language?', options: ['Pali', 'Prakrit', 'Sanskrit', 'Apabhramsa'], answer: 2, explanation: 'The Vedas were composed in Sanskrit by the Aryans.' },
  { id: 'h38', cat: 'history', text: 'The Harappan seals were mainly made of?', options: ['Gold', 'Steatite', 'Bone', 'Ivory'], answer: 1, explanation: 'Most Harappan seals were carved from steatite (soft stone).' },
  { id: 'h39', cat: 'history', text: 'Who was the last Viceroy of British India?', options: ['Lord Wavell', 'Lord Mountbatten', 'C. Rajagopalachari', 'Lord Linlithgow'], answer: 1, explanation: 'Lord Mountbatten, the last Viceroy, oversaw the transfer of power in 1947.' },
  { id: 'h40', cat: 'history', text: 'The Khilafat Movement was led by which brothers?', options: ['Ali brothers', 'Nehru brothers', 'Andrew Yule', 'Shah brothers'], answer: 0, explanation: 'Muhammad Ali and Shaukat Ali led the Khilafat Movement (1919-1922).' },
  { id: 'h41', cat: 'history', text: 'Who was the founder of the Bhoodan (land-gift) Movement?', options: ['Bal Gangadhar Tilak', 'Vinoba Bhave', 'Jayaprakash Narayan', 'Mahatma Gandhi'], answer: 1, explanation: 'Acharya Vinoba Bhave started Bhoodan in 1951 at Pochampally, Telangana.' },
  { id: 'h42', cat: 'history', text: 'The Brihadeeswarar temple is a fine example of which dynasty\'s architecture?', options: ['Pandya', 'Chola', 'Chera', 'Pallava'], answer: 1, explanation: 'The Cholas built magnificent temples, including Thanjavur\'s Brihadeeswarar.' },
  { id: 'h43', cat: 'history', text: 'Maharaja Hari Singh signed the Instrument of Accession of which region to India?', options: ['Hyderabad', 'Jammu & Kashmir', 'Junagarh', 'Mysore'], answer: 1, explanation: 'Hari Singh acceded Jammu & Kashmir to India in October 1947.' },
  { id: 'h44', cat: 'history', text: 'The Pir Panjal tunnel, India\'s longest, is located in which region?', options: ['Arunachal Pradesh', 'Jammu & Kashmir', 'Sikkim', 'Himachal Pradesh'], answer: 1, explanation: 'The 11.2 km Pir Panjal (Banihal) tunnel lies on the Jammu-Srinagar road.' },
  { id: 'h45', cat: 'history', text: 'The Preamble slogan "Inquilab Zindabad" became popular through whom?', options: ['Bhagat Singh', 'Chandrasekhar Azad', 'Ram Prasad Bismil', 'Sukhdev'], answer: 0, explanation: 'Bhagat Singh popularised the slogan "Inquilab Zindabad" (Long live revolution).' },
  { id: 'h46', cat: 'history', text: 'Raja Todar Mal, a minister of Akbar, is best known for?', options: ['Land revenue reforms', 'Military campaigns', 'Building the Taj Mahal', 'Translating the Vedas'], answer: 0, explanation: 'Todar Mal introduced the Dahsala land revenue system.' },
  { id: 'h47', cat: 'history', text: 'Whose tomb is located in the Qutub complex at Delhi\'s Mehrauli?', options: ['Iltutmish', 'Balban', 'Sher Shah Suri', 'Alauddin Khilji'], answer: 0, explanation: 'Iltutmish\'s tomb stands in the Qutub complex, Mehrauli, Delhi.' },
  { id: 'h48', cat: 'history', text: 'The Indian National Army (Azad Hind Fauj) was led during World War II by?', options: ['Rash Behari Bose', 'Subhas Chandra Bose', 'Mohan Singh', 'Chandra Shekhar Azad'], answer: 1, explanation: 'Subhas Chandra Bose reorganized the INA in South-East Asia and proclaimed Azad Hind.' },
  { id: 'h49', cat: 'history', text: 'The famous "Dandi March" of 1930 was undertaken from Sabarmati to?', options: ['Surat', 'Dandi', 'Mumbai', 'Ahmedabad'], answer: 1, explanation: 'Gandhiji marched to Dandi on the Gujarat coast to break the salt law.' },
  { id: 'h50', cat: 'history', text: 'The second Battle of Panipat (1556) was fought between Hemu and?', options: ['Bairam Khan (for Akbar)', 'Humayun', 'Ibrahim Lodi', 'Sher Shah'], answer: 0, explanation: 'Akbar\'s regent Bairam Khan defeated Hemu at Panipat in 1556.' },

  // ---------------- POLITY (extra) ----------------
  { id: 'p17', cat: 'polity', text: 'How many Fundamental Duties are listed in Article 51A?', options: ['8', '9', '10', '11'], answer: 3, explanation: 'There are 11 Fundamental Duties; the 11th was added by the 86th Amendment.' },
  { id: 'p18', cat: 'polity', text: 'Right to Constitutional Remedies flows from which Article?', options: ['Article 21', 'Article 32', 'Article 226', 'Article 300'], answer: 1, explanation: 'Article 32 empowers the Supreme Court to enforce Fundamental Rights (Dr. Ambedkar called it the heart of the Constitution).' },
  { id: 'p19', cat: 'polity', text: 'The term of office of the President of India is?', options: ['4 years', '5 years', '6 years', '7 years'], answer: 1, explanation: 'Article 56 fixes the President\'s term at five years.' },
  { id: 'p20', cat: 'polity', text: 'A Money Bill can be introduced only in?', options: ['Rajya Sabha', 'Lok Sabha', 'Either House', 'Joint Sitting'], answer: 1, explanation: 'Money Bills (Article 110) originate only in the Lok Sabha.' },
  { id: 'p21', cat: 'polity', text: 'The maximum gap between two sessions of Parliament cannot exceed?', options: ['3 months', '6 months', '9 months', '1 year'], answer: 1, explanation: 'Article 85 provides that the gap between sessions must not exceed six months.' },
  { id: 'p22', cat: 'polity', text: 'In a State, the constitutional head of the government is the?', options: ['Chief Minister', 'Governor', 'Speaker', 'Chief Secretary'], answer: 1, explanation: 'The Governor is the constitutional head of the state.' },
  { id: 'p23', cat: 'polity', text: 'Residuary powers of legislation rest with?', options: ['State Governments', 'Union Parliament', 'Concurrent list', 'President'], answer: 1, explanation: 'Article 248 vests residuary powers (matters not in any list) in the Union/Pariament.' },
  { id: 'p24', cat: 'polity', text: 'Fundamental Rights are contained in which Part of the Constitution?', options: ['Part II', 'Part III', 'Part IV', 'Part V'], answer: 1, explanation: 'Part III (Articles 12-35) deals with Fundamental Rights.' },
  { id: 'p25', cat: 'polity', text: 'The ex-officio Chairman of the Rajya Sabha is the?', options: ['President', 'Vice-President', 'Speaker', 'Deputy Chairman'], answer: 1, explanation: 'The Vice-President is the ex-officio Chairman of the Rajya Sabha.' },
  { id: 'p26', cat: 'polity', text: 'The minimum age to become a member of the Lok Sabha is?', options: ['21', '25', '30', '35'], answer: 1, explanation: 'A Lok Sabha member must be at least 25 years old.' },
  { id: 'p27', cat: 'polity', text: 'The minimum age to be appointed Governor of a state is?', options: ['25', '30', '35', '40'], answer: 2, explanation: 'Article 157 requires a Governor to be at least 35 years old.' },
  { id: 'p28', cat: 'polity', text: 'Article 21 guarantees which right?', options: ['Right to property', 'Right to life and personal liberty', 'Right to education', 'Right to equality'], answer: 1, explanation: 'Article 21 protects life and personal liberty.' },
  { id: 'p29', cat: 'polity', text: 'Right to Property was removed from Fundamental Rights by which Amendment?', options: ['24th', '42nd', '44th', '52nd'], answer: 2, explanation: 'The 44th Amendment (1978) made Right to Property a legal right (Article 300A).' },
  { id: 'p30', cat: 'polity', text: 'The President of the Constituent Assembly was?', options: ['Dr. Sachchidananda Sinha', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru', 'Dr. B.R. Ambedkar'], answer: 1, explanation: 'Dr. Rajendra Prasad presided over the Constituent Assembly.' },
  { id: 'p31', cat: 'polity', text: 'Socialist and Secular were added to the Preamble by which Amendment?', options: ['41st', '42nd', '44th', '46th'], answer: 1, explanation: 'The 42nd Amendment (1976) inserted Socialist, Secular and Integrity into the Preamble.' },
  { id: 'p32', cat: 'polity', text: 'The Council of Ministers is collectively responsible to which house?', options: ['Rajya Sabha', 'Lok Sabha', 'The President', 'Both Houses'], answer: 1, explanation: 'Article 75(3) makes the Council of Ministers collectively responsible to the Lok Sabha.' },
  { id: 'p33', cat: 'polity', text: 'The Governor of a state is appointed by whom?', options: ['Chief Minister', 'President of India', 'Prime Minister', 'Chief Justice'], answer: 1, explanation: 'The President appoints the Governor (Article 155).' },
  { id: 'p34', cat: 'polity', text: 'The division of powers between Union and States is given in which Schedule?', options: ['6th', '7th', '8th', '9th'], answer: 1, explanation: 'The 7th Schedule lists the Union, State and Concurrent subjects.' },
  { id: 'p35', cat: 'polity', text: 'Elections to Panchayats are conducted by the?', options: ['Election Commission of India', 'State Election Commission', 'District Magistrate', 'Finance Commission'], answer: 1, explanation: 'The State Election Commission conducts panchayat and municipal elections.' },
  { id: 'p36', cat: 'polity', text: 'Right to Education (Article 21A) was added by which Amendment?', options: ['84th', '86th', '88th', '93rd'], answer: 1, explanation: 'The 86th Amendment (2002) made free and compulsory education for ages 6-14 a Fundamental Right.' },
  { id: 'p37', cat: 'polity', text: 'The Finance Commission is constituted by the President every?', options: ['3 years', '5 years', '6 years', '10 years'], answer: 1, explanation: 'The Finance Commission is appointed every five years under Article 280.' },
  { id: 'p38', cat: 'polity', text: 'The Sarkaria Commission was related to which issue?', options: ['Electoral reforms', 'Centre-State relations', 'Panchayati Raj', 'Language policy'], answer: 1, explanation: 'The Sarkaria Commission examined Centre-State relations (1983).' },
  { id: 'p39', cat: 'polity', text: 'Article 370 gave special status to which region before its abrogation?', options: ['Puducherry', 'Jammu & Kashmir', 'Nagaland', 'Goa'], answer: 1, explanation: 'Article 370 granted special autonomy to Jammu & Kashmir until 5 August 2019.' },
  { id: 'p40', cat: 'polity', text: '"Equal pay for equal work" is a Directive Principle under which Article?', options: ['Article 39', 'Article 43', 'Article 48', 'Article 51'], answer: 0, explanation: 'Article 39(d) asks the State to secure equal pay for equal work.' },
  { id: 'p41', cat: 'polity', text: 'The Chief Election Commissioner of India is appointed by the?', options: ['Prime Minister', 'President', 'Chief Justice', 'Parliament'], answer: 1, explanation: 'The President appoints the Chief Election Commissioner.' },
  { id: 'p42', cat: 'polity', text: 'In the original Constitution, how many Schedules were there?', options: ['6', '8', '10', '12'], answer: 1, explanation: 'The original Constitution had eight schedules; today there are twelve.' },
  { id: 'p43', cat: 'polity', text: 'The 73rd Constitutional Amendment deals with?', options: ['Municipalities', 'Panchayati Raj', 'Cooperative societies', 'Land reforms'], answer: 1, explanation: 'The 73rd Amendment (1992) constitutionalised Panchayati Raj.' },
  { id: 'p44', cat: 'polity', text: 'The minimum age for voting in India was reduced from 21 to 18 by which Amendment?', options: ['52nd', '58th', '61st', '65th'], answer: 2, explanation: 'The 61st Amendment (1988) lowered the voting age to 18.' },
  { id: 'p45', cat: 'polity', text: 'The Supreme Court of India was established in which year?', options: ['1947', '1950', '1952', '1955'], answer: 1, explanation: 'The Supreme Court came into being on 28 January 1950.' },
  { id: 'p46', cat: 'polity', text: 'A Constitutional Amendment bill requires which majority in each House?', options: ['Simple majority', 'Two-thirds of members present and voting', 'Absolute majority', 'Three-fourths of total'], answer: 1, explanation: 'Article 368 requires a two-thirds majority of members present and voting.' },
  { id: 'p47', cat: 'polity', text: 'The Comptroller and Auditor General (CAG) of India reports to the?', options: ['Prime Minister', 'President', 'Parliament', 'Finance Minister'], answer: 1, explanation: 'The CAG submits its audit reports to the President.' },
  { id: 'p48', cat: 'polity', text: 'An ordinary bill that is rejected by the Rajya Sabha can be passed by?', options: ['Joint sitting of both Houses', 'No further action', 'Another introduction in Rajya Sabha', 'The President alone'], answer: 0, explanation: 'A deadlock on an ordinary bill is resolved through a joint sitting.' },
  { id: 'p49', cat: 'polity', text: 'The Tenth Schedule is related to?', options: ['Panchayats', 'Anti-defection', 'Official languages', 'Tribal areas'], answer: 1, explanation: 'The Tenth Schedule deals with disqualification on ground of defection.' },
  { id: 'p50', cat: 'polity', text: 'The Lok Sabha Speaker\'s casting vote is exercised?', options: ['Nominated', 'When there is a tie', 'On money bills', 'Never'], answer: 1, explanation: 'The Speaker votes only to break a tie in the Lok Sabha.' },

  // ---------------- GEOGRAPHY (extra) ----------------
  { id: 'g17', cat: 'geography', text: 'Which state is called the "Land of the Rising Sun"?', options: ['Nagaland', 'Arunachal Pradesh', 'Manipur', 'Mizoram'], answer: 1, explanation: 'Arunachal Pradesh, the easternmost state, is the Land of the Rising Sun.' },
  { id: 'g18', cat: 'geography', text: 'The Sundarbans delta is formed by which rivers?', options: ['Ganga and Brahmaputra', 'Godavari and Krishna', 'Narmada and Tapi', 'Indus and Sutlej'], answer: 0, explanation: 'The Ganga-Brahmaputra delta forms the world\'s largest delta (Sundarbans).' },
  { id: 'g19', cat: 'geography', text: 'The bulk of rainfall in India is brought by the?', options: ['North-East monsoon', 'South-West monsoon', 'Western disturbances', 'Cyclones'], answer: 1, explanation: 'The South-West monsoon (June-September) provides most of India\'s rainfall.' },
  { id: 'g20', cat: 'geography', text: 'The smallest state of India by area is?', options: ['Sikkim', 'Goa', 'Tripura', 'Nagaland'], answer: 1, explanation: 'Goa is the smallest Indian state by area (3,702 sq km).' },
  { id: 'g21', cat: 'geography', text: 'The peninsular rivers that flow into the Arabian Sea are?', options: ['Godavari and Krishna', 'Narmada and Tapi', 'Ganga and Yamuna', 'Mahanadi and Kaveri'], answer: 1, explanation: 'The Narmada and Tapi flow westward into the Arabian Sea.' },
  { id: 'g22', cat: 'geography', text: 'The highest peak of the Western Ghats is?', options: ['Dodabetta', 'Anamudi', 'Kalsubai', 'Saputara'], answer: 1, explanation: 'Anamudi (2,695 m) in Kerala is the highest peak of the Western Ghats.' },
  { id: 'g23', cat: 'geography', text: 'The largest ocean in the world is?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2, explanation: 'The Pacific is the largest and deepest ocean.' },
  { id: 'g24', cat: 'geography', text: 'The deepest point of the ocean, the Mariana Trench, lies in which ocean?', options: ['Atlantic', 'Indian', 'Pacific', 'Southern'], answer: 2, explanation: 'The Mariana Trench (>10,900 m) is in the western Pacific.' },
  { id: 'g25', cat: 'geography', text: 'The world\'s highest rainfall place is?', options: ['Cherrapunji', 'Mawsynram', 'Mumbai', 'Darjeeling'], answer: 1, explanation: 'Mawsynram (Meghalaya) records the highest rainfall on Earth.' },
  { id: 'g26', cat: 'geography', text: 'The largest freshwater lake of India is?', options: ['Chilika', 'Wular', 'Pulicat', 'Dal'], answer: 1, explanation: 'Wular Lake in Jammu & Kashmir is India\'s largest freshwater lake.' },
  { id: 'g27', cat: 'geography', text: 'Which river is known as the "Ganga of the South"?', options: ['Krishna', 'Godavari', 'Kaveri', 'Tungabhadra'], answer: 1, explanation: 'The Godavari is called the Dakshin Ganga.' },
  { id: 'g28', cat: 'geography', text: 'The Aravalli Range is located mainly in which state?', options: ['Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Haryana only'], answer: 1, explanation: 'The Aravallis, the oldest fold mountains, run through Rajasthan.' },
  { id: 'g29', cat: 'geography', text: 'The Golden Quadrilateral connects Delhi, Mumbai, Chennai and?', options: ['Kolkata', 'Hyderabad', 'Bengaluru', 'Pune'], answer: 0, explanation: 'The 5,846 km highway connects Delhi-Mumbai-Chennai-Kolkata.' },
  { id: 'g30', cat: 'geography', text: 'The largest tea-producing state of India is?', options: ['Kerala', 'Assam', 'West Bengal', 'Tamil Nadu'], answer: 1, explanation: 'Assam is India\'s largest tea-producing state.' },
  { id: 'g31', cat: 'geography', text: 'The Deccan Trap region is known for which soil?', options: ['Red soil', 'Black soil', 'Laterite', 'Alluvial'], answer: 1, explanation: 'Black (regur) soil of the volcanic Deccan Trap is ideal for cotton.' },
  { id: 'g32', cat: 'geography', text: 'The word "monsoon" is derived from which language?', options: ['Hindi', 'Arabic', 'Persian', 'Latin'], answer: 1, explanation: 'Monsoon comes from the Arabic word "mausim" meaning season.' },
  { id: 'g33', cat: 'geography', text: 'The state with the largest forest area in India is?', options: ['Assam', 'Madhya Pradesh', 'Chhattisgarh', 'Karnataka'], answer: 1, explanation: 'Madhya Pradesh has the largest forest cover in India.' },
  { id: 'g34', cat: 'geography', text: 'The Rann of Kutch is best described as a?', options: ['Desert grassland', 'Salt marsh (seasonal salt desert)', 'Plateau', 'River delta'], answer: 1, explanation: 'The Rann of Kutch in Gujarat is a large salt marsh/desert.' },
  { id: 'g35', cat: 'geography', text: 'The International Date Line roughly follows which meridian?', options: ['0°', '90°E', '180°', '120°E'], answer: 2, explanation: 'The International Date Line approximately follows the 180° meridian.' },
  { id: 'g36', cat: 'geography', text: 'The river Godavari originates from?', options: ['Amarkantak', 'Trimbakeshwar', 'Mahabaleshwar', 'Shivaganga'], answer: 1, explanation: 'Godavari rises at Trimbakeshwar, Nashik, Maharashtra.' },
  { id: 'g37', cat: 'geography', text: 'The Himalayas extend between the rivers?', options: ['Indus and Brahmaputra', 'Godavari and Krishna', 'Ganga and Mahanadi', 'Sutlej and Ganga'], answer: 0, explanation: 'The Himalaya arc stretches from the Indus to the Brahmaputra.' },
  { id: 'g38', cat: 'geography', text: 'The Coromandel coast lies in which state?', options: ['Kerala', 'Tamil Nadu', 'Odisha', 'Andhra only'], answer: 1, explanation: 'The Coromandel coast runs along Tamil Nadu and southern Andhra Pradesh.' },
  { id: 'g39', cat: 'geography', text: 'The Western Ghats are also known as?', options: ['Sahyadri', 'Satpura', 'Vindhya', 'Nilgiri'], answer: 0, explanation: 'The Western Ghats are called the Sahyadri range.' },
  { id: 'g40', cat: 'geography', text: 'Which northeastern state shares the longest border with China?', options: ['Sikkim', 'Arunachal Pradesh', 'Nagaland', 'Manipur'], answer: 1, explanation: 'Arunachal Pradesh shares a long border with China (McMahon Line).' },
  { id: 'g41', cat: 'geography', text: 'Cyclones affecting India mainly originate in the?', options: ['Arabian Sea only', 'Bay of Bengal', 'Indian Ocean deep', 'Pacific Ocean'], answer: 1, explanation: 'Most cyclones that hit India form in the Bay of Bengal and move westward.' },
  { id: 'g42', cat: 'geography', text: 'Kaziranga National Park, famous for the one-horned rhino, is in?', options: ['West Bengal', 'Assam', 'Odisha', 'Madhya Pradesh'], answer: 1, explanation: 'Kaziranga (Assam) shelters the world\'s largest one-horned rhinos.' },
  { id: 'g43', cat: 'geography', text: 'Which river is called the "Sorrow of Bihar"?', options: ['Ganga', 'Kosi', 'Son', 'Gandak'], answer: 1, explanation: 'The Kosi, prone to shifting course and flooding, is the Sorrow of Bihar.' },
  { id: 'g44', cat: 'geography', text: 'Ladakh became a Union Territory with effect from?', options: ['2017', '2019', '2020', '2022'], answer: 1, explanation: 'Ladakh was carved out and made a UT on 31 October 2019.' },
  { id: 'g45', cat: 'geography', text: 'The industry center of Indian nuclear power, Kalpakkam, is located in?', options: ['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Karnataka'], answer: 0, explanation: 'Kalpakkam (Madras Atomic Power Station) is near Chennai, Tamil Nadu.' },
  { id: 'g46', cat: 'geography', text: 'The headquarters of the Survey of India is at?', options: ['Mumbai', 'Dehradun', 'Pune', 'Kolkata'], answer: 1, explanation: 'The Survey of India is headquartered in Dehradun.' },
  { id: 'g47', cat: 'geography', text: 'The Indian state with the highest population density is?', options: ['Kerala', 'West Bengal', 'Bihar', 'Uttar Pradesh'], answer: 2, explanation: 'Bihar has the highest population density among major states.' },
  { id: 'g48', cat: 'geography', text: 'The Palk Strait separates India from which country?', options: ['Bangladesh', 'Sri Lanka', 'Myanmar', 'Maldives'], answer: 1, explanation: 'The Palk Strait lies between Tamil Nadu and Sri Lanka.' },
  { id: 'g49', cat: 'geography', text: 'Mount Godwin Austen is the old name of which peak?', options: ['Nanda Devi', 'K2', 'Kangchenjunga', 'Kamet'], answer: 1, explanation: 'Mount Godwin Austen was the colonial-era surveying name given to K2 (8,611 m).' },
  { id: 'g50', cat: 'geography', text: 'The lake that is the largest brackish water lagoon in India is?', options: ['Pulicat', 'Chilika', 'Sambhar', 'Lonar'], answer: 1, explanation: 'Chilika Lake in Odisha is the largest brackish-water lagoon in India.' },

  // ---------------- ECONOMY (extra) ----------------
  { id: 'e17', cat: 'economy', text: 'The JAM trinity of financial inclusion stands for?', options: ['Jan Dhan, Aadhaar, Mobile', 'Jute, Agriculture, Mining', 'Jobs, Aadhaar, Money', 'Jan Aushadhi, MFI'], answer: 0, explanation: 'JAM = Jan Dhan accounts, Aadhaar identification and Mobile connectivity.' },
  { id: 'e18', cat: 'economy', text: 'Direct taxes in India are administered by?', options: ['CBDT', 'SEBI', 'DGFT', 'NITI Aayog'], answer: 0, explanation: 'The Central Board of Direct Taxes (CBDT) handles direct taxes.' },
  { id: 'e19', cat: 'economy', text: 'The policy rate of the RBI is now decided by the?', options: ['Finance Ministry', 'Monetary Policy Committee', 'Parliament', 'State Bank'], answer: 1, explanation: 'The 6-member Monetary Policy Committee decides the policy (repo) rate.' },
  { id: 'e20', cat: 'economy', text: 'GDP stands for?', options: ['Gross Domestic Product', 'General Development Plan', 'Global Domestic Price', 'Gross Development Product'], answer: 0, explanation: 'GDP measures the total value of goods and services produced in a country.' },
  { id: 'e21', cat: 'economy', text: 'The demonetisation of ₹500 and ₹1000 notes was carried out in which year?', options: ['2014', '2016', '2018', '2020'], answer: 1, explanation: 'Notes were demonetised on 8 November 2016.' },
  { id: 'e22', cat: 'economy', text: 'Retail inflation in India is officially measured by the?', options: ['WPI', 'CPI', 'PPI', 'GPI'], answer: 1, explanation: 'The Consumer Price Index (CPI) tracks retail inflation.' },
  { id: 'e23', cat: 'economy', text: 'The one-rupee note bears the signature of?', options: ['Governor of RBI', 'Finance Secretary', 'President of India', 'Finance Minister'], answer: 1, explanation: 'One-rupee notes are issued by the Government (signed by the Finance Secretary), unlike other notes.' },
  { id: 'e24', cat: 'economy', text: 'The Bank of Calcutta (1806), India\'s oldest bank, later became?', options: ['Bank of India', 'State Bank of India', 'Punjab National Bank', 'Axis Bank'], answer: 1, explanation: 'Bank of Calcutta became Bank of Bengal, then Imperial Bank, and later SBI.' },
  { id: 'e25', cat: 'economy', text: 'Deposits in banks are insured by DICGC up to how much per depositor?', options: ['₹1 lakh', '₹2 lakh', '₹5 lakh', '₹10 lakh'], answer: 2, explanation: 'The Deposit Insurance and Credit Guarantee Corporation insures deposits up to ₹5 lakh.' },
  { id: 'e26', cat: 'economy', text: 'The rupee symbol ₹ was designed by?', options: ['D. Udaya Kumar', 'Nandan Nilekani', 'Rahul Dravid', 'Vijay Gupta'], answer: 0, explanation: 'D. Udaya Kumar designed the rupee symbol, adopted in 2010.' },
  { id: 'e27', cat: 'economy', text: 'Current Account Deficit arises when?', options: ['Imports exceed exports', 'Exports exceed imports', 'Budget is in surplus', 'Inflation is high'], answer: 0, explanation: 'CAD is the excess of imports of goods/services over exports.' },
  { id: 'e28', cat: 'economy', text: 'The FRBM Act, which targets fiscal discipline, was enacted in which year?', options: ['1999', '2003', '2009', '2014'], answer: 1, explanation: 'The Fiscal Responsibility and Budget Management Act was passed in 2003.' },
  { id: 'e29', cat: 'economy', text: 'An increase in the repo rate generally?', options: ['Boosts credit growth', 'Makes borrowing costlier', 'Lowers inflation always', 'Increases exports'], answer: 1, explanation: 'Higher repo rate makes bank borrowing costlier and curbs money supply.' },
  { id: 'e30', cat: 'economy', text: 'The SENSEX is the stock index of which exchange?', options: ['NSE', 'BSE', 'MCX', 'SGX'], answer: 1, explanation: 'SENSEX (30 blue-chip stocks) belongs to the Bombay Stock Exchange.' },
  { id: 'e31', cat: 'economy', text: 'NIFTY is the index of which exchange?', options: ['BSE', 'NSE', 'NESDC', 'CSE'], answer: 1, explanation: 'NIFTY 50 is the National Stock Exchange\'s benchmark index.' },
  { id: 'e32', cat: 'economy', text: 'The Minimum Support Price (MSP) is announced to protect?', options: ['Consumers', 'Farmers', 'Industrialists', 'Traders'], answer: 1, explanation: 'MSP assures farmers a minimum price for their produce.' },
  { id: 'e33', cat: 'economy', text: 'The largest employer sector in India is?', options: ['Industry', 'Agriculture', 'Services', 'Construction'], answer: 1, explanation: 'Agriculture remains the largest employer in India.' },
  { id: 'e34', cat: 'economy', text: 'The Indian financial year ends on?', options: ['31 December', '31 March', '30 June', '31 October'], answer: 1, explanation: 'India\'s fiscal year runs from 1 April to 31 March.' },
  { id: 'e35', cat: 'economy', text: 'The reverse repo rate is the rate at which?', options: ['RBI lends to banks', 'RBI borrows from banks', 'Banks lend to RBI\'s big borrowers', 'RBI buys gold'], answer: 1, explanation: 'Reverse repo is the rate at which RBI borrows money from commercial banks.' },
  { id: 'e36', cat: 'economy', text: 'Scheduled banks in India are defined under which Act?', options: ['Banking Regulation Act 1949', 'RBI Act 1934', 'Companies Act', 'Negotiable Instruments Act'], answer: 1, explanation: 'The RBI Act, 1934 defines scheduled banks included in the RBI\'s 2nd Schedule.' },
  { id: 'e37', cat: 'economy', text: 'GST was implemented in India from?', options: ['1 January 2016', '1 July 2017', '1 April 2018', '1 July 2019'], answer: 1, explanation: 'GST came into force on 1 July 2017.' },
  { id: 'e38', cat: 'economy', text: 'Public debt of the Government of India is managed by?', options: ['SEBI', 'RBI', 'NABARD', 'SBI'], answer: 1, explanation: 'The RBI manages the government\'s borrowing (public debt) on its behalf.' },
  { id: 'e39', cat: 'economy', text: 'The EXIM Bank of India provides finance for?', options: ['Consumer goods', 'Exports and imports', 'Housing loans', 'Farm credit'], answer: 1, explanation: 'EXIM Bank supports India\'s international trade (export-import finance).' },
  { id: 'e40', cat: 'economy', text: 'Agricultural credit and rural development are specially served by?', options: ['RBI', 'NABARD', 'SEBI', 'LIC'], answer: 1, explanation: 'NABARD (National Bank for Agriculture and Rural Development) serves rural credit.' },
  { id: 'e41', cat: 'economy', text: 'The Aspirational Districts Programme is an initiative of?', options: ['WB', 'NITI Aayog', 'RBI', 'Ministry of Finance'], answer: 1, explanation: 'NITI Aayog runs the Aspirational Districts Programme for district development.' },
  { id: 'e42', cat: 'economy', text: 'Which of these is an example of a direct tax?', options: ['GST', 'Excise duty', 'Income tax', 'Customs duty'], answer: 2, explanation: 'Income tax is a direct tax; GST, excise and customs are indirect taxes.' },
  { id: 'e43', cat: 'economy', text: 'The base year of the current WPI series (2011-12) means prices are compared with that year set at?', options: ['50', '100', '250', '1000'], answer: 1, explanation: 'Index base years are set at 100 for comparison.' },
  { id: 'e44', cat: 'economy', text: 'Inflationary pressure generally leads the RBI to?', options: ['Cut rates', 'Raise rates', 'Print more money', 'Stop lending'], answer: 1, explanation: 'To cool inflation, RBI usually raises the policy rate.' },
  { id: 'e45', cat: 'economy', text: 'The Statutory Liquidity Ratio (SLR) requires banks to hold assets in?', options: ['Cash and gold with RBI', 'Liquid assets like government securities', 'Stock markets', 'Foreign reserves'], answer: 1, explanation: 'SLR mandates banks to hold a portion of deposits in liquid assets (mainly govt securities).' },
  { id: 'e46', cat: 'economy', text: 'Foreign direct investment (FDI) means?', options: ['Portfolio investment in stocks', 'Physical investment by foreign investors in enterprises', 'Borrowing abroad', 'Export earnings'], answer: 1, explanation: 'FDI is long-term physical investment by foreign entities in a country\'s enterprises.' },
  { id: 'e47', cat: 'economy', text: 'Human Development Index is prepared annually by?', options: ['World Bank', 'UNDP', 'IMF', 'WTO'], answer: 1, explanation: 'The UNDP publishes the Human Development Index (HDI).' },
  { id: 'e48', cat: 'economy', text: 'The "Base Rate" regime asks banks to lend?', options: ['Below base rate freely', 'Not below the base rate', 'Only above 15%', 'At repo rate exactly'], answer: 1, explanation: 'Banks cannot lend below the declared base rate (minimum lending rate).' },
  { id: 'e49', cat: 'economy', text: 'The industry body that lobbies for Indian industry is?', options: ['NABARD', 'CII', 'SEBI', 'DGFT'], answer: 1, explanation: 'CII (Confederation of Indian Industry) represents industry interests.' },
  { id: 'e50', cat: 'economy', text: 'The term "Stagflation" means?', options: ['Rising prices with unemployment/stagnation', 'Falling prices with growth', 'High inflation with high output', 'Zero inflation'], answer: 0, explanation: 'Stagflation = stagnant growth + unemployment + rising prices.' },

  // ---------------- SCIENCE (extra) ----------------
  { id: 's17', cat: 'science', text: 'The chemical symbol for gold is?', options: ['Gd', 'Au', 'Go', 'Ag'], answer: 1, explanation: 'Gold\'s symbol Au comes from the Latin aurum.' },
  { id: 's18', cat: 'science', text: 'The hardest natural substance is?', options: ['Platinum', 'Diamond', 'Iron', 'Quartz'], answer: 1, explanation: 'Diamond is the hardest naturally occurring substance.' },
  { id: 's19', cat: 'science', text: 'A light-year is a unit of?', options: ['Time', 'Distance', 'Speed', 'Brightness'], answer: 1, explanation: 'A light-year measures distance (distance light travels in a year).' },
  { id: 's20', cat: 'science', text: 'The SI unit of force is the?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], answer: 1, explanation: 'Force is measured in newtons (N).' },
  { id: 's21', cat: 'science', text: 'The smallest unit of life is the?', options: ['Tissue', 'Cell', 'Organ', 'Atom'], answer: 1, explanation: 'The cell is the basic structural and functional unit of life.' },
  { id: 's22', cat: 'science', text: 'Deficiency of iodine in the diet causes?', options: ['Anaemia', 'Goitre', 'Rickets', 'Kwashiorkor'], answer: 1, explanation: 'Iodine deficiency causes goitre (enlarged thyroid).' },
  { id: 's23', cat: 'science', text: 'Retinol is another name for which vitamin?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 0, explanation: 'Vitamin A is also called retinol.' },
  { id: 's24', cat: 'science', text: 'The loss of water as vapour from plant leaves is called?', options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Osmosis'], answer: 1, explanation: 'Transpiration is water loss from leaves through stomata.' },
  { id: 's25', cat: 'science', text: 'The normal human body temperature is about?', options: ['35°C', '37°C', '39°C', '40°C'], answer: 1, explanation: 'Normal body temperature is ~37°C (98.6°F).' },
  { id: 's26', cat: 'science', text: 'The number of bones in an adult human skeleton is about?', options: ['186', '206', '226', '256'], answer: 1, explanation: 'An adult human has 206 bones (infants have more).' },
  { id: 's27', cat: 'science', text: 'Plants take in which gas during photosynthesis?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 1, explanation: 'Photosynthesis uses carbon dioxide and water to make glucose and oxygen.' },
  { id: 's28', cat: 'science', text: 'Which metal is liquid at room temperature?', options: ['Aluminium', 'Mercury', 'Zinc', 'Sodium'], answer: 1, explanation: 'Mercury (Hg) is the only metal that is liquid at room temperature.' },
  { id: 's29', cat: 'science', text: 'Sound cannot travel through?', options: ['Water', 'Iron', 'Vacuum', 'Air'], answer: 2, explanation: 'Sound needs a medium; it cannot travel through vacuum.' },
  { id: 's30', cat: 'science', text: 'The device used by doctors to listen to internal body sounds is the?', options: ['Sphygmomanometer', 'Stethoscope', 'Oscilloscope', 'Laryngoscope'], answer: 1, explanation: 'The stethoscope amplifies heart and lung sounds.' },
  { id: 's31', cat: 'science', text: 'LED stands for?', options: ['Light Emitting Diode', 'Liquid Electric Display', 'Low Energy Device', 'Light Enhancing Diode'], answer: 0, explanation: 'LED = Light Emitting Diode.' },
  { id: 's32', cat: 'science', text: 'The atomic number of hydrogen is?', options: ['1', '2', '8', '16'], answer: 0, explanation: 'Hydrogen has atomic number 1 (one proton).' },
  { id: 's33', cat: 'science', text: 'The greenhouse gas most responsible for warming is?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], answer: 1, explanation: 'Rising carbon dioxide is the main driver of global warming.' },
  { id: 's34', cat: 'science', text: 'Digestion of food begins in the?', options: ['Stomach', 'Mouth', 'Oesophagus', 'Small intestine'], answer: 1, explanation: 'Salivary amylase starts carbohydrate digestion in the mouth.' },
  { id: 's35', cat: 'science', text: 'The largest organ of the human body is the?', options: ['Liver', 'Skin', 'Brain', 'Lungs'], answer: 1, explanation: 'The skin is the body\'s largest organ.' },
  { id: 's36', cat: 'science', text: 'The study of plants is called?', options: ['Zoology', 'Botany', 'Entomology', 'Geology'], answer: 1, explanation: 'Botany is the scientific study of plants.' },
  { id: 's37', cat: 'science', text: 'The speed of light in vacuum is approximately?', options: ['3 × 10^6 m/s', '3 × 10^8 m/s', '3 × 10^10 m/s', '300 m/s'], answer: 1, explanation: 'Light travels at about 3 × 10^8 m/s in vacuum.' },
  { id: 's38', cat: 'science', text: 'Plants store excess food as?', options: ['Glucose', 'Starch', 'Protein', 'Fat'], answer: 1, explanation: 'Plants store glucose as starch.' },
  { id: 's39', cat: 'science', text: 'The melting point of ice is?', options: ['-4°C', '0°C', '4°C', '100°C'], answer: 1, explanation: 'Ice melts at 0°C (273K).' },
  { id: 's40', cat: 'science', text: 'The part of the eye that regulates the amount of light is the?', options: ['Retina', 'Iris', 'Cornea', 'Lens'], answer: 1, explanation: 'The iris controls the pupil size and amount of light entering.' },
  { id: 's41', cat: 'science', text: 'The ozone layer protecting us from UV rays lies in the?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], answer: 1, explanation: 'The ozone layer is in the stratosphere.' },
  { id: 's42', cat: 'science', text: 'The electron was discovered by?', options: ['Rutherford', 'J.J. Thomson', 'Bohr', 'Chadwick'], answer: 1, explanation: 'J.J. Thomson discovered the electron in 1897.' },
  { id: 's43', cat: 'science', text: 'The nucleus of an atom contains?', options: ['Only electrons', 'Protons and neutrons', 'Only protons', 'Electrons and neutrons'], answer: 1, explanation: 'The nucleus holds protons and neutrons (nucleons).' },
  { id: 's44', cat: 'science', text: 'Pencil lead (the writing core) is made of?', options: ['Lead', 'Graphite', 'Charcoal', 'Clay only'], answer: 1, explanation: 'Pencil cores are graphite (a form of carbon).' },
  { id: 's45', cat: 'science', text: 'Which blood group is the universal donor?', options: ['AB+', 'O−', 'A+', 'B−'], answer: 1, explanation: 'O negative blood can be donated to anyone.' },
  { id: 's46', cat: 'science', text: 'One horsepower is approximately equal to?', options: ['500 watts', '746 watts', '1000 watts', '100 watts'], answer: 1, explanation: '1 hp ≈ 746 watts.' },
  { id: 's47', cat: 'science', text: 'The SI unit of electric power is the?', options: ['Joule', 'Watt', 'Ampere', 'Volt'], answer: 1, explanation: 'Power is measured in watts (W).' },
  { id: 's48', cat: 'science', text: 'Which vitamin is produced when skin is exposed to sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 3, explanation: 'Sunlight helps the skin synthesise Vitamin D.' },
  { id: 's49', cat: 'science', text: 'The clear liquid part of blood is called?', options: ['Plasma', 'Serum', 'Lymph', 'Cytoplasm'], answer: 0, explanation: 'Plasma is the liquid component that carries cells and nutrients.' },
  { id: 's50', cat: 'science', text: 'The study of the effects and manufacture of drugs is called?', options: ['Anatomy', 'Pharmacology', 'Physiology', 'Toxicology'], answer: 1, explanation: 'Pharmacology is the science of drugs and their effects.' },

  // ---------------- STATIC GK (extra) ----------------
  { id: 'sk17', cat: 'static-gk', text: 'The Missile Man of India was?', options: ['Vikram Sarabhai', 'A.P.J. Abdul Kalam', 'Homi Bhabha', 'C.V. Raman'], answer: 1, explanation: 'Dr. A.P.J. Abdul Kalam is known as the Missile Man of India.' },
  { id: 'sk18', cat: 'static-gk', text: 'The first Indian woman to go into space was?', options: ['Kalpana Chawla', 'Sunita Williams', 'Kiran Bedi', 'Bachendri Pal'], answer: 0, explanation: 'Kalpana Chawla (STS-87, 1997) was the first Indian woman in space.' },
  { id: 'sk19', cat: 'static-gk', text: 'India\'s first woman President was?', options: ['Indira Gandhi', 'Pratibha Patil', 'Sonia Gandhi', 'Mamata Banerjee'], answer: 1, explanation: 'Pratibha Devisingh Patil served as President (2007-2012).' },
  { id: 'sk20', cat: 'static-gk', text: 'The first Chief Election Commissioner of India was?', options: ['T.N. Seshan', 'Sukumar Sen', 'S.L. Shakdher', 'K.V.K. Sundaram'], answer: 1, explanation: 'Sukumar Sen was the first CEC (1950-1958).' },
  { id: 'sk21', cat: 'static-gk', text: 'India\'s first woman Chief Minister of a state was?', options: ['Sarojini Naidu', 'Sucheta Kriplani', 'Nandini Satpathy', 'Vijaya Lakshmi Pandit'], answer: 1, explanation: 'Sucheta Kriplani was the first woman CM (Uttar Pradesh, 1963).' },
  { id: 'sk22', cat: 'static-gk', text: 'The Father of the Indian Space Programme is?', options: ['Vikram Sarabhai', 'Homi Bhabha', 'S. Ramanujan', 'D.R. Kaprekar'], answer: 0, explanation: 'Dr. Vikram Sarabhai founded India\'s space programme.' },
  { id: 'sk23', cat: 'static-gk', text: 'The highest military decoration of India is?', options: ['Bharat Ratna', 'Param Vir Chakra', 'Ashoka Chakra', 'Padma Vibhushan'], answer: 1, explanation: 'The Param Vir Chakra is the highest wartime gallantry award.' },
  { id: 'sk24', cat: 'static-gk', text: 'The Dadasaheb Phalke Award is given for outstanding contribution to?', options: ['Sports', 'Cinema', 'Literature', 'Science'], answer: 1, explanation: 'It is Indian cinema\'s highest honour, named after the film pioneer.' },
  { id: 'sk25', cat: 'static-gk', text: 'The Indian documentary that won the Oscar in 2023 was?', options: ['Naatu Naatu', 'The Elephant Whisperers', 'Smile Pinki', 'Period. End of Sentence.'], answer: 1, explanation: '"The Elephant Whisperers" won Best Documentary Short at the 2023 Oscars.' },
  { id: 'sk26', cat: 'static-gk', text: 'Swachh Bharat Abhiyan was launched on?', options: ['26 January 2014', '2 October 2014', '15 August 2015', '2 October 2016'], answer: 1, explanation: 'The Swachh Bharat Mission was launched on 2 October 2014.' },
  { id: 'sk27', cat: 'static-gk', text: 'The first recipient of the Rajiv Gandhi Khel Ratna (now Major Dhyan Chand Khel Ratna) was?', options: ['Sachin Tendulkar', 'Viswanathan Anand', 'P.T. Usha', 'Kapil Dev'], answer: 1, explanation: 'Viswanathan Anand received it in 1991-92 during the award\'s inauguration.' },
  { id: 'sk28', cat: 'static-gk', text: 'Neeraj Chopra won an Olympic gold medal in?', options: ['Shot put', 'Javelin throw', 'Discus throw', '100m sprint'], answer: 1, explanation: 'He won men\'s javelin at Tokyo 2020.' },
  { id: 'sk29', cat: 'static-gk', text: 'The "Royal Bengal Tiger" is chiefly found in?', options: ['Bandhavgarh', 'Sundarbans', 'Gir', 'Periyar'], answer: 1, explanation: 'The Sundarbans host the Royal Bengal Tiger (also in other reserves).' },
  { id: 'sk30', cat: 'static-gk', text: 'India\'s first woman IPS officer was?', options: ['Kiran Bedi', 'Muthulakshmi Reddy', 'Ritu Maheshwari', 'Aruna Asaf Ali'], answer: 0, explanation: 'Kiran Bedi (1972 batch) was the first woman IPS officer.' },
  { id: 'sk31', cat: 'static-gk', text: 'The doctors Charak and Sushruta are associated with?', options: ['Astronomy', 'Ayurveda (medicine)', 'Metallurgy', 'Agriculture'], answer: 1, explanation: 'Charaka Samhita and Sushruta Samhita are ancient medical texts.' },
  { id: 'sk32', cat: 'static-gk', text: 'The National Emblem of India is taken from which pillar?', options: ['Allahabad Pillar', 'Sarnath Lion Capital', 'Ashoka Pillar at Vaishali', 'Kalinga Pillar'], answer: 1, explanation: 'The emblem derives from Ashoka\'s Lion Capital at Sarnath.' },
  { id: 'sk33', cat: 'static-gk', text: 'The slogan "Jai Jawan Jai Kisan" was given by?', options: ['Indira Gandhi', 'Lal Bahadur Shastri', 'Atal Bihari Vajpayee', 'Rajiv Gandhi'], answer: 1, explanation: 'Lal Bahadur Shastri coined it in 1965.' },
  { id: 'sk34', cat: 'static-gk', text: 'The headquarters of ISRO is situated at?', options: ['Mumbai', 'Bengaluru', 'Hyderabad', 'Sriharikota'], answer: 1, explanation: 'ISRO HQ is in Bengaluru, Karnataka.' },
  { id: 'sk35', cat: 'static-gk', text: 'The Agni series of missiles are primarily?', options: ['Surface-to-air', 'Ballistic missiles', 'Cruise missiles', 'Anti-tank'], answer: 1, explanation: 'Agni is a family of long-range ballistic missiles.' },
  { id: 'sk36', cat: 'static-gk', text: 'Ayushman Bharat is a scheme for?', options: ['Housing', 'Health insurance', 'Education loans', 'Pension'], answer: 1, explanation: 'Ayushman Bharat provides health cover up to ₹5 lakh per family.' },
  { id: 'sk37', cat: 'static-gk', text: 'PM-KISAN scheme provides annual income support of?', options: ['₹3000', '₹6000', '₹12000', '₹24000'], answer: 1, explanation: 'PM-KISAN transfers ₹6,000/year to eligible farmer families.' },
  { id: 'sk38', cat: 'static-gk', text: 'The International Solar Alliance is headquartered in?', options: ['New Delhi', 'Gurugram', 'Bengaluru', 'Paris'], answer: 1, explanation: 'ISA was launched in 2015 and is headquartered in Gurugram, India.' },
  { id: 'sk39', cat: 'static-gk', text: 'The first Indian Nobel Prize winner was?', options: ['C.V. Raman', 'Rabindranath Tagore', 'Amartya Sen', 'Mother Teresa'], answer: 1, explanation: 'Rabindranath Tagore won the Nobel in Literature in 1913.' },
  { id: 'sk40', cat: 'static-gk', text: 'The FIFA World Cup 2022 was won by?', options: ['France', 'Argentina', 'Brazil', 'Portugal'], answer: 1, explanation: 'Argentina defeated France in the Qatar 2022 final.' },
  { id: 'sk41', cat: 'static-gk', text: 'The Commonwealth Games 2022 were hosted at?', options: ['London', 'Delhi', 'Birmingham', 'Sydney'], answer: 2, explanation: 'Birmingham, UK, hosted the 2022 Commonwealth Games.' },
  { id: 'sk42', cat: 'static-gk', text: 'The Indian biosphere reserve first to be included in UNESCO\'s World Network was?', options: ['Sundarbans', 'Nilgiri', 'Gulf of Mannar', 'Nanda Devi'], answer: 1, explanation: 'The Nilgiri Biosphere Reserve was India\'s first UNESCO biosphere reserve.' },
  { id: 'sk43', cat: 'static-gk', text: '"Make in India" was launched in which year?', options: ['2012', '2014', '2016', '2018'], answer: 1, explanation: 'Make in India was launched on 25 September 2014.' },
  { id: 'sk44', cat: 'static-gk', text: 'The first Indian to receive the Bharat Ratna in 1954 included?', options: ['MacArthur', 'C.V. Raman and C. Rajagopalachari', 'A.P.J. Abdul Kalam', 'Sachin Tendulkar'], answer: 1, explanation: 'C. Rajagopalachari, C.V. Raman and S. Radhakrishnan received the first Bharat Ratnas.' },
  { id: 'sk45', cat: 'static-gk', text: 'Chandrayaan-2, India\'s lunar mission, carried which rover?', options: ['Mangalyaan', 'Pragyan', 'Vikram', 'Chakra'], answer: 1, explanation: 'The Pragyan rover was carried by the Vikram lander of Chandrayaan-2.' },
  { id: 'sk46', cat: 'static-gk', text: 'Project tiger aims to protect?', options: ['Elephants', 'Royal Bengal Tiger', 'Lions', 'Rhinos'], answer: 1, explanation: 'Project Tiger (1973) conserves the royal Bengal tiger.' },
  { id: 'sk47', cat: 'static-gk', text: 'The Padma awards are announced each year on?', options: ['Gandhi Jayanti', 'Republic Day', 'Independence Day', 'New Year'], answer: 1, explanation: 'They are announced on Republic Day (26 January).' },
  { id: 'sk48', cat: 'static-gk', text: '"Jana Gana Mana" was adopted as the National Anthem in which year?', options: ['1947', '1948', '1950', '1952'], answer: 2, explanation: 'It was adopted on 24 January 1950.' },
  { id: 'sk49', cat: 'static-gk', text: 'The national flower of India is the?', options: ['Rose', 'Lotus', 'Jasmine', 'Marigold'], answer: 1, explanation: 'The lotus is India\'s national flower.' },
  { id: 'sk50', cat: 'static-gk', text: 'The national song of India "Vande Mataram" is set to music from the book?', options: ['Gitanjali', 'Anandamath', 'Geetanjali', 'Savitri'], answer: 1, explanation: 'Vande Mataram comes from Bankim Chandra Chatterjee\'s Anandamath.' },
]

// ---------------- Generated banks (Reasoning / Quant / English) ----------------
// Reasoning, Quant and English questions are generated programmatically from
// templates (answers are computed, no fabrication) and re-seeded daily so the
// mix rotates for a fresh pattern every day. GK topics stay curated.

import { generateReasoning } from './generator/reasoning.js'
import { generateQuant } from './generator/quant.js'
import { generateEnglish } from './generator/english.js'
import { getProgress } from '../lib/store.js'

const GENERATED_TARGET = 1000

function daySeed() {
  const d = new Date()
  return (
    d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
  )
}

function clean(arr) {
  const seenText = new Set()
  const seenId = new Set()
  for (const q of arr) {
    if (
      !q ||
      !q.cat ||
      !q.text ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      new Set(q.options).size !== 4 ||
      !(q.answer >= 0 && q.answer < 4) ||
      seenText.has(q.text) ||
      seenId.has(q.id)
    ) {
      continue
    }
    seenText.add(q.text)
    seenId.add(q.id)
  }
  return arr.filter(
    (q) =>
      q &&
      q.cat &&
      q.text &&
      q.options &&
      q.options.length === 4 &&
      new Set(q.options).size === 4 &&
      q.answer >= 0 &&
      q.answer < 4 &&
      seenText.has(q.text) &&
      seenId.has(q.id)
  )
}

// Bulk question-bank import: drop JSON files in src/data/custom/*.json, each an
// array of { cat, text, options:[4], answer, explanation }. Great for loading
// real 1000-question GK banks from external sources.
function loadCustomBanks() {
  const out = []
  const modules = (function () {
    try {
      // @ts-expect-error vite glob
      return import.meta.glob('../data/custom/**/*.json', { eager: true })
    } catch {
      return {}
    }
  })()
  let n = 0
  for (const key of Object.keys(modules)) {
    const data = modules[key].default || modules[key]
    if (!Array.isArray(data)) continue
    for (const item of data) {
      n++
      out.push({
        id: `custom_${n}`,
        cat: (item.cat || '').toString().toLowerCase(),
        text: item.text,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation || '',
      })
    }
  }
  return out
}

// Sample a generated pool down to ~`target` questions spread evenly across the
// whole pool (generators can over-produce; this keeps banks lean at ~1000/topic
// while still covering every template type).
function evenSample(pool, target) {
  if (pool.length <= target) return pool
  const out = []
  const stride = pool.length / target
  for (let i = 0; i < target; i++) {
    const start = Math.floor(i * stride)
    const end = Math.max(start + 1, Math.floor((i + 1) * stride) - 1)
    const j = start + Math.floor(Math.random() * (end - start + 1))
    out.push(pool[Math.min(pool.length - 1, j)])
  }
  return out
}

const CURATED = QUESTIONS

const genAll = {
  reasoning: generateReasoning(daySeed(), GENERATED_TARGET),
  quant: generateQuant(daySeed(), GENERATED_TARGET),
  english: generateEnglish(daySeed(), GENERATED_TARGET),
}
for (const key of Object.keys(genAll)) {
  genAll[key] = evenSample(genAll[key], GENERATED_TARGET)
}

const built = clean([
  ...CURATED,
  ...genAll.reasoning,
  ...genAll.quant,
  ...genAll.english,
  ...loadCustomBanks(),
])

export const QUESTION_BANK = built
const BANK = built

export function questionsForCat(cat) {
  return BANK.filter((q) => q.cat === cat)
}

export function categoryCount(cat) {
  return BANK.filter((q) => q.cat === cat).length
}

export function totalQuestions() {
  return BANK.length
}

export function bankPerTopic() {
  return Object.fromEntries(SUBJECTS.map((s) => [s.id, categoryCount(s.id)]))
}

// Rotation: every attempt shuffles the pool again, and questions you have
// practised less (or got wrong) surface first, so you never see the same
// pattern twice and weak areas get repeated naturally.
function rotationPool(cat) {
  const stats = (getProgress().qStats) || {}
  const pool = [...BANK.filter((q) => q.cat === cat)]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  pool.sort(
    (a, b) => (stats[a.id]?.practiced || 0) - (stats[b.id]?.practiced || 0)
  )
  // sprinkle in a bit of randomness between equal-practiced questions
  return pool
}

function take(pool, count) {
  const picked = pool.slice(0, Math.min(count, pool.length))
  return picked.map(watermark)
}

export function buildPracticeSet(cat, count) {
  return take(rotationPool(cat), count)
}

// Build a mock test mixing the sections asked in SSC exams (GK, Reasoning,
// Quant — English is skipped like most CGL papers). Mock sections are rotated
// and interleaved so the paper pattern differs every attempt.
export function buildMockSet(count) {
  const sections = [...MOCK_EVENLY].sort(() => Math.random() - 0.5)
  const perSection = Math.ceil(count / sections.length)
  const parts = sections.map((s) => rotationPool(s.id).slice(0, Math.min(perSection, categoryCount(s.id))))
  const out = []
  const idx = Array(parts.length).fill(0)
  let any = true
  const start = Math.floor(Math.random() * sections.length)
  while (any) {
    any = false
    for (let k = 0; k < sections.length; k++) {
      const i = (start + k) % sections.length
      if (idx[i] < parts[i].length) {
        out.push(parts[i][idx[i]])
        idx[i]++
        any = true
      }
    }
  }
  return out.slice(0, count).map(watermark)
}

function watermark(q) {
  return {
    id: q.id,
    cat: q.cat,
    text: q.text,
    options: [...q.options],
    answer: q.answer,
    explanation: q.explanation,
  }
}