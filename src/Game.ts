import { Camera } from "./Camera.js";
import { Vector2, Rectangle } from "./Maths.js";
import { Color, TintImage } from "./ImageUtils.js"
import { Creature, Species, FoodType, Attributes } from "./GameObjects/Creature.js";
import { World } from "./World.js";
import { NoiseMapGenerator } from "./Noise.js";
import { Tile } from "./Tile.js";

let canvas: HTMLCanvasElement = document.getElementById("GameCanvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");

let camera = new Camera(context, new Rectangle(400, 400, 800, 800));

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
camera.viewport.position = world.size.multiply(.5);



let TickInterval:number = 16;

setInterval(function(){
    world.Draw(camera);
    world.Update();
    camera.Render();
}, TickInterval);


document.addEventListener("click", function(event:MouseEvent){
    
    let clickPos:Vector2 = new Vector2(event.x - canvas.getBoundingClientRect().left, event.y - canvas.getBoundingClientRect().top);
    let wPos = Camera.main.ViewportToWorldPoint(clickPos);
    
    console.log(clickPos);
    console.log(wPos);

    let tile:Tile = World.Instance.GetTileAt(Camera.main.ViewportToWorldPoint(clickPos));
    if(tile != undefined){

        let testCreature = new Creature(tile.position, testSpecies, new Attributes(10,10,2,10));
        world.SpawnGameObject(testCreature.position, testCreature);
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