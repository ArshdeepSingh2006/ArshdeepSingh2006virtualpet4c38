//Create variables here
var dog, dogImg1, happyDogImg, database, foodS, foodStock, readStock;
var foodObj, feedTime, lastFed, feed, addFoods, feedDog;
var bedroomImg, gardenImg, washroomImg, garden, gameState;
var milkBottle2, lazyImg, milk;

function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydogImg.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  lazyImg = loadImage("images/Lazy.png");
  livingroomImg = loadImage("images/Living Room.png");
  milk = loadImage("images/Milk.png")
}

function setup() {
	createCanvas(550, 650);
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);
  //read gameState from database
  
  milkBottle2 = createSprite(100,450,120,40);
  milkBottle2.addImage(milk);
  milkBottle2.scale = 0.1;

  dog = createSprite(280,280,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  
}


function draw() { 
  background("green");
  
  foodObj.display();
  writeStock(foodS);

  if(foodS == 0){
    dog.addImage(happyDogImg);
    milkBottle2.visible = false;
  }else{
    dog.addImage(lazyImg);
    milkBottle2.visible = true;
  }
 

//gameState 1
if(gameState===1){
  dog.addImage(happyDogImg);
  dog.scale = 0.175;
  dog.y =250;
}

//gameState 2
if(gameState===2){
  dog.addImage(lazyImg);
  dog.scale = 0.175;
  milkBottle2.visible = true;
  dog.y =250;
}

//gameState 3
var Bath = createButton("I want to take bath");
Bath.position(595,125);
if(Bath.mousePressed(function(){
  gameState = 3;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===3){
  dog.addImage(washroomImg);
  dog.scale = 1;
  milkBottle2.visible = true;
}

//gameState 4
var Sleep = createButton("I am very sleepy");
Sleep.position(730,125);
if(Sleep.mousePressed(function(){
  gameState = 4;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===4){
  dog.addImage(bedroomImg);
  dog.scale = 1;
  milkBottle2.visible = true;
}

// gameState 5 
var Play = createButton("Lets play !");
Play.position(500,160);
if(Play.mousePressed(function(){
  gameState = 5;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===5){
  dog.addImage(livingroomImg);
  dog.scale = 1;
  milkBottle2.visible = true;
}

// gameState 6 
var PlayInGarden = createButton("Lets play in park");
PlayInGarden.position(585,160);
if(PlayInGarden.mousePressed(function(){
  gameState = 6;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===6){
  dog.y=175;
  dog.addImage(gardenImg);
  dog.scale = 1;
  milkBottle2.visible = true;
}



fill(225,225,254);
textSize(20);
text("MilkBottle Remaining: " +foodS,130,460);

  drawSprites();
  //add styles here
  }



function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){
database.ref('/').update({
  food:x
})
}


//function in update gamestates in database
function update(state){
  database.ref('/').update({
    gameState: state
  });
}