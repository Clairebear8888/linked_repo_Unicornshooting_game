window.onload = function () {
  const startButtonElement = document.getElementById("start-button");
  const restartButtonElement = document.getElementById("restart-button");
  const restartButton2Element = this.document.getElementById("restart-button2");

  let OurNewGame;

  //Pack my event listener here

  startButtonElement.addEventListener("click", () => {
    startGame();
  });

  restartButtonElement.addEventListener("click", () => {
    console.log("click");
    restartGame();
  });

  restartButton2Element.addEventListener("click", () => {
    console.log("click restart button2");
    restartGame();
  });

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  //Pack funtions

  function handleKeydown(event) {
    const code = event.code;
    const possiblekeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "Space",
    ];
    if (possiblekeystrokes.includes(code)) {
      event.preventDefault();
      switch (code) {
        case "ArrowLeft":
          OurNewGame.player.directionX = -5;
          break;
        case "ArrowRight":
          OurNewGame.player.directionX = 5;
          break;
        case "ArrowUp":
          OurNewGame.player.directionY = -5;
          break;
        case "ArrowDown":
          OurNewGame.player.directionY = 5;
          break;
        case "Space":
          OurNewGame.boom.play();
          OurNewGame.projectors.push(
            new Projector(
              OurNewGame.gameScreenElement,
              OurNewGame.player.top - 18,
              OurNewGame.player.left + 110
            )
          );
          break;
      }
    }
  }

  function handleKeyup(event) {
    const keyPress = event.code;
    const possiblekeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possiblekeystrokes.includes(keyPress)) {
      event.preventDefault();
      switch (keyPress) {
        case "ArrowLeft":

        case "ArrowRight":
          OurNewGame.player.directionX = 0;
          break;

        case "ArrowUp":

        case "ArrowDown":
          OurNewGame.player.directionY = 0;
          break;
      }
    }
  }

  function startGame() {
    console.log("start game");
    OurNewGame = new Game();
    OurNewGame.start();
  }

  function restartGame() {
    location.reload();
  }
};
