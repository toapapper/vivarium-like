import { Vector2, Rectangle } from "./Maths.js";
import { Color } from "./ImageUtils.js";

type DrawCall = {
    img: CanvasImageSource,
    rect: Rectangle
};

export class Camera{

    /** one in game tile is dimensioned one by one, the size is how many tiles fit into the viewport at one time  */
    viewPort: Rectangle = new Rectangle(0, 0, 25, 25);
    context: CanvasRenderingContext2D;
    readonly resolution: Vector2;

    drawCalls:DrawCall[];

    backgroundColor:Color = Color.fromHex("#DAF7A6");
    
    /** the pixel size of one unit */
    get scale():number { 
        if(this.viewPort.width > this.viewPort.height){
            return this.resolution.x / this.viewPort.width; 
        }
        else{
            return this.resolution.y / this.viewPort.height;
        }
    }

    set setResolution(value: Vector2){
        //not implemented, change the viewport if the resolution does not change uniformly
    }

    constructor(context:CanvasRenderingContext2D, resolution: Vector2){
        this.context = context;
        this.resolution = resolution;
        this.drawCalls = [];
    }

    DrawImage(img: CanvasImageSource, rect: Rectangle){
        //if they dont intersect it wont be visible anyway
        if(rect.intersects(this.viewPort)){
            this.drawCalls.push({img, rect});
        }
    }

    //clears screen and draws all drawcalls
    Update(){
        this.context.fillStyle = this.backgroundColor.toHex();
        this.context.fillRect(0,0,this.resolution.x, this.resolution.y);

        let _this = this;
        this.drawCalls.forEach(function(drawCall:DrawCall){
            drawCall.rect = _this.WorldToViewPortRect(drawCall.rect);
            _this.context.drawImage(drawCall.img, drawCall.rect.left, drawCall.rect.top, drawCall.rect.width, drawCall.rect.height);
        });

        this.drawCalls = [];
    }

    Move(towards:Vector2){
        this.viewPort.position = this.viewPort.position.add(towards);
    }

    Zoom(amount:number){
        //Limit so you cant zoom close enough that your viewport size is 0,0
        if((this.viewPort.size.x <= 1 || this.viewPort.size.y <= 1) && Math.sign(amount) > 0){
            return;
        }
        
        let ratio:number = this.viewPort.height/this.viewPort.width;
        this.viewPort.size = new Vector2(this.viewPort.width - amount, this.viewPort.height - amount * ratio);
    }

    WorldToViewPortRect(rect: Rectangle): Rectangle{
        let outRect: Rectangle = new Rectangle(0,0,0,0);

        outRect.position = this.WorldToViewPortPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);

        return outRect;
    }

    /** world to pixel position */
    WorldToViewPortPoint(vector: Vector2): Vector2{
        let outVector = vector.subtract(this.viewPort.position);

        outVector = outVector.multiply(this.scale);
        outVector = outVector.add(this.resolution.divide(2));

        return outVector;
    }

    //Typ lägg till så den har en lista på saker som ska ritas och sedan ritar ut det i update eller så. Så att en bakgrundsfärg också snyggt kan finnas där i bakgrunden
}