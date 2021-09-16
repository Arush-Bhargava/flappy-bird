var bird, birdImg;
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var playButton;
var startGame;
var score;
var pillar, hole, anu;
var pillarGroup, holeGroup;
var backgroundImg, backgrund;
var pipe1, piep2;
var restart, restartImg;

function preload() {
  birdImg = loadImage("bird.png");
  playButton = loadImage("playbutton.png");
  backgroundImg = loadImage("bg.png");

  pipe1 = loadImage("pipe.png");
  restartImg = loadImage("replay.png");
}

function setup() {
  createCanvas(600, 400);

  backgrund = createSprite(500, 200, 600, 400);
  backgrund.addImage(backgroundImg);
  backgrund.scale = 3;

  bird = createSprite(100, 200, 20, 20);
  bird.addImage(birdImg);
  bird.scale = 0.18;
  bird.setCollider("rectangle", 0, 0, 300, 300);

  startGame = createSprite(300, 200, 80, 50);
  startGame.addImage(playButton);
  startGame.scale = 0.7;

  pillarGroup = new Group();
  holeGroup = new Group();

  restart = createSprite(300, 230, 20, 20);
  restart.addImage(restartImg);
  restart.scale = 0.35;

  score = -1;
}

function draw() {
  background(220);

  drawSprites();

  if (gameState === START) {
    textFont("ALGERIAN");
    fill("red");
    textSize(50);
    text("FLAPPY BIRD", 165, 100);

    fill("black");
    textSize(25);
    text("Score: " + 0, 450, 50);

    restart.visible = false;

    if (mousePressedOver(startGame)) {
      gameState = PLAY;
    }
  }

  if (gameState === PLAY) {
    startGame.visible = false;

    backgrund.velocityX = -3;
    restart.visible = false;

    fill("black");
    textSize(25);

    score <= 0
      ? text("Score: " + 0, 450, 50)
      : text("Score: " + score, 450, 50);

    if (bird.y > 0) {
      if (keyDown("space")) {
        bird.velocityY = -6;
      } else {
        bird.velocityY = 4;
      }
    } else {
      bird.velocityY = 4;
    }

    if (bird.y>400){
      gameState = END;
    }

    if (backgrund.x < 80) {
      backgrund.x = 500;
    }

    if (frameCount % 80 === 0) {
      score += 1;
    }

    if (bird.isTouching(pillarGroup)) {
      gameState = END;
    }

    spawnPillar();
  }
  if (gameState === END) {
    textSize(60);
    textFont("olamo");
    fill("#c93737");
    text("Game Over", 165, 150);
    textSize(40);
    text("Your Score:  " + score, 190, 190);
    bird.velocityY = 0;
    backgrund.velocityX = 0;
    pillarGroup.destroyEach();
    restart.visible = true;

    if (mousePressedOver(restart)) {
      gameState = PLAY;
      score = 0;
      bird.y  = 200;
    }
  }
}

function spawnPillar() {
  if (frameCount % 80 === 0) {
    var yaxis = random(225, 525);

    pillar = createSprite(400, 0, 25, yaxis);
    pillar.velocityX = -4;
    pillar.lifetime = 100;
    pillarGroup.add(pillar);

    hole = createSprite(400, yaxis / 2 + 50, 25, 100);
    hole.velocityX = -4;
    hole.lifetime = 100;
    hole.shapeColor = "blue";
    hole.visible = false;
    holeGroup.add(hole);

    anu = createSprite(400, 400, 25, 400 - yaxis / 2);
    anu.velocityX = -4;
    anu.lifetime = 100;
    // anu.addImage(pipe1);
    // anu.scale = 0.1;
    // anu.length = 400 -yaxis/2;
    pillarGroup.add(anu);
  }
}
