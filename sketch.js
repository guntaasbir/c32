const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
//to create the global variable for scoring
var score=0;


function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    //to change the backgroundImg depending on the time 
    getTimeZone();


}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    //to score when pig1 is becoming invisible
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    //to score when pig1 is becoming invisible
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();   
    
    //to display the score on the screen
    textSize(30);
    text("Score: "+score, 1000,100)
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
 slingshot.attach(bird.body);
    }
}

//to create a new function called getTimeZone

//while declaring the function we have to tell the computer about the wait -- by making teh function asynchronous (async)
async function getTimeZone(){

    //we have to ask the computer to wait bacause we are getting the response 
    //from a different source which is not in our system 
    // await keyword will ask the computer to wait at that point till it gets a value
    var response = await fetch("http://worldtimeapi.org/api/timezone/MST"); //fetch will call the API and get the response


    //to get the json data out of the response
    var responseJson = await response.json()
    //date and time
    var datedata = responseJson.datetime;

    //to get the hour data
    var hr = datedata.slice(11,13);

    console.log(hr);

    //checking if the hr is between 5 am and 5 pm --->daytime image
    if(hr >5 && hr<17){
        backgroundImg = loadImage("sprites/bg.png");
    }
    else //show the nighttime image
    {
        backgroundImg = loadImage("sprites/bg2.jpg");
    }
}