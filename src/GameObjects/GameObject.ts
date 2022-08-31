import { Camera } from "../Camera.js";
import { Rectangle, Vector2 } from "../Maths.js";

let appleSprite = new Image();
appleSprite.src = "../sprites/apple.png";

let corpseSprite = new Image();
corpseSprite.src = "../sprites/corpse.png";

//This is a file containing the base gameObject class and some simpler gameObject-classes(tree, apple)

export class GameObject{

    sprite:CanvasImageSource;
    rect:Rectangle;

    get position():Vector2{
        return this.rect.position;
    }
    set position(pos:Vector2){
        this.rect.position = pos;
    }

    constructor(position:Vector2){
        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }

    //Happens on ticks. Game preset is 16 ticks per second
    Update(): void{}

    Draw(camera:Camera): void{
        if(this.sprite != undefined){
            camera.DrawImage(this.sprite, this.rect);
        }
    }
}

//antingen äpple eller lik
export class Edible extends GameObject{
    private isAnApple:boolean = true;
    isCorpse():boolean{
        return !this.isAnApple;
    }
    isApple():boolean{
        return this.isAnApple;
    }

    nutrition:number;
    decay:number;//number of ticks until this edible dissapears

    constructor(position:Vector2, isApple:boolean, nutrition:number, decay:number){
        super(position);
        this.isAnApple = isApple;
        this.nutrition = nutrition;
        this.decay = decay;

        this.sprite = isApple ? appleSprite : corpseSprite;
    }

    takeBite(biteSize:number):number{
        this.nutrition -= biteSize;
        if(this.nutrition <= 0){
            return this.nutrition + biteSize;
        }
        else{
            return biteSize;
        }
    }

    Draw(camera:Camera):void {
        if(this.nutrition > 0){
            super.Draw(camera);
        }
    }
}


