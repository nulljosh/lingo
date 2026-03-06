// ============ CONSTANTS ============

const ACHIEVEMENTS = {
    firstLesson: { name: 'First Steps', desc: 'Complete your first lesson', icon: 'fa-solid fa-shoe-prints' },
    perfectLesson: { name: 'Perfectionist', desc: 'Score 10/10 on a lesson', icon: 'fa-solid fa-crown' },
    streak3: { name: 'On Fire', desc: '3-day streak', icon: 'fa-solid fa-fire' },
    streak7: { name: 'Dedicated', desc: '7-day streak', icon: 'fa-solid fa-calendar-check' },
    streak30: { name: 'Unstoppable', desc: '30-day streak', icon: 'fa-solid fa-bolt' },
    xp100: { name: 'Learner', desc: 'Earn 100 XP', icon: 'fa-solid fa-star' },
    xp500: { name: 'Scholar', desc: 'Earn 500 XP', icon: 'fa-solid fa-graduation-cap' },
    xp1000: { name: 'Master', desc: 'Earn 1000 XP', icon: 'fa-solid fa-hat-wizard' },
    polyglot: { name: 'Polyglot', desc: 'Study 3+ languages', icon: 'fa-solid fa-language' },
    mathWiz: { name: 'Math Wizard', desc: 'Complete all math topics', icon: 'fa-solid fa-calculator' },
    explorer: { name: 'Explorer', desc: 'Try 10 different subjects', icon: 'fa-solid fa-compass' }
};

const LANG_CODES = {
    spanish: 'es-ES',
    french: 'fr-FR',
    german: 'de-DE',
    italian: 'it-IT',
    portuguese: 'pt-BR',
    japanese: 'ja-JP',
    chinese: 'zh-CN',
    korean: 'ko-KR',
    russian: 'ru-RU',
    arabic: 'ar-SA',
    hindi: 'hi-IN',
    dutch: 'nl-NL'
};

const LANGUAGE_SUBJECTS = new Set(Object.keys(LANG_CODES));

// ============ SRS (SM-2 Algorithm) ============

function getSrsData() {
    return JSON.parse(localStorage.getItem('srs') || '{}');
}

function saveSrsData(data) {
    localStorage.setItem('srs', JSON.stringify(data));
}

function updateSrs(questionId, quality) {
    // quality: 0-5 (0=complete fail, 5=perfect recall)
    const data = getSrsData();
    const card = data[questionId] || { easiness: 2.5, interval: 1, repetitions: 0, nextReview: new Date().toISOString() };

    if (quality >= 3) {
        if (card.repetitions === 0) {
            card.interval = 1;
        } else if (card.repetitions === 1) {
            card.interval = 6;
        } else {
            card.interval = Math.round(card.interval * card.easiness);
        }
        card.repetitions++;
    } else {
        card.repetitions = 0;
        card.interval = 1;
    }

    card.easiness = Math.max(1.3, card.easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    const next = new Date();
    next.setDate(next.getDate() + card.interval);
    card.nextReview = next.toISOString();

    data[questionId] = card;
    saveSrsData(data);
}

function getDueCount(subjectId) {
    const srs = getSrsData();
    const subjectQuestions = questions[subjectId] || [];
    const now = new Date();
    return subjectQuestions.filter(q => {
        const card = srs[q.id];
        return card && new Date(card.nextReview) <= now;
    }).length;
}

function getQuestionsForLesson(subjectId) {
    const subjectQuestions = questions[subjectId] || questions.default;
    const srs = getSrsData();
    const now = new Date();

    const due = [];
    const rest = [];

    subjectQuestions.forEach(q => {
        const card = srs[q.id];
        if (card && new Date(card.nextReview) <= now) {
            due.push(q);
        } else {
            rest.push(q);
        }
    });

    shuffle(due);
    shuffle(rest);

    // Prioritize due questions, fill remaining with new/not-due
    const combined = [...due, ...rest];
    return combined.slice(0, gameState.totalQuestions);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ============ ACHIEVEMENTS ============

function getUnlockedAchievements() {
    return JSON.parse(localStorage.getItem('achievements') || '[]');
}

function saveAchievement(id) {
    const unlocked = getUnlockedAchievements();
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem('achievements', JSON.stringify(unlocked));
        showAchievementToast(id);
    }
}

function checkAchievements() {
    const completed = JSON.parse(localStorage.getItem('completedSubjects') || '[]');
    const unlocked = getUnlockedAchievements();

    if (completed.length > 0 && !unlocked.includes('firstLesson')) saveAchievement('firstLesson');

    if (gameState.streak >= 3 && !unlocked.includes('streak3')) saveAchievement('streak3');
    if (gameState.streak >= 7 && !unlocked.includes('streak7')) saveAchievement('streak7');
    if (gameState.streak >= 30 && !unlocked.includes('streak30')) saveAchievement('streak30');

    if (gameState.xp >= 100 && !unlocked.includes('xp100')) saveAchievement('xp100');
    if (gameState.xp >= 500 && !unlocked.includes('xp500')) saveAchievement('xp500');
    if (gameState.xp >= 1000 && !unlocked.includes('xp1000')) saveAchievement('xp1000');

    const langSubjects = completed.filter(s => LANGUAGE_SUBJECTS.has(s));
    if (langSubjects.length >= 3 && !unlocked.includes('polyglot')) saveAchievement('polyglot');

    const mathIds = categories.math.subjects.map(s => s.id);
    if (mathIds.every(id => completed.includes(id)) && !unlocked.includes('mathWiz')) saveAchievement('mathWiz');

    if (completed.length >= 10 && !unlocked.includes('explorer')) saveAchievement('explorer');
}

function showAchievementToast(id) {
    const achievement = ACHIEVEMENTS[id];
    if (!achievement) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="achievement-toast-icon"><i class="${achievement.icon}"></i></div>
        <div class="achievement-toast-content">
            <div class="achievement-toast-title">Achievement Unlocked</div>
            <div class="achievement-toast-name">${achievement.name}</div>
        </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function renderAchievementPanel() {
    const unlocked = getUnlockedAchievements();
    const panel = document.getElementById('achievementPanel');

    panel.innerHTML = `
        <div class="achievement-panel-header">
            <h2>Achievements</h2>
            <button class="btn achievement-close" aria-label="Close achievements"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="achievement-list">
            ${Object.entries(ACHIEVEMENTS).map(([id, a]) => `
                <div class="achievement-item ${unlocked.includes(id) ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon"><i class="${a.icon}"></i></div>
                    <div class="achievement-info">
                        <div class="achievement-name">${a.name}</div>
                        <div class="achievement-desc">${a.desc}</div>
                    </div>
                    ${unlocked.includes(id) ? '<i class="fa-solid fa-check achievement-check"></i>' : ''}
                </div>
            `).join('')}
        </div>
    `;

    panel.classList.add('active');
    const closeBtn = panel.querySelector('.achievement-close');
    closeBtn.addEventListener('click', () => panel.classList.remove('active'));
    trapFocus(panel);
}

// ============ SPEECH RECOGNITION ============

let recognition = null;
let isListening = false;

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    return recognition;
}

function startListening(langCode, callback) {
    if (!recognition) return;

    recognition.lang = langCode;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        isListening = false;
        callback(transcript);
        updateMicButton(false);
    };

    recognition.onerror = () => {
        isListening = false;
        updateMicButton(false);
    };

    recognition.onend = () => {
        isListening = false;
        updateMicButton(false);
    };

    isListening = true;
    updateMicButton(true);
    recognition.start();
}

function updateMicButton(active) {
    const btn = document.getElementById('micBtn');
    if (!btn) return;
    btn.classList.toggle('listening', active);
}

// ============ FOCUS MANAGEMENT ============

function trapFocus(element) {
    const focusable = element.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    element._trapHandler = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
        if (e.key === 'Escape') {
            element.classList.remove('active');
            element.removeEventListener('keydown', element._trapHandler);
        }
    };

    element.addEventListener('keydown', element._trapHandler);
}

// ============ GAME STATE ============

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
    answerWords: [],
    lessonQuestions: [],
    currentQuestionData: null
};

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    setupEventListeners();
    setupKeyboardNav();
    setupTouchGestures();
    renderSubjects('languages');
    checkStreak();
    initSpeechRecognition();
});

function setupEventListeners() {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            gameState.selectedCategory = category;
            renderSubjects(category);
        });
    });

    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('skipBtn').addEventListener('click', skipQuestion);
    document.getElementById('continueBtn').addEventListener('click', continueLearning);
    document.getElementById('achievementBtn').addEventListener('click', renderAchievementPanel);
}

// ============ KEYBOARD NAVIGATION ============

function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        const lesson = document.getElementById('lessonContainer');
        const result = document.getElementById('resultContainer');

        if (lesson.classList.contains('active')) {
            if (e.key === 'Enter' || (e.key === ' ' && e.target.tagName !== 'INPUT')) {
                e.preventDefault();
                const checkBtn = document.getElementById('checkBtn');
                if (!checkBtn.disabled) checkBtn.click();
            }

            if (['1', '2', '3', '4'].includes(e.key)) {
                const choices = document.querySelectorAll('.choice-btn');
                const idx = parseInt(e.key) - 1;
                if (choices[idx]) {
                    choices[idx].click();
                    choices[idx].focus();
                }
            }

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const choices = [...document.querySelectorAll('.choice-btn')];
                if (choices.length === 0) return;
                const current = choices.findIndex(c => c === document.activeElement);
                let next;
                if (e.key === 'ArrowDown') {
                    next = current < choices.length - 1 ? current + 1 : 0;
                } else {
                    next = current > 0 ? current - 1 : choices.length - 1;
                }
                choices[next].focus();
            }

            if (e.key === 'Escape') {
                resetToHome();
            }
        }

        if (result.classList.contains('active')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('continueBtn').click();
            }
            if (e.key === 'Escape') {
                resetToHome();
            }
        }
    });
}

// ============ TOUCH GESTURES ============

function setupTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        const dy = e.changedTouches[0].screenY - touchStartY;

        if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            const result = document.getElementById('resultContainer');
            if (result.classList.contains('active')) {
                if (dx > 0) {
                    resetToHome();
                } else {
                    continueLearning();
                }
            }
        }
    }, { passive: true });

    // Ripple effect on interactive elements
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn, .choice-btn, .subject-card, .word-chip');
        if (!btn) return;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
}

// ============ RENDERING ============

function renderSubjects(category) {
    const categoryData = categories[category];
    if (!categoryData) return;

    document.getElementById('categoryTitle').textContent = categoryData.title;

    const grid = document.getElementById('subjectGrid');

    grid.innerHTML = categoryData.subjects.map(subject => {
        const dueCount = getDueCount(subject.id);

        return `
            <div class="subject-card" data-subject="${subject.id}" role="button" tabindex="0"
                 aria-label="${subject.name} - ${subject.level}${dueCount > 0 ? ', ' + dueCount + ' due for review' : ''}">
                <div class="subject-icon"><i class="${subject.icon}" aria-hidden="true"></i></div>
                <div class="subject-name">${subject.name}</div>
                <div class="subject-level">${subject.level}</div>
                ${dueCount > 0 ? `<div class="review-badge" aria-hidden="true">${dueCount} due</div>` : ''}
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => selectSubject(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectSubject(card);
            }
        });
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
    document.getElementById('subjectSelection').style.display = 'block';
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('selected');
    });
    renderSubjects(gameState.selectedCategory);
}

function startLesson() {
    document.getElementById('subjectSelection').style.display = 'none';
    document.getElementById('lessonContainer').classList.add('active');

    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.hearts = 5;
    gameState.lessonQuestions = getQuestionsForLesson(gameState.selectedSubject);

    updateStats();
    loadQuestion();
}

function loadQuestion() {
    const question = gameState.lessonQuestions[gameState.currentQuestion];
    if (!question) {
        showResults();
        return;
    }

    const progress = (gameState.currentQuestion / gameState.totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressLabel').textContent = `${gameState.currentQuestion} / ${gameState.totalQuestions}`;

    const feedback = document.getElementById('feedback');
    feedback.classList.remove('show', 'correct', 'incorrect');
    feedback.textContent = '';

    gameState.currentAnswer = null;
    gameState.answerWords = [];

    document.getElementById('checkBtn').textContent = 'Check';
    document.getElementById('checkBtn').onclick = checkAnswer;
    document.getElementById('checkBtn').disabled = false;

    renderQuestion(question);
}

function renderQuestion(question) {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    const isLanguage = LANGUAGE_SUBJECTS.has(gameState.selectedSubject);
    const hasSpeech = recognition && isLanguage;

    if (question.type === 'translation' || question.type === 'mathChoice') {
        container.innerHTML = `
            <div class="question-type">${question.type === 'mathChoice' ? 'Choose the correct answer' : 'Select the correct translation'}</div>
            <div class="question-text">${question.question}</div>
            ${hasSpeech && question.type === 'translation' ? `<button class="mic-btn" id="micBtn" aria-label="Speak your answer"><i class="fa-solid fa-microphone"></i></button>` : ''}
            <div class="choices-container" role="radiogroup" aria-label="Answer choices">
                ${question.choices.map((choice, i) => `
                    <button class="choice-btn" data-choice="${choice}" role="radio" aria-checked="false" tabindex="${i === 0 ? '0' : '-1'}">${choice}</button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => selectChoice(btn));
        });

        if (hasSpeech && question.type === 'translation') {
            document.getElementById('micBtn').addEventListener('click', () => {
                if (isListening) { recognition.stop(); return; }
                const langCode = LANG_CODES[gameState.selectedSubject] || 'en-US';
                startListening(langCode, (transcript) => {
                    const normalized = transcript.toLowerCase().trim();
                    const match = question.choices.find(c => c.toLowerCase() === normalized);
                    if (match) {
                        const btn = container.querySelector(`[data-choice="${match}"]`);
                        if (btn) selectChoice(btn);
                    }
                });
            });
        }
    } else if (question.type === 'sentence') {
        container.innerHTML = `
            <div class="question-type">Translate this sentence</div>
            <div class="question-text">${question.question}</div>
            ${hasSpeech ? `<button class="mic-btn" id="micBtn" aria-label="Speak your answer"><i class="fa-solid fa-microphone"></i></button>` : ''}
            <div class="answer-box" id="answerBox" aria-label="Your answer" aria-live="polite"></div>
            <div class="word-bank" role="group" aria-label="Word bank">
                ${question.words.map(word => `
                    <div class="word-chip" data-word="${word}" role="button" tabindex="0" aria-label="Add word: ${word}">${word}</div>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.word-chip').forEach(chip => {
            chip.addEventListener('click', () => toggleWord(chip));
            chip.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleWord(chip);
                }
            });
        });

        if (hasSpeech) {
            document.getElementById('micBtn').addEventListener('click', () => {
                if (isListening) { recognition.stop(); return; }
                const langCode = LANG_CODES[gameState.selectedSubject] || 'en-US';
                startListening(langCode, (transcript) => {
                    const words = transcript.toLowerCase().split(/\s+/);
                    words.forEach(w => {
                        const chip = [...container.querySelectorAll('.word-chip:not(.used)')].find(
                            c => c.dataset.word.toLowerCase() === w
                        );
                        if (chip) toggleWord(chip);
                    });
                });
            });
        }
    } else if (question.type === 'listening') {
        container.innerHTML = `
            <div class="question-type">Type what you hear</div>
            <div class="question-text"><i class="fa-solid fa-volume-high" style="margin-right: 0.5rem; opacity: 0.5;" aria-hidden="true"></i>${question.audio}</div>
            ${hasSpeech ? `<button class="mic-btn" id="micBtn" aria-label="Speak your answer"><i class="fa-solid fa-microphone"></i></button>` : ''}
            <input type="text" class="translation-input" id="listeningInput" placeholder="Type your answer here..." aria-label="Your answer">
        `;
        setTimeout(() => document.getElementById('listeningInput')?.focus(), 100);

        if (hasSpeech) {
            document.getElementById('micBtn').addEventListener('click', () => {
                if (isListening) { recognition.stop(); return; }
                const langCode = LANG_CODES[gameState.selectedSubject] || 'en-US';
                startListening(langCode, (transcript) => {
                    document.getElementById('listeningInput').value = transcript;
                });
            });
        }
    } else if (question.type === 'math') {
        container.innerHTML = `
            <div class="question-type">Solve the problem</div>
            <div class="math-equation">${question.question}</div>
            <input type="text" class="math-input" id="mathInput" placeholder="Enter your answer" aria-label="Your answer">
        `;
        setTimeout(() => document.getElementById('mathInput')?.focus(), 100);
    }

    gameState.currentQuestionData = question;
}

function selectChoice(btn) {
    document.querySelectorAll('.choice-btn').forEach(b => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('selected');
    btn.setAttribute('aria-checked', 'true');
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

    // SRS update
    if (question.id) {
        updateSrs(question.id, isCorrect ? 5 : 1);
    }

    const feedback = document.getElementById('feedback');
    const questionCard = document.querySelector('.question-card');
    if (isCorrect) {
        feedback.className = 'feedback correct show';
        feedback.textContent = 'Correct.';
        gameState.correctAnswers++;
        gameState.xp += 10;
        localStorage.setItem('xp', gameState.xp);
        vibrate(50);

        // Bounce animation
        questionCard.classList.add('correct-anim');
        setTimeout(() => questionCard.classList.remove('correct-anim'), 600);

        // XP float
        const xpStat = document.querySelector('.stat-xp');
        if (xpStat) {
            xpStat.style.position = 'relative';
            const floater = document.createElement('span');
            floater.className = 'xp-float';
            floater.textContent = '+10';
            xpStat.appendChild(floater);
            setTimeout(() => floater.remove(), 1000);
        }
    } else {
        feedback.className = 'feedback incorrect show';
        feedback.innerHTML = `Incorrect. The answer is: <strong>${question.answer}</strong>`;
        gameState.hearts--;
        vibrate([50, 30, 50]);

        // Shake animation
        questionCard.classList.add('incorrect-anim');
        setTimeout(() => questionCard.classList.remove('incorrect-anim'), 600);
    }

    updateStats();

    document.getElementById('checkBtn').textContent = 'Continue';
    document.getElementById('checkBtn').onclick = nextQuestion;

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

function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
}

function spawnConfetti() {
    const colors = ['#58CC02', '#CE82FF', '#FF4B4B', '#FFC800', '#1CB0F6'];
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.width = (Math.random() * 6 + 5) + 'px';
        piece.style.height = (Math.random() * 6 + 5) + 'px';
        piece.style.animationDelay = (Math.random() * 0.8) + 's';
        piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
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

    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem('lastPlayed');

    if (lastPlayed !== today) {
        gameState.streak++;
        localStorage.setItem('streak', gameState.streak);
        localStorage.setItem('lastPlayed', today);
    }

    updateStats();

    // Track completed subjects
    const completed = JSON.parse(localStorage.getItem('completedSubjects') || '[]');
    if (gameState.selectedSubject && !completed.includes(gameState.selectedSubject)) {
        completed.push(gameState.selectedSubject);
        localStorage.setItem('completedSubjects', JSON.stringify(completed));
    }

    // Confetti effect
    spawnConfetti();

    // Perfect lesson check
    if (gameState.correctAnswers === gameState.totalQuestions) {
        const unlocked = getUnlockedAchievements();
        if (!unlocked.includes('perfectLesson')) saveAchievement('perfectLesson');
    }
    checkAchievements();

    setTimeout(() => document.getElementById('continueBtn').focus(), 100);
}

function continueLearning() {
    document.getElementById('resultContainer').classList.remove('active');
    document.getElementById('subjectSelection').style.display = 'block';
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('lessonContainer').classList.remove('active');
    renderSubjects(gameState.selectedCategory);
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
