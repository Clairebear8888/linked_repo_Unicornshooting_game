class Game {
  constructor() {
    this.startsScreenElement = document.getElementById("game-intro");
    this.GamecontainerElement = document.getElementById("game-container");
    this.gameScreenElement = document.getElementById("game-screen");
    this.endGameScreenElement = document.getElementById("end-game");
    this.liveElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");
    this.hudeElement = document.getElementById("hud");
    this.player = new Player(this.gameScreenElement, 0, 290, 120, 110);
    this.height = 800;
    this.width = 1000;

    this.score = 0;
    this.live = 3;
    this.gameIsOver = false;
    this.gameIntervalID;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.frame = 0;
    this.obstacles = [new Obstacles(this.gameScreenElement)];
  }

  start() {
    this.gameScreenElement.style.height = `${this.height}px`;
    this.GamecontainerElement.style.display = "flex";
    this.gameScreenElement.style.width = `${this.width}px`;

    this.startsScreenElement.style.display = "none";
    this.gameScreenElement.style.display = "flex";
    this.hudeElement.style.display = "block";
    this.endGameScreenElement.style.display = "none";
    this.gameIntervalID = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  stopgame() {
    this.gameIsOver = true;
    this.player.element.remove();
    this.GamecontainerElement.style.display = "none";
    this.endGameScreenElement.style.display = "flex";
  }

  gameLoop() {
    this.frame++;
    // console.log("in the game loop");
    this.update();
    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalID);
    }
  }
  update() {
    // call funtion
    // console.log("in the update funtion");

    if (this.frame % 200 === 0) {
      this.obstacles.push(new Obstacles(this.gameScreenElement));
    }

    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObs = this.obstacles[i];
      currentObs.move();

      if (currentObs.left < -80) {
        this.obstacles.splice(i, 1);
        currentObs.ObsElement.remove();
        this.score++;
        this.scoreElement.innerText = this.score;
      }

      if (this.player.didCollide(currentObs)) {
        this.live--;
        this.liveElement.innerText = this.live;

        this.obstacles.splice(i, 1);
        currentObs.ObsElement.remove();
      }
    }

    if (this.live === 0) {
      this.stopgame();
    }
  }
}
