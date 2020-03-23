

document.addEventListener("keydown", event => {
  if (gameOver)
    return;
  switch (event.key) {
    case DOWN:
      moveDown();
      break;
    case RIGHT:
      moveRight();
      break;
    case LEFT:
      moveLeft();
      break;
    case PAUSE:
      pauseGame();
      break;
    case UP:
      rotateFigure();

      break;
    default:
      break;
  }
});


