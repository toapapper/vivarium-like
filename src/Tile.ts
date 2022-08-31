import { Vector2, Rectangle } from "./Maths.js";
import { Camera } from "./Camera.js";
import { GameObject } from "./GameObjects/GameObject.js"


let grassImg:HTMLImageElement = new Image();
grassImg.src = "./sprites/grass_tile.png";
let waterImg:HTMLImageElement = new Image();
waterImg.src = "./sprites/water_tile.png";
let mountainImg:HTMLImageElement = new Image();
mountainImg.src = "./sprites/mountain_tile.png";


export class Tile{
    rect:Rectangle;
    imgPointer:HTMLImageElement;
    water:boolean;

    get position():Vector2{
        return this.rect.position;
    }
    
    occupied:boolean = false;
    occupiedBy:GameObject = null;
    highlighted:boolean = false;

    constructor(position:Vector2, water:boolean){
        this.water = water;

        if(water){
            this.imgPointer = waterImg;
        }
        else{
            this.imgPointer = grassImg;
        }

        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }

    Draw(camera:Camera){
        camera.DrawImage(this.imgPointer, this.rect);
        if(this.highlighted){
            camera.DrawImage(mountainImg, this.rect);
        }
    }

}