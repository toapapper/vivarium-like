import { Rectangle } from "./Maths.js";
let grassImg = new Image();
grassImg.src = "./sprites/grass_tile.png";
let waterImg = new Image();
waterImg.src = "./sprites/water_tile.png";
let mountainImg = new Image();
mountainImg.src = "./sprites/mountain_tile.png";
export class Tile {
    constructor(position, type) {
        switch (type) {
            case "grass":
                this.imgPointer = grassImg;
                break;
            case "water":
                this.imgPointer = waterImg;
                break;
            case "mountain":
                this.imgPointer = mountainImg;
                break;
        }
        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }
    Draw(camera) {
        camera.DrawImage(this.imgPointer, this.rect);
    }
}
//# sourceMappingURL=Tile.js.map