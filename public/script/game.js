const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");

let box, snake, food, score, direction=null, speed, snakeTimer=0;
let blink = false, blinkCounter = 0;
let eyeX = 0, eyeY = 0;
let gridCount = 30;
let foodPulse = 0; 
let gameRunning = false;

function resizeCanvas(){
  box = Math.floor(Math.min(window.innerWidth, window.innerHeight) / gridCount);
  canvas.width = box * gridCount;
  canvas.height = box * gridCount;
  if(snake) drawSnake(); 
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnFood() {
  let valid = false;
  let newFood;
  while(!valid){
    newFood = {
      x: Math.floor(Math.random() * gridCount) * box,
      y: Math.floor(Math.random() * gridCount) * box
    };
    valid = !snake.some(part => part.x === newFood.x && part.y === newFood.y);
  }
  return newFood;
}

function initGame(autoStart=false){
  snake = [
    {x: Math.floor(gridCount/2)*box, y: Math.floor(gridCount/2)*box},
    {x: (Math.floor(gridCount/2)-1)*box, y: Math.floor(gridCount/2)*box},
    {x: (Math.floor(gridCount/2)-2)*box, y: Math.floor(gridCount/2)*box}
  ];
  direction = autoStart ? "RIGHT" : null;
  score = 0;
  speed = 0.3;
  scoreDisplay.textContent = "Score: " + score;
  food = spawnFood();
  gameOverScreen.style.display = "none";
  snakeTimer = 0;
  gameRunning = autoStart;
  drawSnake(); 
}

// Tombol kontrol
function startGame(dir){
  if(!gameRunning){
    direction = dir;
    gameRunning = true;
  } else {
    if(dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if(dir === "UP" && direction !== "DOWN") direction = "UP";
    if(dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    if(dir === "DOWN" && direction !== "UP") direction = "DOWN";
  }
}

function isEating(head, food){
  return head.x === food.x && head.y === food.y;
}

function moveSnake(){
  let head = snake[0];
  let headX = head.x;
  let headY = head.y;
  if(direction === "LEFT") headX -= box;
  if(direction === "UP") headY -= box;
  if(direction === "RIGHT") headX += box;
  if(direction === "DOWN") headY += box;

  if(isEating({x: headX, y: headY}, food)){
    eatSound.currentTime = 0;
    eatSound.play();
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = spawnFood();
    if(score % 5 === 0 && speed > 0.08){
      speed = Math.max(0.08, speed-0.02);
    }
  } else {
    snake.pop();
  }

  let newHead = {x: headX, y: headY};
  if(headX<0 || headX>=canvas.width || headY<0 || headY>=canvas.height || collision(newHead, snake)){
    gameOverSound.currentTime = 0;
    gameOverSound.play();
    finalScore.textContent = "Score: " + score;
    gameOverScreen.style.display = "flex";
    gameOverScreen.style.animation = "none";
    void gameOverScreen.offsetWidth;
    gameOverScreen.style.animation = "zoomFade 0.6s ease forwards";
    if(navigator.vibrate) navigator.vibrate(200);
    gameRunning = false;
    return false;
  }

  snake.unshift(newHead);
  return true;
}

function collision(head, array){
  return array.some(part => part.x === head.x && part.y === head.y);
}

function drawSnake(){
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  let head = snake[0];
  let grd = ctx.createLinearGradient(head.x, head.y, head.x + box, head.y + box);
  grd.addColorStop(0, '#6c5ce7');
  grd.addColorStop(1, '#00bfff');
  ctx.fillStyle = grd;
  ctx.fillRect(head.x, head.y, box, box);

  blinkCounter++;
  if(blinkCounter > 20){ blink = !blink; blinkCounter=0; }
  if(!blink){
    let centerX = head.x + box/2;
    let centerY = head.y + box/2.5; 
    let maxOffset = box/4;
    let targetX = Math.max(-maxOffset, Math.min(maxOffset, (food.x + box/2 - centerX) * 0.4));
    let targetY = Math.max(-maxOffset, Math.min(maxOffset, (food.y + box/2 - centerY) * 0.4));
    eyeX += (targetX - eyeX) * 0.25;
    eyeY += (targetY - eyeY) * 0.25;

    ctx.fillStyle = 'white';
    ctx.fillRect(centerX - box/6 + eyeX, centerY - box/6 + eyeY, box/4, box/4);
    ctx.fillRect(centerX + box/12 + eyeX, centerY - box/6 + eyeY, box/4, box/4);

    ctx.fillStyle = 'black';
    ctx.fillRect(centerX - box/24 + eyeX, centerY - box/24 + eyeY, box/8, box/8);
    ctx.fillRect(centerX + box/12 + eyeX, centerY - box/24 + eyeY, box/8, box/8);
  }

  for(let i=1; i<snake.length; i++){
    let part = snake[i];
    ctx.fillStyle = '#6c5ce7';
    ctx.shadowColor = '#6c5ce7';
    ctx.shadowBlur = 10;
    ctx.fillRect(part.x, part.y, box, box);
  }
  ctx.shadowBlur = 0;
}

function drawFood(){
  foodPulse += 0.08;
  let pulseScale = 0.15 * Math.sin(foodPulse) + 1;
  let foodRadius = (box/2) * pulseScale;
  ctx.fillStyle = '#ff6b81';
  ctx.beginPath();
  ctx.arc(food.x + box/2, food.y + box/2, foodRadius, 0, Math.PI*2);
  ctx.fill();
}

// keyboard
document.addEventListener("keydown", e => {
  if(e.keyCode === 37) startGame('LEFT');
  if(e.keyCode === 38) startGame('UP');
  if(e.keyCode === 39) startGame('RIGHT');
  if(e.keyCode === 40) startGame('DOWN');
});

// swipe mobile
let touchStartX, touchStartY;
canvas.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});
canvas.addEventListener('touchend', e => {
  const touch = e.changedTouches[0];
  let dx = touch.clientX - touchStartX;
  let dy = touch.clientY - touchStartY;
  if(Math.abs(dx) > Math.abs(dy)){
    if(dx > 0) startGame('RIGHT'); else startGame('LEFT');
  } else {
    if(dy > 0) startGame('DOWN'); else startGame('UP');
  }
});

// game loop
let lastTime = 0;
function gameLoop(timestamp){
  if(!lastTime) lastTime = timestamp;
  let delta = (timestamp - lastTime)/1000;
  lastTime = timestamp;

  if(gameRunning){
    snakeTimer += delta;
    while(snakeTimer >= speed){
      snakeTimer -= speed;
      if(!moveSnake()) break;
    }
  }

  drawSnake();
  drawFood();
  requestAnimationFrame(gameLoop);
}

initGame(false);
requestAnimationFrame(gameLoop);