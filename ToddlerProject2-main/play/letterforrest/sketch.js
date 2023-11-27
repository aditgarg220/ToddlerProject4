let letters = ["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; 
let currentLetter = ""; 
let score = 0; // Player's score
let timer = 60; // Game timer (in seconds)
let startTime; // Start time of the game
let gameEnded = false; // Flag to check if the game has ended
let letterBox; // Reference to the letter box element
let scoreBox; // Reference to the score box element
let timerBox; // Reference to the timer box element
let dingSound;
let buzzSound;
let jungleImage; // Variable to store the jungle image
let gamePaused = false;

function preload() {
  dingSound = loadSound('ding.mp3'); // Replace 'ding.mp3' with the path to your ding sound file
  buzzSound = loadSound('buzz.mp3'); // Replace 'buzz.mp3' with the path to your buzz sound file
  jungleImage = loadImage('jungle.jpg'); // Replace 'jungle.jpg' with the path to your jungle image file
}

function setup() {
  // Create canvas and set it to full screen
  createCanvas(windowWidth/2, windowHeight/2);
  
  // Assign references to HTML elements
  letterBox = createP("Letter: ");
  scoreBox = createP("Score: 0");
  timerBox = createP("Time: 60");
  
  // Initialize game
  startGame();
}

function draw() {
  // Check if game is over
  if (gameEnded) {
    displayGameOver();
    return;
  }
  
  // Draw jungle background
  image(jungleImage, 0, 0, width, height);
  
  // Display current letter
  stroke(0);
  strokeWeight(4);
  textSize(200);
  textAlign(CENTER, CENTER);
  fill(255); // Set text color to white for better visibility on the jungle background
  text(currentLetter, width / 2, height / 2);
  
  // Display score
  textSize(32);
  textAlign(LEFT);
  fill(255);
  text("Score: " + score, 20, 40);
  
  // Update timer
  let elapsedTime = Math.floor((millis() - startTime) / 1000);
  let remainingTime = timer - elapsedTime;
  timerBox.html("Time: " + remainingTime);
  textSize(32);
  textAlign(RIGHT);
  text("Time: " + remainingTime, width - 20, 40);
  
  // Check if game is over
  if (remainingTime <= 0) {
    if (!gamePaused) {
      endGame();
      gamePaused = true;
    }
  }
}

function keyPressed() {
  // Check if the pressed key matches the current letter
  if (key.toUpperCase() === currentLetter.toUpperCase()) {
    score++;
    scoreBox.html("Score: " + score);
    dingSound.play(); // Play ding sound
    nextLetter();
  }
}

function startGame() {
  // Reset variables
  score = 0;
  gameEnded = false;
  startTime = millis();
  gamePaused = false;
  
  // Display initial letter
  nextLetter();
}

function endGame() {
  gameEnded = true;
  buzzSound.play(); 
}

function nextLetter() {
  let randomIndex = floor(random(letters.length));
  currentLetter = letters[randomIndex];
}

function displayGameOver() {
  background(0); 
  textSize(64);
  fill(255); 
  textAlign(CENTER, CENTER);
  image(jungleImage, 0, 0, width, height);
  text("Game Over!", width / 2, height / 2 - 50);
  textSize(32);
  text("Your Score: " + score, width / 2, height / 2 + 50);
}

function touchMoved() {
  if (!gameEnded) {
    return false;
  }
}


