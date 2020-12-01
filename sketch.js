//Create variables here
var dog,happyDog,database,foodS,foodStock
var foodobj,fedTime,lastFed,feedDog,addFood,food
var foodStock,lastFed
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png")
  dogImg1 = loadImage("dogImg1.png")
 
}

function setup() {
  createCanvas(600, 600);
  database=firebase.database()
  var food = new Food()
  dog = createSprite(200,300)
  dog.addImage(dogImg)
 dog.scale =0.1
 
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  feed = createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFood)
}


function draw() {  
background(46,139,87)

fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed = data.val()
})


fill(255,255,254)
textSize(15)
if(lastFed>=12){
    text("LastFeed :"+lastFed%12 +"PM",350,30)
}else if(lastFed===0){
    text("last Feed : 12 AM",350,30)
}else{
    text("last Feed :"+ lastFed + "AM",350,30)
}


}


function feedDog(){
  dog.addImage(dogImg1)

  food.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  
    if(x<=0){
      x=0
    }else{
      x=x-1
    }
    database.ref('/').update({
    Food:x
  })
}

