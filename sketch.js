
var mario,marioImg;

var screen1,image1;

var ground;

var database;

var playerCountRef;

var marioCount;

var distance;

var  playerCountRef2;

var index_mario=0;
var index_luigi=0;

var contenido_chat;


function preload(){
marioImg=loadImage("mario.png");
image1=loadImage("image.jpeg");

}

function presiona_boton_mario()
{

  index_mario=1;
  index_luigi=0;

}
function presiona_boton_luigi()
{

  index_luigi=1;
  index_mario=0;

}

function salir()
{


}

function setup() {

  button = createButton('mario');
  button.position(150, 65);
  button.mousePressed(presiona_boton_mario);

  button2 = createButton('luigi');
  button2.position(200, 65);
  button2.mousePressed(presiona_boton_luigi);
  
  button3 = createButton('salir');
  button3.position(1200, 65);
  button3.mousePressed(presiona_boton_luigi);
  
  
  
  database=firebase.database();

  createCanvas(windowWidth,windowHeight);

  ground=createSprite(200,675,5000,20);
  ground.visible=false;

  mario=createSprite(15, windowHeight-200, 50, 50,);
  mario.addImage(marioImg);
  mario.scale=0.1;

  
    var ballonPositon=database.ref('players/Mario');
     ballonPositon.on("value",readPosition,showError);
  
}


function draw() {
      background(image1);

      textSize(50)
      text("Hola Papi",200,200);

      
      mario.collide(ground);

     /* playerCountRef2.on("value",(data)=>{
      marioCount = data.val();
      })*/
        
 
         if(keyDown(RIGHT_ARROW))
         {

          getMensajes();

          console.log("testing...");

          var xas = document.getElementById("id1").value;

          console.log("xas:"+xas);


          //var mensaje = document.getElementById("areabonita").value;

          
          

          

            mario.x+=5;

            console.log("alex bonito mario esta en x en:"+mario.x+ " y Y:"+mario.y);


            update();
          }

        if(keyDown(LEFT_ARROW))
          {

            mario.x-=5;


            update(-5,0)
           }


          if(keyDown("space") && mario.y >= 159) 
            {
              mario.velocityY = -12;
              update();
            }

            

  getMensajes();

  drawSprites();
}


function update(){
    database.ref('players/Mario').set({
      'x': mario.x ,
      'y': mario.y
    });
}
function readPosition(data){
  Mario =data.val();
  mario.x =Mario.x;
  mario.y =Mario.y;
}
function showError(){
  console.log("Hay un error ¡¡¡RESUELVELO!!!");
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}






function getMensajes(){

  var playerInfoRef = database.ref('mensajes');
    playerInfoRef.on("value",(data)=>{
      
      
          allPlayers = data.val();

          document.getElementById("id1").value ="";

          sleep(1000);

          for(var plr in allPlayers){

            var antiguo = document.getElementById("id1").value;

            document.getElementById("id1").value = antiguo + "\n" + allPlayers[plr];

            console.log(allPlayers[plr]);

          }

          

        
    })
  
}
