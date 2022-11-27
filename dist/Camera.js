import { Vector2, Rectangle } from "./Maths.js";
import { Color } from "./ImageUtils.js";
/*
*   TODO:
    Gör mer effektiv, om inte animering ska vara en större och konstantare del av det visuella,
    genom att dela ut drawcall-ids och sedan tar jag inte bort de olika drawcalls om inte det förfrågas
    kan däremot ändra dem.
    på så sätt behöver jag inte lägga till de permanenta sakerna hela tiden. och det som ska animeras kan ändå.

    Ha ett system där man bara lägger till saker här som man vill ska ritas sen går den igenom dem och ritar dem i uppdate.
*/
export class Camera {
    //canvas is assumed to be square
    constructor(context, canvas) {
        /** one in game tile is dimensioned one by one, the size is how many tiles fit into the viewport at one time  */
        this.viewport = new Rectangle(0, 0, 100, 100);
        this.backgroundColor = Color.black;
        this.context = context;
        this.canvas = canvas;
        this.drawCalls = [];
        this.viewport.position = Vector2.zero;
        Camera.main = this;
    }
    /** the pixel size of one unit */
    get scale() {
        if (this.viewport.width > this.viewport.height) {
            return this.canvas.width / this.viewport.width;
        }
        else {
            return this.canvas.height / this.viewport.height;
        }
    }
    DrawImage(img, rect) {
        //if they dont intersect it wont be visible anyway
        if (this.viewport.containsRect(rect)) {
            this.drawCalls.push({ img, rect });
        }
    }
    //clears screen and draws all drawcalls
    Render() {
        this.context.fillStyle = this.backgroundColor.toHex();
        this.context.fillRect(this.canvas.left, this.canvas.top, this.canvas.width, this.canvas.height);
        let _this = this;
        this.drawCalls.forEach(function (drawCall) {
            drawCall.rect = _this.WorldToViewportRect(drawCall.rect);
            _this.context.drawImage(drawCall.img, drawCall.rect.left, drawCall.rect.top, drawCall.rect.width, drawCall.rect.height);
        });
        this.drawCalls = [];
    }
    Move(towards) {
        this.viewport.position = this.viewport.position.add(towards);
    }
    /** Positive numbers zoom closer */
    Zoom(amount) {
        if ((this.viewport.size.x <= 10 || this.viewport.size.y <= 10) && amount > 0) { //limit zoom
            return;
        }
        this.viewport.size = new Vector2(this.viewport.width - amount, this.viewport.height - amount);
    }
    WorldToViewportRect(rect) {
        let outRect = new Rectangle(0, 0, 0, 0);
        outRect.position = this.WorldToViewportPoint(rect.position);
        outRect.size = rect.size.multiply(this.scale);
        outRect.position = outRect.position.add(this.canvas.topLeft);
        return outRect;
    }
    /** world to pixel viewport position */
    WorldToViewportPoint(vector) {
        let outVector = vector.subtract(this.viewport.position);
        outVector = outVector.multiply(this.scale);
        outVector = outVector.add(this.canvas.size.divide(2));
        return outVector;
    }
    /**
     *
     * @param viewPortPoint Given in pixels
     */
    ViewportToWorldPoint(viewportPoint) {
        let outVector = viewportPoint.subtract(this.canvas.size.divide(2));
        outVector = outVector.subtract(this.canvas.topLeft);
        outVector = outVector.divide(this.scale);
        outVector = outVector.add(this.viewport.position);
        return outVector;
    }
}
//# sourceMappingURL=Camera.js.map