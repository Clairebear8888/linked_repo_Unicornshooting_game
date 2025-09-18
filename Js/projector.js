class Projector {
  constructor(gamescreen, top, left) {
    this.gamescreen = gamescreen;
    this.top = top;
    this.left = left;

    this.element = document.createElement("img");
    this.element.src = "./Asset/image/fireball.png";
    this.element.style.position = "absolute";
    this.element.style.height = "40px";
    this.element.style.width = "65px";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gamescreen.appendChild(this.element);
  }

  move() {
    this.left += 8;
    this.updatePosition();
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  }

  // generic collision: pass any object with .element
  didCollide(target) {
    if (!this.element || !target) return false;
    const targetEl =
      target.element || target.ObsElement || target.enemyElement || null;
    if (!targetEl) return false;

    const a = this.element.getBoundingClientRect();
    const b = targetEl.getBoundingClientRect();

    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }
}
