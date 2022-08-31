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
    viewport: Rectangle = new Rectangle(0, 0, 100, 100);
    context: CanvasRenderingContext2D;
    readonly canvas:Rectangle;

    private drawCalls:DrawCall[];

    backgroundColor:Color = Color.black;

    /** the pixel size of one unit */
    get scale():number {
        if(this.viewport.width > this.viewport.height){
            return this.canvas.width / this.viewport.width;
        }
        else{
            return this.canvas.height / this.viewport.height;
        }
    }

    //canvas is assumed to be square
    constructor(context:CanvasRenderingContext2D, canvas:Rectangle){
        this.context = context;
        this.canvas = canvas;
        this.drawCalls = [];
        this.viewport.position = position;

        Camera.main = this;
    }

    DrawImage(img: CanvasImageSource, rect: Rectangle){
        //if they dont intersect it wont be visible anyway
        if(this.viewport.containsRect(rect)){
            this.drawCalls.push({img, rect});
        }
    }

    //clears screen and draws all drawcalls
    Render(){
        this.context.fillStyle = this.backgroundColor.toHex();
        this.context.fillRect(this.canvas.left, this.canvas.top, this.canvas.width, this.canvas.height);

        let _this = this;
        this.drawCalls.forEach(function(drawCall:DrawCall){
            drawCall.rect = _this.WorldToViewportRect(drawCall.rect);
            _this.context.drawImage(drawCall.img, drawCall.rect.left + _this.canvas.left, drawCall.rect.top + _this.canvas.top, drawCall.rect.width, drawCall.rect.height);
        });

        this.drawCalls = [];
    }

    Move(towards:Vector2){
        this.viewport.position = this.viewport.position.add(towards);
    }

    /** Positive numbers zoom closer */
    Zoom(amount:number){
        if((this.viewport.size.x <= 10 || this.viewport.size.y <= 10) && amount > 0){ //limit zoom
            return;
        }

        this.viewport.size = new Vector2(this.viewport.width - amount, this.viewport.height - amount);
    }

    WorldToViewportRect(rect: Rectangle): Rectangle{
        let outRect: Rectangle = new Rectangle(0,0,0,0);

        outRect.position = this.WorldToViewportPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);

        return outRect;
    }

    /** world to pixel viewport position */
    WorldToViewportPoint(vector: Vector2): Vector2{
        let outVector = vector.subtract(this.viewport.position);
        outVector = outVector.multiply(this.scale);
        outVector = outVector.add(this.canvas.size.divide(2));

        return outVector;
    }

    /**
     *
     * @param viewPortPoint Given in pixels
     */
    ViewportToWorldPoint(viewportPoint: Vector2): Vector2{
        let outVector = viewportPoint.subtract(this.canvas.size.divide(2));
        //outVector = viewportPoint.multiply(this.viewport.x / this.resolution.x);
        outVector = outVector.divide(this.scale);
        outVector = outVector.add(this.viewport.position);

        return outVector;
    }
}
