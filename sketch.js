const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,balloon, balloonImg;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  balloonImg = loadImage('balloon.png')

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(30,420);
  button.size(50,50);
  button.mouseClicked(drop);
  button2 = createImg('cut_btn.png')
  button2.position(200,300);
  button2.size(50,50);
  button2.mouseClicked(drop2);
 
  
  rope = new Rope(2,{x:75,y:420});
  rope2 = new Rope(3,{x:230,y:300});
  ground = new Ground(320,150,120,10);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(320,80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  balloon = createSprite(320, 420, 100, 100)
  balloon.addImage('balloon', balloonImg)
  balloon.scale = 0.03
  
  fruit = Bodies.circle(300,300,20);
 // Matter.Composite.add(rope.body,fruit);

  Matter.Composite.add(rope2.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  push();
  imageMode(CENTER);
  
  pop();

  rope.show();
  rope2.show()
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    fruit = null
  }
  if(collide(fruit,balloon)==true){
    airblow();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
     
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}
function drop2()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
function airblow(){
  Matter.Body.applyForce(fruit,{x:0, y:0},{x:0, y:-0.01})
}