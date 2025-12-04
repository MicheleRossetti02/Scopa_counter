// ===== Constants =====
const CARD_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const CARDS_PER_VALUE = 4;
const TOTAL_CARDS = 40;

// ===== State =====
let gameState = {
    cards: {},
    totalPlayed: 0
};

let inputMode = 'click'; // 'click' or 'keyboard'

let gameHistory = {
    totalGames: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    streakType: 'none' // 'win', 'loss', or 'none'
};

// ===== Initialization =====
function initGame() {
    // Reset game state
    gameState = {
        cards: {},
        totalPlayed: 0
    };

    // Initialize all cards to max count
    CARD_VALUES.forEach(value => {
        gameState.cards[value] = CARDS_PER_VALUE;
    });

    saveGameState();
}

function loadGameState() {
    const saved = localStorage.getItem('scopaGameState');
    if (saved) {
        try {
            gameState = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading game state:', e);
            initGame();
        }
    } else {
        initGame();
    }
}

function saveGameState() {
    localStorage.setItem('scopaGameState', JSON.stringify(gameState));
}

function loadHistory() {
    const saved = localStorage.getItem('scopaGameHistory');
    if (saved) {
        try {
            gameHistory = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading history:', e);
        }
    }
}

function saveHistory() {
    localStorage.setItem('scopaGameHistory', JSON.stringify(gameHistory));
}

// ===== Card Rendering =====
function renderCards() {
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = '';

    CARD_VALUES.forEach(value => {
        const count = gameState.cards[value];
        const card = document.createElement('button');
        card.className = 'card-button';

        // Add state class
        if (count === 0) {
            card.classList.add('disabled');
        } else if (count >= 3) {
            card.classList.add('high');
        } else if (count >= 2) {
            card.classList.add('medium');
        } else {
            card.classList.add('low');
        }

        card.innerHTML = `
            <div class="card-value">${value}</div>
            <div class="card-counter">${count}/${CARDS_PER_VALUE}</div>
        `;

        card.addEventListener('click', () => decrementCard(value));
        grid.appendChild(card);
    });
}

// ===== Card Logic =====
function decrementCard(value) {
    if (gameState.cards[value] > 0) {
        gameState.cards[value]--;
        gameState.totalPlayed++;

        saveGameState();
        renderCards();
        updateStatistics();
        updateLastCardIndicator(value);
    }
}

// ===== Statistics =====
function updateStatistics() {
    // Calculate total remaining
    const totalRemaining = TOTAL_CARDS - gameState.totalPlayed;
    document.getElementById('totalRemaining').textContent = totalRemaining;

    // Update progress bar
    const progress = (gameState.totalPlayed / TOTAL_CARDS) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${gameState.totalPlayed}/${TOTAL_CARDS}`;

    // Update percentages
    renderPercentages(totalRemaining);
}

function renderPercentages(totalRemaining) {
    const grid = document.getElementById('percentagesGrid');
    grid.innerHTML = '';

    CARD_VALUES.forEach(value => {
        const count = gameState.cards[value];
        const percentage = totalRemaining > 0 ? ((count / totalRemaining) * 100).toFixed(1) : 0;

        const row = document.createElement('div');
        row.className = 'percentage-row';

        let percentageClass = 'zero';
        if (count > 0) {
            if (parseFloat(percentage) >= 15) percentageClass = 'high';
            else if (parseFloat(percentage) >= 8) percentageClass = 'medium';
            else percentageClass = 'low';
        }

        row.innerHTML = `
            <span class="percentage-card">${value}</span>
            <span class="percentage-count">(${count})</span>
            <span class="percentage-value ${percentageClass}">${percentage}%</span>
        `;

        grid.appendChild(row);
    });
}

function updateHistoryDisplay() {
    document.getElementById('totalGames').textContent = gameHistory.totalGames;
    document.getElementById('totalWins').textContent = gameHistory.wins;
    document.getElementById('totalLosses').textContent = gameHistory.losses;

    const winRate = gameHistory.totalGames > 0
        ? ((gameHistory.wins / gameHistory.totalGames) * 100).toFixed(1)
        : 0;
    document.getElementById('winRate').textContent = `${winRate}%`;

    // Update streaks
    const currentStreakText = gameHistory.currentStreak > 0
        ? `${gameHistory.currentStreak}${gameHistory.streakType === 'win' ? '🏆' : '❌'}`
        : '0';
    document.getElementById('currentStreak').textContent = currentStreakText;

    const bestStreakText = gameHistory.bestStreak > 0
        ? `${gameHistory.bestStreak}🏆`
        : '0';
    document.getElementById('bestStreak').textContent = bestStreakText;
}

// ===== End Game Modal =====
function showEndGameModal() {
    document.getElementById('modalOverlay').classList.add('active');
}

function hideEndGameModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

function endGame(result) {
    // Update history
    gameHistory.totalGames++;

    if (result === 'win') {
        gameHistory.wins++;

        // Update streak
        if (gameHistory.streakType === 'win') {
            gameHistory.currentStreak++;
        } else {
            gameHistory.currentStreak = 1;
            gameHistory.streakType = 'win';
        }

        // Update best streak
        if (gameHistory.currentStreak > gameHistory.bestStreak) {
            gameHistory.bestStreak = gameHistory.currentStreak;
        }
    } else {
        gameHistory.losses++;

        // Reset or update loss streak
        if (gameHistory.streakType === 'loss') {
            gameHistory.currentStreak++;
        } else {
            gameHistory.currentStreak = 1;
            gameHistory.streakType = 'loss';
        }
    }

    saveHistory();
    updateHistoryDisplay();

    // Reset game
    hideEndGameModal();
    initGame();
    renderCards();
    updateStatistics();

    // Show feedback
    showEndGameFeedback(result);
}

function showEndGameFeedback(result) {
    const btn = document.getElementById('endGameBtn');
    const originalText = btn.textContent;

    if (result === 'win') {
        btn.textContent = '🏆 Salvato!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        btn.textContent = '❌ Salvato!';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function resetHistory() {
    const confirmed = confirm('Sei sicuro di voler cancellare tutto lo storico delle partite?');
    if (!confirmed) return;

    gameHistory = {
        totalGames: 0,
        wins: 0,
        losses: 0,
        currentStreak: 0,
        bestStreak: 0,
        streakType: 'none'
    };

    saveHistory();
    updateHistoryDisplay();

    // Show feedback
    const btn = document.getElementById('resetHistoryBtn');
    const originalText = btn.textContent;
    btn.textContent = '✓';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 1500);
}

// ===== Last Card Indicator =====
function updateLastCardIndicator(value) {
    const indicator = document.getElementById('lastCardValue');
    indicator.textContent = value;

    // Add animation flash
    indicator.style.color = 'var(--accent-success)';
    indicator.style.transform = 'scale(1.3)';

    setTimeout(() => {
        indicator.style.color = '';
        indicator.style.transform = '';
    }, 300);
}

// ===== Input Mode Management =====
function setInputMode(mode) {
    inputMode = mode;

    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show/hide keyboard input
    const keyboardContainer = document.getElementById('keyboardInputContainer');
    if (mode === 'keyboard') {
        keyboardContainer.classList.add('active');
        document.getElementById('keyboardInput').focus();
    } else {
        keyboardContainer.classList.remove('active');
    }
}

function handleKeyboardInput(input) {
    // Convert '0' to '10' for easier input
    let value = input === '0' ? 10 : parseInt(input);

    // Validate input
    if (isNaN(value) || value < 1 || value > 10) {
        return;
    }

    // Decrement card
    decrementCard(value);

    // Clear input
    document.getElementById('keyboardInput').value = '';

    // Show feedback
    const inputField = document.getElementById('keyboardInput');
    inputField.style.borderColor = 'var(--accent-success)';
    setTimeout(() => {
        inputField.style.borderColor = '';
    }, 200);
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Mode toggle buttons
    document.getElementById('clickModeBtn').addEventListener('click', () => setInputMode('click'));
    document.getElementById('keyboardModeBtn').addEventListener('click', () => setInputMode('keyboard'));

    // Keyboard input
    const keyboardInput = document.getElementById('keyboardInput');
    keyboardInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            handleKeyboardInput(value);
        }
    });

    // Global keyboard shortcuts (when not in input field)
    document.addEventListener('keydown', (e) => {
        // Skip if modal is open or typing in input
        if (document.getElementById('modalOverlay').classList.contains('active')) {
            if (e.key === 'Escape') {
                hideEndGameModal();
            }
            return;
        }

        if (e.target.tagName === 'INPUT') return;

        // Number keys 1-9 and 0 (for 10)
        if (inputMode === 'keyboard') {
            const key = e.key;
            if (key >= '1' && key <= '9') {
                handleKeyboardInput(key);
            } else if (key === '0') {
                handleKeyboardInput('10');
            }
        }

        // Toggle mode with 'M' key
        if (e.key === 'm' || e.key === 'M') {
            setInputMode(inputMode === 'click' ? 'keyboard' : 'click');
        }
    });

    // End game button
    document.getElementById('endGameBtn').addEventListener('click', showEndGameModal);

    // Modal buttons
    document.getElementById('btnWin').addEventListener('click', () => endGame('win'));
    document.getElementById('btnLoss').addEventListener('click', () => endGame('loss'));
    document.getElementById('btnCancel').addEventListener('click', hideEndGameModal);

    // Reset history button
    document.getElementById('resetHistoryBtn').addEventListener('click', resetHistory);

    // Close modal on overlay click
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') {
            hideEndGameModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideEndGameModal();
        }
    });
}

// ===== App Initialization =====
function init() {
    console.log('🃏 Scopa Card Counter V2 initialized!');

    // Load saved data
    loadGameState();
    loadHistory();

    // Setup UI
    setupEventListeners();
    renderCards();
    updateStatistics();
    updateHistoryDisplay();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
