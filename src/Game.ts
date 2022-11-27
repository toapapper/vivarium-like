import { Camera } from "./Camera.js";
import { Vector2, Rectangle } from "./Maths.js";
import { Color, ColorWhites } from "./ImageUtils.js"
import { Creature, Species, FoodType } from "./GameObjects/Creature.js";
import { Attributes } from "./GameObjects/Attributes.js"
import { World } from "./World.js";
import { Tile } from "./Tile.js";
import { UI_Manager } from "./UI/UI_Manager.js";

let canvas: HTMLCanvasElement = document.getElementById("GameCanvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");

let cameraRect:Rectangle = Rectangle.one;
cameraRect.size = new Vector2(800,800);
cameraRect.topLeft = new Vector2(0,0);
let camera = new Camera(context, cameraRect);

context.fillStyle = "#ffffff";
context.imageSmoothingEnabled = false;
context.fillRect(0,0, canvas.width, canvas.height);


//TESTSTUFF
let testImg = new Image();
let testSpecies:Species;
testImg.src = "./sprites/bear.png";
testImg.onload = function(){
    testSpecies = new Species("test1", Color.red, testImg, FoodType.herbivore, new Attributes(10, 10, 10, 10), 10);//temp
}


let world:World = new World(new Vector2(100,100));
world.GenerateNew();
camera.Move(world.size.multiply(.5));

let uiManager:UI_Manager = new UI_Manager();


let TickInterval:number = 100;

setInterval(function(){
    world.Draw(camera);
    //world.Update();
    camera.Render();
    uiManager.draw(context);
}, 16);

setInterval(function(){
    world.Update();
}, TickInterval)

document.addEventListener("click", function(event:MouseEvent){

    let clickPos:Vector2 = new Vector2(event.x - canvas.getBoundingClientRect().left, event.y - canvas.getBoundingClientRect().top);
    let wPos = Camera.main.ViewportToWorldPoint(clickPos);

    console.log(clickPos);
    console.log(wPos);

    let tile:Tile = World.Instance.GetTileAt(Camera.main.ViewportToWorldPoint(clickPos));
    if(tile != undefined){

        let testCreature = new Creature(tile.position, testSpecies, new Attributes(10,10,2,10));
        world.SpawnGameObject(testCreature.position, testCreature);
        uiManager.addCreature(testCreature);
    }

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
    World.Instance.Draw(camera);
    camera.Render();
})
