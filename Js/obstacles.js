class Obstacles {
  constructor(gamescreen) {
    this.gamescreen = gamescreen;

    this.difPositions = [1000, 500, 300, 400];
    this.ramdomIndex = Math.floor(Math.random() * this.difPositions.length);
    this.left = this.difPositions[this.ramdomIndex];

    this.difHeight = [100, 200, 300, 425];
    this.ramdomIndex2 = Math.floor(Math.random() * this.difHeight.length);
    this.top = this.difHeight[this.ramdomIndex2];
    this.width = 40;
    this.height = 100;

    this.ObsElement = document.createElement("img");
    this.ObsElement.style.position = "absolute";
    this.ObsElement.style.height = `${this.height}px`;
    this.ObsElement.style.width = `${this.width}px`;
    this.ObsElement.style.top = `${this.top}px`;
    this.ObsElement.style.left = `${this.left}px`;
    this.ObsElement.src = "./Asset/image/monsterflower2.png";

    this.gamescreen.appendChild(this.ObsElement);
  }

  move() {
    this.left += -3;
    this.updatePosition();
  }
  updatePosition() {
    this.ObsElement.style.left = `${this.left}px`;
    this.ObsElement.style.top = `${this.top}px`;
  }
}
