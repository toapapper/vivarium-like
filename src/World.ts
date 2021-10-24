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

    /* 
    *   TODO:
    *   lägg till en list - offset så att man kan placera nya tiles i minuskoordinater. Kanske också göra så världen genererars med 0,0 i mitten då.
    *   lägg alla gameobjects(apples, trees, creatures) i samma datastruktur som är uppdelad enligt utrymmet
    *   Ha creatures och träd och kanske också äpplen faktiskt i samma spacepartition-struktur. GetAtPosition, GetWithinRange Kanske hashlista med id-n och i klassen gameObject finns plats.
    *   Ha dem också i en stor array, så att de är åtkomliga via deras index
    * 
    *   QUADTREE:
    *       Varje nod har fyra barn om den inte är en lövnod. Om en nods datamängd överskrider ett antal så splittras den i fyra.
    *       Borde kolla om noder borde mergeas också då och då.
    *       Löv noderna är då altså bara en lista över saker som finns i det området. Skulle kunna sätta 10 eller 100 gameObjects som gräns eller något.
    *       Behöver ha utifrån: 
    *           Get at position(position)
    *           Get in range(position, range)
    *           UpdateElement(element:Type)
    * 
    *       Borde räkna hur många element de innehåller via deras barn. Så att de kan kollapsas när de har tillräckligt få element.
    *       Collapse()
    *       Split()
    *
    */

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