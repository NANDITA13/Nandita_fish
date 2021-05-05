var blueBag,blueBagImg, greenBag,greenBagImg, yellowBag,yellowBagImg;

var background,backgroundImg;

var fish,fishImg;

var fishjumpImg;

var people1Img,people2Img,people3Img, people4Img, people5Img;

var plasticBottle1,plasticBottle1Img, plasticBottle2,plasticBottle2Img, plasticBottle3,plasticBottle3Img;

var water, waterImg;

var bg,bgImg;

var invGround;

var startingX;

var garbageDumpImg;

var energyDrink , energyDrinkImg , energyDrinkGroup;

var energyDrinkCount = 0;

var heartImg;

var deadFishImg;

var bird1,bird2,board,onboard,safeFish;

var PLAY = 1;
var END = 0 ;
var WIN = 2;
var gameState = PLAY;

var energySound,winSound,platicHitSoud,gameOverSound;

var gameOverImg;

function preload() {

  bgImg = loadImage ("images/Back Ground.png");
  
  fishImg = loadAnimation ("images/fish1.png","images/fish2.png","images/fish3.png","images/fish4.png")

  fishjumpImg = loadAnimation ("images/jump1.png", "images/jump2.png", "images/jump3.png", "images/jump4.png" ,"images/jump5.png","images/jump6.png","images/jump7.png","images/jump8.png","images/jump9.png","images/jump10.png" )

  plasticBottle1 = loadImage ("images/plastic bottle1.png");
  plasticBottle2 = loadImage ("images/plastic bottle2.png");
  plasticBottle3 = loadImage ("images/plastic bottle3.png");

  heartImg = loadImage ("images/Heart red.png")

  energyDrinkImg = loadImage ("images/drink.png")

  blueBag = loadImage ("images/bag blue.png");
  yellowBag = loadImage ("images/bag yellow.png");
  greenBag = loadImage ("images/bag green.png");

  people1Img = loadImage ("images/people1.png");
  people2Img = loadImage ("images/people2.png");
  people3Img = loadImage ("images/people3.png");
  people4Img = loadImage ("images/people4.png");
  people5Img = loadImage ("images/people5.png");

  garbageDumpImg = loadImage ("images/Garbage Dump1.png");

  deadFishImg = loadImage ("images/dead fish.png");

  bird1 = loadImage ("images/bird1.png");
  bird2 = loadImage ("images/bird2.png");
  board = loadImage ("images/board.png");
  onboard = loadImage ("images/on bord.png");
  safeFish = loadImage ("images/safe fish.png");

  energySound = loadSound ("sound/fantastic.mp3");
  winSound = loadSound ("sound/wow-amazing.mp3");
  plasticHitSound = loadSound ("sound/oh no 3.mp3");
  gameOverSound = loadSound ("sound/yoyo_death.mp3");

  gameOverImg = loadImage ("images/game over.png");



  

}


function setup() {

  createCanvas(windowWidth,windowHeight);

  energyDrinkGroup = createGroup();

  fish = createSprite (0,height-50);
  

  fish.addAnimation ("fish",fishImg);

  fish.addAnimation ("fishJump",fishjumpImg); 

  fish.addAnimation ("deadFish",deadFishImg);

  invGround = createSprite (width*5/2,height-35,width*8,10);
  invGround.visible = false;

  plasticGroup = createGroup ();

  gameOver = createSprite(fish.x,fish.y);
  gameOver.addImage(gameOverImg);

  gameOver.scale = 0.5;
  

  

  fish.health=2;
 
}

function draw() {
  background(255,255,255);  

  

  if (gameState === PLAY) {

         spawnPlastic ();

         gameOver.visible = false;

        spawnDrink ();

        if (fish.x>= 7750) {
                gameState = WIN;
                winSound.play();
        }

        camera.position.x = fish.x;
        camera.position.y = height/2;

        startingX = Math.round (random(fish.x + 350,fish.x+550));
  

        if (keyDown ("space") && fish.collide(invGround)) {

                fish.velocityY = -12;
                fish.changeAnimation ("fishJump");
        
         }  
        
        if (keyWentUp ("space")) {
        
                fish.changeAnimation ("fish");
        }
        
         if (keyDown ("right")) {
        
                fish.x = fish.x+6;
        
         }
        
         fish.velocityY = fish.velocityY +0.5;
         for (var i=0; i<plasticGroup.length; i=i+1) {
        

               
                if (fish.isTouching (plasticGroup.get(i))) { 
                        plasticHitSound.play();
                        fish.health=fish.health-1;
                        if (fish.health>0) {
                        plasticGroup.get(i).destroy();
                        }
                        else {
                                gameOverSound.play();
                                gameState = END;
                        
                        }
                }
        }

        


for (var i=0; i<energyDrinkGroup.length; i=i+1) {
         
             
                if (fish.isTouching (energyDrinkGroup.get(i))) {
                       energyDrinkGroup.get(i).destroy();
                       energySound.play();
                        energyDrinkCount=energyDrinkCount+1;
                }
        }

        if (energyDrinkCount>=5) {

                fish.health= fish.health+1;
                energyDrinkCount = 0;
        }
         
        
        


  }
  else if (gameState === END){

        fish.velocityY = 0;

        gameOver.visible = true;

        text("you Lost",400,400);
        

        plasticGroup.setLifetimeEach(-1);
        plasticGroup.setVelocityXEach(0);

        energyDrinkGroup.setLifetimeEach(-1);
        energyDrinkGroup.setVelocityXEach(0);

        fish.changeAnimation ("deadFish");

  }

  else if (gameState === WIN) {

          gameOver.visible = true;
          camera.position.x=7700;
          fish.destroy();
          plasticGroup.destroyEach();
          energyDrinkGroup.destroyEach();

  }

  image (bgImg,-width/2,0,width*7,height);

 

  image (people1Img,130,265,200,200);
  image (people2Img,3700,250,200,200);
  image (people3Img,5550,250,200,200);
  image (people4Img,5800,300,100,150);
  image (people5Img,7250,220,110,190);

  image (garbageDumpImg,1600,350,350,150)

  image (bird1,7500,200,150,200);
  image (bird2,8000,200,150,200);
  image (board,7800,220,150,200);
  image (onboard,7835,235,90,85);
  image (safeFish,7800,400,200,200);

 

  


  

   
 fish.collide (invGround);
 
 

  drawSprites();
  fill ("red");
  textSize (30);

  text ("Health : ",fish.x-width/2+50,50);

  for (var i=1; i<=fish.health; i++) {
          image (heartImg,fish.x-width/2+100+50*i,10,50,50);
  }
}

function spawnPlastic () {


 if (frameCount % 60 === 0) {

        var plastic=createSprite (500,height-175);
        plastic.x = fish.x+width
        plastic.y = random (height-20 , height-180);
 
        

        var rand = Math.round(random(1,6));
        switch(rand) {
        case 1: plastic.addImage(plasticBottle1);
                break;
        case 2: plastic.addImage(plasticBottle2);
                break;
        case 3: plastic.addImage(plasticBottle3);
                break;
        case 4: plastic .addImage(blueBag);
                break;  
        case 5: plastic .addImage(yellowBag);
                break;  
        case 6: plastic .addImage(greenBag);
                break;        

        }
        plastic.scale=0.25;
        plastic.velocityX = -5;
        plastic.lifetime= width/5;
        

        plasticGroup.add (plastic);

   }




 }

function spawnDrink () {


        if (frameCount % 80 === 0) {
       
               var energyDrink=createSprite (width/5,height-200);
               energyDrink.y = Math.round(random (height-50 , height-120));
               energyDrink.x = fish.x+width;
               energyDrink.velocityX = -3;
               energyDrink.lifetime = width/3;

               energyDrink.addImage (energyDrinkImg);
               energyDrink.scale=0.05;

               energyDrinkGroup.add (energyDrink); 

               

        }



        

}
