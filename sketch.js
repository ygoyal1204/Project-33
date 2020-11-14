var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var divisionHeight=300;
var score =0;
var turn =0;

var gameState = "start";

function setup() {
  createCanvas(800, 900);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

    for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,475));
    }
}
 


function draw() {
  background("black");
  textSize(20)
  fill("orange");
  textSize(25);
  text("Score : "+score,30,130);
  text("No. of Turns Played: "+turn, 520, 130);
  textSize(35)
  fill("white");
  text(" 500 ", 2, 645);
  text(" 500 ", 81, 645);
  text(" 500 ", 161, 645);
  text(" 500 ", 241, 645);
  text(" 100 ", 320, 645);
  text(" 100 ", 400, 645);
  text(" 100 ", 480, 645);
  text(" 200 ", 561, 645);
  text(" 200 ", 642, 645);
  text(" 200 ", 722, 645);
  push();
  fill("lightgreen");
  textAlign(CENTER);
  text("PLINKO WITH SCORES", 400, 40);
  fill("skyblue");
  textSize(23);
  text("Click anywhere to continue! You have only 5 turns till the game is over!", 400, 75);
  textSize(25);
  fill("pink");
  text(" SCORE YOUR BEST! ", 400, 545);
  pop();

  push();
  stroke("yellow");
  strokeWeight(5);
  line(0, 570, 800, 570);
  //line(557, 580, 558, 580);
  //line(319, 580, 320, 580);
  pop();

  Engine.update(engine);

  ground.display();

   if(particle!=null){  
     particle.display();

     if(particle.body.position.y>760){

       if(particle.body.position.x<319){
         score = score + 500;
         particle=null;

         if (turn===5){ 
           gameState ="end";
        }
       }

       else if(particle.body.position.x<557 && particle.body.position.x > 320){
         score = score + 100;
          particle = null;

          if(turn===5){
            gameState ="end";
          }
       }

       else if(particle.body.position.x < 900 && particle.body.position.x > 558){
         score = score + 200;
         particle=null;

         if(turn===5){
           gameState = "end";
         }
       }
     }
   }

   for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(gameState === "end"){
    textSize(80);
    fill("red");
    //textAlign(CENTER);
    text("GAME OVER!", 150, 350);
  }
}
  

function mousePressed(){
  if(gameState!=="end"){
    turn++;
    particle = new Particle(mouseX, 10, 10);
  }
}