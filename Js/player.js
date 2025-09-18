class Player {
  constructor(gameScreen, left, top, width, height) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;

    // player's DOM node (standardized name)
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
    this.element.classList.add("playerAnimation");
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 0) this.left = 0;
    if (this.top > 520) this.top = 520;
    if (this.left > 900) this.left = 900;
    if (this.top < 5) this.top = 5;

    this.updatePosition();
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  }

  didCollide(target) {
    // defensive guards
    if (!target) {
      // console.warn("didCollide: target is falsy", target);
      return false;
    }

    // If caller passed a raw DOM element (HTMLElement), use it directly.
    const isDomNode =
      typeof target.getBoundingClientRect === "function" &&
      target instanceof Element;

    const targetElement = isDomNode
      ? target
      : target.element ||
        target.Element ||
        target.ObsElement ||
        target.enemyElement ||
        target.fireballElement ||
        null;

    if (!this.element) {
      console.warn("didCollide: player.element is missing", this);
      return false;
    }

    if (!targetElement) {
      return false;
    }

    // Safe to call getBoundingClientRect() now
    const playerRect = this.element.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    return (
      playerRect.left < targetRect.right &&
      playerRect.right > targetRect.left &&
      playerRect.top < targetRect.bottom &&
      playerRect.bottom > targetRect.top
    );
  }

  didCollideEne(enemy) {
    return this.didCollide(enemy);
  }
}
