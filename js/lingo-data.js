// Categories and subjects
const categories = {
    languages: {
        title: 'Choose a language',
        subjects: [
            { id: 'spanish', name: 'Spanish', icon: 'fa-solid fa-s', level: 'Beginner to Advanced' },
            { id: 'french', name: 'French', icon: 'fa-solid fa-f', level: 'Beginner to Advanced' },
            { id: 'german', name: 'German', icon: 'fa-solid fa-g', level: 'Beginner to Intermediate' },
            { id: 'italian', name: 'Italian', icon: 'fa-solid fa-i', level: 'Beginner to Intermediate' },
            { id: 'portuguese', name: 'Portuguese', icon: 'fa-solid fa-p', level: 'Beginner' },
            { id: 'japanese', name: 'Japanese', icon: 'fa-solid fa-j', level: 'Beginner' },
            { id: 'chinese', name: 'Chinese', icon: 'fa-solid fa-c', level: 'Beginner' },
            { id: 'korean', name: 'Korean', icon: 'fa-solid fa-k', level: 'Beginner' },
            { id: 'russian', name: 'Russian', icon: 'fa-solid fa-r', level: 'Beginner' },
            { id: 'arabic', name: 'Arabic', icon: 'fa-solid fa-a', level: 'Beginner' },
            { id: 'hindi', name: 'Hindi', icon: 'fa-solid fa-h', level: 'Beginner' },
            { id: 'dutch', name: 'Dutch', icon: 'fa-solid fa-d', level: 'Beginner' }
        ]
    },
    programming: {
        title: 'Choose a programming language',
        subjects: [
            { id: 'javascript', name: 'JavaScript', icon: 'fa-brands fa-js', level: 'Web Development' },
            { id: 'python', name: 'Python', icon: 'fa-brands fa-python', level: 'General Purpose' },
            { id: 'rust', name: 'Rust', icon: 'fa-brands fa-rust', level: 'Systems Programming' },
            { id: 'cpp', name: 'C++', icon: 'fa-solid fa-microchip', level: 'Systems & Games' },
            { id: 'java', name: 'Java', icon: 'fa-brands fa-java', level: 'Enterprise & Android' },
            { id: 'go', name: 'Go', icon: 'fa-brands fa-golang', level: 'Cloud & DevOps' },
            { id: 'sql', name: 'SQL', icon: 'fa-solid fa-database', level: 'Database Queries' }
        ]
    },
    math: {
        title: 'Choose a math topic',
        subjects: [
            { id: 'arithmetic', name: 'Arithmetic', icon: 'fa-solid fa-plus', level: 'Basic Math' },
            { id: 'algebra', name: 'Algebra', icon: 'fa-solid fa-superscript', level: 'Equations & Variables' },
            { id: 'geometry', name: 'Geometry', icon: 'fa-solid fa-draw-polygon', level: 'Shapes & Angles' },
            { id: 'trigonometry', name: 'Trigonometry', icon: 'fa-solid fa-wave-square', level: 'Sine, Cosine, Tangent' },
            { id: 'calculus', name: 'Calculus', icon: 'fa-solid fa-infinity', level: 'Derivatives & Integrals' },
            { id: 'statistics', name: 'Statistics', icon: 'fa-solid fa-chart-bar', level: 'Data Analysis' },
            { id: 'linear_algebra', name: 'Linear Algebra', icon: 'fa-solid fa-table-cells', level: 'Matrices & Vectors' },
            { id: 'logic', name: 'Logic', icon: 'fa-solid fa-puzzle-piece', level: 'Puzzles & Reasoning' }
        ]
    },
    science: {
        title: 'Choose a science topic',
        subjects: [
            { id: 'physics', name: 'Physics', icon: 'fa-solid fa-atom', level: 'Forces & Energy' },
            { id: 'chemistry', name: 'Chemistry', icon: 'fa-solid fa-flask', level: 'Elements & Reactions' },
            { id: 'biology', name: 'Biology', icon: 'fa-solid fa-dna', level: 'Life Sciences' },
            { id: 'astronomy', name: 'Astronomy', icon: 'fa-solid fa-satellite', level: 'Space & Cosmos' }
        ]
    },
    skills: {
        title: 'Choose a skill',
        subjects: [
            { id: 'chess', name: 'Chess', icon: 'fa-solid fa-chess', level: 'Strategy & Tactics' },
            { id: 'music_theory', name: 'Music Theory', icon: 'fa-solid fa-music', level: 'Notes & Chords' },
            { id: 'music_history', name: 'Music History', icon: 'fa-solid fa-guitar', level: 'Genres & Artists' },
            { id: 'world_history', name: 'World History', icon: 'fa-solid fa-landmark', level: 'Events & Civilizations' },
            { id: 'geography', name: 'Geography', icon: 'fa-solid fa-globe', level: 'Countries & Capitals' }
        ]
    }
};

// Questions database - includes all original + expanded content
const questions = {
    // Languages (preserved from original)
    spanish: [
        { type: 'translation', question: 'Hello', answer: 'Hola', choices: ['Hola', 'Adios', 'Por favor', 'Gracias'] },
        { type: 'translation', question: 'Thank you', answer: 'Gracias', choices: ['Hola', 'Gracias', 'De nada', 'Por favor'] },
        { type: 'sentence', question: 'The cat is small', answer: 'El gato es pequeno', words: ['El', 'gato', 'es', 'pequeno', 'grande', 'perro'] },
        { type: 'translation', question: 'Water', answer: 'Agua', choices: ['Agua', 'Fuego', 'Tierra', 'Aire'] },
        { type: 'sentence', question: 'I like coffee', answer: 'Me gusta el cafe', words: ['Me', 'gusta', 'el', 'cafe', 'te', 'no'] }
    ],

    // Programming Languages
    javascript: [
        { type: 'mathChoice', question: 'Log to console in JavaScript?', answer: 'console.log()', choices: ['print()', 'console.log()', 'echo()', 'printf()'] },
        { type: 'mathChoice', question: 'Define a function in JS?', answer: 'function name() {}', choices: ['function name() {}', 'def name():', 'func name() {}', 'fn name() {}'] },
        { type: 'mathChoice', question: 'JavaScript array method to add item?', answer: 'push()', choices: ['add()', 'push()', 'append()', 'insert()'] },
        { type: 'mathChoice', question: 'Check type in JavaScript?', answer: 'typeof', choices: ['type()', 'typeof', 'instanceof', 'getType()'] },
        { type: 'mathChoice', question: 'Arrow function syntax?', answer: '() => {}', choices: ['() => {}', '() -> {}', 'lambda() {}', 'func() {}'] }
    ],

    python: [
        { type: 'mathChoice', question: 'Import library in Python?', answer: 'import', choices: ['include', 'import', 'require', 'use'] },
        { type: 'mathChoice', question: 'Python list comprehension syntax?', answer: '[x for x in list]', choices: ['[x for x in list]', '{x for x in list}', '(x for x in list)', '<x for x in list>'] },
        { type: 'mathChoice', question: 'Define function in Python?', answer: 'def function_name():', choices: ['def function_name():', 'function function_name():', 'fn function_name():', 'func function_name():'] },
        { type: 'mathChoice', question: 'Python indentation?', answer: '4 spaces', choices: ['2 spaces', '4 spaces', '1 tab', 'No standard'] },
        { type: 'mathChoice', question: 'Python package manager?', answer: 'pip', choices: ['npm', 'pip', 'yarn', 'gem'] }
    ],

    rust: [
        { type: 'mathChoice', question: 'Rust package manager?', answer: 'cargo', choices: ['cargo', 'rustc', 'crate', 'rust-pm'] },
        { type: 'mathChoice', question: 'Define variable in Rust?', answer: 'let', choices: ['let', 'var', 'const', 'def'] },
        { type: 'mathChoice', question: 'Mutable variable in Rust?', answer: 'let mut', choices: ['let mut', 'var', 'mut let', 'mutable'] },
        { type: 'mathChoice', question: 'Result type in Rust?', answer: 'Ok/Err', choices: ['Ok/Err', 'Success/Fail', 'True/False', 'Some/None'] },
        { type: 'mathChoice', question: 'Rust memory safety?', answer: 'Compile-time', choices: ['Compile-time', 'Runtime', 'Manual', 'Garbage collected'] }
    ],

    // Math
    arithmetic: [
        { type: 'math', question: '5 + 7', answer: '12' },
        { type: 'math', question: '15 - 8', answer: '7' },
        { type: 'math', question: '6 x 9', answer: '54' },
        { type: 'math', question: '72 / 8', answer: '9' },
        { type: 'math', question: '13 + 29', answer: '42' }
    ],

    algebra: [
        { type: 'math', question: 'Solve for x: x + 5 = 12', answer: '7' },
        { type: 'math', question: 'Solve for x: 2x = 10', answer: '5' },
        { type: 'math', question: 'Solve for y: y - 3 = 7', answer: '10' },
        { type: 'math', question: 'Solve for x: 3x + 2 = 11', answer: '3' },
        { type: 'math', question: 'Solve for x: x^2 = 16', answer: '4' }
    ],

    trigonometry: [
        { type: 'math', question: 'sin(30)', answer: '0.5' },
        { type: 'math', question: 'cos(60)', answer: '0.5' },
        { type: 'math', question: 'tan(45)', answer: '1' },
        { type: 'math', question: 'sin^2(x) + cos^2(x)', answer: '1' },
        { type: 'mathChoice', question: 'Pythagorean identity?', answer: 'sin^2 + cos^2 = 1', choices: ['sin^2 + cos^2 = 1', 'sin^2 - cos^2 = 1', 'sin + cos = 1', 'tan = sin/cos'] }
    ],

    // Science
    physics: [
        { type: 'mathChoice', question: "Newton's first law?", answer: 'Law of inertia', choices: ['Law of inertia', 'F=ma', 'Action-reaction', 'Conservation'] },
        { type: 'mathChoice', question: 'E=mc^2 means?', answer: 'Energy-mass equivalence', choices: ['Energy-mass equivalence', 'Electric charge', 'Electromagnetic force', 'Electron mass'] },
        { type: 'mathChoice', question: 'Speed of sound?', answer: '343 m/s', choices: ['343 m/s', '3000 m/s', '30 m/s', '3 m/s'] },
        { type: 'mathChoice', question: 'Unit of force?', answer: 'Newton', choices: ['Newton', 'Joule', 'Watt', 'Pascal'] },
        { type: 'mathChoice', question: 'Gravity on Earth?', answer: '9.8 m/s^2', choices: ['9.8 m/s^2', '10 m/s^2', '8.9 m/s^2', '11 m/s^2'] }
    ],

    chemistry: [
        { type: 'mathChoice', question: 'pH of pure water?', answer: '7', choices: ['7', '0', '14', '1'] },
        { type: 'mathChoice', question: 'Noble gas group?', answer: 'Group 18', choices: ['Group 18', 'Group 1', 'Group 7', 'Group 14'] },
        { type: 'mathChoice', question: 'Catalyst does what?', answer: 'Speeds reaction', choices: ['Speeds reaction', 'Slows reaction', 'Stops reaction', 'Reverses reaction'] },
        { type: 'mathChoice', question: 'Atomic number represents?', answer: 'Number of protons', choices: ['Number of protons', 'Number of neutrons', 'Number of electrons', 'Atomic mass'] },
        { type: 'mathChoice', question: 'Most abundant element?', answer: 'Hydrogen', choices: ['Hydrogen', 'Oxygen', 'Carbon', 'Nitrogen'] }
    ],

    biology: [
        { type: 'mathChoice', question: 'DNA base pairs?', answer: 'A-T, G-C', choices: ['A-T, G-C', 'A-G, T-C', 'A-C, T-G', 'A-A, T-T'] },
        { type: 'mathChoice', question: 'Photosynthesis produces?', answer: 'Glucose and oxygen', choices: ['Glucose and oxygen', 'Carbon dioxide', 'Water only', 'Nitrogen'] },
        { type: 'mathChoice', question: 'Human chromosomes?', answer: '46', choices: ['46', '23', '92', '48'] },
        { type: 'mathChoice', question: 'Largest organ?', answer: 'Skin', choices: ['Skin', 'Liver', 'Brain', 'Heart'] },
        { type: 'mathChoice', question: 'Powerhouse of the cell?', answer: 'Mitochondria', choices: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'] }
    ],

    // Skills
    music_theory: [
        { type: 'mathChoice', question: 'Circle of fifths starts?', answer: 'C', choices: ['C', 'A', 'G', 'F'] },
        { type: 'mathChoice', question: 'Time signature top number?', answer: 'Beats per measure', choices: ['Beats per measure', 'Note value', 'Tempo', 'Key signature'] },
        { type: 'mathChoice', question: 'Pentatonic scale notes?', answer: '5', choices: ['5', '7', '12', '8'] },
        { type: 'mathChoice', question: 'Common chord progression?', answer: 'I-V-vi-IV', choices: ['I-V-vi-IV', 'I-II-III-IV', 'V-IV-III-II', 'vi-V-IV-I'] },
        { type: 'mathChoice', question: 'Relative minor of C?', answer: 'A minor', choices: ['A minor', 'E minor', 'D minor', 'G minor'] }
    ],

    world_history: [
        { type: 'mathChoice', question: 'Roman Empire fell?', answer: '476 AD', choices: ['476 AD', '1000 AD', '100 BC', '300 AD'] },
        { type: 'mathChoice', question: 'Renaissance began?', answer: '14th century', choices: ['14th century', '10th century', '17th century', '12th century'] },
        { type: 'mathChoice', question: 'Columbus sailed?', answer: '1492', choices: ['1492', '1500', '1485', '1512'] },
        { type: 'mathChoice', question: 'French Revolution?', answer: '1789', choices: ['1789', '1776', '1800', '1750'] },
        { type: 'mathChoice', question: 'World War I years?', answer: '1914-1918', choices: ['1914-1918', '1939-1945', '1910-1914', '1918-1922'] }
    ],

    // Add minimal content for other languages to keep them functional
    french: [
        { type: 'translation', question: 'Hello', answer: 'Bonjour', choices: ['Bonjour', 'Au revoir', 'Merci', 'Bonsoir'] },
        { type: 'translation', question: 'Thank you', answer: 'Merci', choices: ['Merci', 'De rien', 'Bonjour', 'Bonne nuit'] }
    ],

    // Default fallback for categories without content yet
    default: [
        { type: 'mathChoice', question: 'Content coming soon!', answer: 'Yes', choices: ['Yes', 'Soon', 'Loading', 'Ready'] }
    ]
};

// Add fallbacks for missing categories
['german', 'italian', 'portuguese', 'japanese', 'chinese', 'korean', 'russian',
 'arabic', 'hindi', 'dutch', 'cpp', 'java', 'go', 'sql', 'geometry', 'calculus',
 'statistics', 'linear_algebra', 'logic', 'chess', 'music_history', 'geography',
 'astronomy'].forEach(cat => {
    if (!questions[cat]) questions[cat] = questions.default;
});

// BC Curriculum Content
questions.precalc11 = [
    { type: 'math', question: 'Factor: x^2 - 5x + 6', answer: '(x-2)(x-3)' },
    { type: 'math', question: 'Solve: 2^(x+1) = 32', answer: '4' },
    { type: 'mathChoice', question: 'Arithmetic sequence: 3, 7, 11, ... Find a10', answer: '39', choices: ['35', '37', '39', '41'] },
    { type: 'math', question: 'Sum of geometric series: 2 + 6 + 18 + ... (4 terms)', answer: '80' },
    { type: 'mathChoice', question: 'Quadratic formula?', answer: 'x = (-b +/- sqrt(b^2-4ac))/2a', choices: ['x = (-b +/- sqrt(b^2-4ac))/2a', 'x = -b/2a', 'x = +/- sqrt(b^2-4ac)', 'x = -b +/- sqrt(b^2+4ac)/2a'] },
    { type: 'math', question: 'Complete the square: x^2 + 6x', answer: '(x+3)^2 - 9' },
    { type: 'mathChoice', question: 'Domain of f(x) = 1/(x-3)?', answer: 'All reals except x=3', choices: ['All reals', 'All reals except x=3', 'x>3', 'x<3'] },
    { type: 'math', question: 'Solve: |2x - 5| = 7', answer: 'x = 6 or x = -1' },
    { type: 'mathChoice', question: 'Compound interest formula?', answer: 'A = P(1 + r/n)^(nt)', choices: ['A = P(1 + r/n)^(nt)', 'A = Prt', 'A = Pe^(rt)', 'A = P + rt'] },
    { type: 'math', question: 'Rationalize: 1/sqrt(3)', answer: 'sqrt(3)/3' }
];

questions.precalc12 = [
    { type: 'math', question: 'Convert to radians: 180 deg', answer: 'pi' },
    { type: 'math', question: 'Exact value: sin(pi/6)', answer: '1/2' },
    { type: 'mathChoice', question: 'Unit circle: cos(pi/2)', answer: '0', choices: ['0', '1', '-1', 'sqrt(2)/2'] },
    { type: 'math', question: 'Solve: sin(x) = 1/2, 0 <= x <= 2pi', answer: 'pi/6, 5pi/6' },
    { type: 'mathChoice', question: 'Amplitude of y = 3sin(2x)', answer: '3', choices: ['1', '2', '3', '6'] },
    { type: 'mathChoice', question: 'Period of y = sin(2x)', answer: 'pi', choices: ['2pi', 'pi', 'pi/2', '4pi'] },
    { type: 'mathChoice', question: 'Law of Sines?', answer: 'a/sin(A) = b/sin(B) = c/sin(C)', choices: ['a^2=b^2+c^2', 'a/sin(A) = b/sin(B)', 'sin(A)/a = sin(B)/b', 'a/sin(A) = b/sin(B) = c/sin(C)'] },
    { type: 'math', question: 'Evaluate: log3(27)', answer: '3' },
    { type: 'mathChoice', question: 'Exponential growth model?', answer: 'y = a * b^x', choices: ['y = mx + b', 'y = a * b^x', 'y = ax^2', 'y = a/x'] },
    { type: 'mathChoice', question: 'Number of permutations: P(5,3)', answer: '60', choices: ['20', '60', '120', '125'] }
];

questions.anatomy12 = [
    { type: 'mathChoice', question: 'Number of bones in adult human?', answer: '206', choices: ['206', '213', '270', '300'] },
    { type: 'mathChoice', question: 'Largest bone?', answer: 'Femur', choices: ['Tibia', 'Femur', 'Humerus', 'Spine'] },
    { type: 'mathChoice', question: 'Three types of muscle?', answer: 'Skeletal, cardiac, smooth', choices: ['Skeletal, cardiac, smooth', 'Voluntary, involuntary, cardiac', 'Striated, smooth, rough', 'Fast, slow, cardiac'] },
    { type: 'mathChoice', question: 'Neurotransmitter at muscle junction?', answer: 'Acetylcholine', choices: ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'] },
    { type: 'mathChoice', question: 'Basic unit of nervous system?', answer: 'Neuron', choices: ['Nerve', 'Neuron', 'Axon', 'Synapse'] },
    { type: 'mathChoice', question: 'Heart chambers?', answer: '4', choices: ['2', '3', '4', '5'] },
    { type: 'mathChoice', question: 'Gas exchange occurs in?', answer: 'Alveoli', choices: ['Bronchi', 'Bronchioles', 'Alveoli', 'Trachea'] },
    { type: 'mathChoice', question: 'Most absorption occurs in?', answer: 'Small intestine', choices: ['Stomach', 'Small intestine', 'Large intestine', 'Liver'] },
    { type: 'mathChoice', question: 'Master gland?', answer: 'Pituitary', choices: ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'] },
    { type: 'mathChoice', question: 'Functional unit of kidney?', answer: 'Nephron', choices: ['Glomerulus', 'Nephron', 'Loop of Henle', 'Collecting duct'] }
];

// Auto-assign stable IDs to all questions for SRS tracking
Object.keys(questions).forEach(subject => {
    if (subject === 'default') return;
    questions[subject].forEach((q, i) => {
        if (!q.id) q.id = `${subject}_${i}`;
    });
});

// Update categories to include BC curriculum
categories.math.subjects.push(
    { id: 'precalc11', name: 'Pre-Calculus 11', icon: 'fa-solid fa-book', level: 'BC Grade 11' },
    { id: 'precalc12', name: 'Pre-Calculus 12', icon: 'fa-solid fa-book-open', level: 'BC Grade 12' }
);

categories.science.subjects.push(
    { id: 'anatomy12', name: 'Anatomy & Physiology', icon: 'fa-solid fa-heart-pulse', level: 'BC Grade 12' }
);
