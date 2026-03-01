// Categories and subjects
const categories = {
    languages: {
        title: 'Choose a language',
        subjects: [
            { id: 'spanish', name: 'Spanish', icon: '🇪🇸', level: 'Beginner to Advanced' },
            { id: 'french', name: 'French', icon: '🇫🇷', level: 'Beginner to Advanced' },
            { id: 'german', name: 'German', icon: '🇩🇪', level: 'Beginner to Intermediate' },
            { id: 'italian', name: 'Italian', icon: '🇮🇹', level: 'Beginner to Intermediate' },
            { id: 'portuguese', name: 'Portuguese', icon: '🇵🇹', level: 'Beginner' },
            { id: 'japanese', name: 'Japanese', icon: '🇯🇵', level: 'Beginner' },
            { id: 'chinese', name: 'Chinese', icon: '🇨🇳', level: 'Beginner' },
            { id: 'korean', name: 'Korean', icon: '🇰🇷', level: 'Beginner' },
            { id: 'russian', name: 'Russian', icon: '🇷🇺', level: 'Beginner' },
            { id: 'arabic', name: 'Arabic', icon: '🇸🇦', level: 'Beginner' },
            { id: 'hindi', name: 'Hindi', icon: '🇮🇳', level: 'Beginner' },
            { id: 'dutch', name: 'Dutch', icon: '🇳🇱', level: 'Beginner' }
        ]
    },
    programming: {
        title: 'Choose a programming language',
        subjects: [
            { id: 'javascript', name: 'JavaScript', icon: '🟨', level: 'Web Development' },
            { id: 'python', name: 'Python', icon: '🐍', level: 'General Purpose' },
            { id: 'rust', name: 'Rust', icon: '🦀', level: 'Systems Programming' },
            { id: 'cpp', name: 'C++', icon: '⚙️', level: 'Systems & Games' },
            { id: 'java', name: 'Java', icon: '☕', level: 'Enterprise & Android' },
            { id: 'go', name: 'Go', icon: '🐹', level: 'Cloud & DevOps' },
            { id: 'sql', name: 'SQL', icon: '🗃️', level: 'Database Queries' }
        ]
    },
    math: {
        title: 'Choose a math topic',
        subjects: [
            { id: 'arithmetic', name: 'Arithmetic', icon: '➕', level: 'Basic Math' },
            { id: 'algebra', name: 'Algebra', icon: '𝑥²', level: 'Equations & Variables' },
            { id: 'geometry', name: 'Geometry', icon: '📐', level: 'Shapes & Angles' },
            { id: 'trigonometry', name: 'Trigonometry', icon: '📈', level: 'Sine, Cosine, Tangent' },
            { id: 'calculus', name: 'Calculus', icon: '∫', level: 'Derivatives & Integrals' },
            { id: 'statistics', name: 'Statistics', icon: '📊', level: 'Data Analysis' },
            { id: 'linear_algebra', name: 'Linear Algebra', icon: '⊡', level: 'Matrices & Vectors' },
            { id: 'logic', name: 'Logic', icon: '🧩', level: 'Puzzles & Reasoning' }
        ]
    },
    science: {
        title: 'Choose a science topic',
        subjects: [
            { id: 'physics', name: 'Physics', icon: '⚛️', level: 'Forces & Energy' },
            { id: 'chemistry', name: 'Chemistry', icon: '🧪', level: 'Elements & Reactions' },
            { id: 'biology', name: 'Biology', icon: '🧬', level: 'Life Sciences' },
            { id: 'astronomy', name: 'Astronomy', icon: '🔭', level: 'Space & Cosmos' }
        ]
    },
    skills: {
        title: 'Choose a skill',
        subjects: [
            { id: 'chess', name: 'Chess', icon: '♟️', level: 'Strategy & Tactics' },
            { id: 'music_theory', name: 'Music Theory', icon: '🎵', level: 'Notes & Chords' },
            { id: 'music_history', name: 'Music History', icon: '🎸', level: 'Genres & Artists' },
            { id: 'world_history', name: 'World History', icon: '📚', level: 'Events & Civilizations' },
            { id: 'geography', name: 'Geography', icon: '🗺️', level: 'Countries & Capitals' }
        ]
    }
};

// Questions database - includes all original + expanded content
const questions = {
    // Languages (preserved from original)
    spanish: [
        { type: 'translation', question: 'Hello', answer: 'Hola', choices: ['Hola', 'Adiós', 'Por favor', 'Gracias'] },
        { type: 'translation', question: 'Thank you', answer: 'Gracias', choices: ['Hola', 'Gracias', 'De nada', 'Por favor'] },
        { type: 'sentence', question: 'The cat is small', answer: 'El gato es pequeño', words: ['El', 'gato', 'es', 'pequeño', 'grande', 'perro'] },
        { type: 'translation', question: 'Water', answer: 'Agua', choices: ['Agua', 'Fuego', 'Tierra', 'Aire'] },
        { type: 'sentence', question: 'I like coffee', answer: 'Me gusta el café', words: ['Me', 'gusta', 'el', 'café', 'té', 'no'] }
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
        { type: 'math', question: '6 × 9', answer: '54' },
        { type: 'math', question: '72 ÷ 8', answer: '9' },
        { type: 'math', question: '13 + 29', answer: '42' }
    ],
    
    algebra: [
        { type: 'math', question: 'Solve for x: x + 5 = 12', answer: '7' },
        { type: 'math', question: 'Solve for x: 2x = 10', answer: '5' },
        { type: 'math', question: 'Solve for y: y - 3 = 7', answer: '10' },
        { type: 'math', question: 'Solve for x: 3x + 2 = 11', answer: '3' },
        { type: 'math', question: 'Solve for x: x² = 16', answer: '4' }
    ],
    
    trigonometry: [
        { type: 'math', question: 'sin(30°)', answer: '0.5' },
        { type: 'math', question: 'cos(60°)', answer: '0.5' },
        { type: 'math', question: 'tan(45°)', answer: '1' },
        { type: 'math', question: 'sin²x + cos²x', answer: '1' },
        { type: 'mathChoice', question: 'Pythagorean identity?', answer: 'sin²θ + cos²θ = 1', choices: ['sin²θ + cos²θ = 1', 'sin²θ - cos²θ = 1', 'sinθ + cosθ = 1', 'tanθ = sinθ/cosθ'] }
    ],
    
    // Science
    physics: [
        { type: 'mathChoice', question: "Newton's first law?", answer: 'Law of inertia', choices: ['Law of inertia', 'F=ma', 'Action-reaction', 'Conservation'] },
        { type: 'mathChoice', question: 'E=mc² means?', answer: 'Energy-mass equivalence', choices: ['Energy-mass equivalence', 'Electric charge', 'Electromagnetic force', 'Electron mass'] },
        { type: 'mathChoice', question: 'Speed of sound?', answer: '343 m/s', choices: ['343 m/s', '3000 m/s', '30 m/s', '3 m/s'] },
        { type: 'mathChoice', question: 'Unit of force?', answer: 'Newton', choices: ['Newton', 'Joule', 'Watt', 'Pascal'] },
        { type: 'mathChoice', question: 'Gravity on Earth?', answer: '9.8 m/s²', choices: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'] }
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
