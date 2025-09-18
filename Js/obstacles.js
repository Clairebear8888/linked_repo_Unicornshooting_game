class Obstacles {
  constructor(gamescreen, speed = 2) {
    this.gamescreen = gamescreen;
    this.speed = speed;

    this.difPositions = [1000, 500, 400];
    this.randomIndex = Math.floor(Math.random() * this.difPositions.length);
    this.left = this.difPositions[this.randomIndex];

    this.difHeight = [100, 200, 300, 425];
    this.randomIndex2 = Math.floor(Math.random() * this.difHeight.length);
    this.top = this.difHeight[this.randomIndex2];

    this.width = 140;
    this.height = 150;

    this.directionX = Math.random() > 0.5 ? 1 : -1;
    this.directionY = Math.random() > 0.5 ? 1 : -1;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.classList.add("monFlowerAnimation");

    this.gamescreen.appendChild(this.element);
  }

  move(currentLevel) {
    if (currentLevel < 3) {
      this.left -= this.speed;
    } else {
      this.left += this.speed * this.directionX;
      this.top += this.speed * this.directionY;

      if (
        this.top <= 0 ||
        this.top + this.height >= this.gamescreen.offsetHeight
      ) {
        this.directionY *= -1;
      }
    }
    this.updatePosition();
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  }
}
