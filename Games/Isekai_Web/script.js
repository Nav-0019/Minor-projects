class IsekaiGame {
    constructor() {
        this.name = "";
        this.level = 0;
        this.monsters = ["Slime", "Goblin", "Orc", "Troll", "Stampede of monster", "Dragon", "Demon God"];
        this.positions = ["Traveller", "Villager", "Village hero", "Noble", "King", "SSS rank adventurer", "Demi-God"];
        this.weapons = ["Wooden sword", "Iron sword", "Steel sword", "Mithril sword", "Excalibur", "Soul sword", "Sword of light"];
        this.attemptCount = 0;
        this.monsterNumber = 0;
        this.maxRange = 0;

        // DOM Elements
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen')
        };

        this.ui = {
            nameInput: document.getElementById('player-name-input'),
            startBtn: document.getElementById('start-btn'),

            playerName: document.getElementById('player-name-display'),
            playerLevel: document.getElementById('player-level'),
            playerPosition: document.getElementById('player-position'),
            playerWeapon: document.getElementById('player-weapon'),

            monsterName: document.getElementById('monster-name'),
            entityImage: document.getElementById('entity-image'),
            heroImage: document.getElementById('hero-image'),
            gameMessage: document.getElementById('game-message'),

            hitBtn: document.getElementById('hit-btn'),
            statusBtn: document.getElementById('check-status-btn'),
            runBtn: document.getElementById('run-btn'),

            attackModal: document.getElementById('attack-modal'),
            attackPrompt: document.getElementById('attack-prompt'),
            attackRange: document.getElementById('attack-range'),
            attackInput: document.getElementById('attack-input'),
            submitAttackBtn: document.getElementById('submit-attack-btn'),
            cancelAttackBtn: document.getElementById('cancel-attack-btn'),

            rewardModal: document.getElementById('reward-modal'),
            rewardPosition: document.getElementById('reward-position'),
            rewardWeapon: document.getElementById('reward-weapon'),
            claimRewardBtn: document.getElementById('claim-reward-btn'),

            upgradeModal: document.getElementById('upgrade-modal'),
            upgradeHp: document.getElementById('upgrade-hp'),
            upgradeEp: document.getElementById('upgrade-ep'),
            upgradeMp: document.getElementById('upgrade-mp'),
            upgradeStrength: document.getElementById('upgrade-strength'),
            upgradeAgility: document.getElementById('upgrade-agility'),
            upgradePower: document.getElementById('upgrade-power'),
            absorbPowerBtn: document.getElementById('absorb-power-btn'),

            statusModal: document.getElementById('status-modal'),
            statusHp: document.getElementById('status-hp'),
            statusEp: document.getElementById('status-ep'),
            statusMp: document.getElementById('status-mp'),
            statusStrength: document.getElementById('status-strength'),
            statusAgility: document.getElementById('status-agility'),
            statusEquip: document.getElementById('status-equip'),
            statusPower: document.getElementById('status-power'),
            closeStatusBtn: document.getElementById('close-status-btn'),

            endTitle: document.getElementById('end-title'),
            endMessage: document.getElementById('end-message'),
            restartBtn: document.getElementById('restart-btn')
        };

        this.init();
    }

    init() {
        this.ui.startBtn.addEventListener('click', () => this.startGame());
        this.ui.hitBtn.addEventListener('click', () => this.showAttackModal());
        this.ui.runBtn.addEventListener('click', () => this.runAway());
        this.ui.statusBtn.addEventListener('click', () => this.showStatus());
        this.ui.closeStatusBtn.addEventListener('click', () => this.hideStatus());

        // Attack modal handlers
        this.ui.submitAttackBtn.addEventListener('click', () => this.submitAttack());
        this.ui.cancelAttackBtn.addEventListener('click', () => this.hideAttackModal());
        this.ui.attackInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAttack();
        });

        // Changed flow: Reward -> Upgrade -> Next Level
        this.ui.claimRewardBtn.addEventListener('click', () => this.showUpgradeModal());
        this.ui.absorbPowerBtn.addEventListener('click', () => this.nextLevel());

        this.ui.restartBtn.addEventListener('click', () => this.resetGame());
    }

    showUpgradeModal() {
        this.ui.rewardModal.classList.add('hidden');

        // Calculate current stats (Base)
        const currentMult = this.level + 1;
        const baseHp = 100 * currentMult;
        const baseEp = 100 * currentMult;
        const baseMp = 50 * currentMult;
        const baseStr = 10 * currentMult;
        const baseAgi = 5 * currentMult;
        const basePow = (10 * currentMult) * 2;

        // Calculate next stats (Base + Boost)
        const boostHp = 100;
        const boostEp = 100;
        const boostMp = 50;
        const boostStr = 10;
        const boostAgi = 5;
        const boostPow = 20;

        // Helper to format: "100 <span class='stat-boost'>+ 100</span>"
        const formatStat = (base, boost) => `${base} <span class="stat-boost">+ ${boost}</span>`;

        this.ui.upgradeHp.innerHTML = formatStat(baseHp, boostHp);
        this.ui.upgradeEp.innerHTML = formatStat(baseEp, boostEp);
        this.ui.upgradeMp.innerHTML = formatStat(baseMp, boostMp);
        this.ui.upgradeStrength.innerHTML = formatStat(baseStr, boostStr);
        this.ui.upgradeAgility.innerHTML = formatStat(baseAgi, boostAgi);
        this.ui.upgradePower.innerHTML = formatStat(basePow, boostPow);

        this.ui.upgradeModal.classList.remove('hidden');
    }

    nextLevel() {
        this.ui.upgradeModal.classList.add('hidden');
        this.level++;
        this.attemptCount = 0; // Reset attempts for new monster

        if (this.level >= this.monsters.length) {
            // Victory!
            this.endGame(true);
        } else {
            this.log(`${this.name} leveled up! Now a ${this.positions[this.level]}!`);
            this.updateUI();
        }
    }

    startGame() {
        const name = this.ui.nameInput.value.trim();
        if (!name) {
            alert('Please enter your hero name!');
            return;
        }

        this.name = name;
        this.level = 0;
        this.switchScreen('game');
        this.updateUI();
        this.log(`Welcome, ${this.name}! Face the ${this.monsters[this.level]}!`);
    }

    updateUI() {
        this.ui.playerName.textContent = this.name;
        this.ui.playerLevel.textContent = this.level;
        this.ui.playerPosition.textContent = this.positions[this.level];
        this.ui.playerWeapon.textContent = this.weapons[this.level];

        // Update monster
        this.ui.monsterName.textContent = this.monsters[this.level];
        const monsterImagePath = `assets/${this.monsters[this.level].toLowerCase().replace(/ /g, '_')}.png`;
        this.ui.entityImage.src = monsterImagePath;
    }

    showAttackModal() {
        // Calculate range based on level (2^level)
        this.maxRange = Math.pow(2, this.level);
        this.monsterNumber = Math.floor(Math.random() * (this.maxRange + 1));

        this.ui.attackRange.textContent = `Range: 0 - ${this.maxRange}`;
        this.ui.attackInput.value = '';
        this.ui.attackInput.max = this.maxRange;
        this.ui.attackModal.classList.remove('hidden');
        this.ui.attackInput.focus();
    }

    hideAttackModal() {
        this.ui.attackModal.classList.add('hidden');
    }

    submitAttack() {
        const playerGuess = parseInt(this.ui.attackInput.value);

        if (isNaN(playerGuess) || playerGuess < 0 || playerGuess > this.maxRange) {
            alert(`Please enter a valid number between 0 and ${this.maxRange}`);
            return;
        }

        this.hideAttackModal();

        if (playerGuess === this.monsterNumber) {
            // Successful hit!
            this.attemptCount = 0;
            this.attack();
        } else {
            // Missed!
            this.handleMiss(this.monsterNumber);
        }
    }

    attack() {
        // Trigger hero attack animation
        this.ui.heroImage.classList.add('attack-anim');
        setTimeout(() => this.ui.heroImage.classList.remove('attack-anim'), 300);

        // Trigger monster flash
        this.ui.entityImage.classList.add('flash');
        setTimeout(() => this.ui.entityImage.classList.remove('flash'), 300);

        // Show victory after animation
        setTimeout(() => {
            this.log(`${this.name} defeated the ${this.monsters[this.level]}!`);
            this.showReward();
        }, 500);
    }

    handleMiss(monsterVal) {
        this.ui.heroImage.classList.add('shake');
        setTimeout(() => this.ui.heroImage.classList.remove('shake'), 500);

        this.attemptCount++;
        this.log(`Monster dodged! The correct number was ${monsterVal}. Monster attacked back! (Attempt ${this.attemptCount})`);

        // Check for ultimate attack (based on Python logic)
        const maxAttempts = Math.floor(this.maxRange * 0.75);
        if (this.level > 1 && this.attemptCount > maxAttempts) {
            this.log(`Oops! Ultimate attack by the ${this.monsters[this.level]}! You couldn't evade.`);
            setTimeout(() => this.endGame(false, "Defeated"), 1500);
        }
    }

    showReward() {
        this.ui.rewardPosition.textContent = this.positions[this.level + 1] || "Legendary Hero";
        this.ui.rewardWeapon.textContent = this.weapons[this.level + 1] || "Ultimate Weapon";
        this.ui.rewardModal.classList.remove('hidden');
    }

    runAway() {
        this.log(`${this.name} ran away in fear...`);
        setTimeout(() => this.endGame(false, "Coward"), 1000);
    }

    showStatus() {
        const multiplier = this.level + 1;
        this.ui.statusHp.textContent = 100 * multiplier;
        this.ui.statusEp.textContent = 100 * multiplier;
        this.ui.statusMp.textContent = 50 * multiplier;
        this.ui.statusStrength.textContent = 10 * multiplier;
        this.ui.statusAgility.textContent = 5 * multiplier;
        this.ui.statusEquip.textContent = this.weapons[this.level];
        this.ui.statusPower.textContent = (10 * multiplier) * 2; // Strength * 2

        this.ui.statusModal.classList.remove('hidden');
    }

    hideStatus() {
        this.ui.statusModal.classList.add('hidden');
    }

    switchScreen(screenName) {
        Object.values(this.screens).forEach(s => s.classList.add('hidden'));
        this.screens[screenName].classList.remove('hidden');

        if (screenName === 'game') {
            this.screens[screenName].classList.add('active');
        }
    }

    log(msg) {
        this.ui.gameMessage.textContent = msg;
    }

    resetGame() {
        location.reload();
    }

    endGame(victory, reason) {
        this.switchScreen('end');
        if (victory) {
            this.ui.endTitle.textContent = "Legendary Hero!";
            this.ui.endMessage.textContent = "You have defeated the Demon God and saved the world!";
            this.ui.endTitle.style.color = "var(--success-color)";
        } else {
            this.ui.endTitle.textContent = "Game Over";
            this.ui.endMessage.textContent = reason === "Coward" ? "You ran away in shame." : "You were defeated.";
            this.ui.endTitle.style.color = "var(--danger-color)";
        }
    }
}

// Start the game
window.addEventListener('DOMContentLoaded', () => {
    new IsekaiGame();
});
