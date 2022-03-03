import { Camera } from "./Camera.js";
import { Rectangle, Vector2 } from "./Maths.js";
import { Color, ColorWhites } from "./ImageUtils.js"
import { Creature } from "./Creature.js";
import { World } from "./World.js";
import { NoiseMapGenerator } from "./Noise.js";

let canvas: HTMLCanvasElement = document.getElementById("GameCanvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");

let camera = new Camera(context, new Vector2(canvas.width, canvas.height), Vector2.zero);

context.fillStyle = "#4d92d0";
context.imageSmoothingEnabled = false;
context.fillRect(0,0, canvas.width, canvas.height);


let tintedImg = new Image();
let testImg = new Image();
testImg.src = "./sprites/bear.png";

let testCreature:Creature;
let testCreature2:Creature;

testImg.onload = function(){
    testCreature = new Creature(new Vector2(3, -5), testImg, new Color(0,255,0));
    testCreature2 = new Creature(new Vector2(-3, 4), testImg, new Color(255,0,0));
}

let world:World = new World(new Vector2(100,100));
world.GenerateNew();
camera.Move(world.size.multiply(.5));

setInterval(function(){
    world.Draw(camera);
    testCreature.Draw(camera);
    testCreature2.Draw(camera);
    camera.Update();
}, 16);

// let mapGen:NoiseMapGenerator = new NoiseMapGenerator();
//mapGen.setNoiseSeed("hej");

// let mapSize = new Vector2(100,100);
// let genRect = new Rectangle(0,0,1,1);
// let waterLevel = -.2;

// drawMap();

// function drawMap(){
//     mapGen.ResetCurrentMap();
//     mapGen.GenerateNoiseMap(genRect, mapSize);
//     // mapGen.GenerateNoiseMap(new Rectangle(genRect.x, genRect.y, genRect.size.x * 2, genRect.size.y * 2), mapSize);
//     // mapGen.GenerateNoiseMap(new Rectangle(genRect.x, genRect.y, genRect.size.x * 2, genRect.size.y * 2), mapSize);
//     mapGen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 2, genRect.width * 2), mapSize);
//     mapGen.SinkEdges();
//     mapGen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 4, genRect.width * 4), mapSize);
//     mapGen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 6, genRect.width * 6), mapSize);
//     mapGen.NormalizeMap();
//     mapGen.GenerateBlueNoiseDots(genRect, waterLevel, 1, 4);
//     // mapGen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 6, genRect.width * 6), mapSize);
//     // mapGen.GenerateNoiseMap(genRect, mapSize);
//     // mapGen.GenerateNoiseMap(new Rectangle(genRect.x, genRect.y, genRect.size.x * 2, genRect.size.y * 2), mapSize);
//     mapGen.DrawCurrentMap(context, new Vector2(800,800), waterLevel);
// }

document.addEventListener("click", function(event:MouseEvent){
    
    let clickPos:Vector2 = new Vector2(event.x - canvas.getBoundingClientRect().left, event.y - canvas.getBoundingClientRect().top);
    let wPos = Camera.main.ViewportToWorldPoint(clickPos);
    
    console.log(clickPos);
    console.log(wPos);

    world.GetTileAt(Camera.main.ViewportToWorldPoint(clickPos)).highlighted = true;
});

document.addEventListener("keydown", function(event:KeyboardEvent){
    if(event.key === "a"){
        camera.Move(Vector2.left.multiply(1.5));
        // genRect.position = new Vector2(genRect.position.x - genRect.size.x/20, genRect.position.y);
    }
    else if(event.key === "d"){
        camera.Move(Vector2.right.multiply(1.5));
        // genRect.position = new Vector2(genRect.position.x + genRect.size.x/20, genRect.position.y);
    }
    else if(event.key === "w"){
        camera.Move(Vector2.up.multiply(1.5));
        // genRect.position = new Vector2(genRect.position.x, genRect.position.y - genRect.size.y/20);
    }
    else if(event.key === "s"){
        camera.Move(Vector2.down.multiply(1.5));
        // genRect.position = new Vector2(genRect.position.x, genRect.position.y + genRect.size.y/20);
    }
    else if(event.key === "z"){
        camera.Zoom(2);
        // genRect.size = genRect.size.multiply(.9);
    }
    else if(event.key === "x"){
        camera.Zoom(-2);
        // genRect.size = genRect.size.multiply(1.1);
    }
    // else if(event.key === "c"){
    //     mapSize = mapSize.multiply(0.9);
    // }
    // else if(event.key === "v"){
    //     mapSize = mapSize.multiply(1.1);
    // }
    // else if(event.key === "b"){
    //     waterLevel += .1;
    // }
    // else if(event.key === "n"){
    //     waterLevel -= .1;
    // }

    //drawMap();
    world.Draw(camera);
    testCreature.Draw(camera);
    testCreature2.Draw(camera);
    camera.Update();
})