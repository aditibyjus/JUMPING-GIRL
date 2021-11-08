var restartImg, groundImage, obstacle;
var jump, girl_running, girl_jump,girl; 
var obstaclesGroup, jumpGroup;
var score;
var path;
var jumpCG;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    girl_running = loadAnimation("walk.png","run.png");
    girl_jump = loadAnimation("jump.png");
    
    groundImage = loadImage("background.png");   
     
    obstacle = loadImage("obstacle.png");    
    restartImg = loadImage("restart.png");    
}

function setup() {  
    createCanvas(900,300);
    // Moving background
    path=createSprite(200,150);
    path.addImage(groundImage);
    path.velocityX = -3;
    path.scale = 1;

    girl = createSprite(100,200);
    girl.addAnimation("running", girl_running);
    girl.scale = 0.2;
    girl.velocityX = 2;

    obstaclesGroup = createGroup();

    jumpCG = new Group();

    score = 0;
}

function draw() {
    background(0);
    drawSprites();

    text("Score: "+ score, 300,50);
    text("FrameCount: "+ frameCount, 400,50);
    

    if(gameState === PLAY){
        //move the ground
        path.velocityX = -3;
        
        if (path.x < 125){
            path.x = width/2;
        }      
        
        //spawn obstacles on the ground
        spawnObstacles(); 

        if(obstaclesGroup.isTouching(girl)){
            gameState = END;  
            girl.velocityX= 0 ;
            path.velocityX = 0;

        }

        if(keyDown("space")) {
            jumpGirl();
          }

    }
    else if (gameState === END) {
        path.velocityX = 0;

        
        text("Press space key to Restart the game!", 500,200);

        if(keyDown("space")) {
            reset();
          }
    }

}

function reset(){
    gameState = PLAY;
    
    girl.addAnimation("running", girl_running);
    girl.scale = 0.2;
    girl.velocityX = 2;

    obstaclesGroup.destroyEach();
    
    score = 0;
   }

   
function spawnObstacles(){
    if (frameCount % 60 == 0){
      var obstacle = createSprite(girl.x + 150,250);
      //obstacle.velocityX = -5;

       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 50;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }


   function jumpGirl(){
    player1 =createSprite(girl.x,200);
    player1.scale =0.2;
    player1.velocityY = -2;

    player1.addAnimation("opponentPlayer1",girl_jump);
    player1.setLifetime=30;
    jumpCG.add(player1);
}


   
