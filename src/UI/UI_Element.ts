import { Color } from "../ImageUtils";
import { Rectangle } from "../Maths";



//Do it all(except text. The text class is below this one) class for ui 
export class UI_Element{

    rect:Rectangle;
    text:string;
    textSize:number;
    textColor:Color;
    image:HTMLImageElement;
    elements:UI_Element[];

    
    constructor(rect:Rectangle, image?:HTMLImageElement, elements?:UI_Element[]){
        this.rect = rect;	
        
        if(image != undefined)
            this.image = image;

        if(elements != undefined)
            this.elements = elements;
        
    }
    

    draw(context:CanvasRenderingContext2D , parentRect?:Rectangle){
        let drawRect = this.rect;
        if(parentRect != undefined){
            let pos = this.rect.position.add(parentRect.position);
            drawRect = new Rectangle(pos.x, pos.y, this.rect.width, this.rect.height);
        }

        if(this.image != undefined)
            this.drawImage(context, drawRect);

        if(this.text != undefined)
            this.drawText(context, drawRect);

        if(this.elements != undefined){
            this.elements.forEach(element => {
                element.draw(context, drawRect);
            });
        }
    }

    private drawImage(context:CanvasRenderingContext2D, drawRect:Rectangle){
        context.drawImage(this.image, this.rect.top, this.rect.left, this.rect.width, this.rect.height);
    }

    /** Draws text  */
    private drawText(context:CanvasRenderingContext2D, drawRect:Rectangle){
        context.fillStyle = this.textColor.toHex();
        context.fillText(this.text, this.rect.top, this.rect.left);
    }
}




export class UI_TextElement extends UI_Element{

    constructor(rect:Rectangle, )
    
    setText(text:string, textSize:number, textColor:Color):void{
        this.text = text;
        this.textSize = textSize;
        this.textColor = textColor;
    }


}