class Form{
    constructor(){
        this.input = createInput('NAME');
        this.button = createButton("PLAY");
        this.greeting = createElement('h2');
        this.reset = createButton("reset database");


    }
    hide(){
        this.greeting.hide();
        this.input.hide();
        this.button.hide();
    }
    display(){
        var title = createElement('h1');
        title.html("Car Racing Game");
        title.position((displayWidth/2)-50,0);

        
        this.input.position(displayWidth/2-50,displayHeight/2-50);

       
       this.button.position(displayWidth/2-40,displayHeight/2-20);
       this.reset.position(displayWidth-200,100);

        
        
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name =   this.input.value();
            playerCount+= 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            this.greeting.html("Hello " +  player.name);
            this.greeting.position(displayWidth/2-50,displayHeight/3-50);
        })
        this.reset.mousePressed(()=>{
            game.update(0);
            player.updateCount(0);
            var removePlayer = database.ref('players');
            removePlayer.remove();


        })
    }
}