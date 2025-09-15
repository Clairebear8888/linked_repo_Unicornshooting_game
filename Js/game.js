class Game {
  constructor() {
    this.startsScreenElement = document.getElementById("game-intro");
    this.gameScreenElement = document.getElementById("game-screen");
    this.endgameScreenElement = document.getElementById("end-game");
    this.player = new Player(
      this.gameScreenElement,
      0,
      370,
      200,
      160,
      "../Asset/image/uni_lili.png"
    );
    this.height = 800;
    this.width = 1000;
    this.obstacles = [];
    this.score = 0;
    this.live = 3;
    this.gameIsOver = false;
    this.gameIntervalID;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    this.gameScreenElement.style.height = `${this.height}px`;
    this.gameScreenElement.style.width = `${this.width}px`;
    this.startsScreenElement.style.display = "none";
    this.gameScreenElement.style.display = "flex";

    this.gameIntervalID = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    console.log("in the game loop");
    this.update();
    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalID);
    }
  }
  update() {
    console.log("in the update funtion");
    this.player.move();
  }
}
