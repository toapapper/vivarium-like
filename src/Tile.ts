import { Vector2, Rectangle } from "./Maths.js";
import { Camera } from "./Camera.js";


let grassImg:HTMLImageElement = new Image();
grassImg.src = "./sprites/grass_tile.png";
let waterImg:HTMLImageElement = new Image();
waterImg.src = "./sprites/water_tile.png";
let mountainImg:HTMLImageElement = new Image();
mountainImg.src = "./sprites/mountain_tile.png";


export type TileType = "grass"|"water"|"mountain";

export class Tile{
    rect:Rectangle;
    imgPointer:HTMLImageElement;
    
    occupied:boolean = false;
    highlighted:boolean = false;

    constructor(position:Vector2, type:TileType){
        switch(type){
            case "grass":
                this.imgPointer = grassImg;
                break;
            case "water":
                this.imgPointer = waterImg;
                break;
            case "mountain":
                this.imgPointer = mountainImg;
                break;
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