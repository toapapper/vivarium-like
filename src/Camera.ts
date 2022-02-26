import { Vector2, Rectangle } from "./Maths.js";
import { Color } from "./ImageUtils.js";

type DrawCall = {
    img: CanvasImageSource,
    rect: Rectangle
};

/*
*   TODO:
    Gör mer effektiv, om inte animering ska vara en större och konstantare del av det visuella,
    genom att dela ut drawcall-ids och sedan tar jag inte bort de olika drawcalls om inte det förfrågas
    kan däremot ändra dem.
    på så sätt behöver jag inte lägga till de permanenta sakerna hela tiden. och det som ska animeras kan ändå.

    Ha ett system där man bara lägger till saker här som man vill ska ritas sen går den igenom dem och ritar dem i uppdate.
*/


export class Camera{
    /** Singleton instance of the camera. as of yet no need for more than one per game. */
    static main:Camera;

    /** one in game tile is dimensioned one by one, the size is how many tiles fit into the viewport at one time  */
    private viewport: Rectangle = new Rectangle(0, 0, 100, 100);
    private context: CanvasRenderingContext2D;
    private resolution: Vector2;
    
    private get scale():number{//essentially pixels per tile in the viewport
        return this.resolution.x / this.viewport.width;
    }

    private drawCalls:DrawCall[];

    backgroundColor:Color = Color.fromHex("#4d92d0");
    
    
    set setResolution(value: Vector2){
        //not implemented, change the viewport if the resolution does not change uniformly, implement set scale to accomplish resoultion change without scale change
    }

    constructor(context: CanvasRenderingContext2D, resolution: Vector2, position: Vector2){
        this.context = context;
        this.resolution = resolution;
        this.drawCalls = [];
        this.viewport.position = position;

        Camera.main = this;
    }

    DrawImage(img: CanvasImageSource, rect: Rectangle){
        //if they dont intersect it wont be visible anyway
        if(rect.intersects(this.viewport)){
            this.drawCalls.push({img, rect});
        }
    }

    //clears screen and draws all drawcalls, should optimize the whole system of adding things to a draw-list
    Update(){
        this.context.fillStyle = this.backgroundColor.toHex();
        this.context.fillRect(0,0,this.resolution.x, this.resolution.y);

        let _this = this;
        this.drawCalls.forEach(function(drawCall:DrawCall){
            drawCall.rect = _this.WorldToViewportRect(drawCall.rect);
            _this.context.drawImage(drawCall.img, drawCall.rect.left, drawCall.rect.top, drawCall.rect.width, drawCall.rect.height);
        });

        this.drawCalls = [];
    }

    Move(towards:Vector2){
        this.viewport.position = this.viewport.position.add(towards);
    }

    /** Positive numbers zoom closer */
    Zoom(amount:number){
        if((this.viewport.size.x <= 10 || this.viewport.size.y <= 10) && amount > 0){  //threshold values
            return;
        }
        
        let ratio:number = this.resolution.y/this.resolution.x;
        this.viewport.size = new Vector2(this.viewport.width - amount, this.viewport.height - amount * ratio);
    }

    WorldToViewportRect(rect: Rectangle): Rectangle{
        let outRect: Rectangle = new Rectangle(0,0,0,0);

        outRect.position = this.WorldToViewportPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);

        return outRect;
    }

    /** world to pixel viewport position */
    WorldToViewportPoint(vector: Vector2): Vector2{
        let outVector = vector.subtract(this.viewport.position);//transform
        outVector = outVector.multiply(this.scale);//scale
        outVector = outVector.add(this.resolution.divide(2));//offset so 0,0 is in the middle of the screen

        return outVector;
    }

    /**
     * 
     * @param viewPortPoint Given in pixels
     */
    ViewportToWorldPoint(viewportPoint: Vector2): Vector2{
        let outVector = viewportPoint.subtract(this.resolution.divide(2));
        outVector = outVector.multiply(1/this.scale);
        outVector = outVector.add(this.viewport.position);

        return outVector;
    }
}