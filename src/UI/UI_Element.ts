import { Color } from "../ImageUtils.js";
import { Rectangle, Vector2 } from "../Maths.js";

export class UI_Image{
    rect:Rectangle;
    image:HTMLImageElement;
    
    constructor(rect:Rectangle, image?:HTMLImageElement){
        this.rect = rect;	
        
        if(image != undefined)
            this.image = image;
    }
    
    draw(context:CanvasRenderingContext2D){
        context.drawImage(this.image, this.rect.top, this.rect.left, this.rect.width, this.rect.height);
    }
}


//The font is hard coded as Arial at the moment. Might be good to have some kind of engine-settings file where that can be changed
export class UI_Text{
    text:string;
    fontSize:number;
    color:Color;
    position:Vector2;

    constructor(text:string, fontSize:number, color:Color, position:Vector2){
        this.text = text;
        this.fontSize = fontSize;
        this.color = color;
        this.position = position;
    }
    
    draw(context:CanvasRenderingContext2D):void{

        context.font = this.fontSize + "px Arial";
        context.fillStyle = this.color.toHex();
        context.fillText(this.text, this.position.x, this.position.y);
    }

}