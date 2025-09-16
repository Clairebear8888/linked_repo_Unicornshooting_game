class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 0) {
      this.left = 0;
    }

    if (this.top > 370) {
      this.top = 370;
    }

    if (this.left > 880) {
      this.left = 880;
    }

    if (this.top < 5) {
      this.top = 5;
    }

    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacles) {
    const playerRect = this.element.getBoundingClientRect();
    const obstaclesRect = obstacles.ObsElement.getBoundingClientRect();
    if (
      playerRect.left < obstaclesRect.right &&
      playerRect.right > obstaclesRect.left &&
      playerRect.top < obstaclesRect.bottom &&
      playerRect.bottom > obstaclesRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
