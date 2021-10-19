import { Rectangle } from "./Maths.js";
export class Camera {
    constructor(context, resolution) {
        /** one in game tile is dimensioned one by one, the size is how many tiles fit into the viewport at one time  */
        this.viewPort = new Rectangle(0, 0, 25, 25);
        this.context = context;
        this.resolution = resolution;
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
        rect = this.WorldToViewPortRect(rect);
        //if they dont intersect it wont be visible anyway
        if (rect.intersects(this.viewPort)) {
            this.context.drawImage(img, rect.left - this.viewPort.x, rect.top - this.viewPort.y, rect.width, rect.height);
        }
    }
    WorldToViewPortRect(rect) {
        let outRect = new Rectangle(0, 0, 0, 0);
        outRect.position = this.WorldToViewPortPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);
        return outRect;
    }
    WorldToViewPortPoint(vector) {
        let outVector = vector.subtract(this.viewPort.topLeft);
        outVector = outVector.multiply(this.scale);
        return outVector;
    }
}
//# sourceMappingURL=Camera.js.map