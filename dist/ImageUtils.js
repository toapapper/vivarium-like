//#region tintImage
let imgCanvas = document.createElement("canvas");
let imgCanvasContext = imgCanvas.getContext("2d");
/** values range between 0 and 255 */
export class Color {
    constructor(r, g, b, alpha = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
    }
    static get white() { return new Color(255, 255, 255); }
    static get black() { return new Color(0, 0, 0); }
    static get magenta() { return new Color(255, 0, 255); }
    static fromHex(hex) {
        let color = new Color(0, 0, 0);
        //copy pasted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        color.r = parseInt(result[1], 16);
        color.g = parseInt(result[2], 16);
        color.b = parseInt(result[3], 16);
        return color;
    }
    toHex() {
        //copy pasted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
    }
    /** if the array is invalid it returns magenta #ff00ff */
    static fromArray(array, startIndex = 0) {
        let color = new Color(0, 0, 0, 0);
        try {
            if (array.length < startIndex + 4) {
                throw "invalid array";
            }
            color.r = array[startIndex];
            color.g = array[startIndex + 1];
            color.b = array[startIndex + 2];
            color.alpha = array[startIndex + 3];
        }
        catch (error) {
            console.error(error);
            color = Color.magenta;
        }
        return color;
    }
    equals(other) {
        return other.r == this.r && other.g == this.g && other.b == this.b && other.alpha == this.alpha;
    }
}
/**
 * Tints every white non transparent pixel to @param color
 * @param image
 * @param color alpha will not be taken into account
 * @returns a tinted image
 */
export function TintImage(image, color) {
    imgCanvas.width = image.width;
    imgCanvas.height = image.height;
    imgCanvasContext.drawImage(image, 0, 0, image.width, image.height);
    let imgData = imgCanvasContext.getImageData(0, 0, image.width, image.height);
    console.log(imgData.data);
    for (let i = 0; i < imgData.data.length; i += 4) {
        console.log(imgData.data[i + 3]);
        if (imgData.data[i + 3] > 0) { //if not totally transparent
            console.log(imgData.data[i]);
            console.log(imgData.data[i + 1]);
            console.log(imgData.data[i + 2]);
            if (imgData.data[i] == 255 && imgData.data[i + 1] == 255 && imgData.data[i + 2] == 255) {
                console.log(color);
                imgData.data[i] = color.r;
                imgData.data[i + 1] = color.g;
                imgData.data[i + 2] = color.b;
            }
        }
    }
    imgCanvasContext.putImageData(imgData, 0, 0);
    let tintedImg = new Image();
    tintedImg.src = imgCanvas.toDataURL("image/png");
    return tintedImg;
}
//#endregion
//# sourceMappingURL=ImageUtils.js.map