import { Camera } from "./Camera.js";
import { Rectangle, Vector2 } from "./Maths.js";

let treeSprite = new Image();
treeSprite.src = "../sprites/tree.png";

let appleSprite = new Image();
appleSprite.src = "../sprites/apple.png";

//This is a file containing the base gameObject class and some simpler gameObject-classes(tree, apple)

export class GameObject{

    sprite:CanvasImageSource;
    rect:Rectangle;

    constructor(position:Vector2){
        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }

    Update(dt:number): void{

    }

    Draw(camera:Camera): void{
        if(this.sprite != undefined){
            camera.DrawImage(this.sprite, this.rect);
        }
    }
}

export class Tree extends GameObject{

    appleTimer:number = 0;
    appleTimerMin:number;
    appleTimerMax:number;


    constructor(position:Vector2, appleTimerMin:number, appleTimerMax:number){
        super(position);
        this.sprite = treeSprite;
        this.appleTimerMin = appleTimerMin;
        this.appleTimerMax = appleTimerMax;
        
    }

    ResetAppleTimer(){
        this.appleTimer = Math.random()
    }

    Update(dt:number): void{
        super.Update(dt);
    }
}