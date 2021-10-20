import { Camera } from "./Camera.js";
import { Vector2 } from "./Maths.js";
import { Tile } from "./Tile.js";


export class World{

    tiles:Tile[][];
    size:Vector2;

    constructor(size:Vector2){
        this.size = size;
        this.InitializeTiles();
    }

    InitializeTiles(){
        for(let i = 0; i < this.size.x; i++){
            this.tiles.push([]);
            for(let j = 0; j < this.size.y; j++){
                this.tiles[i][j] = new Tile(new Vector2(i,j),"grass");
            }
        }
    }

    Draw(camera:Camera){
        this.tiles.forEach(function(column:Tile[]){
            column.forEach(function(tile:Tile){
                tile.Draw(camera);
            });
        });
    }

}