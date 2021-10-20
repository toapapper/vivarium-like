import { Camera } from "./Camera.js";
import { Rectangle, Vector2 } from "./Maths.js";
import { Color, TintImage } from "./ImageUtils.js"
import { Creature } from "./Creature.js";
import { World } from "./World.js";

let canvas: HTMLCanvasElement = document.getElementById("GameCanvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");

let camera = new Camera(context, new Vector2(canvas.width, canvas.height));

context.fillStyle = "#cc88cc";
context.imageSmoothingEnabled = false;
context.fillRect(0,0, canvas.width, canvas.height);


let tintedImg = new Image();
let testImg = new Image();
testImg.src = "./sprites/bear.png";

let testCreature:Creature = new Creature(new Vector2(3, -5), testImg, new Color(0,255,0));
let testCreature2:Creature = new Creature(new Vector2(-3, 4), testImg, new Color(255,0,0));

world:World = new World();//FIXA

setInterval(function(){
    testCreature.draw(camera);
    camera.Update();
}, 32);

document.addEventListener("keydown", function(event:KeyboardEvent){
    if(event.key === "a"){
        camera.Move(Vector2.left);
    }
    else if(event.key === "d"){
        camera.Move(Vector2.right);
    }
    else if(event.key === "w"){
        camera.Move(Vector2.up);
    }
    else if(event.key === "s"){
        camera.Move(Vector2.down);
    }
    else if(event.key === "z"){
        camera.Zoom(2);
    }
    else if(event.key === "x"){
        camera.Zoom(-2);
    }
})