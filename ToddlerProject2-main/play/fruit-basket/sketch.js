let basket;
let fruits = [];
let score = 0;
let timer = 60;
let jungleImage;
let gameover = false;
let turtleFont;
let basketPic;
let appleImg;
let orangeImg;
let goldenFruit;
let strawberryImg;
let watermelonImg;
let coconutImg;

function preload() {
  jungleImage = loadImage('jungleGames.png');
  turtleFont = loadFont('Turtles.otf');
  basketPic = loadImage('basketImg.png');
  appleImg = loadImage('apple.png');
  orangeImg = loadImage('orange.png');
  goldenFruit = loadImage('lemon.png');
  strawberryImg = loadImage('strawberry.png');
  watermelonImg = loadImage('watermelon.png');
  coconutImg = loadImage('coconut.png');
}

function setup() {
  createCanvas(600, 400);
  basket = new Basket(width / 2, height - 20, 100, 20);
  generateFruits(5);
  setInterval(countdown, 1000);
}

function draw() {
  background(220);

  if (!gameover) {
    image(jungleImage, 300, 200, width, height);
    basket.display();

    for (let i = fruits.length - 1; i >= 0; i--) {
      fruits[i].update();
      fruits[i].display();

      if (fruits[i].checkBasket(basket) && !fruits[i].dragging) {
        fruits.splice(i, 1);
        score++;
        generateFruits(1);
      }
    }

    fill('#1CF8BF');
    stroke(10);
    strokeWeight(2.5);
    textSize(24);
    text(`Score: ${score}`, 20, 30);
    textFont(turtleFont);
    text(`Time: ${timer}`, width - 100, 30);
  } else {
    gameOver();
  }
}

function mousePressed() {
  if (!gameover) {
    for (let i = fruits.length - 1; i >= 0; i--) {
      if (fruits[i].contains(mouseX, mouseY)) {
        fruits[i].startDragging();
        break;
      }
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].stopDragging();
  }
}

function countdown() {
  if (timer > 0 && !gameover) {
    timer--;
  } else if (timer === 0) {
    gameover = true;
  }
}

function keyPressed() {
  if (key === ' ' && gameover) {
    resetGame();
  }
}

function gameOver() {
  noLoop();
  image(jungleImage, 300, 200, width, height);
  fill('#1CF8BF');
  textSize(32);
  textFont(turtleFont);
  textAlign(CENTER, CENTER);
  text(`Game Over\nScore: ${score}\nPress Space to Restart`, width / 2, height / 2);
}
//space changes score but does not reset game

function resetGame() {
  score = 0;
  timer = 15;
  fruits = [];
  generateFruits(5);
  loop();
  gameover = false;
}

function generateFruits(numFruits) {
  for (let i = 0; i < numFruits; i++) {
    let x = random(width);
    let y = random(height / 2);
    let diameter = random(20, 50);
    let fruitColor = color(random(255), random(255), random(255));
    fruits.push(new Fruit(x, y, diameter, fruitColor));
  }
}

class Fruit {
  constructor(x, y, diameter, color) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.color = color;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  // display() {
  //   imageMode(CENTER);
  //   image(this.getFruitImage(), this.x, this.y, this.diameter, this.diameter);
  // }
//too small
  
  display() {
  imageMode(CENTER);
  let increasedDiameter = this.diameter * 2; // Adjust the factor as needed
  image(this.getFruitImage(), this.x, this.y, increasedDiameter, increasedDiameter);
}

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.diameter / 2;
  }

  checkBasket(basket) {
    let d = dist(this.x, this.y, basket.x, basket.y);
    return d < this.diameter / 2 + basket.width / 2 && this.y + this.diameter / 2 > basket.y - basket.height / 2;
  }

  startDragging() {
    this.dragging = true;
    this.offsetX = this.x - mouseX;
    this.offsetY = this.y - mouseY;
  }

  stopDragging() {
    this.dragging = false;
  }

  getFruitImage() {
    // pick fruit image by the color of the fruit
    if (isColorSimilar(this.color.levels, [255, 255, 0])) { 
      // looks for ylw to make lemon
      return goldenFruit;
    } else if (isColorSimilar(this.color.levels, [255, 0, 0])) { 
      // looks for red to make strawberry
      return strawberryImg;
    } else if (isColorSimilar(this.color.levels, [0, 255, 0])) { 
      // looks for green to make watermelon
      return watermelonImg;
    } else if (isColorSimilar(this.color.levels, [139, 69, 19])) { // looks for brown to make coconut
      return coconutImg;
    } else {
      // turns into apple image if none
      return appleImg;
    }
  }
}

class Basket {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
  }

  display() {
    fill('#1CF8BF6D');
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    image(basketPic, 300, 370, 80, 80);
    //basket x and y to change where it is
  }
}

function isColorSimilar(color1, color2) {
  let threshold = 100; // Increase the threshold (Number) to have a wider range of colors meaning more chance of other fruits to appear
  return (
    abs(color1[0] - color2[0]) < threshold &&
    abs(color1[1] - color2[1]) < threshold &&
    abs(color1[2] - color2[2]) < threshold
  );
}
