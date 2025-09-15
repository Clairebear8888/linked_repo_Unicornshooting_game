window.onload = function () {
  const startButtonElement = document.getElementById("start-button");
  const restartButtonElement = document.getElementById("restart-button");

  let OurNewGame;

  //Pack my event listener here

  startButtonElement.addEventListener("click", () => {
    startGame();
  });

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
  window.addEventListener("keydown", handleKeydown);

  // funtions

  function startGame() {
    console.log("start game");
    OurNewGame = new Game();
    OurNewGame.start();
  }
};
