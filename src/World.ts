import { Camera } from "./Camera.js";
import { Rectangle, Vector2 } from "./Maths.js";
import { NoiseMapGenerator } from "./Noise.js";
import { Tile, TileType } from "./Tile.js";
import { Tree, Apple } from "./Tree.js";
import { Creature } from "./Creature.js";


export class World{

    tiles:Tile[][];
    trees:Tree[];
    apples:Apple[];
    creatures:Creature[];

    size:Vector2;


    constructor(size:Vector2){
        this.size = size;
    }

    GenerateNew(seed?:number, waterLevel:number = -.2): void{
        let gen:NoiseMapGenerator = new NoiseMapGenerator();
        if(seed != undefined){
            gen.setSeed(seed);
        }

        let genRect:Rectangle = new Rectangle(0, 0, 1, 1);
        gen.GenerateNoiseMap(genRect, this.size);
        gen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 2, genRect.width * 2), this.size);
        gen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 4, genRect.width * 4), this.size);
        gen.SinkEdges();
        gen.GenerateNoiseMap(new Rectangle(genRect.right, genRect.bottom, genRect.width * 6, genRect.width * 6), this.size);
        gen.NormalizeMap();
        gen.GenerateBlueNoiseDots(genRect, waterLevel, 0, 3);

        this.tiles = [];
        for(let x = 0; x < this.size.x; x++){
            this.tiles.push([]);
            for(let y = 0; y < this.size.y; y++){
                let type:TileType = "grass";
                let height = gen.currentMap[x][y];

                if(height < waterLevel){
                    type = "water";
                }
                else if(height == 2){
                    type = "mountain";//Spawna ett träd egentligen
                }
                
                this.tiles[x].push(new Tile(new Vector2(x, y), type));
            }
        }
    }

    GetTileAt(position:Vector2): Tile{
        return null;
    }

    SpawnItem(position:Vector2, item:Creature|Tree|Apple){
        //find nearest unoccupied position to place an item.
    }

    Draw(camera:Camera): void{
        this.tiles.forEach(function(column:Tile[]){
            column.forEach(function(tile:Tile){
                tile.Draw(camera);
            });
        });
    }

}