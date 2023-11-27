let dots = [];
let currentDot = 0;
let isDrawing = false;
let exerciseCompleted = false;
let pointCounter = 0;
let timer = 60;
let jungleBackground;
let dingSound;
let buzzSound;
let whiteSquareX;
let whiteSquareY;
let whiteSquareWidth;
let whiteSquareHeight;
let turtleFont;


function preload() {
  jungleBackground = loadImage('jungleGames.png');
  dingSound = loadSound('ding.mp3');
  buzzSound = loadSound('buzz.mp3');
  turtleFont = loadFont('Turtles.otf');

}

function setup() {
  createCanvas(400, 400);
  whiteSquareX = width - 110;
  whiteSquareY = 10;
  whiteSquareWidth = 100;
  whiteSquareHeight = 60;
  initializeRandomDots();
  setInterval(updateTimer, 1000);
  textFont(turtleFont);
}

function draw() {
  image(jungleBackground, 0, 0, width, height);
  
  noStroke();
  fill(205, 127, 50);
  //bronze brown color
  rect(whiteSquareX, whiteSquareY, whiteSquareWidth, whiteSquareHeight); 
  stroke('#FFD700'); 
  //yellow border color
  strokeWeight(4); 
  noFill();
  rect(whiteSquareX, whiteSquareY, whiteSquareWidth, whiteSquareHeight); 

  textSize(16);
  fill('black'); 
  stroke('#1CF8BF');
  strokeWeight(4);

  let pointsText = `Points: ${pointCounter}`;
  let pointsTextWidth = textWidth(pointsText);
  let pointsX = whiteSquareX + whiteSquareWidth / 2 - pointsTextWidth / 2;
  let pointsY = whiteSquareY + whiteSquareHeight / 2 - 10; 

  let timeText = `Time: ${timer}`;
  let timeTextWidth = textWidth(timeText);
  let timeX = whiteSquareX + whiteSquareWidth / 2 - timeTextWidth / 2;
  let timeY = whiteSquareY + whiteSquareHeight / 2 + 20; 

  text(pointsText, pointsX, pointsY);
  text(timeText, timeX, timeY);

  for (let dot of dots) {
    dot.display();
  }
  
  
  let d = dist(mouseX, mouseY, dots[currentDot].x, dots[currentDot].y);
  if (d < 20) {
    stroke(0, 255, 0); 
    if (!exerciseCompleted) {
      dots[currentDot].flash();
      strokeWeight(1); 
    }
  } else {
    stroke(255); 
  }

  if (isDrawing) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  if (d < 20) {
    currentDot++;
    if (currentDot === dots.length) {
      exerciseCompleted = true;
      pointCounter++;
      dingSound.play();
      initializeRandomDots();
    }
  } else if (d > 40) {
    isDrawing = false;
  }

  if (timer === 0) {
    buzzSound.play();
    gameOver();
  }
}

function mousePressed() {
  if (!exerciseCompleted) {
    isDrawing = true;
  }
}

function mouseReleased() {
  isDrawing = false;
}

function updateTimer() {
  if (timer > 0) {
    timer--;
  }
}

function initializeRandomDots() {
  dots = [];
  let numDots = Math.floor(random(8, 12));

  for (let i = 0; i < numDots; i++) {
    let x, y;
    let isOverlapping;
    
    do {
      x = random(50, width - 50);
      y = random(50, height - 50);

      // Check if the new dot overlaps with any existing dot in terms of numbers
      isOverlapping = dots.some(dot => dist(x, y, dot.x, dot.y) < 20 || dot.number === i + 1);
    } while (isInsideWhiteSquare(x, y) || isOverlapping);

    dots.push(new Dot(x, y, i + 1));
  }

  currentDot = 0;
  exerciseCompleted = false;
}

function isInsideWhiteSquare(x, y) {
  return (
    x > whiteSquareX &&
    x < whiteSquareX + whiteSquareWidth &&
    y > whiteSquareY &&
    y < whiteSquareY + whiteSquareHeight
  );
}

function gameOver() {
  image(jungleBackground, 0, 0, width, height);
  textSize(32);
  fill('#1CF8BF'); 
  stroke('black')
  strokeWeight(3)
  text("Game Over", width / 2 - 100, height / 2 + 10);
  text(`Points: ${pointCounter}`, width / 2 - 100, height / 2 + 50);
  noLoop();
}

class Dot {
  constructor(x, y, number) {
    this.x = x;
    this.y = y;
    this.number = number;
    this.isFlashing = false;
  }

  display() {
    if (this.isFlashing) {
      fill(0, 255, 0);
    } else {
      fill('white'); 
    }
    ellipse(this.x, this.y, 10, 10);
    textSize(20);
    textFont(turtleFont); 
    fill('#2196F3');
    stroke('#040CFF')
    strokeWeight(2.5)
    //noStroke(); 
    text(this.number, this.x - 5, this.y - 15);
  }

  flash() {
    this.isFlashing = true;
  }
}




