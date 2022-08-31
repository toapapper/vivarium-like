import { Rectangle } from "./Maths.js";
let grassImg = new Image();
grassImg.src = "./sprites/grass_tile.png";
let waterImg = new Image();
waterImg.src = "./sprites/water_tile.png";
let mountainImg = new Image();
mountainImg.src = "./sprites/mountain_tile.png";
export class Tile {
    constructor(position, water) {
        this.occupied = false;
        this.occupiedBy = null;
        this.highlighted = false;
        this.water = water;
        if (water) {
            this.imgPointer = waterImg;
        }
        else {
            this.imgPointer = grassImg;
        }
        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }
    get position() {
        return this.rect.position;
    }
    Draw(camera) {
        camera.DrawImage(this.imgPointer, this.rect);
        if (this.highlighted) {
            camera.DrawImage(mountainImg, this.rect);
        }
    }
}
//# sourceMappingURL=Tile.js.map