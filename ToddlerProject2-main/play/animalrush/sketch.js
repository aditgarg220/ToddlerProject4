let lion;
let obstacleX;
let obstacleWidth = 50;
let obstacleGap;
let obstacleSpeed = 5;
let isGameOver = false;
let points = 0;
let passedObstacle = false;
let rotationAngle = 0;
let rotationSpeed = 1;
let positiveNoise;
let negativeNoise;

function preload() {
  soundFormats('mp3', 'ogg');
  positiveNoise = loadSound('ding_noise.mp3');
  negativeNoise = loadSound('incorrect_sound.mp3');
}

function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2); // Scale down by 1/2
  let canvasX = (windowWidth - width) / 2; // Calculate center position
  let canvasY = (windowHeight - height) / 2;
  frameRate(120);
  noCursor();
  lion = { x: width / 2, y: height / 2, size: 50 };
  generateRandomObstacle();
  translate(canvasX, canvasY); // Position the canvas at the center
}


function draw() {
  background(102, 204, 255);

  if (!isGameOver) {
    moveObstacles();
    checkCollision();

    lion.x = mouseX;
    lion.y = mouseY;

    drawClouds();
    drawGround();

    fill(255);
    textSize(35);
    text("Points: " + points, width / 2 - 150, 36);

    if (passedObstacle) {
      rotateMane();
    }

    drawLion();
    drawObstacles();
  } else {
    displayGameOver();
    cursor();
  }
}

function keyPressed() {
  if (isGameOver && keyCode === 32) {
    isGameOver = false;
    points = 0;
    generateRandomObstacle();
    noCursor();
  }
}

function rotateMane() {
  rotationAngle += rotationSpeed;
}

function drawLion() {
  fill('#FFD700');
  ellipse(lion.x, lion.y + 20, lion.size, lion.size - 10);

  fill('#8B4513');
  push();
  translate(lion.x, lion.y);
  rotate(radians(rotationAngle));
  for (let i = 0; i < 360; i += 30) {
    let x = cos(radians(i)) * 30;
    let y = sin(radians(i)) * 30;
    ellipse(x, y, lion.size / 3, lion.size / 3);
  }
  pop();

  fill('#FFD700');
  ellipse(lion.x, lion.y, lion.size - 10, lion.size - 10);

  fill('#000');
  ellipse(lion.x - lion.size / 8, lion.y - lion.size / 8, lion.size / 8, lion.size / 8);
  ellipse(lion.x + lion.size / 8, lion.y - lion.size / 8, lion.size / 8, lion.size / 8);

  fill('#A52A2A');
  triangle(lion.x, lion.y + lion.size / 16, lion.x - lion.size / 16, lion.y + lion.size / 8, lion.x + lion.size / 16, lion.y + lion.size / 8);
}

function generateRandomObstacle() {
  obstacleGap = random(200, 400);
  obstacleX = width;
  passedObstacle = false;
}

function moveObstacles() {
  obstacleX -= obstacleSpeed;
  if (obstacleX < -obstacleWidth) {
    generateRandomObstacle();
    obstacleSpeed += 0.18;
    obstacleX = width;

    if (passedObstacle) {
      rotationAngle += 45;
      positiveNoise.play();
    }
  }
}

function drawObstacles() {
  fill('#8B4513');
  rect(obstacleX, 0, obstacleWidth, height - obstacleGap);
  rect(obstacleX, height - obstacleGap + 120, obstacleWidth, height);
}

function checkCollision() {
  if (
    lion.x > obstacleX &&
    lion.x < obstacleX + obstacleWidth &&
    (lion.y + 20 - (lion.size - 10) / 2 < height - obstacleGap ||
      lion.y + 20 + (lion.size - 10) / 2 > height - obstacleGap + 120)
  ) {
    gameOver();
    obstacleSpeed = 5;
  } else if (lion.x > obstacleX + obstacleWidth && !passedObstacle) {
    passedObstacle = true;
    points++;
  }
}

function gameOver() {
  isGameOver = true;
  negativeNoise.play();
}

function drawClouds() {
  noStroke();
  fill(255);
  ellipse(width * 0.2, 60, 80, 60);
  ellipse(width * 0.4, 80, 100, 70);
  ellipse(width * 0.6, 50, 120, 80);
  ellipse(width * 0.8, 70, 90, 60);
}

function drawGround() {
  fill('#228B22');
  rect(0, height - 20, width, 20);
}

function displayGameOver() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(30);
  text("Points: " + points, width / 2, height / 2);
  text("Press Space to Restart", width / 2, height / 2 + 40);
}
