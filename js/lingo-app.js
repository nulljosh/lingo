const TROPHIES = {
    firstLesson: { name: 'First Steps', desc: 'Complete your first lesson', icon: 'fa-solid fa-shoe-prints' },
    perfectLesson: { name: 'Perfectionist', desc: 'Score 10/10 on a lesson', icon: 'fa-solid fa-crown' },
    streak3: { name: 'On Fire', desc: 'Reach a 3-day streak', icon: 'fa-solid fa-fire' },
    streak7: { name: 'Dedicated', desc: 'Reach a 7-day streak', icon: 'fa-solid fa-calendar-check' },
    streak30: { name: 'Unstoppable', desc: 'Reach a 30-day streak', icon: 'fa-solid fa-bolt' },
    xp100: { name: 'Learner', desc: 'Earn 100 XP', icon: 'fa-solid fa-star' },
    xp500: { name: 'Scholar', desc: 'Earn 500 XP', icon: 'fa-solid fa-graduation-cap' },
    xp1000: { name: 'Master', desc: 'Earn 1000 XP', icon: 'fa-solid fa-hat-wizard' },
    polyglot: { name: 'Polyglot', desc: 'Study 3 language tracks', icon: 'fa-solid fa-language' },
    mathWiz: { name: 'Math Wizard', desc: 'Complete every math topic', icon: 'fa-solid fa-calculator' },
    explorer: { name: 'Explorer', desc: 'Try 10 different subjects', icon: 'fa-solid fa-compass' }
};

const AVATAR_PRESETS = [
    { id: 'falcon', emoji: '🦅', label: 'Falcon' },
    { id: 'fox', emoji: '🦊', label: 'Fox' },
    { id: 'otter', emoji: '🦦', label: 'Otter' },
    { id: 'panda', emoji: '🐼', label: 'Panda' },
    { id: 'frog', emoji: '🐸', label: 'Frog' },
    { id: 'tiger', emoji: '🐯', label: 'Tiger' }
];

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
const LEGACY_KEYS = ['xp', 'streak', 'completedSubjects', 'achievements', 'srs', 'lastPlayed'];
const AUTH_STORAGE_KEY = 'lingo.pb.auth';
const DEFAULT_PROGRESS = {
    xp: 0,
    streak: 0,
    hearts: 5,
    completed_subjects: [],
    trophy_ids: [],
    srs: {},
    last_played: '',
    imported_legacy: false
};

let recognition = null;
let isListening = false;
let selectedAuthAvatar = AVATAR_PRESETS[0].id;

const pocketbaseBaseUrl = (() => {
    if (window.LINGO_POCKETBASE_URL) return window.LINGO_POCKETBASE_URL;
    if (window.location.protocol === 'file:') return 'http://127.0.0.1:8090';
    return window.location.origin;
})();

const authState = {
    token: '',
    user: null
};

let gameState = {
    selectedCategory: 'languages',
    selectedSubject: null,
    currentQuestion: 0,
    totalQuestions: 10,
    correctAnswers: 0,
    xp: 0,
    streak: 0,
    hearts: 5,
    currentAnswer: null,
    answerWords: [],
    lessonQuestions: [],
    currentQuestionData: null,
    completedSubjects: []
};

document.addEventListener('DOMContentLoaded', () => {
    normalizeQuestionBank();
    initTheme();
    setupEventListeners();
    setupKeyboardNav();
    setupTouchGestures();
    renderAvatarPicker('authAvatarPicker', selectedAuthAvatar, (avatarId) => {
        selectedAuthAvatar = avatarId;
    });
    renderSubjects('languages');
    initSpeechRecognition();
    updateStats();
    updateHeaderProfile();
    void initializeApp();
});

async function initializeApp() {
    updateBackendNotice();
    restoreAuth();
    if (!authState.token) {
        updateShellForAuth();
        return;
    }

    try {
        await refreshAuth();
        await importLegacyProgressIfNeeded();
        syncGameStateFromUser();
    } catch (_error) {
        clearAuth();
    }

    updateHeaderProfile();
    updateStats();
    updateShellForAuth();
    renderSubjects(gameState.selectedCategory);
}

function updateBackendNotice() {
    const notice = document.getElementById('backendNotice');
    notice.textContent = `Run \`./scripts/dev-pocketbase.sh\` and open ${pocketbaseBaseUrl} to use synced accounts locally.`;
}

function restoreAuth() {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    try {
        const stored = JSON.parse(raw);
        authState.token = stored.token || '';
        authState.user = stored.user || null;
    } catch (_error) {
        clearAuth();
    }
}

function persistAuth() {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        token: authState.token,
        user: authState.user
    }));
}

function clearAuth() {
    authState.token = '';
    authState.user = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    gameState.xp = 0;
    gameState.streak = 0;
    gameState.hearts = 5;
    gameState.completedSubjects = [];
    updateHeaderProfile();
    updateStats();
    updateShellForAuth();
}

async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }
    if (options.auth !== false && authState.token) {
        headers.set('Authorization', authState.token);
    }

    const response = await fetch(`${pocketbaseBaseUrl}${path}`, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
    }

    return data;
}

async function refreshAuth() {
    const data = await apiRequest('/api/collections/users/auth-refresh', {
        method: 'POST'
    });
    authState.token = data.token;
    authState.user = data.record;
    persistAuth();
    return data.record;
}

async function login(email, password) {
    const data = await apiRequest('/api/collections/users/auth-with-password', {
        method: 'POST',
        auth: false,
        body: {
            identity: email,
            password
        }
    });
    authState.token = data.token;
    authState.user = data.record;
    persistAuth();
    return data.record;
}

async function register(user) {
    await apiRequest('/api/collections/users/records', {
        method: 'POST',
        auth: false,
        body: {
            username: user.username,
            email: user.email,
            emailVisibility: false,
            password: user.password,
            passwordConfirm: user.password,
            display_name: user.displayName,
            avatar_id: user.avatarId,
            xp: 0,
            streak: 0,
            hearts: 5,
            completed_subjects: [],
            trophy_ids: [],
            srs: {},
            last_played: '',
            imported_legacy: false
        }
    });
    return login(user.email, user.password);
}

async function updateCurrentUser(patch) {
    if (!authState.user) return null;
    const record = await apiRequest(`/api/collections/users/records/${authState.user.id}`, {
        method: 'PATCH',
        body: patch
    });
    authState.user = record;
    persistAuth();
    return record;
}

function normalizeQuestionBank() {
    Object.entries(questions).forEach(([subjectId, subjectQuestions]) => {
        subjectQuestions.forEach((question, index) => {
            if (!question.id) {
                question.id = `${subjectId}-${question.type}-${index + 1}`;
            }
        });
    });
}

function setupEventListeners() {
    document.querySelectorAll('.category-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach((item) => item.classList.remove('active'));
            tab.classList.add('active');
            gameState.selectedCategory = tab.dataset.category;
            renderSubjects(gameState.selectedCategory);
        });
    });

    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('skipBtn').addEventListener('click', skipQuestion);
    document.getElementById('continueBtn').addEventListener('click', continueLearning);
    document.getElementById('achievementBtn').addEventListener('click', renderAchievementPanel);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('profileBtn').addEventListener('click', () => {
        if (authState.user) {
            renderProfilePanel();
        } else {
            showAuthMode('login');
            document.getElementById('authShell').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    document.querySelectorAll('.auth-tab').forEach((tab) => {
        tab.addEventListener('click', () => showAuthMode(tab.dataset.authMode));
    });

    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        setAuthFeedback('Logging in...', 'info');
        try {
            await login(
                document.getElementById('loginEmail').value.trim(),
                document.getElementById('loginPassword').value
            );
            await importLegacyProgressIfNeeded();
            syncGameStateFromUser();
            updateHeaderProfile();
            updateStats();
            updateShellForAuth();
            renderSubjects(gameState.selectedCategory);
            setAuthFeedback('Logged in.', 'success');
        } catch (error) {
            setAuthFeedback(error.message, 'error');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        setAuthFeedback('Creating account...', 'info');
        try {
            await register({
                displayName: document.getElementById('registerDisplayName').value.trim(),
                username: document.getElementById('registerUsername').value.trim().toLowerCase(),
                email: document.getElementById('registerEmail').value.trim(),
                password: document.getElementById('registerPassword').value,
                avatarId: selectedAuthAvatar
            });
            await importLegacyProgressIfNeeded();
            syncGameStateFromUser();
            updateHeaderProfile();
            updateStats();
            updateShellForAuth();
            renderSubjects(gameState.selectedCategory);
            setAuthFeedback('Account created.', 'success');
        } catch (error) {
            setAuthFeedback(error.message, 'error');
        }
    });
}

function showAuthMode(mode) {
    const isLogin = mode === 'login';
    document.getElementById('loginTab').classList.toggle('active', isLogin);
    document.getElementById('registerTab').classList.toggle('active', !isLogin);
    document.getElementById('loginTab').setAttribute('aria-selected', String(isLogin));
    document.getElementById('registerTab').setAttribute('aria-selected', String(!isLogin));
    document.getElementById('loginForm').classList.toggle('active', isLogin);
    document.getElementById('registerForm').classList.toggle('active', !isLogin);
}

function setAuthFeedback(message, type = 'info') {
    const feedback = document.getElementById('authFeedback');
    feedback.textContent = message;
    feedback.className = `auth-feedback ${type}`;
}

function updateShellForAuth() {
    document.getElementById('authShell').style.display = authState.user ? 'none' : 'block';
    document.getElementById('appShell').style.display = authState.user ? 'block' : 'none';
}

function syncGameStateFromUser() {
    const user = getUserProgress();
    gameState.xp = user.xp;
    gameState.streak = user.streak;
    gameState.hearts = user.hearts;
    gameState.completedSubjects = [...user.completed_subjects];
}

function getUserProgress() {
    if (!authState.user) return { ...DEFAULT_PROGRESS };
    return {
        xp: authState.user.xp || 0,
        streak: authState.user.streak || 0,
        hearts: authState.user.hearts ?? 5,
        completed_subjects: Array.isArray(authState.user.completed_subjects) ? authState.user.completed_subjects : [],
        trophy_ids: Array.isArray(authState.user.trophy_ids) ? authState.user.trophy_ids : [],
        srs: authState.user.srs && typeof authState.user.srs === 'object' ? authState.user.srs : {},
        last_played: authState.user.last_played || '',
        imported_legacy: Boolean(authState.user.imported_legacy)
    };
}

function getAvatarById(id) {
    return AVATAR_PRESETS.find((avatar) => avatar.id === id) || AVATAR_PRESETS[0];
}

function updateHeaderProfile() {
    const label = authState.user?.display_name || 'Login';
    const avatar = getAvatarById(authState.user?.avatar_id);
    document.getElementById('profileName').textContent = label;
    document.getElementById('profileAvatar').textContent = avatar.emoji;
}

function renderAvatarPicker(containerId, selectedId, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = AVATAR_PRESETS.map((avatar) => `
        <button class="avatar-option ${avatar.id === selectedId ? 'selected' : ''}" data-avatar-id="${avatar.id}" type="button" aria-label="${avatar.label}">
            <span class="avatar-emoji">${avatar.emoji}</span>
            <span class="avatar-label">${avatar.label}</span>
        </button>
    `).join('');

    container.querySelectorAll('.avatar-option').forEach((button) => {
        button.addEventListener('click', () => {
            container.querySelectorAll('.avatar-option').forEach((item) => item.classList.remove('selected'));
            button.classList.add('selected');
            onSelect(button.dataset.avatarId);
        });
    });
}

async function importLegacyProgressIfNeeded() {
    if (!authState.user || getUserProgress().imported_legacy || !hasLegacyProgress()) return;

    const current = getUserProgress();
    const patch = {
        xp: Math.max(current.xp, parseInt(localStorage.getItem('xp') || '0', 10)),
        streak: Math.max(current.streak, parseInt(localStorage.getItem('streak') || '0', 10)),
        hearts: current.hearts,
        completed_subjects: dedupe([
            ...current.completed_subjects,
            ...JSON.parse(localStorage.getItem('completedSubjects') || '[]')
        ]),
        trophy_ids: dedupe([
            ...current.trophy_ids,
            ...JSON.parse(localStorage.getItem('achievements') || '[]')
        ]),
        srs: {
            ...JSON.parse(localStorage.getItem('srs') || '{}'),
            ...current.srs
        },
        last_played: current.last_played || normalizeLegacyDate(localStorage.getItem('lastPlayed')),
        imported_legacy: true
    };

    await updateCurrentUser(patch);
}

function hasLegacyProgress() {
    return LEGACY_KEYS.some((key) => localStorage.getItem(key));
}

function normalizeLegacyDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 10);
}

function getSrsData() {
    return getUserProgress().srs;
}

async function updateSrs(questionId, quality) {
    const srs = { ...getSrsData() };
    const card = srs[questionId] || { easiness: 2.5, interval: 1, repetitions: 0, nextReview: new Date().toISOString() };

    if (quality >= 3) {
        if (card.repetitions === 0) card.interval = 1;
        else if (card.repetitions === 1) card.interval = 6;
        else card.interval = Math.round(card.interval * card.easiness);
        card.repetitions += 1;
    } else {
        card.repetitions = 0;
        card.interval = 1;
    }

    card.easiness = Math.max(1.3, card.easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    const next = new Date();
    next.setDate(next.getDate() + card.interval);
    card.nextReview = next.toISOString();
    srs[questionId] = card;
    await updateCurrentUser({ srs });
}

function getDueCount(subjectId) {
    const srs = getSrsData();
    const subjectQuestions = questions[subjectId] || [];
    const now = new Date();
    return subjectQuestions.filter((question) => {
        const card = srs[question.id];
        return card && new Date(card.nextReview) <= now;
    }).length;
}

function getQuestionsForLesson(subjectId) {
    const subjectQuestions = questions[subjectId] || [];
    const srs = getSrsData();
    const now = new Date();
    const due = [];
    const rest = [];

    subjectQuestions.forEach((question) => {
        const card = srs[question.id];
        if (card && new Date(card.nextReview) <= now) due.push(question);
        else rest.push(question);
    });

    shuffle(due);
    shuffle(rest);
    return [...due, ...rest].slice(0, gameState.totalQuestions);
}

function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
}

function getUnlockedAchievements() {
    return getUserProgress().trophy_ids;
}

async function saveAchievement(id) {
    if (!authState.user) return;
    const unlocked = getUnlockedAchievements();
    if (unlocked.includes(id)) return;
    await updateCurrentUser({ trophy_ids: [...unlocked, id] });
    showAchievementToast(id);
}

async function checkAchievements() {
    const completed = gameState.completedSubjects;
    const unlocked = getUnlockedAchievements();

    if (completed.length > 0 && !unlocked.includes('firstLesson')) await saveAchievement('firstLesson');
    if (gameState.streak >= 3 && !unlocked.includes('streak3')) await saveAchievement('streak3');
    if (gameState.streak >= 7 && !unlocked.includes('streak7')) await saveAchievement('streak7');
    if (gameState.streak >= 30 && !unlocked.includes('streak30')) await saveAchievement('streak30');
    if (gameState.xp >= 100 && !unlocked.includes('xp100')) await saveAchievement('xp100');
    if (gameState.xp >= 500 && !unlocked.includes('xp500')) await saveAchievement('xp500');
    if (gameState.xp >= 1000 && !unlocked.includes('xp1000')) await saveAchievement('xp1000');

    const langSubjects = completed.filter((subjectId) => LANGUAGE_SUBJECTS.has(subjectId));
    if (langSubjects.length >= 3 && !unlocked.includes('polyglot')) await saveAchievement('polyglot');

    const mathIds = categories.math.subjects.map((subject) => subject.id);
    if (mathIds.every((id) => completed.includes(id)) && !unlocked.includes('mathWiz')) await saveAchievement('mathWiz');
    if (completed.length >= 10 && !unlocked.includes('explorer')) await saveAchievement('explorer');
}

function showAchievementToast(id) {
    const trophy = TROPHIES[id];
    if (!trophy) return;
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="achievement-toast-icon"><i class="${trophy.icon}"></i></div>
        <div class="achievement-toast-content">
            <div class="achievement-toast-title">Trophy unlocked</div>
            <div class="achievement-toast-name">${trophy.name}</div>
        </div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
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
            <h2>Trophies</h2>
            <button class="btn achievement-close" id="closeTrophiesBtn" aria-label="Close trophies"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="achievement-list">
            ${Object.entries(TROPHIES).map(([id, trophy]) => `
                <div class="achievement-item ${unlocked.includes(id) ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon"><i class="${trophy.icon}"></i></div>
                    <div class="achievement-info">
                        <div class="achievement-name">${trophy.name}</div>
                        <div class="achievement-desc">${trophy.desc}</div>
                    </div>
                    ${unlocked.includes(id) ? '<i class="fa-solid fa-check achievement-check"></i>' : ''}
                </div>
            `).join('')}
        </div>
    `;
    panel.classList.add('active');
    trapFocus(panel);
    document.getElementById('closeTrophiesBtn').addEventListener('click', () => panel.classList.remove('active'));
}

function renderProfilePanel() {
    if (!authState.user) return;

    const panel = document.getElementById('profilePanel');
    const avatar = getAvatarById(authState.user.avatar_id);
    panel.innerHTML = `
        <div class="profile-panel-header">
            <div>
                <div class="profile-panel-kicker">Profile</div>
                <h2>${escapeHtml(authState.user.display_name || authState.user.username)}</h2>
            </div>
            <button class="btn achievement-close" id="closeProfileBtn" aria-label="Close profile"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="profile-summary">
            <div class="profile-summary-avatar">${avatar.emoji}</div>
            <div class="profile-summary-copy">
                <div class="profile-summary-name">${escapeHtml(authState.user.display_name || authState.user.username)}</div>
                <div class="profile-summary-meta">@${escapeHtml(authState.user.username)} · ${escapeHtml(authState.user.email)}</div>
            </div>
        </div>
        <form class="profile-form" id="profileForm">
            <label class="auth-field">
                <span>Display name</span>
                <input type="text" id="profileDisplayName" value="${escapeHtml(authState.user.display_name || '')}" maxlength="50" required>
            </label>
            <label class="auth-field">
                <span>Username</span>
                <input type="text" id="profileUsername" value="${escapeHtml(authState.user.username || '')}" maxlength="24" pattern="[a-zA-Z0-9_]{3,24}" required>
            </label>
            <div class="avatar-picker" id="profileAvatarPicker"></div>
            <div class="profile-stats-grid">
                <div class="profile-stat"><strong>${gameState.xp}</strong><span>Total XP</span></div>
                <div class="profile-stat"><strong>${gameState.streak}</strong><span>Day streak</span></div>
                <div class="profile-stat"><strong>${gameState.completedSubjects.length}</strong><span>Courses tried</span></div>
                <div class="profile-stat"><strong>${getUnlockedAchievements().length}</strong><span>Trophies</span></div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary" type="submit">Save profile</button>
                <button class="btn" type="button" id="logoutBtn">Logout</button>
            </div>
            <div class="auth-feedback" id="profileFeedback" aria-live="polite"></div>
        </form>
    `;

    let selectedAvatar = authState.user.avatar_id;
    renderAvatarPicker('profileAvatarPicker', selectedAvatar, (avatarId) => {
        selectedAvatar = avatarId;
    });

    panel.classList.add('active');
    trapFocus(panel);

    document.getElementById('closeProfileBtn').addEventListener('click', () => panel.classList.remove('active'));
    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearAuth();
        panel.classList.remove('active');
    });
    document.getElementById('profileForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const feedback = document.getElementById('profileFeedback');
        feedback.textContent = 'Saving...';
        feedback.className = 'auth-feedback info';
        try {
            await updateCurrentUser({
                display_name: document.getElementById('profileDisplayName').value.trim(),
                username: document.getElementById('profileUsername').value.trim().toLowerCase(),
                avatar_id: selectedAvatar
            });
            updateHeaderProfile();
            feedback.textContent = 'Profile saved.';
            feedback.className = 'auth-feedback success';
        } catch (error) {
            feedback.textContent = error.message;
            feedback.className = 'auth-feedback error';
        }
    });
}

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
    recognition.onerror = recognition.onend = () => {
        isListening = false;
        updateMicButton(false);
    };
    isListening = true;
    updateMicButton(true);
    recognition.start();
}

function updateMicButton(active) {
    const button = document.getElementById('micBtn');
    if (button) button.classList.toggle('listening', active);
}

function trapFocus(element) {
    const focusable = element.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();
    element._trapHandler = (event) => {
        if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
        if (event.key === 'Escape') {
            element.classList.remove('active');
            element.removeEventListener('keydown', element._trapHandler);
        }
    };
    element.addEventListener('keydown', element._trapHandler);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeColor(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeColor(next);
}

function updateThemeColor(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1a1a2e' : '#58CC02');
}

function setupKeyboardNav() {
    document.addEventListener('keydown', (event) => {
        const lesson = document.getElementById('lessonContainer');
        const result = document.getElementById('resultContainer');
        if (lesson.classList.contains('active')) {
            if (event.key === 'Enter' || (event.key === ' ' && event.target.tagName !== 'INPUT')) {
                event.preventDefault();
                const button = document.getElementById('checkBtn');
                if (!button.disabled) button.click();
            }
            if (['1', '2', '3', '4'].includes(event.key)) {
                const choices = document.querySelectorAll('.choice-btn');
                const index = parseInt(event.key, 10) - 1;
                if (choices[index]) {
                    choices[index].click();
                    choices[index].focus();
                }
            }
            if (event.key === 'Escape') resetToHome();
        }
        if (result.classList.contains('active')) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                document.getElementById('continueBtn').click();
            }
            if (event.key === 'Escape') resetToHome();
        }
    });
}

function setupTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });
    document.addEventListener('touchend', (event) => {
        const dx = event.changedTouches[0].screenX - touchStartX;
        const dy = event.changedTouches[0].screenY - touchStartY;
        if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            const result = document.getElementById('resultContainer');
            if (result.classList.contains('active')) {
                if (dx > 0) resetToHome();
                else continueLearning();
            }
        }
    }, { passive: true });
    document.addEventListener('click', (event) => {
        const target = event.target.closest('.btn, .choice-btn, .subject-card, .word-chip, .avatar-option, .profile-chip');
        if (!target) return;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = target.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
}

function renderSubjects(category) {
    const categoryData = categories[category];
    if (!categoryData) return;
    document.getElementById('categoryTitle').textContent = categoryData.title;
    const grid = document.getElementById('subjectGrid');
    grid.innerHTML = categoryData.subjects.map((subject) => {
        const dueCount = getDueCount(subject.id);
        return `
            <div class="subject-card" data-subject="${subject.id}" role="button" tabindex="0" aria-label="${subject.name}">
                <div class="subject-icon"><i class="${subject.icon}" aria-hidden="true"></i></div>
                <div class="subject-name">${subject.name}</div>
                <div class="subject-level">${subject.level}</div>
                ${dueCount > 0 ? `<div class="review-badge">${dueCount} due</div>` : ''}
            </div>
        `;
    }).join('');
    grid.querySelectorAll('.subject-card').forEach((card) => {
        card.addEventListener('click', () => selectSubject(card));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectSubject(card);
            }
        });
    });
}

function selectSubject(card) {
    if (!authState.user) {
        showAuthMode('login');
        return;
    }
    document.querySelectorAll('.subject-card').forEach((subjectCard) => subjectCard.classList.remove('selected'));
    card.classList.add('selected');
    gameState.selectedSubject = card.dataset.subject;
    setTimeout(() => startLesson(), 300);
}

function resetToHome() {
    document.getElementById('lessonContainer').classList.remove('active');
    document.getElementById('resultContainer').classList.remove('active');
    document.getElementById('subjectSelection').style.display = 'block';
    document.querySelectorAll('.subject-card').forEach((card) => card.classList.remove('selected'));
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
        void showResults();
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
    const button = document.getElementById('checkBtn');
    button.textContent = 'Check';
    button.onclick = checkAnswer;
    button.disabled = false;
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
            ${hasSpeech && question.type === 'translation' ? '<button class="mic-btn" id="micBtn" aria-label="Speak your answer"><i class="fa-solid fa-microphone"></i></button>' : ''}
            <div class="choices-container" role="radiogroup">
                ${question.choices.map((choice, index) => `<button class="choice-btn" data-choice="${escapeHtml(choice)}" role="radio" aria-checked="false" tabindex="${index === 0 ? '0' : '-1'}">${choice}</button>`).join('')}
            </div>
        `;
        container.querySelectorAll('.choice-btn').forEach((button) => button.addEventListener('click', () => selectChoice(button)));
        if (hasSpeech && question.type === 'translation') {
            document.getElementById('micBtn').addEventListener('click', () => {
                if (isListening) {
                    recognition.stop();
                    return;
                }
                startListening(LANG_CODES[gameState.selectedSubject] || 'en-US', (transcript) => {
                    const normalized = transcript.toLowerCase().trim();
                    const button = [...container.querySelectorAll('.choice-btn')].find((choice) => choice.dataset.choice.toLowerCase() === normalized);
                    if (button) selectChoice(button);
                });
            });
        }
    } else if (question.type === 'sentence') {
        container.innerHTML = `
            <div class="question-type">Translate this sentence</div>
            <div class="question-text">${question.question}</div>
            ${hasSpeech ? '<button class="mic-btn" id="micBtn" aria-label="Speak your answer"><i class="fa-solid fa-microphone"></i></button>' : ''}
            <div class="answer-box" id="answerBox" aria-live="polite"></div>
            <div class="word-bank">
                ${question.words.map((word) => `<div class="word-chip" data-word="${escapeHtml(word)}" role="button" tabindex="0">${word}</div>`).join('')}
            </div>
        `;
        container.querySelectorAll('.word-chip').forEach((chip) => {
            chip.addEventListener('click', () => toggleWord(chip));
            chip.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleWord(chip);
                }
            });
        });
        if (hasSpeech) {
            document.getElementById('micBtn').addEventListener('click', () => {
                if (isListening) {
                    recognition.stop();
                    return;
                }
                startListening(LANG_CODES[gameState.selectedSubject] || 'en-US', (transcript) => {
                    const words = transcript.toLowerCase().split(/\s+/);
                    words.forEach((word) => {
                        const chip = [...container.querySelectorAll('.word-chip:not(.used)')].find((item) => item.dataset.word.toLowerCase() === word);
                        if (chip) toggleWord(chip);
                    });
                });
            });
        }
    } else if (question.type === 'listening') {
        container.innerHTML = `
            <div class="question-type">Type what you hear</div>
            <div class="question-text"><i class="fa-solid fa-volume-high" style="margin-right:0.5rem;opacity:0.5;" aria-hidden="true"></i>${question.audio}</div>
            ${hasSpeech ? '<button class="mic-btn" id="micBtn" aria-label="Speak your answer"><i class="fa-solid fa-microphone"></i></button>' : ''}
            <input type="text" class="translation-input" id="listeningInput" placeholder="Type your answer here..." aria-label="Your answer">
        `;
        setTimeout(() => document.getElementById('listeningInput')?.focus(), 100);
        if (hasSpeech) {
            document.getElementById('micBtn').addEventListener('click', () => {
                if (isListening) {
                    recognition.stop();
                    return;
                }
                startListening(LANG_CODES[gameState.selectedSubject] || 'en-US', (transcript) => {
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

function selectChoice(button) {
    document.querySelectorAll('.choice-btn').forEach((item) => {
        item.classList.remove('selected');
        item.setAttribute('aria-checked', 'false');
    });
    button.classList.add('selected');
    button.setAttribute('aria-checked', 'true');
    gameState.currentAnswer = button.dataset.choice;
}

function toggleWord(chip) {
    const word = chip.dataset.word;
    const answerBox = document.getElementById('answerBox');
    if (chip.classList.contains('used')) {
        chip.classList.remove('used');
        const index = gameState.answerWords.lastIndexOf(word);
        if (index >= 0) gameState.answerWords.splice(index, 1);
    } else {
        chip.classList.add('used');
        gameState.answerWords.push(word);
    }
    answerBox.innerHTML = gameState.answerWords.map((item) => `<div class="word-chip">${item}</div>`).join('');
    gameState.currentAnswer = gameState.answerWords.join(' ');
}

async function checkAnswer() {
    const question = gameState.currentQuestionData;
    let isCorrect = false;

    if (question.type === 'translation' || question.type === 'mathChoice' || question.type === 'sentence') {
        isCorrect = gameState.currentAnswer === question.answer;
    } else if (question.type === 'listening') {
        const input = document.getElementById('listeningInput')?.value.trim();
        isCorrect = input?.toLowerCase() === question.answer.toLowerCase();
    } else if (question.type === 'math') {
        const input = document.getElementById('mathInput')?.value.trim();
        isCorrect = input?.replace(/\s/g, '').toLowerCase() === question.answer.replace(/\s/g, '').toLowerCase();
    }

    if (question.id) await updateSrs(question.id, isCorrect ? 5 : 1);

    const feedback = document.getElementById('feedback');
    const questionCard = document.querySelector('.question-card');
    if (isCorrect) {
        feedback.className = 'feedback correct show';
        feedback.textContent = 'Correct.';
        gameState.correctAnswers += 1;
        gameState.xp += 10;
        vibrate(50);
        questionCard.classList.add('correct-anim');
        setTimeout(() => questionCard.classList.remove('correct-anim'), 600);
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
        gameState.hearts -= 1;
        vibrate([50, 30, 50]);
        questionCard.classList.add('incorrect-anim');
        setTimeout(() => questionCard.classList.remove('incorrect-anim'), 600);
    }

    updateStats();
    const button = document.getElementById('checkBtn');
    button.textContent = 'Continue';
    button.onclick = nextQuestion;

    if (question.type === 'translation' || question.type === 'mathChoice') {
        document.querySelectorAll('.choice-btn').forEach((item) => {
            item.style.pointerEvents = 'none';
            if (item.dataset.choice === question.answer) item.classList.add('correct');
            else if (item.classList.contains('selected')) item.classList.add('incorrect');
        });
    }

    if (gameState.hearts <= 0) {
        setTimeout(() => void showResults(), 1500);
    }
}

function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
}

function spawnConfetti() {
    const colors = ['#58CC02', '#CE82FF', '#FF4B4B', '#FFC800', '#1CB0F6'];
    for (let index = 0; index < 30; index += 1) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.width = `${Math.random() * 6 + 5}px`;
        piece.style.height = `${Math.random() * 6 + 5}px`;
        piece.style.animationDelay = `${Math.random() * 0.8}s`;
        piece.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}

function skipQuestion() {
    nextQuestion();
}

function nextQuestion() {
    gameState.currentQuestion += 1;
    if (gameState.currentQuestion >= gameState.totalQuestions || gameState.hearts <= 0) {
        void showResults();
    } else {
        loadQuestion();
    }
}

async function showResults() {
    document.getElementById('lessonContainer').classList.remove('active');
    document.getElementById('resultContainer').classList.add('active');
    document.getElementById('correctCount').textContent = gameState.correctAnswers;
    document.getElementById('xpEarned').textContent = gameState.correctAnswers * 10;

    const progress = getUserProgress();
    const today = new Date().toISOString().slice(0, 10);
    if (progress.last_played !== today) {
        if (!progress.last_played) {
            gameState.streak += 1;
        } else {
            const diff = Math.floor((new Date(today) - new Date(progress.last_played)) / (1000 * 60 * 60 * 24));
            gameState.streak = diff > 1 ? 1 : gameState.streak + 1;
        }
    }

    if (gameState.selectedSubject && !gameState.completedSubjects.includes(gameState.selectedSubject)) {
        gameState.completedSubjects.push(gameState.selectedSubject);
    }

    if (gameState.correctAnswers === gameState.totalQuestions) {
        await saveAchievement('perfectLesson');
    }

    await updateCurrentUser({
        xp: gameState.xp,
        streak: gameState.streak,
        hearts: Math.max(gameState.hearts, 0),
        completed_subjects: [...gameState.completedSubjects],
        last_played: today
    });
    await checkAchievements();

    spawnConfetti();
    updateStats();
    renderSubjects(gameState.selectedCategory);
    setTimeout(() => document.getElementById('continueBtn').focus(), 100);
}

function continueLearning() {
    document.getElementById('resultContainer').classList.remove('active');
    document.getElementById('subjectSelection').style.display = 'block';
    document.querySelectorAll('.subject-card').forEach((card) => card.classList.remove('selected'));
    document.getElementById('lessonContainer').classList.remove('active');
    renderSubjects(gameState.selectedCategory);
}

function updateStats() {
    document.getElementById('xp').textContent = gameState.xp;
    document.getElementById('streak').textContent = gameState.streak;
    document.getElementById('hearts').textContent = gameState.hearts;
}

function dedupe(items) {
    return [...new Set(items)];
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

window.resetToHome = resetToHome;
