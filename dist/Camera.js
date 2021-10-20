import { Rectangle } from "./Maths.js";
import { Color } from "./ImageUtils.js";
export class Camera {
    constructor(context, resolution) {
        /** one in game tile is dimensioned one by one, the size is how many tiles fit into the viewport at one time  */
        this.viewPort = new Rectangle(0, 0, 25, 25);
        this.backgroundColor = Color.fromHex("#DAF7A6");
        this.context = context;
        this.resolution = resolution;
        this.drawCalls = [];
    }
    /** the pixel size of one unit */
    get scale() {
        if (this.viewPort.width > this.viewPort.height) {
            return this.resolution.x / this.viewPort.width;
        }
        else {
            return this.resolution.y / this.viewPort.height;
        }
    }
    set setResolution(value) {
        //not implemented, change the viewport if the resolution does not change uniformly
    }
    DrawImage(img, rect) {
        //if they dont intersect it wont be visible anyway
        if (rect.intersects(this.viewPort)) {
            this.drawCalls.push({ img, rect });
        }
    }
    //clears screen and draws all drawcalls
    Update() {
        this.context.fillStyle = this.backgroundColor.toHex();
        this.context.fillRect(0, 0, this.resolution.x, this.resolution.y);
        let _this = this;
        this.drawCalls.forEach(function (drawCall) {
            drawCall.rect = _this.WorldToViewPortRect(drawCall.rect);
            _this.context.drawImage(drawCall.img, drawCall.rect.left, drawCall.rect.top, drawCall.rect.width, drawCall.rect.height);
        });
        this.drawCalls = [];
    }
    WorldToViewPortRect(rect) {
        let outRect = new Rectangle(0, 0, 0, 0);
        outRect.position = this.WorldToViewPortPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);
        return outRect;
    }
    /** world to pixel position */
    WorldToViewPortPoint(vector) {
        let outVector = vector.multiply(this.scale);
        outVector = outVector.add(this.resolution.divide(2));
        return outVector;
    }
}
//# sourceMappingURL=Camera.js.map