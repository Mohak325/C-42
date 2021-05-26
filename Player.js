class Player{
    constructor(){
        this.name = null;
        this.distance = 0;
        this.index = null;
        this.place = 0;
        this.xpos = 0; 

    }
    
getCount(){
    var countRef = database.ref('playerCount');
    countRef.on("value",function(data){
        playerCount = data.val();
    })

}
updateCount(count){
    database.ref('/').update({
        playerCount : count
    })

}
update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
        name : this.name,
        distance : this.distance,
        place : this.place,
        xpos : this.xpos
    })
}
static playerInfo(){
    var playerRef = database.ref('players');
    playerRef.on("value",(data)=>{
        allPlayers = data.val();
    })
}
getCarsAtEnd(){
    var carRank = database.ref('carsAtEnd');
    carRank.on("value",(data)=>{
       carsAtEnd = data.val();
    })
}
static updateCarsAtEnd(){
    database.ref('/').update({
        carsAtEnd : carsAtEnd+1

    })
    this.place+=1;
        

    
}
}