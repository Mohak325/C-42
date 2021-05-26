class Game{
constructor(){


}
getState(){
    var stateRef = database.ref('gameState');
    stateRef.on("value",function(data){
        gameState = data.val();
    })

}
update(state){
    database.ref('/').update({
        gameState : state
    })

}
async start(){
    if(gameState==0){
        player = new Player();
        var pcRef = await database.ref('playerCount').once("value");
        if(pcRef.exists()){
            playerCount = pcRef.val();
        player.getCount();
        }
        form = new Form();
        form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img);
    car3 = createSprite(500,200);
    car3.addImage(car3Img);
    car4 = createSprite(700,200);
    car4.addImage(car4Img);
    cars = [car1,car2,car3,car4];
    passedFinish = false;
}
play(){
    form.hide();
   
    Player.playerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
        background(groundImg);
        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
        var index = 0;
        var x = 175;
        var y;
        
        //var displayPosition = 130;
        
        for(var plr in allPlayers){
            index = index+1;
            x = 200+(index*200)+allPlayers[plr].xpos;
            y = displayHeight - allPlayers[plr].distance;
            cars[index-1].x = x;
            cars[index -1].y = y;

         if(index === player.index){
             fill("aqua");
              ellipse(x,y,60,60);
               camera.position.x = displayWidth/2;
               camera.position.y = cars[index-1].y;
               if(cars[index-1].isTouching(obstacles)){
                   yVel -= 0.9;
               }
         }
       
    }
    }
    if(player.distance<3800){
        if(keyIsDown(38)&&player.index !== null){
            yVel+= 0.5;
            if(keyIsDown(37)){
                xVel-= 0.2;
            }
            if(keyIsDown(39)){
                xVel+= 0.2;

            }
        }
        else if(keyIsDown(38)&&yVel>0&&player.index !== null){
            yVel-=0.1;
            xVel*=0.9;
        }
    }
   else if(passedFinish===false){
       Player.updateCarsAtEnd();
       player.place = carsAtEnd;
       player.update();
       passedFinish = true;
   }
   else{
       yVel*=0.8;
       xVel*=0.9;
   }
  

   player.distance+= yVel;
   yVel*=0.98;
   player.xpos+= xVel;
   xVel*= 0.98;
   player.update();
drawSprites();
}
displayRank(){
    background("white");
    camera.position.x = 0;
    camera.position.y = 0;
    imageMode(CENTER);
    Player.playerInfo();
    image(bronzeMedalImg,displayWidth/-4,-100+displayHeight/9,200,240);
    image(silverMedalImg,displayWidth/4,-100+displayHeight/10,225,270);
    image(goldMedalImg,0,-100,250,300);
    textSize(50);
    textAlign(CENTER);
    for(var plr in allPlayers){
        if(allPlayers[plr].place===1){
            text("First : " + allPlayers[plr].name,0,85);

        }
        else if(allPlayers[plr].place===2){
            text("Second :" + allPlayers[plr].name,displayWidth/4,displayHeight/9+73);

        }
        else if(allPlayers[plr].place===3){
            text("Third :" + allPlayers[plr].name,displayWidth/-4,displayHeight/10+76);

        }
        else{
            text("Honourable Mention : " + allPlayers[plr].name,0,225);
        }
    }
}
}