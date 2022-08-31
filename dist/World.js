import { Rectangle, Vector2 } from "./Maths.js";
import { NoiseMapGenerator } from "./Noise.js";
import { Tile } from "./Tile.js";
export class World {
    constructor(size) {
        this.removalCount = 0;
        this.removalResetAmount = 100; //number of removals of gameobjects that will trigger a cleanup of the gameobjects list
        this.gameObjects = [];
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
    //pixel
    GetTileAt(position) {
        if (position.intX > 0 && position.intX < this.size.x && position.intY > 0 && position.intY < this.size.y) {
            return this.tiles[position.intX][position.intY];
        }
        return undefined;
    }
    SpawnGameObject(position, gObject) {
        //find nearest unoccupied position to place an item.
        //TODO:implement better
        console.log("gameObject spawned");
        if (!this.tiles[position.intX][position.intY].occupied) {
            this.gameObjects.push(gObject);
            this.tiles[position.intX][position.intY].occupied = true;
            this.tiles[position.intX][position.intY].occupiedBy = gObject;
        }
    }
    RemoveGameObject(gameObject) {
        console.log("gameObject removed");
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i] === gameObject) {
                this.gameObjects[i] = null;
            }
        }
        this.removalCount++;
        if (this.removalCount >= this.removalResetAmount) {
            //Refactor gameObjects list
            let nArray = [];
            this.gameObjects.forEach(element => {
                if (element !== null) {
                    nArray.push(element);
                }
            });
            this.gameObjects = nArray;
        }
    }
    Update() {
        this.gameObjects.forEach(function (gObject) {
            if (gObject !== null) {
                gObject.Update();
            }
        });
    }
    Draw(camera) {
        this.tiles.forEach(function (column) {
            column.forEach(function (tile) {
                tile.Draw(camera);
            });
        });
        this.gameObjects.forEach(function (gObject) {
            if (gObject !== null) {
                console.log("gameObject drawn");
                gObject.Draw(camera);
            }
        });
    }
}
World.MetabolismFactor = 1; //Editable by the player. All metabolism is increased by this amount.
//# sourceMappingURL=World.js.map