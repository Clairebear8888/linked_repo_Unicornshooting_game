class Game {
  constructor() {
    this.startsScreenElement = document.getElementById("game-intro");
    this.GamecontainerElement = document.getElementById("game-container");
    this.youWinElement = document.getElementById("you-win");
    this.gameScreenElement = document.getElementById("game-screen");
    this.endGameScreenElement = document.getElementById("end-game");
    this.liveElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");
    this.finalScoreElement2 = document.getElementById("Final-score2");
    this.hudeElement = document.getElementById("hud");
    this.endscoreElement = document.getElementById("Final-score");
    this.currentlevelElement = document.getElementById("current-level");
    this.beachElement = document.getElementById("beach");

    // Ensure Player class
    this.player = new Player(this.gameScreenElement, 0, 290, 120, 110);

    this.height = 648;
    this.width = 1152;

    this.score = 0;
    this.live = 3;
    this.gameIsOver = false;
    this.gameIntervalID = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.frame = 0;

    this.projectors = [];
    this.obstacles = [new Obstacles(this.gameScreenElement)];
    this.enemy = [new Enemy(this.gameScreenElement)];

    // sounds
    this.boom = new Audio("Asset/Sounds/POL-cinematic-boom-01.wav");
    this.boom.volume = 0.5;
    this.gothit = new Audio("Asset/Sounds/gothit2.wav");
    this.gothit.volume = 0.3;
    this.backgound = new Audio("Asset/Sounds/background2.wav");
    this.backgound.volume = 0.1;
    this.bing = new Audio("Asset/Sounds/bing.mp3");
    this.bing.volume = 0.2;
    this.fail = new Audio("Asset/Sounds/fail.mp3");
    this.fail.volume = 0.2;
    this.win = new Audio("Asset/Sounds/win.mp3");
    this.win.volume = 0.2;

    // levels
    this.level = 1;
    this.speedMultiplier = 1;
    this.spawnInterval = 200;
    this.nextLevelScore = 10;
    this.maxLevel = 3;
    this.fireCooldownFrames = 12;
  }

  start() {
    this.backgound.play();
    this.gameScreenElement.style.height = `${this.height}px`;
    this.GamecontainerElement.style.display = "flex";
    this.gameScreenElement.style.width = `${this.width}px`;

    this.startsScreenElement.style.display = "none";
    this.youWinElement.style.display = "none";
    this.gameScreenElement.style.display = "flex";
    this.hudeElement.style.display = "block";
    this.endGameScreenElement.style.display = "none";
    this.gameScreenElement.classList.add("game-screen", `level-${this.level}`);

    this.gameIntervalID = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  stopgame() {
    this.gameIsOver = true;
    this.backgound.pause();
    this.fail.play();
    if (this.player?.element) this.player.element.remove();
    this.GamecontainerElement.style.display = "none";
    this.endGameScreenElement.style.display = "flex";
    this.youWinElement.style.display = "none";
    this.endscoreElement.innerText = this.score;
  }

  youwin() {
    this.gameIsOver = true;
    this.backgound.pause();
    this.win.play();
    if (this.player?.element) this.player.element.remove();
    this.GamecontainerElement.style.display = "none";
    this.endGameScreenElement.style.display = "none";
    this.youWinElement.style.display = "flex";
    this.finalScoreElement2.innerText = this.score;
  }

  gameLoop() {
    this.frame++;
    this.update();
    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalID);
    }
  }

  levelUp() {
    if (
      this.score >= this.nextLevelScore * this.level &&
      this.level < this.maxLevel
    ) {
      this.level++;
      this.speedMultiplier = 1 + (this.level - 1) * 2;
      this.spawnInterval = Math.max(100, this.spawnInterval - 100);
      this.currentlevelElement.innerText = this.level;
      // clear previous class and add more background
      this.gameScreenElement.className = "";
      this.gameScreenElement.classList.add(
        "game-screen",
        `level-${this.level}`
      );
    }
  }

  update() {
    //level
    this.levelUp();
    //make new obs and enemes

    if (this.frame % this.spawnInterval === 0) {
      this.obstacles.push(
        new Obstacles(this.gameScreenElement, 2 * this.speedMultiplier)
      );
      this.enemy.push(
        new Enemy(this.gameScreenElement, 2 * this.speedMultiplier)
      );
    }

    if (typeof this.player?.move === "function") this.player.move();

    // --- Obstacles loop  ---
    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObs = this.obstacles[i];
      if (!currentObs) {
        this.obstacles.splice(i, 1);
        i--;
        continue;
      }

      if (typeof currentObs.move === "function") currentObs.move(this.level);

      let obstacleRemoved = false;

      for (let j = 0; j < this.projectors.length; j++) {
        const currentFireball = this.projectors[j];
        if (!currentFireball) {
          this.projectors.splice(j, 1);
          j--;
          continue;
        }
        if (typeof currentFireball.move === "function") currentFireball.move();

        if (currentFireball.didCollide(currentObs)) {
          // remove DOM if present
          currentObs.element?.remove();
          currentFireball.element?.remove();

          // remove from arrays
          this.projectors.splice(j, 1);
          this.obstacles.splice(i, 1);

          j--;
          i--;
          obstacleRemoved = true;

          this.score++;
          this.bing.play();
          this.scoreElement.innerText = this.score;
          break;
        }
      }

      if (obstacleRemoved) continue;

      // off-screen
      if (typeof currentObs.left === "number" && currentObs.left < -80) {
        currentObs.element?.remove();
        this.obstacles.splice(i, 1);
        i--;

        continue;
      }

      // player collision
      if (this.player?.didCollide && this.player.didCollide(currentObs)) {
        this.live--;
        this.liveElement.innerText = this.live;
        this.gothit.play();
        this.player.element.classList.add("gotHitAnimation");
        setTimeout(() => {
          this.player.element.classList.remove("gotHitAnimation");
        }, 2000);

        currentObs.element?.remove();
        this.obstacles.splice(i, 1);
        i--;
        continue;
      }
    }

    // --- Enemy loop (safe removal) ---
    for (let i = 0; i < this.enemy.length; i++) {
      const currentEne = this.enemy[i];
      if (!currentEne) {
        this.enemy.splice(i, 1);
        i--;
        continue;
      }

      if (typeof currentEne.move === "function") {
        currentEne.move(this.level);
      }

      let enemyRemoved = false;

      for (let j = 0; j < this.projectors.length; j++) {
        const currentFireball = this.projectors[j];
        if (!currentFireball) {
          this.projectors.splice(j, 1);
          j--;
          continue;
        }
        if (typeof currentFireball.move === "function") currentFireball.move();

        if (currentFireball.didCollide(currentEne)) {
          currentEne.element?.remove();
          currentFireball.element?.remove();

          this.projectors.splice(j, 1);
          this.enemy.splice(i, 1);

          j--;
          i--;
          enemyRemoved = true;

          this.score++;
          this.scoreElement.innerText = this.score;
          this.bing.play();
          break;
        }
      }

      if (enemyRemoved) continue;

      if (typeof currentEne.left === "number" && currentEne.left < -80) {
        currentEne.element?.remove();
        this.enemy.splice(i, 1);
        i--;
        continue;
      }

      if (this.player?.didCollide && this.player.didCollide(currentEne)) {
        this.live--;
        this.liveElement.innerText = this.live;
        this.gothit.play();
        this.player.element.classList.add("gotHitAnimation");
        setTimeout(() => {
          this.player.element.classList.remove("gotHitAnimation");
        }, 2000);

        currentEne.element?.remove();
        this.enemy.splice(i, 1);
        i--;
        continue;
      }
    }
    // end of game
    if (this.live === 0) {
      this.stopgame();
    }

    if (this.score === 30) {
      this.youwin();
    }
    if (this.level === 3) {
      this.beachElement.style.display = "flex";
    }
  }
}
