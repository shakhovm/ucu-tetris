var playground = createPlayground();


// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}


function destroyRow(row) {
  objects.forEach(object => {
    let positionToDelete = [];
    let positionsToReduce = [];
    object.position.forEach(position => {
      if(position[0] === row) {
        positionToDelete.push(position);
        scoreNumber++;
      }
      else if (position[0] > row)
        positionsToReduce.push(position);
    });

    object.position = object.position.filter(position =>
        !positionToDelete.find(x => x.join() === position.join()));
    positionsToReduce.forEach(position => position[0] -= 1);
  });

}

function destroyRows() {
  playground = createPlayground();
  renderPlayground();
  for (let row = playground.length - 1; row >= 0; row--) {
    for (var col = 0; col < playground[row].length; col++) {
      if (typeof playground[row][col] === "undefined") {
        break;
      }
    }
    if (col === 5) {
      destroyRow(row);
      destroyRows();
      return;
    }
  }
}

function generateNewObject() {
  let randomType = FIGURE_TYPES[randomInt(FIGURE_TYPES.length)];
  let mirrored = randomInt(2);
  let randomArray = arrayCopy(mirrored ? MIRRORED_INITIAL_POSITIONS[randomType] :
                                               INITIAL_POSITIONS[randomType]);

  console.log(randomArray);
  objects.push({
    type: randomType,
    state: 'falling',
    position: randomArray
  });

  let currentObject = objects[objects.length - 1];
  let deltaX = randomInt(playground[0].length -
      currentObject.position[currentObject.position.length - 1][1]);

  currentObject.position.forEach(position => position[1] += deltaX);
  if (randomInt(2)) {
    rotateFigure();
  }

  if (isStuck(getCurrentObject()))
  {
    console.log("Game Over");
    objects.pop();
    gameOver = true;
  }
}

function isStuck(currentObject) {
  for (let i = 0; i < currentObject.position.length; ++i) {
    if (currentObject.position[i][0] < 0 || currentObject.position[i][1] < 0 ||
        currentObject.position[i][1] > 4) {
      return true;
    }

    for (let j = 0; j < objects.length; ++j) {
      if (objects[j].state === "falling")
        continue;
      if (objects[j].position.find(x => x.join() === currentObject.position[i].join()))
        return true;
    }
  }
  return false;
}

function moveElement(ind, el, currentObject) {
  try {
    currentObject.position.forEach(position => position[ind] += el);
    if (isStuck(currentObject)) {
      currentObject.position.forEach(position => position[ind] -= el);
      return false;
    }
    playground = createPlayground();

    renderPlayground();  
  } 
  catch (e) {

  }
  
  return true;
}

function moveDown() {
  let currentObject = getCurrentObject();
  if(moveElement(0, -1, currentObject))
  {
    return;
  }
  currentObject.state = 'static';
  destroyRows();
  generateNewObject();
  playground = createPlayground();
  renderPlayground();

}

function moveRight() {
  let currentObject = getCurrentObject();
  moveElement(1, 1, currentObject);
}

function moveLeft() {
  let currentObject = getCurrentObject();
  moveElement(1, -1, currentObject);
}

function pauseGame() {
  gamePause = (gamePause + 1) % 2;
  if (gamePause)
    clearInterval(gameInterval);
}

function rotateFigure() {
  let figure = getCurrentObject();
  let middle = arrayCopy(figure.position[Math.ceil(figure.position.length/2)]);
  let previosPosition = arrayCopy(figure.position);
  figure.position.forEach(position => {
    let x = position[0];
    position[0] = -(position[1]-middle[1]) + middle[0];
    position[1] = (x - middle[0]) + middle[1];
  });
  if (isStuck(figure))
    figure.position = previosPosition;



  playground = createPlayground();

  renderPlayground();
}
// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground();

// interval 1 second
var gameInterval = setInterval(() => {
  if (gameOver)
    return;
  moveDown();
}, 1000);