var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage



function preload(){
 knifeImage = loadImage("sword.png"); 
 fruit1 = loadImage("fruit1.png"); 
 fruit2 = loadImage("fruit2.png"); 
 fruit3 = loadImage("fruit3.png"); 
 fruit4 = loadImage("fruit4.png"); 
gameOverImage = loadImage("gameover.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  knifeSound =loadSound("knifeSwooshSound.mp3")
  gameoverSound = loadSound("gameover.mp3")
}

function setup(){
  createCanvas(400, 400);
 //creating knife 
knife = createSprite("40,200,20,20") ; 
knife.addImage(knifeImage);
knife.scale=0.7 
  
 
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
   
  
  
  
  
  
  
  
}



function draw(){
background("lightblue");
  
 if(gameState===PLAY){
    
    
    fruits();
    Enemy();
    
    
    knife.y=mouseY;
    knife.x=mouseX;
  
    
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeSound.play();
    }
    else
    {
      if(enemyGroup.isTouching(knife)){
        gameState=END;
        gameoverSound.play();
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        
        knife.addImage(gameOverImage);
        knife.x=200;
        knife.y=200;
      }
    }
  }
  
  drawSprites();
  
  textSize (20);
  text("Score : "+ score,300,30);   
  
  
  drawSprites();
  
   
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/8));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
   position = Math.round(random(1,2))
   fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    if (position==1){
     fruit.x =400
     fruit.velocityX = -(8+ (score/4))
    }
    else
    
    if(position==2){
    fruit.x = 0
    fruit.velocityX = (8+(score/4))
    }
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
  }
}