import { Rectangle } from "../Maths";

//Do it all class for ui
export class UI_Element{

    rect:Rectangle;
    text:string;
    image:HTMLImageElement;
    elements:UI_Element[];

    constructor(rect:Rectangle, text?:string, image?:HTMLImageElement, elements?:UI_Element[]){
        this.rect = rect;	
        
        if(text != undefined)
            this.text = text;

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

    private drawText(context:CanvasRenderingContext2D, drawRect:Rectangle){
        context.fillText(this.text, this.rect.top, this.rect.left)
    }
}