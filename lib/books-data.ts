export interface BookCategoryMeta {
  id: string;
  name: string;
  group: string;
  icon: string;
  bookCount: number;
  gradient: string;
  description: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  authorBio?: string;
  year: number;
  coverImage?: string;
  coverGradient: string;
  category: string;
  subCategory: string;
  classLevel?: string;
  language: string;
  pages: number;
  rating: number;
  downloads: number;
  description: string;
  publisher?: string;
  isbn?: string;
  tableOfContents: string[];
  sampleChapter: {
    title: string;
    content: string[];
  };
  keyTakeaways: string[];
}

// 50 Defined Subject Types with Card-based metadata grouped by domain
export const SUBJECT_50_CATEGORIES: BookCategoryMeta[] = [
  // 1. Mathematics & Logic (5)
  {
    id: "cat-math-calc",
    name: "Calculus & Analysis",
    group: "Mathematics & Logic",
    icon: "📐",
    bookCount: 42,
    gradient: "from-blue-600 to-indigo-800",
    description: "Limits, derivatives, differential equations, and multivariate integration."
  },
  {
    id: "cat-math-algebra",
    name: "Algebra & Linear Systems",
    group: "Mathematics & Logic",
    icon: "🔢",
    bookCount: 38,
    gradient: "from-indigo-600 to-cyan-700",
    description: "Matrices, vectors, eigenvalues, polynomials, and abstract groups."
  },
  {
    id: "cat-math-geom",
    name: "Geometry & Trigonometry",
    group: "Mathematics & Logic",
    icon: "📏",
    bookCount: 35,
    gradient: "from-cyan-600 to-blue-700",
    description: "Coordinate geometry, conic sections, trigonometric identities, and proofs."
  },
  {
    id: "cat-math-vedic",
    name: "Vedic Maths & Speed Tricks",
    group: "Mathematics & Logic",
    icon: "⚡",
    bookCount: 29,
    gradient: "from-amber-600 to-orange-700",
    description: "16 Vedic sutras for rapid mental calculation, square roots, and division."
  },
  {
    id: "cat-math-stats",
    name: "Probability & Statistics",
    group: "Mathematics & Logic",
    icon: "📊",
    bookCount: 31,
    gradient: "from-teal-600 to-emerald-800",
    description: "Bayesian probability, distributions, data analytics, and hypothesis tests."
  },

  // 2. Physics & Space (5)
  {
    id: "cat-phys-mech",
    name: "Mechanics & Kinematics",
    group: "Physics & Astronomy",
    icon: "⚙️",
    bookCount: 45,
    gradient: "from-emerald-600 to-teal-900",
    description: "Newtonian dynamics, friction, gravitation, rotation, and harmonic motion."
  },
  {
    id: "cat-phys-quantum",
    name: "Quantum Physics & Relativity",
    group: "Physics & Astronomy",
    icon: "⚛️",
    bookCount: 33,
    gradient: "from-purple-600 to-indigo-950",
    description: "Schrodinger equation, wave-particle duality, uncertainty, and spacetime."
  },
  {
    id: "cat-phys-em",
    name: "Electromagnetism & Waves",
    group: "Physics & Astronomy",
    icon: "🧲",
    bookCount: 36,
    gradient: "from-blue-700 to-violet-900",
    description: "Coulomb's Law, Maxwell's equations, optics, magnetism, and wave optics."
  },
  {
    id: "cat-phys-thermo",
    name: "Thermodynamics & Heat",
    group: "Physics & Astronomy",
    icon: "🔥",
    bookCount: 28,
    gradient: "from-rose-600 to-orange-800",
    description: "Entropy, Carnot engine, statistical mechanics, and state equations."
  },
  {
    id: "cat-phys-astro",
    name: "Astrophysics & Cosmology",
    group: "Physics & Astronomy",
    icon: "🌌",
    bookCount: 26,
    gradient: "from-slate-800 to-indigo-950",
    description: "Black holes, stellar evolution, dark matter, and the expanding universe."
  },

  // 3. Chemistry & Materials (5)
  {
    id: "cat-chem-org",
    name: "Organic Chemistry Mechanisms",
    group: "Chemistry & Life",
    icon: "🧪",
    bookCount: 44,
    gradient: "from-rose-600 to-pink-800",
    description: "Reaction pathways, stereochemistry, SN1/SN2, and electrophilic synthesis."
  },
  {
    id: "cat-chem-inorg",
    name: "Inorganic & Coordination",
    group: "Chemistry & Life",
    icon: "💎",
    bookCount: 37,
    gradient: "from-emerald-700 to-cyan-900",
    description: "Periodic table trends, chemical bonding, transition metals, and complexes."
  },
  {
    id: "cat-chem-phys",
    name: "Physical Chemistry",
    group: "Chemistry & Life",
    icon: "⚖️",
    bookCount: 39,
    gradient: "from-amber-600 to-rose-700",
    description: "Chemical kinetics, electrochemistry, ionic equilibria, and thermodynamics."
  },
  {
    id: "cat-chem-biochem",
    name: "Biochemistry & Biomolecules",
    group: "Chemistry & Life",
    icon: "🧬",
    bookCount: 27,
    gradient: "from-lime-600 to-emerald-800",
    description: "Proteins, enzymes, metabolic pathways, carbohydrates, and nucleic acids."
  },
  {
    id: "cat-chem-env",
    name: "Environmental Chemistry",
    group: "Chemistry & Life",
    icon: "🌱",
    bookCount: 24,
    gradient: "from-green-600 to-teal-800",
    description: "Atmospheric chemistry, green catalysts, toxicology, and pollution mitigation."
  },

  // 4. Biology & Medical Sciences (5)
  {
    id: "cat-bio-human",
    name: "Human Anatomy & Physiology",
    group: "Biological Sciences",
    icon: "🫀",
    bookCount: 40,
    gradient: "from-red-600 to-rose-900",
    description: "Circulatory, nervous, endocrine, renal systems, and clinical pathology."
  },
  {
    id: "cat-bio-genetics",
    name: "Genetics & Biotechnology",
    group: "Biological Sciences",
    icon: "🧬",
    bookCount: 34,
    gradient: "from-violet-600 to-purple-900",
    description: "Mendelian inheritance, CRISPR gene editing, recombinant DNA, and epigenetics."
  },
  {
    id: "cat-bio-botany",
    name: "Plant Physiology & Botany",
    group: "Biological Sciences",
    icon: "🌿",
    bookCount: 30,
    gradient: "from-emerald-600 to-green-800",
    description: "Photosynthesis, plant hormones, taxonomy, histology, and morphology."
  },
  {
    id: "cat-bio-micro",
    name: "Microbiology & Immunology",
    group: "Biological Sciences",
    icon: "🔬",
    bookCount: 28,
    gradient: "from-teal-600 to-cyan-800",
    description: "Viruses, bacteria, immune defense mechanisms, vaccines, and pathogens."
  },
  {
    id: "cat-bio-ecology",
    name: "Ecology & Wildlife",
    group: "Biological Sciences",
    icon: "🦁",
    bookCount: 25,
    gradient: "from-amber-700 to-yellow-900",
    description: "Ecosystem dynamics, biodiversity conservation, food webs, and climate."
  },

  // 5. Hindi Literature & Grammar (5)
  {
    id: "cat-hin-upanyas",
    name: "हिंदी प्रसिद्ध उपन्यास (Hindi Novels)",
    group: "हिंदी साहित्य व भाषा",
    icon: "📖",
    bookCount: 48,
    gradient: "from-amber-700 to-orange-950",
    description: "गोदान, गबन, मैला आँचल, चंद्रकांता, गुनाहों का देवता एवं कालजयी कृतियां।"
  },
  {
    id: "cat-hin-kavita",
    name: "हिंदी काव्य व खंडकाव्य (Poetry)",
    group: "हिंदी साहित्य व भाषा",
    icon: "✍️",
    bookCount: 41,
    gradient: "from-rose-700 to-red-950",
    description: "रश्मिरथी, कामायनी, मधुशाला, रामचरितमानस, कबीर व रहीम के दोहे।"
  },
  {
    id: "cat-hin-vyakaran",
    name: "हिंदी व्याकरण व रचना (Grammar)",
    group: "हिंदी साहित्य व भाषा",
    icon: "📝",
    bookCount: 39,
    gradient: "from-orange-600 to-amber-800",
    description: "संधि, समास, रस, छंद, अलंकार, मुहावरे, पर्यायवाची एवं निबंध लेखन।"
  },
  {
    id: "cat-hin-kahani",
    name: "कहानियां व एकांकी (Short Stories)",
    group: "हिंदी साहित्य व भाषा",
    icon: "📜",
    bookCount: 36,
    gradient: "from-yellow-600 to-amber-800",
    description: "ईदगाह, पंच परमेश्वर, पूस की रात, उसने कहा था एवं प्रेरणादायी कहानियां।"
  },
  {
    id: "cat-hin-natak",
    name: "हिंदी नाटक व निबंध (Drama & Essays)",
    group: "हिंदी साहित्य व भाषा",
    icon: "🎭",
    bookCount: 25,
    gradient: "from-amber-800 to-stone-900",
    description: "भारतेंदु हरिश्चंद्र, जयशंकर प्रसाद के ऐतिहासिक नाटक व आलोचनात्मक निबंध।"
  },

  // 6. Sanskrit Classics & Grammar (5)
  {
    id: "cat-san-gita",
    name: "भगवद्गीता व उपनिषद (Gita & Philosophy)",
    group: "संस्कृत वाङ्मय",
    icon: "🕉️",
    bookCount: 35,
    gradient: "from-amber-600 to-yellow-800",
    description: "श्रीमद्भगवद्गीता (सान्वय श्लोक व भावार्थ), ईश, केन, कठ उपनिषद सार।"
  },
  {
    id: "cat-san-vyakaran",
    name: "पाणिनीय संस्कृत व्याकरण (Grammar)",
    group: "संस्कृत वाङ्मय",
    icon: "🪶",
    bookCount: 38,
    gradient: "from-orange-600 to-red-800",
    description: "माहेश्वर सूत्र, प्रत्याहार, अष्टाध्यायी सिद्धांत, धातु व शब्द रूप संग्रह।"
  },
  {
    id: "cat-san-subhashit",
    name: "सुभाषित व नीति शास्त्र (Neeti & Wisdom)",
    group: "संस्कृत वाङ्मय",
    icon: "📿",
    bookCount: 30,
    gradient: "from-yellow-700 to-amber-900",
    description: "चाणक्य नीति, भर्तृहरि नीतिशतक, विदुर नीति एवं सुभाषित रत्नभाण्डागार।"
  },
  {
    id: "cat-san-natak",
    name: "कालिदास एवं संस्कृत नाटक (Dramas)",
    group: "संस्कृत वाङ्मय",
    icon: "🏛️",
    bookCount: 26,
    gradient: "from-rose-700 to-pink-900",
    description: "अभिज्ञानशाकुन्तलम्, मेघदूतम्, रघुवंशम् एवं उत्तररामचरितम्।"
  },
  {
    id: "cat-san-katha",
    name: "पंचतंत्र व हितोपदेश (Sanskrit Fables)",
    group: "संस्कृत वाङ्मय",
    icon: "🐘",
    bookCount: 28,
    gradient: "from-emerald-700 to-teal-900",
    description: "विष्णु शर्मा कृत पंचतंत्र एवं नारायण पंडित रचित हितोपदेश कथाएं।"
  },

  // 7. English Literature & Mastery (5)
  {
    id: "cat-eng-gram",
    name: "English Grammar & Writing",
    group: "English Language & Arts",
    icon: "🖋️",
    bookCount: 46,
    gradient: "from-indigo-600 to-blue-800",
    description: "Wren & Martin, syntax, idioms, vocabulary builders, essays, and comprehension."
  },
  {
    id: "cat-eng-classics",
    name: "Shakespeare & Classic Plays",
    group: "English Language & Arts",
    icon: "👑",
    bookCount: 32,
    gradient: "from-purple-700 to-slate-900",
    description: "Macbeth, Hamlet, The Merchant of Venice, Julius Caesar, and sonnets."
  },
  {
    id: "cat-eng-ind",
    name: "Indian Writing in English",
    group: "English Language & Arts",
    icon: "🦚",
    bookCount: 36,
    gradient: "from-amber-600 to-rose-800",
    description: "R.K. Narayan, Ruskin Bond, Tagore, Mulk Raj Anand, and Sarojini Naidu."
  },
  {
    id: "cat-eng-poetry",
    name: "Poetry & Romanticism",
    group: "English Language & Arts",
    icon: "🌹",
    bookCount: 27,
    gradient: "from-pink-600 to-rose-900",
    description: "Wordsworth, Keats, Shelley, Robert Frost, and modern verse anthologies."
  },
  {
    id: "cat-eng-spok",
    name: "Public Speaking & Vocabulary",
    group: "English Language & Arts",
    icon: "🎙️",
    bookCount: 33,
    gradient: "from-cyan-600 to-teal-800",
    description: "Word Power Made Easy, rhetorical techniques, phonetics, and speech delivery."
  },

  // 8. Novels, Fiction & Philosophy (5)
  {
    id: "cat-nov-classics",
    name: "World Classic Novels",
    group: "Novels & Philosophy",
    icon: "🌍",
    bookCount: 52,
    gradient: "from-slate-700 to-slate-950",
    description: "To Kill a Mockingbird, The Great Gatsby, Pride and Prejudice, War and Peace."
  },
  {
    id: "cat-nov-dystopia",
    name: "Dystopian & Sci-Fi Novels",
    group: "Novels & Philosophy",
    icon: "👁️",
    bookCount: 38,
    gradient: "from-indigo-900 to-black",
    description: "1984, Brave New World, Fahrenheit 451, Animal Farm, and Dune."
  },
  {
    id: "cat-nov-phil",
    name: "Philosophical Allegories",
    group: "Novels & Philosophy",
    icon: "🧘",
    bookCount: 34,
    gradient: "from-amber-700 to-yellow-950",
    description: "The Alchemist, Siddhartha (Hermann Hesse), Meditations (Marcus Aurelius)."
  },
  {
    id: "cat-nov-hist",
    name: "Historical Fiction",
    group: "Novels & Philosophy",
    icon: "⚔️",
    bookCount: 29,
    gradient: "from-stone-700 to-amber-950",
    description: "Train to Pakistan, A Tale of Two Cities, The Book Thief, and epic chronicles."
  },
  {
    id: "cat-nov-mind",
    name: "Self-Mastery & Mindset",
    group: "Novels & Philosophy",
    icon: "💡",
    bookCount: 42,
    gradient: "from-emerald-700 to-teal-950",
    description: "Atomic Habits, Wings of Fire, Deep Work, Mindset, and Ikigai."
  },

  // 9. Comics & Illustrated Graphics (5)
  {
    id: "cat-com-ack",
    name: "Amar Chitra Katha Epics",
    group: "Comics & Illustrated",
    icon: "🏹",
    bookCount: 45,
    gradient: "from-yellow-500 to-red-700",
    description: "Illustrated graphic sagas of Mahabharata, Ramayana, Ashoka, and Shivaji."
  },
  {
    id: "cat-com-sci",
    name: "Science & Technology Comics",
    group: "Comics & Illustrated",
    icon: "🚀",
    bookCount: 31,
    gradient: "from-cyan-500 to-blue-800",
    description: "Illustrated discoveries of Einstein, Newton, Marie Curie, and space exploration."
  },
  {
    id: "cat-com-folklore",
    name: "Tenali Raman & Akbar Birbal",
    group: "Comics & Illustrated",
    icon: "🤹",
    bookCount: 35,
    gradient: "from-orange-500 to-amber-700",
    description: "Witty comic strips of ancient royal courts, riddles, and clever deductions."
  },
  {
    id: "cat-com-graphic",
    name: "Graphic Novels & Manga",
    group: "Comics & Illustrated",
    icon: "💥",
    bookCount: 28,
    gradient: "from-purple-600 to-rose-700",
    description: "Visual storyboarding, heroic arcs, graphic memoirs, and animated tales."
  },
  {
    id: "cat-com-chanda",
    name: "Chandamama & Classic Tales",
    group: "Comics & Illustrated",
    icon: "🌙",
    bookCount: 29,
    gradient: "from-indigo-600 to-purple-800",
    description: "Vikram and Betal moral dilemmas, mythological fantasy, and bedtime adventures."
  },

  // 10. Action, Thriller & Detective (5)
  {
    id: "cat-act-holmes",
    name: "Sherlock Holmes Detective Series",
    group: "Action & Thriller",
    icon: "🔍",
    bookCount: 40,
    gradient: "from-amber-900 to-slate-950",
    description: "A Study in Scarlet, Hound of the Baskervilles, and Victorian London cases."
  },
  {
    id: "cat-act-byomkesh",
    name: "Byomkesh Bakshi & Feluda",
    group: "Action & Thriller",
    icon: "🕵️",
    bookCount: 35,
    gradient: "from-stone-700 to-slate-900",
    description: "Sharp Indian sleuth mysteries in Kolkata, Darjeeling, and Varanasi."
  },
  {
    id: "cat-act-mystery",
    name: "Agatha Christie Murder Mysteries",
    group: "Action & Thriller",
    icon: "🔎",
    bookCount: 38,
    gradient: "from-rose-900 to-slate-950",
    description: "Hercule Poirot, And Then There Were None, and Orient Express suspense."
  },
  {
    id: "cat-act-espionage",
    name: "Espionage & Spy Thrillers",
    group: "Action & Thriller",
    icon: "🕶️",
    bookCount: 30,
    gradient: "from-slate-800 to-red-950",
    description: "Cold war secrets, intelligence agencies, undercover missions, and conspiracies."
  },
  {
    id: "cat-act-adventure",
    name: "Survival & Lost World Quests",
    group: "Action & Thriller",
    icon: "🧭",
    bookCount: 32,
    gradient: "from-teal-800 to-emerald-950",
    description: "Jules Verne, Journey to Center of the Earth, Treasure Island, and expeditions."
  }
];

// Rich curated collection of books
export const CURATED_BOOKS: BookItem[] = [
  // MATHEMATICS
  {
    id: "math-001",
    title: "Concepts of Calculus & Analytical Geometry",
    author: "Prof. George Thomas & Ross Finney",
    category: "Calculus & Analysis",
    subCategory: "Mathematics & Logic",
    classLevel: "Class 11-12 & B.Tech",
    language: "English",
    pages: 640,
    rating: 4.9,
    downloads: 14200,
    year: 2023,
    coverGradient: "from-blue-600 via-indigo-700 to-indigo-900",
    description: "The definitive guide to limits, derivatives, differential equations, and multivariate integration with real-world physics applications.",
    tableOfContents: [
      "Chapter 1: Limits and Continuity",
      "Chapter 2: Differentiation and Rate of Change",
      "Chapter 3: Applications of Derivatives (Maxima & Minima)",
      "Chapter 4: Definite and Indefinite Integrals",
      "Chapter 5: Differential Equations & Series Expansion"
    ],
    sampleChapter: {
      title: "Chapter 1: Limits, Rates of Change, and Tangent Lines",
      content: [
        "In modern mathematics and physical sciences, the concept of a limit is the foundational cornerstone upon which all of differential and integral calculus rests.",
        "Consider a particle traveling along a curved trajectory whose position s(t) changes smoothly over time t. The average velocity between time t0 and t0 + h is given by the difference quotient [s(t0+h) - s(t0)] / h.",
        "As h approaches zero, this average rate converges to the instantaneous rate of change: s'(t0) = lim_{h->0} [s(t0+h) - s(t0)] / h.",
        "Key Theorem: If f(x) is differentiable at x = c, then f(x) must also be continuous at x = c. However, continuity does not inherently guarantee differentiability."
      ]
    },
    keyTakeaways: [
      "Derivative measures instantaneous sensitivity to variation.",
      "Fundamental Theorem connects area under curves to antidifferentiation.",
      "Taylor series enables approximation of non-linear functions."
    ]
  },
  {
    id: "math-002",
    title: "Vedic Mathematics: Rapid Mental Arithmetic",
    author: "Swami Bharati Krishna Tirtha",
    category: "Vedic Maths & Speed Tricks",
    subCategory: "Mathematics & Logic",
    classLevel: "All Classes & Competitive",
    language: "Hindi & English",
    pages: 312,
    rating: 4.8,
    downloads: 18500,
    year: 2022,
    coverGradient: "from-amber-600 via-orange-700 to-red-800",
    description: "16 Sutras and 13 Sub-Sutras for calculating square roots, cubic polynomials, and large multiplications in seconds without paper.",
    tableOfContents: [
      "Sutra 1: Ekadhikina Purvena (By one more than the previous)",
      "Sutra 2: Nikhilam Navatashcaramam Dashatah (All from 9 and last from 10)",
      "Sutra 3: Urdhva Tiryagbhyam (Vertically and Crosswise)",
      "Sutra 4: Paravartya Yojayet (Transpose and Apply)",
      "Sutra 5: Speed Division and Quadratic Factorization"
    ],
    sampleChapter: {
      title: "Sutra 3: Urdhva Tiryagbhyam (Vertically and Crosswise)",
      content: [
        "The Urdhva-Tiryagbhyam formula is the universal multiplication rule in Vedic Mathematics applicable to numbers of any arbitrary length.",
        "To multiply two 2-digit numbers ab x cd: Step 1: Multiply right digits (b x d). Step 2: Cross-multiply and sum (a x d + b x c). Step 3: Multiply left digits (a x c). Carry forward excess tens digits at each phase.",
        "This elegant geometric pattern reduces n-step algebraic multiplication into a single linear mental pass."
      ]
    },
    keyTakeaways: [
      "10x speed boost for SSC, Banking, and JEE quantitative sections.",
      "Eliminates reliance on mechanical calculators.",
      "Stimulates bidirectional brain hemisphere processing."
    ]
  },

  // SCIENCE & PHYSICS
  {
    id: "phys-001",
    title: "Concepts of Physics (Vol 1 & 2)",
    author: "Dr. H.C. Verma (IIT Kanpur)",
    category: "Mechanics & Kinematics",
    subCategory: "Physics & Astronomy",
    classLevel: "Class 11-12 & JEE/NEET",
    language: "English",
    pages: 462,
    rating: 5.0,
    downloads: 32100,
    year: 2023,
    coverGradient: "from-emerald-600 via-teal-700 to-slate-900",
    description: "The holy grail of Indian physics education. Clear intuitive conceptual breakdowns from Newton's Laws to Thermodynamics and Modern Physics.",
    tableOfContents: [
      "Chapter 1: Introduction to Physics and Units",
      "Chapter 2: Physics and Mathematics (Vectors & Calculus)",
      "Chapter 3: Rest and Motion: Kinematics",
      "Chapter 4: The Forces & Newton's Laws of Motion",
      "Chapter 5: Friction and Circular Motion",
      "Chapter 6: Work and Energy Theorem",
      "Chapter 7: Center of Mass & Conservation of Momentum",
      "Chapter 8: Rotational Mechanics"
    ],
    sampleChapter: {
      title: "Chapter 4: The Forces and Free Body Diagrams",
      content: [
        "What is a force? In intuitive terms, force is a push or pull that an object experiences due to interaction with other objects.",
        "To solve any mechanics problem accurately, draw a Free Body Diagram (FBD). Isolate the body of interest, represent it as a point mass, and draw all contact forces (normal reaction, friction, tension) and field forces (gravity mg) acting ON the body.",
        "Newton's Second Law state vectorially: Sigma F_ext = m * a. Only external forces produce acceleration of the center of mass."
      ]
    },
    keyTakeaways: [
      "Focus on qualitative conceptual understanding before equation plugging.",
      "Unmatched objective questions that test deep subtleties.",
      "Essential for IIT-JEE, NEET, and Olympiad aspirants."
    ]
  },
  {
    id: "phys-002",
    title: "Fundamentals of Quantum Mechanics & Relativity",
    author: "Dr. Richard Feynman & David Griffiths",
    category: "Quantum Physics & Relativity",
    subCategory: "Physics & Astronomy",
    classLevel: "B.Sc Physics & Engineering",
    language: "English",
    pages: 520,
    rating: 4.9,
    downloads: 11400,
    year: 2023,
    coverGradient: "from-purple-700 via-violet-800 to-slate-950",
    description: "Wave-particle duality, Schrodinger wave equation, Heisenberg uncertainty principle, quantum entanglement, and special relativity.",
    tableOfContents: [
      "1. The Quantum Revolution: Blackbody Radiation & Photoelectric Effect",
      "2. De Broglie Wavelength & Dual Nature",
      "3. Schrodinger Wave Equation (Time-dependent & Independent)",
      "4. Particle in a 1D Box & Quantum Tunneling",
      "5. Harmonic Oscillator & Angular Momentum",
      "6. Special Theory of Relativity & Time Dilation"
    ],
    sampleChapter: {
      title: "Chapter 3: The Schrodinger Wave Equation",
      content: [
        "In quantum mechanics, the complete physical state of a particle is encapsulated by its complex wave function Psi(x, t).",
        "The time-independent Schrodinger equation reads: - (hbar^2 / 2m) * (d^2 Psi / dx^2) + V(x) Psi = E Psi.",
        "Max Born's probabilistic interpretation dictates that |Psi(x)|^2 dx represents the probability of locating the particle between coordinate x and x + dx."
      ]
    },
    keyTakeaways: [
      "Energy levels in bound systems are quantized, not continuous.",
      "Tunneling permits particles to traverse classical potential barriers.",
      "Forms basis of semiconductor chips, lasers, and quantum computing."
    ]
  },

  // CHEMISTRY
  {
    id: "chem-001",
    title: "Organic Chemistry Mechanisms & Reactions",
    author: "Morrison, Boyd & Bhattacharjee",
    category: "Organic Chemistry Mechanisms",
    subCategory: "Chemistry & Life",
    classLevel: "Class 11-12 & B.Sc",
    language: "English",
    pages: 890,
    rating: 4.8,
    downloads: 16700,
    year: 2023,
    coverGradient: "from-rose-600 via-pink-700 to-purple-900",
    description: "Reaction mechanisms, stereochemistry, electrophilic addition, SN1/SN2 nucleophilic substitutions, aromatic compounds, and biomolecules.",
    tableOfContents: [
      "1. Structure, Bonding, and Hybridization (sp3, sp2, sp)",
      "2. Stereochemistry: Chirality, Enantiomers, and Optical Activity",
      "3. Alkyl Halides: SN1 vs SN2 and E1 vs E2 Mechanisms",
      "4. Aldehydes and Ketones: Nucleophilic Addition & Aldol Condensation",
      "5. Aromatic Compounds & Electrophilic Substitution"
    ],
    sampleChapter: {
      title: "Chapter 3: SN1 vs SN2 Nucleophilic Substitution",
      content: [
        "Nucleophilic substitution is a cornerstone of organic synthetic routes.",
        "SN2 (Substitution Nucleophilic Bimolecular) occurs via a concerted single-step backside attack causing complete Walden inversion of configuration. It proceeds fastest in primary alkyl halides with polar aprotic solvents.",
        "SN1 (Unimolecular) proceeds via a planar carbocation intermediate in two steps, leading to partial racemization."
      ]
    },
    keyTakeaways: [
      "Steric hindrance vs carbocation stability governs mechanism choice.",
      "Arrow pushing diagrams elucidate electron density relocation.",
      "Critical for pharmaceutical chemistry and competitive exams."
    ]
  },

  // HINDI LITERATURE
  {
    id: "hin-001",
    title: "गोदान (Godan) - अमर उपन्यास",
    author: "मुंशी प्रेमचंद (Munshi Premchand)",
    category: "हिंदी प्रसिद्ध उपन्यास (Hindi Novels)",
    subCategory: "हिंदी साहित्य व भाषा",
    classLevel: "All Classes & Literature",
    language: "Hindi (हिंदी)",
    pages: 368,
    rating: 5.0,
    downloads: 38400,
    year: 2022,
    coverGradient: "from-amber-700 via-orange-800 to-amber-950",
    description: "भारतीय ग्रामीण जीवन, किसान होरी और धनिया के संघर्ष, सामाजिक शोषण और कृषक ऋणग्रस्तता का अमर यथार्थवादी उपन्यास।",
    tableOfContents: [
      "प्रकरण १: होरी की गाय की अभिलाषा",
      "प्रकरण २: रायसाहब से भेंट और जमींदारी व्यवस्था",
      "प्रकरण ३: गोबर और झुनिया का प्रसंग",
      "प्रकरण ४: बिरादरी का दण्ड और ऋण का बोझ",
      "प्रकरण ५: धनिया का स्वाभिमान और अंतिम संघर्ष"
    ],
    sampleChapter: {
      title: "प्रकरण १: होरी की गाय की अभिलाषा",
      content: [
        "होरी महतो ने दोनों बैलों को सानी-पानी देकर अपनी पत्नी धनिया से कहा— 'गोबर को जरा जेठ के पास भेज देना, आज खलिहान का काम निपटाना है।'",
        "होरी के मन में वर्षों से एक लालसा थी कि द्वार पर एक पछाईं गाय बंधे। गाय का घर में होना केवल दूध का साधन नहीं, बल्कि ग्रामीण समाज में प्रतिष्ठा और धर्म का सबसे बड़ा प्रतीक था।",
        "धनिया यथार्थवादी थी। उसने कहा— 'पेट भरने को दाना नहीं, और तुम गाय के सपने देख रहे हो! पहले कर्जे का ब्याज तो चुकाओ।' किंतु होरी की आँखों में किसान की अनंत आशा जीवित थी।"
      ]
    },
    keyTakeaways: [
      "भारतीय समाजशास्त्र और किसान मनोविज्ञान का सबसे प्रामाणिक दस्तावेज।",
      "प्रेमचंद की सहज, मुहावरेदार और मार्मिक हिंदी गद्य शैली।",
      "UPSC हिंदी साहित्य व माध्यमिक/उच्च कक्षाओं का अनिवार्य ग्रन्थ।"
    ]
  },
  {
    id: "hin-002",
    title: "रश्मिरथी (Rashmirathi) - कर्ण चरित",
    author: "राष्ट्रकवि रामधारी सिंह 'दिनकर'",
    category: "हिंदी काव्य व खंडकाव्य (Poetry)",
    subCategory: "हिंदी साहित्य व भाषा",
    classLevel: "Class 9-12 & Poetry Lovers",
    language: "Hindi (हिंदी)",
    pages: 180,
    rating: 5.0,
    downloads: 29800,
    year: 2023,
    coverGradient: "from-red-600 via-rose-700 to-orange-950",
    description: "महाभारत के दानवीर कर्ण के शौर्य, स्वाभिमान, मित्रता और सामाजिक उपेक्षा पर लिखा गया कालजयी खंडकाव्य।",
    tableOfContents: [
      "प्रथम सर्ग: कर्ण का रंगभूमि में प्रदर्शन",
      "द्वितीय सर्ग: परशुराम आश्रम में शिक्षा व शाप",
      "तृतीय सर्ग: कृष्ण की चेतावनी ('वर्षों तक वन में घूम-घूम')",
      "चतुर्थ सर्ग: कर्ण का इंद्र को कवच-कुंडल दान",
      "पंचम सर्ग: कुंती-कर्ण संवाद",
      "षष्ठ व सप्तम सर्ग: कुरुक्षेत्र का महासमर व बलिदान"
    ],
    sampleChapter: {
      title: "तृतीय सर्ग: श्री कृष्ण की चेतावनी",
      content: [
        "वर्षों तक वन में घूम-घूम, बाधा-विघ्नों को चूम-चूम,",
        "सह धूप-घाम, पानी-पत्थर, पांडव आये कुछ और निखर।",
        "सौभाग्य न सब दिन सोता है, देखें, आगे क्या होता है?",
        "मैत्री की राह बताने को, सबको सुमार्ग पर लाने को,",
        "दुर्योधन को समझाने को, भीषण विध्वंस बचाने को,",
        "भगवान हस्तिनापुर आये, पांडव का संदेशा लाये।",
        "'दो न्याय अगर तो आधा दो, पर, इसमें भी यदि बाधा हो,",
        "तो दे दो केवल पाँच ग्राम, रक्खो अपनी धरती तमाम।'"
      ]
    },
    keyTakeaways: [
      "वीर रस और ओजस्वी भाषा का सर्वोत्कृष्ट उदाहरण।",
      "कर्ण के चरित्र के माध्यम से योग्यता बनाम जन्म का दार्शनिक प्रश्न।",
      "प्रत्येक विद्यार्थी के वाचन कौशल व वक्तृत्व के लिए प्रेरणादायक।"
    ]
  },

  // SANSKRIT
  {
    id: "san-001",
    title: "श्रीमद्भगवद्गीता (Shreemad Bhagavad Gita)",
    author: "महर्षि वेदव्यास (संस्कृत एवं हिंदी अनुवाद)",
    category: "भगवद्गीता व उपनिषद (Gita & Philosophy)",
    subCategory: "संस्कृत वाङ्मय",
    classLevel: "All Ages & Higher Studies",
    language: "Sanskrit & Hindi",
    pages: 420,
    rating: 5.0,
    downloads: 41200,
    year: 2024,
    coverGradient: "from-amber-600 via-yellow-700 to-amber-950",
    description: "700 श्लोकों का सम्पूर्ण संकलन, अन्वय, शब्दार्थ, सरल हिंदी व्याख्या व कर्मयोग, ज्ञानयोग और भक्तियोग का दार्शनिक विश्लेषण।",
    tableOfContents: [
      "अध्याय १: अर्जुनविषादयोग",
      "अध्याय २: सांख्ययोग (स्थितप्रज्ञ लक्षण व कर्मण्येवाधिकारस्ते)",
      "अध्याय ३: कर्मयोग",
      "अध्याय ४: ज्ञानकर्मसंन्यासयोग",
      "अध्याय १२: भक्तियोग",
      "अध्याय १८: मोक्षसंन्यासयोग"
    ],
    sampleChapter: {
      title: "अध्याय २: सांख्ययोग - श्लोक ४७",
      content: [
        "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
        "मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        "पदच्छेदः कर्मणि एव अधिकारः ते, मा फलेषु कदाचन। मा कर्मफलहेतुः भूः, मा ते सङ्गः अस्तु अकर्मणि।",
        "सरलार्थ: हे अर्जुन! तेरा अधिकार केवल कर्म करने में ही है, उसके फलों में कभी नहीं। इसलिए तू कर्मफल का हेतु मत बन, और न ही कर्म न करने में तेरी आसक्ति हो।"
      ]
    },
    keyTakeaways: [
      "मानसिक तनाव, असमंजस व अवसाद का शाश्वत समाधान।",
      "कर्तव्यनिष्ठा और संतुलित जीवन शैली का मार्गदर्शन।",
      "संस्कृत व्याकरण, संधि, समास व पदच्छेद सीखने का अनुपम स्रोत।"
    ]
  },

  // NOVELS & FICTION
  {
    id: "nov-001",
    title: "The Alchemist (The Soul of the World)",
    author: "Paulo Coelho",
    category: "Philosophical Allegories",
    subCategory: "Novels & Philosophy",
    classLevel: "All Ages",
    language: "English & Hindi Available",
    pages: 208,
    rating: 4.9,
    downloads: 48900,
    year: 2021,
    coverGradient: "from-amber-500 via-yellow-600 to-amber-900",
    description: "The magical fable of Santiago, an Andalusian shepherd boy who journeys to the Egyptian pyramids in search of his Personal Legend.",
    tableOfContents: [
      "Part One: The Tarifa Fortune-Teller & Melchizedek the King",
      "Part Two: The Crystal Merchant in Tangier",
      "Part Three: Journey Across the Sahara Desert",
      "Part Four: The Oasis of Al-Fayoum & Meeting the Alchemist",
      "Part Five: The Pyramids and the Ultimate Truth"
    ],
    sampleChapter: {
      title: "Part One: The Secret of the Personal Legend",
      content: [
        "'What's the world's greatest lie?' the boy asked, completely surprised.",
        "'It's this: that at a certain point in our lives, we lose control of what's happening to us, and our lives become controlled by fate. That's the world's greatest lie,' said the old King of Salem.",
        "'When you want something, all the universe conspires in helping you to achieve it. To realize one's destiny is a person's only real obligation.'"
      ]
    },
    keyTakeaways: [
      "Follow omens and listen to your true intuition.",
      "The journey itself reveals the treasure rather than merely the destination.",
      "Overcoming fear of failure is the highest alchemy."
    ]
  },
  {
    id: "nov-002",
    title: "1984 (Big Brother is Watching You)",
    author: "George Orwell",
    category: "Dystopian & Sci-Fi Novels",
    subCategory: "Novels & Philosophy",
    classLevel: "High School & College",
    language: "English",
    pages: 328,
    rating: 4.8,
    downloads: 36200,
    year: 2022,
    coverGradient: "from-slate-800 via-slate-900 to-black",
    description: "The haunting dystopian prophecy of Winston Smith in Oceania, ruled by the Party, Thought Police, Doublethink, and the omnipresent Big Brother.",
    tableOfContents: [
      "Chapter 1: The Telescreen and the Diary",
      "Chapter 2: Two Minutes Hate & Emmanuel Goldstein",
      "Chapter 3: The Ministry of Truth (Minitrue)",
      "Chapter 4: Julia and the Antique Shop in the Prole District",
      "Chapter 5: Room 101 and the Triumph of Doublethink"
    ],
    sampleChapter: {
      title: "Chapter 1: The Clock was Striking Thirteen",
      content: [
        "It was a bright cold day in April, and the clocks were striking thirteen.",
        "Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions.",
        "On each landing, opposite the lift-shaft, the poster with the enormous face gazed from the wall: BIG BROTHER IS WATCHING YOU."
      ]
    },
    keyTakeaways: [
      "The power of language: Newspeak narrows the range of independent thought.",
      "The preservation of objective historical truth against manipulation.",
      "A timeless defense of human freedom and personal dignity."
    ]
  },

  // COMICS & GRAPHIC NOVELS
  {
    id: "com-001",
    title: "Amar Chitra Katha: Great Epics & Legends Illustrated",
    author: "Anant Pai (Uncle Pai) & ACK Art Studio",
    category: "Amar Chitra Katha Epics",
    subCategory: "Comics & Illustrated",
    classLevel: "Class 1 - 10 & Youth",
    language: "English & Hindi",
    pages: 144,
    rating: 4.9,
    downloads: 51200,
    year: 2023,
    coverGradient: "from-yellow-500 via-red-600 to-rose-900",
    description: "Vibrant graphic comic panels recounting the heroic adventures of Abhimanyu in the Chakravyuha, Ashoka the Great, and Rana Pratap.",
    tableOfContents: [
      "Episode 1: The Young Prince of Dwaraka",
      "Episode 2: Dronacharya's Formidable Circular Battle Formation",
      "Episode 3: The Valor of Sixteen-Year-Old Abhimanyu",
      "Episode 4: The Code of Chivalry and the Final Sunset",
      "Episode 5: Historical Analysis & Moral Legacy"
    ],
    sampleChapter: {
      title: "Episode 2: The Chakravyuha Conundrum",
      content: [
        "[Panel 1: Clouded skies over Kurukshetra. Guru Dronacharya arranges his legion into concentric spinning spirals of armored chariots and spearmen.]",
        "Yudhishthira: 'Arjuna has been lured far to the south! Who among us knows the secret to breach the Guru's Chakravyuha?'",
        "Young Abhimanyu steps forward with his golden bow: 'Father taught me how to break into the formation while I was in my mother's womb!'"
      ]
    },
    keyTakeaways: [
      "Graphic visual storytelling enhances historical retention by 400%.",
      "Teaches courage, selflessness, and strategic thinking.",
      "Beloved by generations across Indian households."
    ]
  },

  // ACTION & THRILLER
  {
    id: "act-001",
    title: "The Complete Adventures of Sherlock Holmes",
    author: "Sir Arthur Conan Doyle",
    category: "Sherlock Holmes Detective Series",
    subCategory: "Action & Thriller",
    classLevel: "All Ages",
    language: "English",
    pages: 480,
    rating: 4.9,
    downloads: 44100,
    year: 2023,
    coverGradient: "from-amber-900 via-stone-800 to-slate-950",
    description: "The world's greatest consulting detective at 221B Baker Street. A Study in Scarlet, The Hound of the Baskervilles, and The Red-Headed League.",
    tableOfContents: [
      "1. A Study in Scarlet (The Science of Deduction)",
      "2. The Red-Headed League",
      "3. A Scandal in Bohemia (Irene Adler)",
      "4. The Adventure of the Speckled Band",
      "5. The Final Problem (Professor Moriarty at Reichenbach Falls)"
    ],
    sampleChapter: {
      title: "The Science of Deduction (From A Study in Scarlet)",
      content: [
        "'You appeared surprised when I told you, on our first meeting, that you had come from Afghanistan,' said Holmes.",
        "'You were told, no doubt,' Watson replied.",
        "'Nothing of the sort. I knew you came from Afghanistan. From long habit the train of thoughts ran so swiftly through my mind that I arrived at the conclusion without being conscious of intermediate steps.'",
        "'Here is a medical gentleman, but with the air of a military man... Where in the tropics could an English army doctor have seen hardship and been wounded? Afghanistan!'"
      ]
    },
    keyTakeaways: [
      "Mastery of observational reasoning and logical deduction.",
      "Crisp 19th-century Victorian English prose.",
      "Classic foundation for modern forensic and analytical methodology."
    ]
  },
  {
    id: "act-002",
    title: "Byomkesh Bakshi: Satyanweshi (The Truth Seeker)",
    author: "Sharadindu Bandyopadhyay",
    category: "Byomkesh Bakshi & Feluda",
    subCategory: "Action & Thriller",
    classLevel: "Class 8-12 & College",
    language: "English & Hindi Translations",
    pages: 310,
    rating: 4.9,
    downloads: 26500,
    year: 2023,
    coverGradient: "from-stone-700 via-amber-900 to-slate-900",
    description: "The sharp Indian detective who refuses to be called a private eye—he is a 'Satyanweshi' (Seeker of Truth) cracking intricate mysteries in 1930s Kolkata.",
    tableOfContents: [
      "Case 1: Satyanweshi (The Disappearance in Chinatown)",
      "Case 2: Pother Kanta (The Gramophone Pin Murder)",
      "Case 3: Arthamanartham (The Deadly Will)",
      "Case 4: Makorshar Rosh (The Venom of the Spider)",
      "Case 5: Chitrachor (The Picture Thief)"
    ],
    sampleChapter: {
      title: "Case 2: Pother Kanta (The Gramophone Pin)",
      content: [
        "A series of seemingly inexplicable deaths had baffled the Kolkata police. Healthy men were dropping dead on the street without a mark on their bodies.",
        "Byomkesh bent over the post-mortem report with Ajit. 'Observe, Ajit babu. The coroner found a minute puncture behind the earlobe, no larger than the prick of a thorn.'",
        "'Could it be a poisoned needle blown from an umbrella tip?' asked Ajit. Byomkesh smiled faintly: 'A truth seeker looks for what is cheapest, most invisible, and discarded in plain sight... a simple gramophone needle propelled by an adapted spring!'"
      ]
    },
    keyTakeaways: [
      "Brilliant Indian detective fiction rooted in authentic social textures.",
      "Celebrates keen observation over high-tech machinery.",
      "Engrossing narratives that sharpen critical thinking."
    ]
  }
];

export function getBookAuthorBio(book: BookItem): string {
  if (book.authorBio && book.authorBio.trim()) return book.authorBio;
  const author = (book.author || "").toLowerCase();
  if (author.includes("h.c. verma") || author.includes("hc verma")) {
    return "Dr. H.C. Verma is an acclaimed Indian experimental nuclear physicist, former professor at IIT Kanpur, and Padma Shri recipient celebrated for making physics accessible to millions of students.";
  }
  if (author.includes("thomas") || author.includes("finney")) {
    return "George B. Thomas and Ross L. Finney were renowned MIT mathematics educators whose classic textbook series revolutionized modern analytical geometry and calculus instruction.";
  }
  if (author.includes("feynman") || author.includes("griffiths")) {
    return "Nobel laureate Richard Feynman and David Griffiths are monumental physicists world-renowned for pedagogical mastery in quantum mechanics, electrodynamics, and theoretical physics.";
  }
  if (author.includes("tirtha") || author.includes("vedic")) {
    return "Swami Bharati Krishna Tirtha was the revered Shankaracharya of Govardhana matha who reconstructed the 16 foundational sutras of Vedic Mathematics.";
  }
  if (author.includes("morrison") || author.includes("boyd")) {
    return "Robert T. Morrison and Robert N. Boyd were preeminent chemists at New York University whose treatise shaped global university curricula in organic synthesis.";
  }
  if (author.includes("premchand")) {
    return "Munshi Premchand (1880–1936), hailed as 'Upanyas Samrat', is modern Indian literature's most revered novelist and short-story master.";
  }
  if (author.includes("shakespeare")) {
    return "William Shakespeare (1564–1616) is widely regarded as the greatest dramatist in the English language, author of iconic tragedies, comedies, and sonnets.";
  }
  if (author.includes("doyle") || author.includes("holmes")) {
    return "Sir Arthur Conan Doyle (1859–1930) was a Scottish author and physician whose creation of Sherlock Holmes forever changed mystery and detective fiction.";
  }
  if (author.includes("panini") || author.includes("vyakaran")) {
    return "Acharya Panini was the ancient Indian grammarian whose 3,959 sutras in the Ashtadhyayi created the world's first complete formal generative linguistics system.";
  }
  if (author.includes("bandyopadhyay") || author.includes("byomkesh")) {
    return "Sharadindu Bandyopadhyay (1899–1970) was a celebrated Indian Bengali writer best known for creating the iconic detective Byomkesh Bakshi.";
  }
  if (author.includes("vyasa") || author.includes("valmiki") || author.includes("gita")) {
    return "Maharshi Vedavyasa is the venerated sage and compiler of the Vedas, author of the Mahabharata, and narrator of the Shrimad Bhagavad Gita.";
  }
  if (author.includes("chanakya") || author.includes("kautilya")) {
    return "Acharya Chanakya (Vishnugupta) was the ancient Indian teacher, philosopher, and royal advisor who authored the Arthashastra and Chanakya Neeti.";
  }
  return `Distinguished scholar and curriculum authority with recognized pedagogical research and published textbooks in ${book.category}.`;
}

export function getBookCoverImage(book: BookItem): string {
  if (book.coverImage && book.coverImage.trim()) return book.coverImage;
  const slug = encodeURIComponent(book.id || book.title.toLowerCase().replace(/[^a-z0-9]/g, "-"));
  return `https://picsum.photos/seed/${slug}/400/600`;
}
