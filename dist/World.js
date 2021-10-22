import { Vector2 } from "./Maths.js";
import { Tile } from "./Tile.js";
export class World {
    constructor(size) {
        this.size = size;
        this.InitializeTiles();
    }
    InitializeTiles() {
        this.tiles = [];
        for (let i = 0; i < this.size.x; i++) {
            this.tiles.push([]);
            for (let j = 0; j < this.size.y; j++) {
                this.tiles[i].push(new Tile(new Vector2(i - this.size.x / 2, j - this.size.y / 2), "grass"));
            }
        }
    }
    Draw(camera) {
        this.tiles.forEach(function (column) {
            column.forEach(function (tile) {
                tile.Draw(camera);
            });
        });
    }
}
//# sourceMappingURL=World.js.map