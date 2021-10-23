import { Rectangle, Vector2 } from "./Maths.js";
import { NoiseMapGenerator } from "./Noise.js";
import { Tile } from "./Tile.js";
export class World {
    constructor(size) {
        this.size = size;
    }
    GenerateNew(seed, waterLevel = -.2) {
        let gen = new NoiseMapGenerator();
        if (seed != undefined) {
            gen.setSeed(seed);
        }
        let genRect = new Rectangle(0, 0, 1, 1);
        gen.GenerateNoiseMap(genRect, this.size);
        gen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 2, genRect.width * 2), this.size);
        gen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 4, genRect.width * 4), this.size);
        gen.SinkEdges();
        gen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 6, genRect.width * 6), this.size);
        gen.NormalizeMap();
        gen.GenerateBlueNoiseDots(genRect, waterLevel, 0, 3);
        this.tiles = [];
        for (let x = 0; x < this.size.x; x++) {
            this.tiles.push([]);
            for (let y = 0; y < this.size.y; y++) {
                let type = "grass";
                let height = gen.currentMap[x][y];
                if (height < waterLevel) {
                    type = "water";
                }
                else if (height == 2) {
                    type = "mountain"; //Spawna ett träd egentligen
                }
                this.tiles[x].push(new Tile(new Vector2(x, y), type));
            }
        }
    }
    GetTileAt(position) {
        return null;
    }
    SpawnItem(position, item) {
        //find nearest unoccupied position to place an item.
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