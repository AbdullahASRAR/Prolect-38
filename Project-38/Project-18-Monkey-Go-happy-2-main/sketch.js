
var monkey, monkey_running, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup;
var ground,background, backgroundImage;

var score=0;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){ 
  
  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
 monkey_collided = loadAnimation("sprite_monkey.collided.png");
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 backgroundImage = loadImage("forest.9.jpeg");
}


function setup() {
  createCanvas(600,500);
  background = createSprite(0,0,900,500);
  background.addImage(backgroundImage);
  background.scale = 1;
  
  monkey = createSprite(80,251,5,5);
  monkey.addAnimation("moving",monkey_running);         
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  
  ground = createSprite(300,320,1200,13);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  //console.log(ground.x);
  ground.visible = false;
  
   
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();

monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  obstacles.debug = false;
}


function draw() {
 //background("white");
 
 background.velocityX=-4;
 
  if (background.x < 0){
      background.x = background.width/2;
    }   
          
     stroke("white");
     textSize(20);
     fill("white");
     
   
  if(gameState === PLAY){
      
     survivalTime=survivalTime+1/10;
          //console.log(survivalTime);
    camera.position.x=monkey.x;
    camera.position.y=monkey.y;
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
    //monkey.scale = 0.15;
      
    switch (score){
      case 10: monkey.scale=0.12;
         break;
      case 20: monkey.scale=0.14;
         break;
      case 30: monkey.scale=0.16;
         break;
      case 40: monkey.scale=0.18;
        break;
      default:break;
             
      }
       
   }  
     
    if(keyDown("space")&& monkey.y>=250) {
      monkey.velocityY = -15;
       
       
    }
      
    monkey.velocityY = monkey.velocityY + 0.8;
     
    monkey.collide(ground);
   
    bananas();
     
    obstacles();
     
      
   if (ground.x < 0){
      ground.x = ground.width/2;
    } 
  
     
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
      monkey.scale = 0.1;
      
     }
     
  }
  
  else if (gameState === END) {
    
   ground.velocityX = 0;
   monkey.velocityY = 0;
             
   obstaclesGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
     
   obstaclesGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0); 
    
    background.velocityX=0; 
    monkey.changeAnimation("collided",monkey_collided);
               
  }
  
  
  drawSprites();
text("SurvivalTime:"+Math.round(survivalTime),300,50);
  
}

function bananas(){
  if (frameCount % 60 === 0) {
    var banana = createSprite(610,180,10,10);
    banana.y = Math.round(random(80,180));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 205;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
    
    
  }
  
}

function obstacles(){
  if (frameCount % 180 === 0){
   var obstacle = createSprite(610,295,5,5);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -6;
   obstacle.lifetime = 102;
   
   obstaclesGroup.add(obstacle);
  }
}

