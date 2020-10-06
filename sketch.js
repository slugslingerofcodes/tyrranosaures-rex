var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score,gameover,restart
var gameoverimj,restartimj
var obsticlegroup,cloudgroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trexdead.png");
  cloudImage=loadImage("cloud.png")
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverimj =loadImage("gameOver.png")
  restartimj =loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  trex.addAnimation("trex_collided",trex_collided); 
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score=0
  obsticlegroup = new Group()
  cloudgroup = new Group()
  
  gameover = createSprite(300,100)
  gameover.addImage("gameoverimj",gameoverimj)
  gameover.visible=false
  
  restart = createSprite(300,140)
  restart.addImage("restateimj",restartimj)
  restart.visible=false
}

function draw() {
  background(255);
  
  if(gameState===PLAY){
    
 
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  clouds()
  obstacles()
    
    ground.velocityX = -5
    
    if(obsticlegroup.isTouching(trex)){
       gameState = END
       }
  }
  else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obsticlegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
   //  trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    obsticlegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    
    
    
    gameover.visible=true;
    restart.visible=true;
    //trex.setAnimation("trex");
  }
  
  //console.log(trex.y);
  if(mousePressedOver(restart)){
      
     refresh(); 
    }
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
        
}

function clouds(){
  if (frameCount % 60===0){
    cloud = createSprite(600,random(60,100),30,40)
    cloud.velocityX=-5
    cloud.addImage(cloudImage)
    cloud.scale=0.5
    cloudgroup.add(cloud)
      }
  
}

function obstacles(){
  if (frameCount % 60===0){
    obstacle = createSprite(600,165,30,40)
    var rand = Math.round(random(1,6))      
    
    switch(rand){
      case 1:
        obstacle.addImage(obstacle1);
      break;
      case 2:
        obstacle.addImage(obstacle2);
      break;
      case 3:
         obstacle.addImage(obstacle3);
        break;
        case 4 :  
        obstacle.addImage(obstacle4);
        break;
        case 5 :  
        obstacle.addImage(obstacle5);
        break;
        case 6 :  
        obstacle.addImage(obstacle6);
        break;
           }
    obsticlegroup.add(obstacle)
    
    obstacle.velocityX=-5
    obstacle.scale=0.5 
      }
}

function refresh(){
  obsticlegroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  score=0;
}
