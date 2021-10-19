import { Vector2, Rectangle } from "./Maths.js";

export class Camera{

    /** one in game tile is dimensioned one by one, the size is how many tiles fit into the viewport at one time  */
    viewPort: Rectangle = new Rectangle(0, 0, 25, 25);
    context: CanvasRenderingContext2D;
    readonly resolution: Vector2;

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
    }

    DrawImage(img: CanvasImageSource, rect: Rectangle){
        rect = this.WorldToViewPortRect(rect);

        //if they dont intersect it wont be visible anyway
        if(rect.intersects(this.viewPort)){
            this.context.drawImage(img, rect.left - this.viewPort.x, rect.top - this.viewPort.y, rect.width, rect.height);
        }
    }

    WorldToViewPortRect(rect: Rectangle): Rectangle{
        let outRect: Rectangle = new Rectangle(0,0,0,0);

        outRect.position = this.WorldToViewPortPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);

        return outRect;
    }

    WorldToViewPortPoint(vector: Vector2): Vector2{
        let outVector = vector.subtract(this.viewPort.topLeft);
        outVector = outVector.multiply(this.scale);
        return outVector;
    }

}