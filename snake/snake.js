const canvas = document.getElementById("snake");

const ctx = canvas.getContext("2d");
let score = 0;
let scoreElement = document.getElementById("liveScore");
let resetButton = document.getElementById("resetButton");
let gameOverElement = document.getElementById("gameOver");
let secondsElement = document.getElementById("seconds");
let highScoreElement = document.getElementById("highScore");
let secondsPlayed = 0;
const unitSize = 25;
let bordWidth = canvas.width;
let bordHeight = canvas.height;
let apple = { x: 0, y: 0 };
let snake = [
  { x: unitSize * 3, y: unitSize },
  { x: unitSize * 2, y: unitSize },
  { x: unitSize, y: unitSize },
];
let gameStop = false;
let xVelocity = unitSize;
let yVelocity = 0;
let directionChanged = false;
let timeout = 150;
let tick;

let secondsTick

init()
function init() {
  scoreElement.innerText = score;
  secondsElement.innerHTML = secondsPlayed
  takeHighScoreFromLocalStorage();
  newApple();
  drawBoardGrid();
  drawApple();
  drawSnake();
  resetButton.addEventListener("click", resetGame);
  addEventListener("keydown", keyPressHandler);
  nextTick(timeout);
  secondCounter();
}

function nextTick(timeout = 150) {
  isGameOver();
  setHighScore();
  if (!gameStop) {
    tick = setTimeout(() => {
      drawBoardGrid();
      drawApple();
      moveSnake();
      directionChanged = false;
      nextTick(timeout);
    }, timeout);
  }
}


function secondCounter() {
  if (gameStop === false) {
    secondsTick = setTimeout(() => {
      secondsPlayed++
      secondsElement.innerHTML = secondsPlayed
      secondCounter();
    }, 1000);
  } else {
    clearTimeout(secondsTick);
  }
}
function keyPressHandler(event) {
  if (event.code === "KeyW" && yVelocity != unitSize && !directionChanged) {
    xVelocity = 0;
    yVelocity = -unitSize;
    directionChanged = true;
  }
  if (event.code === "KeyA" && xVelocity != unitSize && !directionChanged) {
    xVelocity = -unitSize;
    yVelocity = 0;
    directionChanged = true;
  }
  if (event.code === "KeyS" && yVelocity != -unitSize && !directionChanged) {
    xVelocity = 0;
    yVelocity = unitSize;
    directionChanged = true;
  }
  if (event.code === "KeyD" && xVelocity != -unitSize && !directionChanged) {
    xVelocity = unitSize;
    yVelocity = 0;
    directionChanged = true;
  }
}
function drawBoardGrid() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 20 * unitSize, 20 * unitSize);
  for (let x = 0; x < bordWidth; x += unitSize) {
    ctx.moveTo(0.5 + x, 0);
    ctx.lineTo(0.5 + x, bordHeight);
  }

  for (let x = 0; x < bordHeight; x += unitSize) {
    ctx.moveTo(0, 0.5 + x);
    ctx.lineTo(bordWidth, 0.5 + x);
  }
  ctx.strokeStyle = "gray";
  ctx.stroke();
}
function newApple() {
  apple.x = Math.floor((Math.random() * bordWidth) / unitSize) * unitSize;
  apple.y = Math.floor((Math.random() * bordHeight) / unitSize) * unitSize;
  for (let part of snake) {
    if (apple.x === part.x && apple.y === part.y) {
      newApple();
      break;
    }
  }
}
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, unitSize, unitSize);
}
function drawSnake() {
  ctx.fillStyle = "green";
  for (const snakePart of snake) {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
  }
}
function takeHighScoreFromLocalStorage() {
  let highScoreFromLocalStorage = parseInt(localStorage.getItem("highscore")) || 0;
  highScoreElement.innerText = highScoreFromLocalStorage;
  return highScoreFromLocalStorage;
}
function setHighScore() {  
  if (score > takeHighScoreFromLocalStorage()) {
    localStorage.setItem("highscore", score.toString())
    highScoreElement.innerText = score;
  }
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    newApple(); // xndzor kerav score mecacav
    score++;
    scoreElement.innerText = score;
  } else {
    snake.pop();
  }
  drawSnake();
}
function isGameOver() {
  if (
    snake[0].x === bordWidth ||
    snake[0].y === bordHeight ||
    snake[0].x === -unitSize ||
    snake[0].y === -unitSize
  ) {
    gameStop = true;
    gameOverElement.style.display = "block";
  }
  const setSnake = new Set();
  for (const part of snake) {
    const snakePartString = `${part.x},${part.y}`;
    if (setSnake.has(snakePartString)) {
      gameStop = true;
      gameOverElement.style.display = "block";
    }
    setSnake.add(snakePartString);
  }
}
function resetGame() {
  snake = [
    { x: unitSize * 3, y: unitSize },
    { x: unitSize * 2, y: unitSize },
    { x: unitSize, y: unitSize },
  ];
  newApple();
  score = 0;
  scoreElement.innerText = score;
  xVelocity = unitSize;
  yVelocity = 0;
  gameStop = false;
  gameOverElement.style.display = "none";
  secondsPlayed = 0;
  secondsElement.innerHTML = secondsPlayed
  secondCounter()
  clearTimeout(tick);
  nextTick(timeout);
}