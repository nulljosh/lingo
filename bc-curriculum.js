// BC Curriculum Content - Pre-Calculus 11/12 and Anatomy & Physiology 12

const bcCurriculum = {
    // Pre-Calculus 11
    precalc11: [
        { type: 'math', question: 'Factor: x² - 5x + 6', answer: '(x-2)(x-3)' },
        { type: 'math', question: 'Solve: 2^(x+1) = 32', answer: '4' },
        { type: 'mathChoice', question: 'Arithmetic sequence: 3, 7, 11, ... Find a₁₀', answer: '39', choices: ['35', '37', '39', '41'] },
        { type: 'math', question: 'Sum of geometric series: 2 + 6 + 18 + ... (4 terms)', answer: '80' },
        { type: 'mathChoice', question: 'Quadratic formula for ax²+bx+c=0?', answer: 'x = (-b±√(b²-4ac))/2a', choices: ['x = (-b±√(b²-4ac))/2a', 'x = -b/2a', 'x = ±√(b²-4ac)', 'x = -b±√(b²+4ac)/2a'] },
        { type: 'math', question: 'Complete the square: x² + 6x', answer: '(x+3)² - 9' },
        { type: 'mathChoice', question: 'Domain of f(x) = 1/(x-3)?', answer: 'All reals except x=3', choices: ['All reals', 'All reals except x=3', 'x>3', 'x<3'] },
        { type: 'math', question: 'Solve: |2x - 5| = 7', answer: 'x = 6 or x = -1' },
        { type: 'mathChoice', question: 'Compound interest formula?', answer: 'A = P(1 + r/n)^(nt)', choices: ['A = P(1 + r/n)^(nt)', 'A = Prt', 'A = Pe^(rt)', 'A = P + rt'] },
        { type: 'math', question: 'Rationalize: 1/√3', answer: '√3/3' },
        { type: 'mathChoice', question: 'Vertex form of parabola?', answer: 'y = a(x-h)² + k', choices: ['y = ax² + bx + c', 'y = a(x-h)² + k', 'y = mx + b', 'y = a(x+h)² - k'] },
        { type: 'math', question: 'Solve log₂(x) = 5', answer: '32' },
        { type: 'mathChoice', question: 'Sigma notation: Σ(2i) from i=1 to 5', answer: '30', choices: ['20', '25', '30', '35'] },
        { type: 'math', question: 'Find inverse: f(x) = 2x + 3', answer: 'f⁻¹(x) = (x-3)/2' },
        { type: 'mathChoice', question: 'Rational function asymptote of y = 1/x?', answer: 'x=0, y=0', choices: ['x=0, y=0', 'x=1, y=1', 'x=0, y=1', 'No asymptotes'] }
    ],

    // Pre-Calculus 12
    precalc12: [
        { type: 'math', question: 'Convert to radians: 180°', answer: 'π' },
        { type: 'math', question: 'Exact value: sin(π/6)', answer: '1/2' },
        { type: 'mathChoice', question: 'Unit circle: cos(π/2)', answer: '0', choices: ['0', '1', '-1', '√2/2'] },
        { type: 'math', question: 'Solve: sin(x) = 1/2, 0≤x≤2π', answer: 'π/6, 5π/6' },
        { type: 'mathChoice', question: 'Amplitude of y = 3sin(2x)', answer: '3', choices: ['1', '2', '3', '6'] },
        { type: 'mathChoice', question: 'Period of y = sin(2x)', answer: 'π', choices: ['2π', 'π', 'π/2', '4π'] },
        { type: 'math', question: 'Simplify: sin²x + cos²x', answer: '1' },
        { type: 'mathChoice', question: 'Law of Sines?', answer: 'a/sin(A) = b/sin(B) = c/sin(C)', choices: ['a²=b²+c²', 'a/sin(A) = b/sin(B)', 'sin(A)/a = sin(B)/b', 'a/sin(A) = b/sin(B) = c/sin(C)'] },
        { type: 'math', question: 'Evaluate: log₃(27)', answer: '3' },
        { type: 'mathChoice', question: 'Exponential growth model?', answer: 'y = a·bˣ', choices: ['y = mx + b', 'y = a·bˣ', 'y = ax²', 'y = a/x'] },
        { type: 'math', question: 'Binomial theorem: (x+y)² expanded', answer: 'x² + 2xy + y²' },
        { type: 'mathChoice', question: 'Number of permutations: P(5,3)', answer: '60', choices: ['20', '60', '120', '125'] },
        { type: 'mathChoice', question: 'Number of combinations: C(5,3)', answer: '10', choices: ['5', '10', '15', '20'] },
        { type: 'math', question: 'Limit as x→0 of sin(x)/x', answer: '1' },
        { type: 'mathChoice', question: 'Vector magnitude: v = (3,4)', answer: '5', choices: ['3', '4', '5', '7'] },
        { type: 'math', question: 'Dot product: (2,3)·(4,1)', answer: '11' },
        { type: 'mathChoice', question: 'Polynomial degree of 3x⁴ - 2x² + 1', answer: '4', choices: ['1', '2', '3', '4'] },
        { type: 'math', question: 'Complex number: (2+3i)(2-3i)', answer: '13' },
        { type: 'mathChoice', question: 'Conic section: x²/4 + y²/9 = 1', answer: 'Ellipse', choices: ['Circle', 'Ellipse', 'Parabola', 'Hyperbola'] },
        { type: 'math', question: 'Parametric to Cartesian: x=2t, y=t²', answer: 'y = x²/4' }
    ],

    // Anatomy & Physiology 12
    anatomy12: [
        // Cellular Biology
        { type: 'mathChoice', question: 'Powerhouse of the cell?', answer: 'Mitochondria', choices: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'] },
        { type: 'mathChoice', question: 'Cell membrane is primarily made of?', answer: 'Phospholipid bilayer', choices: ['Proteins', 'Carbohydrates', 'Phospholipid bilayer', 'Nucleic acids'] },
        { type: 'mathChoice', question: 'ATP stands for?', answer: 'Adenosine triphosphate', choices: ['Adenosine triphosphate', 'Amino tri-protein', 'Active transport protein', 'Adenine triple phosphate'] },
        
        // Skeletal System
        { type: 'mathChoice', question: 'Number of bones in adult human?', answer: '206', choices: ['206', '213', '270', '300'] },
        { type: 'mathChoice', question: 'Largest bone in human body?', answer: 'Femur', choices: ['Tibia', 'Femur', 'Humerus', 'Spine'] },
        { type: 'mathChoice', question: 'Bone cells that build new bone?', answer: 'Osteoblasts', choices: ['Osteoclasts', 'Osteoblasts', 'Osteocytes', 'Chondrocytes'] },
        
        // Muscular System
        { type: 'mathChoice', question: 'Three types of muscle tissue?', answer: 'Skeletal, cardiac, smooth', choices: ['Skeletal, cardiac, smooth', 'Voluntary, involuntary, cardiac', 'Striated, smooth, rough', 'Fast, slow, cardiac'] },
        { type: 'mathChoice', question: 'Muscle contraction protein filaments?', answer: 'Actin and myosin', choices: ['Actin and myosin', 'Collagen and elastin', 'Keratin and fibrin', 'Troponin and calcium'] },
        { type: 'mathChoice', question: 'Neurotransmitter at neuromuscular junction?', answer: 'Acetylcholine', choices: ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'] },
        
        // Nervous System
        { type: 'mathChoice', question: 'Basic unit of nervous system?', answer: 'Neuron', choices: ['Nerve', 'Neuron', 'Axon', 'Synapse'] },
        { type: 'mathChoice', question: 'Myelin sheath function?', answer: 'Speeds nerve conduction', choices: ['Produces neurotransmitters', 'Speeds nerve conduction', 'Filters signals', 'Stores memories'] },
        { type: 'mathChoice', question: 'Part of brain for balance?', answer: 'Cerebellum', choices: ['Cerebrum', 'Cerebellum', 'Medulla', 'Hypothalamus'] },
        { type: 'mathChoice', question: 'Resting potential of neuron?', answer: '-70mV', choices: ['-70mV', '+40mV', '0mV', '-40mV'] },
        
        // Cardiovascular System
        { type: 'mathChoice', question: 'Heart chambers?', answer: '4', choices: ['2', '3', '4', '5'] },
        { type: 'mathChoice', question: 'Blood vessel carrying blood TO heart?', answer: 'Vein', choices: ['Artery', 'Vein', 'Capillary', 'Aorta'] },
        { type: 'mathChoice', question: 'Largest artery?', answer: 'Aorta', choices: ['Aorta', 'Pulmonary artery', 'Carotid', 'Femoral'] },
        { type: 'mathChoice', question: 'Normal blood pressure?', answer: '120/80', choices: ['120/80', '140/90', '100/60', '130/85'] },
        { type: 'mathChoice', question: 'Pacemaker of the heart?', answer: 'SA node', choices: ['SA node', 'AV node', 'Bundle of His', 'Purkinje fibers'] },
        
        // Respiratory System
        { type: 'mathChoice', question: 'Gas exchange occurs in?', answer: 'Alveoli', choices: ['Bronchi', 'Bronchioles', 'Alveoli', 'Trachea'] },
        { type: 'mathChoice', question: 'Normal breathing rate at rest?', answer: '12-20 breaths/min', choices: ['5-10', '12-20', '20-30', '30-40'] },
        { type: 'mathChoice', question: 'Oxygen carrying protein?', answer: 'Hemoglobin', choices: ['Hemoglobin', 'Myoglobin', 'Albumin', 'Fibrinogen'] },
        
        // Digestive System
        { type: 'mathChoice', question: 'Where does most absorption occur?', answer: 'Small intestine', choices: ['Stomach', 'Small intestine', 'Large intestine', 'Liver'] },
        { type: 'mathChoice', question: 'Enzyme that breaks down starch?', answer: 'Amylase', choices: ['Lipase', 'Protease', 'Amylase', 'Pepsin'] },
        { type: 'mathChoice', question: 'pH of stomach acid?', answer: '1.5-2', choices: ['1.5-2', '4-5', '7', '8-9'] },
        
        // Endocrine System
        { type: 'mathChoice', question: 'Master gland?', answer: 'Pituitary', choices: ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'] },
        { type: 'mathChoice', question: 'Hormone that regulates blood sugar?', answer: 'Insulin', choices: ['Insulin', 'Glucagon', 'Cortisol', 'Both A and B'] },
        { type: 'mathChoice', question: 'Fight or flight hormone?', answer: 'Adrenaline', choices: ['Insulin', 'Thyroxine', 'Adrenaline', 'Melatonin'] },
        
        // Immune System
        { type: 'mathChoice', question: 'Antibody-producing cells?', answer: 'B cells', choices: ['T cells', 'B cells', 'Macrophages', 'Neutrophils'] },
        { type: 'mathChoice', question: 'First line of defense?', answer: 'Skin', choices: ['Antibodies', 'White blood cells', 'Skin', 'Lymph nodes'] },
        
        // Urinary System
        { type: 'mathChoice', question: 'Functional unit of kidney?', answer: 'Nephron', choices: ['Glomerulus', 'Nephron', 'Loop of Henle', 'Collecting duct'] },
        { type: 'mathChoice', question: 'Normal urine pH?', answer: '4.5-8', choices: ['2-3', '4.5-8', '7-9', '10-11'] }
    ]
};

console.log("BC Curriculum content ready:");
console.log("- Pre-Calculus 11: 15 questions");
console.log("- Pre-Calculus 12: 20 questions");  
console.log("- Anatomy & Physiology 12: 30 questions");
console.log("Total: 65 new curriculum-aligned questions");
