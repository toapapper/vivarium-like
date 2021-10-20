import { Rectangle, Vector2 } from "./Maths.js";
import { Color, TintImage } from "./ImageUtils.js";
import { Camera } from "./Camera.js";

export class Creature{//Placeholder än så länge
    rect: Rectangle;
    sprite: HTMLImageElement;

    constructor(position: Vector2, img: HTMLImageElement, tint:Color){
        this.rect = new Rectangle(position.x, position.y, 1, 1);
        this.sprite = TintImage(img, tint);
    }

    draw(camera:Camera){
        camera.DrawImage(this.sprite, this.rect);
    }

}