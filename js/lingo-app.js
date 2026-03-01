// Game State
let gameState = {
    selectedCategory: 'languages',
    selectedSubject: null,
    currentQuestion: 0,
    totalQuestions: 10,
    correctAnswers: 0,
    xp: parseInt(localStorage.getItem('xp') || 0),
    streak: parseInt(localStorage.getItem('streak') || 0),
    hearts: 5,
    currentAnswer: null,
    answerWords: []
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    setupEventListeners();
    renderSubjects('languages');
    checkStreak();
});

function setupEventListeners() {
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            gameState.selectedCategory = category;
            renderSubjects(category);
        });
    });

    // Buttons
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('skipBtn').addEventListener('click', skipQuestion);
    document.getElementById('continueBtn').addEventListener('click', continueLearning);
}

function renderSubjects(category) {
    const categoryData = categories[category];
    if (!categoryData) return;
    
    document.getElementById('categoryTitle').textContent = categoryData.title;
    
    const grid = document.getElementById('subjectGrid');
    grid.innerHTML = categoryData.subjects.map(subject => `
        <div class="subject-card" data-subject="${subject.id}">
            <div class="subject-icon">${subject.icon}</div>
            <div class="subject-name">${subject.name}</div>
            <div class="subject-level">${subject.level}</div>
        </div>
    `).join('');

    // Add click handlers
    grid.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => selectSubject(card));
    });
}

function selectSubject(card) {
    document.querySelectorAll('.subject-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    gameState.selectedSubject = card.dataset.subject;
    setTimeout(() => startLesson(), 300);
}

function resetToHome() {
    document.getElementById('lessonContainer').classList.remove('active');
    document.getElementById('resultContainer').classList.remove('active');
    document.getElementById('subjectSelection').parentElement.style.display = 'block';
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('selected');
    });
}

function startLesson() {
    document.getElementById('subjectSelection').parentElement.style.display = 'none';
    document.getElementById('lessonContainer').classList.add('active');
    
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.hearts = 5;
    
    updateStats();
    loadQuestion();
}

function loadQuestion() {
    const subjectQuestions = questions[gameState.selectedSubject] || questions.default;
    const question = subjectQuestions[gameState.currentQuestion % subjectQuestions.length];

    // Update progress
    const progress = (gameState.currentQuestion / gameState.totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;

    // Clear feedback
    document.getElementById('feedback').classList.remove('show');

    // Reset state
    gameState.currentAnswer = null;
    gameState.answerWords = [];

    // Reset button
    document.getElementById('checkBtn').textContent = 'Check';
    document.getElementById('checkBtn').onclick = checkAnswer;
    document.getElementById('checkBtn').disabled = false;

    renderQuestion(question);
}

function renderQuestion(question) {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    if (question.type === 'translation' || question.type === 'mathChoice') {
        container.innerHTML = `
            <div class="question-type">${question.type === 'mathChoice' ? 'Choose the correct answer' : 'Select the correct translation'}</div>
            <div class="question-text">${question.question}</div>
            <div class="choices-container">
                ${question.choices.map(choice => `
                    <button class="choice-btn" data-choice="${choice}">${choice}</button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => selectChoice(btn));
        });
    } else if (question.type === 'sentence') {
        container.innerHTML = `
            <div class="question-type">Translate this sentence</div>
            <div class="question-text">${question.question}</div>
            <div class="answer-box" id="answerBox"></div>
            <div class="word-bank">
                ${question.words.map(word => `
                    <div class="word-chip" data-word="${word}">${word}</div>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.word-chip').forEach(chip => {
            chip.addEventListener('click', () => toggleWord(chip));
        });
    } else if (question.type === 'listening') {
        container.innerHTML = `
            <div class="question-type">Type what you hear</div>
            <div class="question-text">🔊 <em>${question.audio}</em></div>
            <input type="text" class="translation-input" id="listeningInput" placeholder="Type your answer here...">
        `;

        setTimeout(() => document.getElementById('listeningInput')?.focus(), 100);
    } else if (question.type === 'math') {
        container.innerHTML = `
            <div class="question-type">Solve the problem</div>
            <div class="math-equation">${question.question}</div>
            <input type="text" class="math-input" id="mathInput" placeholder="Enter your answer">
        `;

        setTimeout(() => document.getElementById('mathInput')?.focus(), 100);
    }

    gameState.currentQuestionData = question;
}

function selectChoice(btn) {
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    gameState.currentAnswer = btn.dataset.choice;
}

function toggleWord(chip) {
    const word = chip.dataset.word;
    const answerBox = document.getElementById('answerBox');

    if (chip.classList.contains('used')) {
        chip.classList.remove('used');
        gameState.answerWords = gameState.answerWords.filter(w => w !== word);
    } else {
        chip.classList.add('used');
        gameState.answerWords.push(word);
    }

    answerBox.innerHTML = gameState.answerWords.map(w => 
        `<div class="word-chip">${w}</div>`
    ).join('');

    gameState.currentAnswer = gameState.answerWords.join(' ');
}

function checkAnswer() {
    const question = gameState.currentQuestionData;
    let isCorrect = false;

    if (question.type === 'translation' || question.type === 'mathChoice') {
        isCorrect = gameState.currentAnswer === question.answer;
    } else if (question.type === 'sentence') {
        isCorrect = gameState.currentAnswer === question.answer;
    } else if (question.type === 'listening') {
        const input = document.getElementById('listeningInput')?.value.trim();
        isCorrect = input?.toLowerCase() === question.answer.toLowerCase();
    } else if (question.type === 'math') {
        const input = document.getElementById('mathInput')?.value.trim();
        const normalizedInput = input?.replace(/\s/g, '').toLowerCase();
        const normalizedAnswer = question.answer.replace(/\s/g, '').toLowerCase();
        isCorrect = normalizedInput === normalizedAnswer;
    }

    // Show feedback
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.className = 'feedback correct show';
        feedback.innerHTML = '✅ Correct! Well done!';
        gameState.correctAnswers++;
        gameState.xp += 10;
        localStorage.setItem('xp', gameState.xp);
    } else {
        feedback.className = 'feedback incorrect show';
        feedback.innerHTML = `❌ The correct answer is: <strong>${question.answer}</strong>`;
        gameState.hearts--;
    }

    updateStats();

    // Update button
    document.getElementById('checkBtn').textContent = 'Continue';
    document.getElementById('checkBtn').onclick = nextQuestion;

    // Visual feedback for choices
    if (question.type === 'translation' || question.type === 'mathChoice') {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            if (btn.dataset.choice === question.answer) {
                btn.classList.add('correct');
            } else if (btn.classList.contains('selected') && btn.dataset.choice !== question.answer) {
                btn.classList.add('incorrect');
            }
        });
    }

    if (gameState.hearts <= 0) {
        setTimeout(() => showResults(), 1500);
    }
}

function skipQuestion() {
    nextQuestion();
}

function nextQuestion() {
    gameState.currentQuestion++;

    if (gameState.currentQuestion >= gameState.totalQuestions || gameState.hearts <= 0) {
        showResults();
    } else {
        loadQuestion();
    }
}

function showResults() {
    document.getElementById('lessonContainer').classList.remove('active');
    document.getElementById('resultContainer').classList.add('active');
    
    document.getElementById('correctCount').textContent = gameState.correctAnswers;
    document.getElementById('xpEarned').textContent = gameState.correctAnswers * 10;

    // Update streak
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem('lastPlayed');
    
    if (lastPlayed !== today) {
        gameState.streak++;
        localStorage.setItem('streak', gameState.streak);
        localStorage.setItem('lastPlayed', today);
    }
}

function continueLearning() {
    document.getElementById('resultContainer').classList.remove('active');
    document.getElementById('subjectSelection').parentElement.style.display = 'block';
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('lessonContainer').classList.remove('active');
}

function updateStats() {
    document.getElementById('xp').textContent = gameState.xp;
    document.getElementById('streak').textContent = gameState.streak;
    document.getElementById('hearts').textContent = gameState.hearts;
}

function checkStreak() {
    const lastPlayed = localStorage.getItem('lastPlayed');
    const today = new Date().toDateString();
    
    if (lastPlayed) {
        const lastDate = new Date(lastPlayed);
        const todayDate = new Date(today);
        const dayDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff > 1) {
            gameState.streak = 0;
            localStorage.setItem('streak', 0);
        }
    }
}
