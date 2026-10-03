export interface VideoQuizMCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EducationalVideo {
  id: string; // YouTube Video ID
  title: string;
  channel: string;
  category: string;
  domain: string;
  duration: string;
  views: string;
  rating: number; // e.g. 4.9
  language: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  keyConcepts: string[];
  connectedBookTitles: string[];
  mcqs: VideoQuizMCQ[];
}

export const CURATED_EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  // 1. Cosmology & Astrophysics
  {
    id: "3pAnRKD4raY", // Kurzgesagt - The Last Human on Earth / Black Holes
    title: "The Ultimate Guide to Black Holes & Event Horizons",
    channel: "Kurzgesagt – In a Nutshell",
    category: "Astrophysics & Cosmology",
    domain: "Space & Cosmology",
    duration: "11:42",
    views: "18.5M views",
    rating: 4.95,
    language: "English & Hindi Subtitles",
    difficulty: "Beginner",
    summary: "A visually stunning conceptual walkthrough of stellar collapse, gravitational singularity, Hawking radiation, and the anatomy of supermassive black holes.",
    keyConcepts: [
      "Gravitational singularity and Schwarzschild radius",
      "Hawking radiation and black hole evaporation",
      "Time dilation near the event horizon"
    ],
    connectedBookTitles: [
      "Astrophysics & Modern Cosmology: From Big Bang to Multiverse",
      "The Universe: Stars, Galaxies and Deep Space"
    ],
    mcqs: [
      {
        question: "What is the theoretical boundary around a black hole beyond which nothing, not even light, can escape?",
        options: ["Singularity", "Photon Sphere", "Event Horizon", "Ergosphere"],
        correctIndex: 2,
        explanation: "The event horizon marks the boundary where the escape velocity equals the speed of light."
      },
      {
        question: "Who theoretically predicted that black holes emit thermal radiation and can slowly evaporate?",
        options: ["Albert Einstein", "Stephen Hawking", "Subrahmanyan Chandrasekhar", "Roger Penrose"],
        correctIndex: 1,
        explanation: "Stephen Hawking mathematically predicted Hawking radiation in 1974."
      }
    ]
  },
  {
    id: "q3MWRvLndzs", // 3Blue1Brown - Gravitational waves / relativity
    title: "General Relativity & Curved Spacetime Explained Intuitively",
    channel: "3Blue1Brown",
    category: "Astrophysics & Cosmology",
    domain: "Space & Cosmology",
    duration: "15:20",
    views: "5.2M views",
    rating: 4.98,
    language: "English (Multilingual Captions)",
    difficulty: "Intermediate",
    summary: "Visualizing Einstein's field equations and why mass tells spacetime how to curve, while spacetime tells mass how to move.",
    keyConcepts: [
      "Equivalence Principle and free-fall geodesics",
      "Riemannian curvature tensor basics",
      "Gravitational lensing and planetary orbits"
    ],
    connectedBookTitles: [
      "Astrophysics & Modern Cosmology: From Big Bang to Multiverse",
      "Quantum Mechanics & Relativity: The Physical Foundations"
    ],
    mcqs: [
      {
        question: "According to general relativity, gravity is not a traditional pulling force but instead:",
        options: [
          "Curvature of spacetime caused by mass and energy",
          "An electromagnetic wave with high frequency",
          "A quantum gluon exchange between atoms",
          "Centrifugal force from planetary rotation"
        ],
        correctIndex: 0,
        explanation: "Einstein demonstrated that mass and energy curve spacetime, and objects follow geodesics in this curved geometry."
      }
    ]
  },

  // 2. Mathematics & Calculus
  {
    id: "WUvTyaaNkzM", // 3Blue1Brown - Essence of Calculus
    title: "The Essence of Calculus: The Fundamental Idea Behind Derivatives",
    channel: "3Blue1Brown",
    category: "Calculus & Analysis",
    domain: "Mathematics & Logic",
    duration: "17:04",
    views: "12.8M views",
    rating: 4.99,
    language: "English & Hindi Subtitles",
    difficulty: "Beginner",
    summary: "How finding the area of a circle naturally introduces integration, and why derivatives represent instantaneous rates of change in geometry and physics.",
    keyConcepts: [
      "Limit definitions as step size approaches zero",
      "Geometric intuition behind d/dx and differential rings",
      "The Fundamental Theorem of Calculus connecting areas and slopes"
    ],
    connectedBookTitles: [
      "Advanced Engineering Mathematics & Calculus",
      "Foundations of Real Analysis & Complex Variables"
    ],
    mcqs: [
      {
        question: "The derivative of f(x) = x^3 with respect to x is:",
        options: ["3x^2", "x^2 / 3", "3x", "6x"],
        correctIndex: 0,
        explanation: "Using the power rule d/dx[x^n] = n*x^(n-1), the derivative is 3x^2."
      },
      {
        question: "What does the definite integral of a positive function between a and b represent geometrically?",
        options: ["The maximum slope", "The net area under the curve", "The inflection point", "The circumference"],
        correctIndex: 1,
        explanation: "The definite integral calculates the total accumulated area under the curve between boundaries a and b."
      }
    ]
  },
  {
    id: "fNk_zzaMoSs", // 3Blue1Brown - Essence of Linear Algebra
    title: "Essence of Linear Algebra: Vectors, Matrices & Linear Transformations",
    channel: "3Blue1Brown",
    category: "Algebra & Linear Systems",
    domain: "Mathematics & Logic",
    duration: "14:18",
    views: "7.9M views",
    rating: 4.97,
    language: "English & Hindi Subtitles",
    difficulty: "Beginner",
    summary: "A geometric understanding of vectors, coordinate systems, and how matrices represent dynamic geometric transformations of space.",
    keyConcepts: [
      "Basis vectors i-hat and j-hat",
      "Matrix-vector multiplication as linear transformation",
      "Determinant as the scaling factor of area/volume"
    ],
    connectedBookTitles: [
      "Linear Algebra: Matrices, Vector Spaces & Eigenvalues",
      "Algebra & Linear Systems: Computational Methods"
    ],
    mcqs: [
      {
        question: "If the determinant of a 2x2 matrix is zero, what does it mean for the transformation?",
        options: [
          "It squishes 2D space into a 1D line or point (not invertible)",
          "It doubles the area of the shape",
          "It rotates the plane by 90 degrees",
          "It reflects coordinates across the y-axis"
        ],
        correctIndex: 0,
        explanation: "A zero determinant indicates that space has been squashed into a lower dimension, making the transformation irreversible."
      }
    ]
  },

  // 3. Indian History & Ancient Civilizations
  {
    id: "g5eE3z512zI", // Indus Valley Civilization
    title: "Indus Valley Civilization: Urban Planning, Trade & Mystery of the Harappans",
    channel: "CrashCourse / Historical Archeology",
    category: "Indian History & Heritage",
    domain: "History & Civilization",
    duration: "13:25",
    views: "4.1M views",
    rating: 4.91,
    language: "English & Hindi Captions",
    difficulty: "Beginner",
    summary: "Explore the extraordinary bronze age urban planning of Mohenjo-Daro and Harappa, grid town layouts, covered drainage systems, dockyards at Lothal, and undeciphered script.",
    keyConcepts: [
      "Grid layout and baked brick standardized ratios (1:2:4)",
      "The Great Bath and advanced municipal hydraulic engineering",
      "Maritime trading routes with Mesopotamia (Dilmun and Meluhha)"
    ],
    connectedBookTitles: [
      "Ancient Indian Civilization: From Harappa to Maurya",
      "Archaeology of Ancient Bharat: Excavations & Artifacts"
    ],
    mcqs: [
      {
        question: "Which Indus Valley Civilization site features the earliest known tidal dockyard in world history?",
        options: ["Lothal", "Kalibangan", "Dholavira", "Rakhigarhi"],
        correctIndex: 0,
        explanation: "Lothal in Gujarat contains a massive tidal dockyard connecting to ancient Arabian sea trade routes."
      },
      {
        question: "What unique municipal feature distinguished Harappan cities from contemporary Bronze Age cities?",
        options: [
          "Covered underground domestic drainage and sewage systems",
          "Gigantic stone pyramids for emperors",
          "Iron weaponry arsenals",
          "Coinage-based monetary systems"
        ],
        correctIndex: 0,
        explanation: "Harappan settlements featured advanced, standardized covered underground drains and soak pits for domestic waste."
      }
    ]
  },
  {
    id: "6lU03K3V0jA", // Maurya Empire & Ashoka
    title: "The Maurya Empire & Ashoka the Great: Edicts, Dhamma & Governance",
    channel: "World History Project",
    category: "Ancient History & Archaeology",
    domain: "History & Civilization",
    duration: "16:40",
    views: "3.2M views",
    rating: 4.93,
    language: "English & Hindi Captions",
    difficulty: "Intermediate",
    summary: "How Chandragupta Maurya and Chanakya established the first pan-Indian empire, the Kalinga war, and Ashoka's monumental rock edicts advocating non-violence and civic welfare.",
    keyConcepts: [
      "Arthashastra: statecraft, intelligence, and fiscal economics",
      "Kalinga War (261 BCE) transformation of Ashoka",
      "Lion Capital of Sarnath and propagation of Buddhism"
    ],
    connectedBookTitles: [
      "Ancient Indian Civilization: From Harappa to Maurya",
      "Chanakya Neeti & Arthashastra: Principles of Governance"
    ],
    mcqs: [
      {
        question: "The national emblem of modern India is adapted from which ancient Mauryan architectural relic?",
        options: ["Lion Capital of Sarnath", "Rampurva Bull Capital", "Sanchi Stupa Gateway", "Mehrauli Iron Pillar"],
        correctIndex: 0,
        explanation: "The Lion Capital erected by Emperor Ashoka at Sarnath was adopted as the National Emblem of India in 1950."
      }
    ]
  },

  // 4. World History & Prehistoric Life
  {
    id: "Yocja_N5s1I", // Crash Course World History - Agricultural Revolution
    title: "The Agricultural Revolution: How Farming Reshaped Human Civilization",
    channel: "CrashCourse",
    category: "World History & Global Events",
    domain: "History & Civilization",
    duration: "11:11",
    views: "14.2M views",
    rating: 4.88,
    language: "English & Hindi Subtitles",
    difficulty: "Beginner",
    summary: "How the transition from hunter-gatherer bands to sedentary grain cultivation created social stratification, written language, empires, and modern civilizations.",
    keyConcepts: [
      "Fertile Crescent domestication of wheat, barley, and sheep",
      "Surplus grain storage and emergence of specialized craft roles",
      "Invention of cuneiform and hieroglyphic accounting"
    ],
    connectedBookTitles: [
      "World History: From Fertile Crescent to the 21st Century",
      "Prehistoric Life & Human Evolution: The Fossil Record"
    ],
    mcqs: [
      {
        question: "The Neolithic transition from nomadic foraging to agriculture began approximately how many years ago?",
        options: ["10,000 to 12,000 years ago", "50,000 years ago", "3,000 years ago", "100,000 years ago"],
        correctIndex: 0,
        explanation: "The Neolithic Agricultural Revolution began around 10,000-12,000 BCE in regions like the Fertile Crescent."
      }
    ]
  },
  {
    id: "dGiQaabX3_o", // PBS Eons - Dinosaurs & Extinction
    title: "When Dinosaurs Ruled the Earth: The Cretaceous-Paleogene Mass Extinction",
    channel: "PBS Eons",
    category: "Dinosaurs & Paleontology",
    domain: "Biology & Life Sciences",
    duration: "12:50",
    views: "6.8M views",
    rating: 4.94,
    language: "English & Multilingual Subtitles",
    difficulty: "Beginner",
    summary: "Investigating the Chicxulub asteroid impact in the Yucatan peninsula 66 million years ago, the iridium layer anomaly, and the rise of placental mammals.",
    keyConcepts: [
      "K-Pg boundary and Alvarez iridium anomaly hypothesis",
      "Nuclear winter scenario and disruption of photosynthetic chains",
      "Survival of avian dinosaurs (modern birds) and burrowing mammals"
    ],
    connectedBookTitles: [
      "Dinosaurs & Prehistoric Earth: Paleontological Field Guide",
      "Evolutionary Biology & Genetics"
    ],
    mcqs: [
      {
        question: "What rare element found worldwide in a thin geological sediment layer provided key evidence for an asteroid impact 66 million years ago?",
        options: ["Iridium", "Titanium", "Uranium", "Lithium"],
        correctIndex: 0,
        explanation: "Iridium is scarce in Earth's crust but abundant in asteroids, forming the famous global K-Pg boundary layer."
      }
    ]
  },

  // 5. Artificial Intelligence, Computer Science & Technology
  {
    id: "aircAruvnKk", // 3Blue1Brown - What is a Neural Network?
    title: "But what is a neural network? Deep learning, chapter 1",
    channel: "3Blue1Brown",
    category: "AI, Machine Learning & Data Science",
    domain: "Technology & Engineering",
    duration: "19:13",
    views: "16.1M views",
    rating: 4.99,
    language: "English & Hindi Subtitles",
    difficulty: "Beginner",
    summary: "Visualizing neurons, activation layers, weights, biases, and how a multilayer perceptron recognizes handwritten digits (MNIST).",
    keyConcepts: [
      "Weights, biases, and sigmoid/ReLU activation functions",
      "Matrix multiplication of layers (W * a + b)",
      "High-dimensional pattern recognition as mathematical geometric separation"
    ],
    connectedBookTitles: [
      "Artificial Intelligence & Deep Learning Architecture",
      "Data Structures, Algorithms & Computational Complexity"
    ],
    mcqs: [
      {
        question: "In an artificial neural network, what role do weights and biases play?",
        options: [
          "They are the learnable parameters that adjust how inputs are combined and fired",
          "They permanently freeze the model into read-only memory",
          "They calculate the server electricity consumption",
          "They translate Python code into machine binary"
        ],
        correctIndex: 0,
        explanation: "Weights determine the strength of connections between neurons, and biases shift activation thresholds."
      }
    ]
  },
  {
    id: "IHZwWFHWa-w", // 3Blue1Brown - Gradient Descent & Backpropagation
    title: "Gradient Descent, How Neural Networks Learn: Deep Learning Chapter 2",
    channel: "3Blue1Brown",
    category: "AI, Machine Learning & Data Science",
    domain: "Technology & Engineering",
    duration: "21:01",
    views: "8.3M views",
    rating: 4.98,
    language: "English & Hindi Subtitles",
    difficulty: "Intermediate",
    summary: "How cost functions evaluate model errors and how calculating the negative gradient guides parameters down multidimensional valleys to optimal weights.",
    keyConcepts: [
      "Cost/Loss functions (Mean Squared Error, Cross-Entropy)",
      "Partial derivatives and gradient vector direction",
      "Stochastic Gradient Descent (SGD) and local minima avoidance"
    ],
    connectedBookTitles: [
      "Artificial Intelligence & Deep Learning Architecture",
      "Advanced Engineering Mathematics & Calculus"
    ],
    mcqs: [
      {
        question: "The gradient of a multivariable cost function points in the direction of:",
        options: [
          "Steepest rate of increase of the cost",
          "Steepest rate of decrease of the cost",
          "A random perpendicular tangent",
          "The coordinate origin (0,0)"
        ],
        correctIndex: 0,
        explanation: "The gradient vector always points toward steepest ascent, so optimization algorithms step in the opposite direction (-gradient)."
      }
    ]
  },

  // 6. Biology, Health & Human Anatomy
  {
    id: "8IlzKri08kk", // Crash Course Biology - DNA Structure
    title: "DNA, Hot Pockets, & The Longest Word Ever: Crash Course Biology",
    channel: "CrashCourse",
    category: "Genetics & Molecular Biology",
    domain: "Biology & Life Sciences",
    duration: "13:08",
    views: "5.7M views",
    rating: 4.89,
    language: "English & Hindi Subtitles",
    difficulty: "Beginner",
    summary: "The double helix architecture discovered by Watson, Crick, and Rosalind Franklin, nucleotide base pairing (A-T, G-C), transcription to mRNA, and translation to proteins.",
    keyConcepts: [
      "Antiparallel sugar-phosphate backbone and 5' to 3' polarity",
      "Complementary hydrogen bonding (A with T, G with C)",
      "Central Dogma: DNA -> RNA -> Ribosomal Protein Synthesis"
    ],
    connectedBookTitles: [
      "Molecular Biology, Genetics & Cellular Architecture",
      "Human Anatomy, Physiology & Clinical Medicine"
    ],
    mcqs: [
      {
        question: "Which nitrogenous base pairs with Adenine (A) in a DNA double helix via two hydrogen bonds?",
        options: ["Thymine (T)", "Cytosine (C)", "Guanine (G)", "Uracil (U)"],
        correctIndex: 0,
        explanation: "In DNA, Adenine (A) pairs specifically with Thymine (T) via two hydrogen bonds (Uracil replaces Thymine in RNA)."
      }
    ]
  },
  {
    id: "gYu5I6Wl5gA", // Osmosis - Cardiovascular System
    title: "Cardiovascular System Anatomy & Blood Circulation: Heart Chamber Flow",
    channel: "Osmosis / Medical Education",
    category: "Human Anatomy & Medicine",
    domain: "Health & Human Sciences",
    duration: "10:45",
    views: "3.4M views",
    rating: 4.96,
    language: "English (Multilingual Medical Terms)",
    difficulty: "Beginner",
    summary: "Systematic walkthrough of systemic versus pulmonary circulation, right atrium, tricuspid valve, right ventricle, pulmonary artery to lungs, and oxygenated delivery via aorta.",
    keyConcepts: [
      "Deoxygenated venous return through Superior & Inferior Vena Cava",
      "Atrioventricular and semilunar heart valve functions",
      "Sinoatrial (SA) node cardiac pacemaker electrical conduction"
    ],
    connectedBookTitles: [
      "Human Anatomy, Physiology & Clinical Medicine",
      "Health Education, Nutrition & Preventive Care"
    ],
    mcqs: [
      {
        question: "Which chamber of the human heart pumps oxygenated blood into the aorta for systemic distribution?",
        options: ["Left Ventricle", "Right Ventricle", "Left Atrium", "Right Atrium"],
        correctIndex: 0,
        explanation: "The left ventricle features thick muscular walls to pump oxygenated blood under high pressure into the aorta."
      }
    ]
  }
];

// Helper functions for educational video queries
export function getVideosForCategory(categoryName: string): EducationalVideo[] {
  if (!categoryName || categoryName === "All Categories") {
    return CURATED_EDUCATIONAL_VIDEOS;
  }
  const cleanCat = categoryName.toLowerCase();
  const matched = CURATED_EDUCATIONAL_VIDEOS.filter((v) => {
    return (
      v.category.toLowerCase().includes(cleanCat) ||
      cleanCat.includes(v.category.toLowerCase()) ||
      v.domain.toLowerCase().includes(cleanCat) ||
      cleanCat.includes(v.domain.toLowerCase())
    );
  });
  return matched.length > 0 ? matched : CURATED_EDUCATIONAL_VIDEOS.slice(0, 4);
}

export function getVideosForBook(bookTitle: string, bookCategory?: string): EducationalVideo[] {
  if (!bookTitle) return CURATED_EDUCATIONAL_VIDEOS.slice(0, 3);
  const cleanTitle = bookTitle.toLowerCase();
  const cleanCat = (bookCategory || "").toLowerCase();

  const matched = CURATED_EDUCATIONAL_VIDEOS.filter((v) => {
    const titleMatch = v.connectedBookTitles.some(
      (bt) => bt.toLowerCase().includes(cleanTitle) || cleanTitle.includes(bt.toLowerCase())
    );
    const catMatch = cleanCat && (
      v.category.toLowerCase().includes(cleanCat) ||
      cleanCat.includes(v.category.toLowerCase())
    );
    return titleMatch || catMatch;
  });

  return matched.length > 0 ? matched : CURATED_EDUCATIONAL_VIDEOS.slice(0, 3);
}

export function searchEducationalVideos(query: string): EducationalVideo[] {
  if (!query || !query.trim()) return CURATED_EDUCATIONAL_VIDEOS;
  const q = query.toLowerCase().trim();

  return CURATED_EDUCATIONAL_VIDEOS.filter((v) => {
    return (
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.domain.toLowerCase().includes(q) ||
      v.summary.toLowerCase().includes(q) ||
      v.keyConcepts.some((c) => c.toLowerCase().includes(q)) ||
      v.connectedBookTitles.some((b) => b.toLowerCase().includes(q))
    );
  });
}
