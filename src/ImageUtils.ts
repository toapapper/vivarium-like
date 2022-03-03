//#region tintImage
let imgCanvas: HTMLCanvasElement = document.createElement("canvas");
let imgCanvasContext: CanvasRenderingContext2D = imgCanvas.getContext("2d");

/** values range between 0 and 255 */
export class Color{
    static get white(): Color{ return new Color(255, 255, 255); }
    static get black(): Color{ return new Color(0,0,0); }
    static get magenta(): Color{ return new Color(255, 0, 255); }
    
    r: number;
    g: number;
    b: number;
    alpha: number;
    
    get h(): number{return 1;}//TODO: implement
    get s(): number{return 1;}
    get v(): number{return 1;}

    set h(value:number){}
    set s(value:number){}
    set v(value:number){}

    constructor(r: number, g: number, b: number, alpha: number = 255){
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
    }

    static fromHex(hex:string): Color{
        let color = new Color(0,0,0);
        
        //copy pasted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        color.r = parseInt(result[1], 16);
        color.g = parseInt(result[2], 16);
        color.b = parseInt(result[3], 16);

        return color;
    }

    toHex(): string{
        //copy pasted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
          }
          
        return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
    }

    WriteToArray(array:Uint8ClampedArray, index:number){
        if(array.length < index + 4){
            throw "invalid array";
        }

        array[index] = this.r;
        array[index + 1] = this.g;
        array[index + 2] = this.b;
        array[index + 3] = this.alpha;
    }

    /** if the array is invalid it returns magenta #ff00ff */
    static fromArray(array: Uint8ClampedArray, startIndex: number = 0): Color{
        let color: Color = new Color(0,0,0,0);

        try{
            if(array.length < startIndex + 4){
                throw "invalid array";
            }

            color.r = array[startIndex];
            color.g = array[startIndex + 1];
            color.b = array[startIndex + 2];
            color.alpha = array[startIndex + 3];
        }
        catch(error){
            console.error(error);
            color = Color.magenta;
        }

        return color;
    }

    equals(other: Color){
        return other.r == this.r && other.g == this.g && other.b == this.b && other.alpha == this.alpha;
    }
}

/**
 * Tints every white non transparent pixel to @param color
 * @param image 
 * @param color alpha will not be taken into account
 * @returns a tinted image
 */
export function ColorWhites(image:HTMLImageElement, color:Color): HTMLImageElement{
    imgCanvas.width = image.width;
    imgCanvas.height = image.height;

    imgCanvasContext.drawImage(image, 0, 0, image.width, image.height);
    let imgData = imgCanvasContext.getImageData(0,0, image.width, image.height);

    for(let i = 0; i < imgData.data.length; i += 4){
        if(imgData.data[i + 3] > 0){ //if not totally transparent
            if(imgData.data[i] == 255 && imgData.data[i+1] == 255 && imgData.data[i+2] == 255){
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

/**
 * Tints the whole image towards the color. Makes a copy of the pixel, changes hue and saturation to that of the color, and merges them based on strength.
 * @param image Image of which a tinted copy will be returned
 * @param color Target Color
 * @param strength How strong the tint is. 1 = max strength. 0 = min
 * @returns 
 */
export function TintSprite(image:HTMLImageElement, color:Color, strength:number): HTMLImageElement{

    //TODO: implementera.
    //Implementera också HSV i color
    
    return image;
}

//#endregion