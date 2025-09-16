window.onload = function () {
  const startButtonElement = document.getElementById("start-button");
  const restartButtonElement = document.getElementById("restart-button");

  let OurNewGame;

  //Pack my event listener here

  startButtonElement.addEventListener("click", () => {
    startGame();
  });

  restartButtonElement.addEventListener("click", () => {
    console.log("click");
    startGame();
  });

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  //Pack funtions

  function handleKeydown(event) {
    const key = event.key;
    const possiblekeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possiblekeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
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
      }
    }
  }

  function handleKeyup(event) {
    const keyPress = event.key;
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
};
