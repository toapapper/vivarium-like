import { Rectangle, Vector2 } from "./Maths.js";
import { Color, TintImage } from "./ImageUtils.js";
import { Camera } from "./Camera.js";
import { GameObject } from "./GameObject.js";

export class Creature extends GameObject{//Placeholder än så länge
    
    constructor(position:Vector2, sprite:HTMLImageElement, tint:Color){
        super(position);
        this.sprite = TintImage(sprite, tint);

    }

}