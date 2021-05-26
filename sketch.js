var form,game,player;
var gameState = 0;
var playerCount;
var database;
var allPlayers;
var car1,car2,car3,car4;
var cars;
var xVel,yVel;
var passedFinish;
var goldMedalImg,silverMedalIng,brinzeMedalImg,oilSpillImg;
var carsAtEnd;
var oilSpill;
function preload(){
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
    groundImg = loadImage("images/ground.png");
    trackImg = loadImage("images/track.jpg");
    goldMedalImg = loadImage("images/gold.png") ;
    silverMedalImg = loadImage("images/silver.png") ;
    bronzeMedalImg = loadImage("images/bronze.png") ;
    oilSpillImg = loadImage("images/f1.png");
}
function setup(){
    database = firebase.database();
    createCanvas(displayWidth-20,displayHeight-20);
    game = new Game();
    game.getState();
    game.start();
      xVel = 0;
      yVel = 0;
      obstacles = new Group();

      for(var i = 0; i<5;i++){
          x = random(100,displayWidth-100);
          y = random(-displayHeight*4,displayHeight-400);
          oilSpill = createSprite(x,y);
          oilSpill.addImage(oilSpillImg);
          obstacles.add(oilSpill);
          
      }
  

}

function draw(){
    background("white");
    if(playerCount===4){
        game.update(1);
    }
    if(gameState===1){
        clear();
        game.play();
    }
    if(carsAtEnd===4){
        game.update(2);
    }
   if(gameState===2){
       game.displayRank();
   }
}
