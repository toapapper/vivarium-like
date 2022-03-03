import { Camera } from "./Camera.js";
import { Rectangle, Vector2 } from "./Maths.js";
import { NoiseMapGenerator } from "./Noise.js";
import { Tile, TileType } from "./Tile.js";
import { Creature } from "./Creature.js";
import { GameObject, Tree } from "./GameObject.js";


export class World{

    static Instance:World;

    tiles:Tile[][];
    Plants:GameObject[] = [];
    Animals:GameObject[] = [];

    size:Vector2;

    constructor(size:Vector2){
        this.size = size;
        World.Instance = this;
    }

    /*
    *   TODO:
    * Lägg till alla gameobjects i ett quadtree för att snabbt o effektivt kunna komma åt/hitta dem baserat på var de finns i världen
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

                this.tiles[x].push(new Tile(new Vector2(x, y), type));
                
                if(height == 2){
                    this.Plants.push(new Tree(new Vector2(x,y)));
                }

            }
        }
    }

    GetTileAt(position:Vector2): Tile{
        if(position.intX > 0 && position.intX < this.size.x && position.intY > 0 && position.intY < this.size.y){
            return this.tiles[position.intX][position.intY];
        }

        return undefined;
    }

    SpawnGameObject(position:Vector2, spawn:GameObject){
        //find nearest unoccupied position to place an item.
    }

    Update(dt:number): void{
        this.Animals.forEach(function(gObject:GameObject){
            gObject.Update(dt);
        });

        this.Plants.forEach(function(gObject:GameObject){
            gObject.Update(dt);
        });
    }

    Draw(camera:Camera): void{
        this.tiles.forEach(function(column:Tile[]){
            column.forEach(function(tile:Tile){
                tile.Draw(camera);
            });
        });

        this.Animals.forEach(function(gObject:GameObject){
            gObject.Draw(camera);
        });

        this.Plants.forEach(function(gObject:GameObject){
            gObject.Draw(camera);
        });
    }

}
