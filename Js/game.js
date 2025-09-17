class Game {
  constructor() {
    this.startsScreenElement = document.getElementById("game-intro");
    this.GamecontainerElement = document.getElementById("game-container");
    this.gameScreenElement = document.getElementById("game-screen");
    this.endGameScreenElement = document.getElementById("end-game");
    this.liveElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");
    this.hudeElement = document.getElementById("hud");
    this.endscoreElement = document.getElementById("Final-score");
    this.player = new Player(this.gameScreenElement, 0, 290, 120, 110);
    this.height = 648;
    this.width = 1152;

    this.score = 0;
    this.live = 3;
    this.gameIsOver = false;
    this.gameIntervalID;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.frame = 0;
    this.projectors = [];
    this.obstacles = [new Obstacles(this.gameScreenElement)];
    this.boom = new Audio("../Asset/Sounds/POL-cinematic-boom-01.wav");
    this.boom.volume = 0.5;
    this.gothit = new Audio("../Asset/Sounds/gothit2.wav");
    this.gothit.volume = 0.3;
    this.backgound = new Audio("../Asset/Sounds/background2.wav");
    this.backgound.volume = 0.1;
  }

  start() {
    this.backgound.play();
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
    this.endscoreElement.innerText = this.score;
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

      //second forloop inside of ob forloop

      for (let j = 0; j < this.projectors.length; j++) {
        let currentfireball = this.projectors[j];
        currentfireball.move();

        if (currentfireball.didCollide(currentObs)) {
          this.obstacles.splice(i, 1);
          currentObs.ObsElement.remove();
          this.projectors.splice(j, 1);
          j--;
          currentfireball.fireballElement.remove();
          i--;
          this.score++;
          this.scoreElement.innerText = this.score;
          break;
        }
      }

      if (currentObs.left < -80) {
        this.obstacles.splice(i, 1);
        currentObs.ObsElement.remove();
        this.score++;
        this.scoreElement.innerText = this.score;
      }

      if (this.player.didCollide(currentObs)) {
        this.live--;
        this.liveElement.innerText = this.live;
        this.gothit.play();
        this.player.element.classList.add("gotHitAnimation");

        setTimeout(() => {
          this.player.element.classList.remove("gotHitAnimation");
        }, 2000);

        this.obstacles.splice(i, 1);
        i--;
        currentObs.ObsElement.remove();
      }
    }

    if (this.live === 0) {
      this.stopgame();
    }
  }
}
