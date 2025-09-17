class Projector {
  constructor(gamescreen, top, left) {
    this.gamescreen = gamescreen;
    this.top = top;
    this.left = left;
    this.fireballElement = document.createElement("img");
    this.fireballElement.src = "./Asset/image/fireball.png";
    this.fireballElement.style.position = "absolute";
    this.fireballElement.style.height = 40 + "px";
    this.fireballElement.style.width = 65 + "px";
    this.fireballElement.style.left = this.left + "px";
    this.fireballElement.style.top = this.top + "px";
    this.gamescreen.appendChild(this.fireballElement);
  }
  move() {
    this.left += +8;
    this.updatePosition();
  }
  updatePosition() {
    this.fireballElement.style.left = `${this.left}px`;
    this.fireballElement.style.top = `${this.top}px`;
  }

  didCollide(obstacles) {
    const FireballRect = this.fireballElement.getBoundingClientRect();
    const obstaclesRect = obstacles.ObsElement.getBoundingClientRect();
    if (
      FireballRect.left < obstaclesRect.right &&
      FireballRect.right > obstaclesRect.left &&
      FireballRect.top < obstaclesRect.bottom &&
      FireballRect.bottom > obstaclesRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
