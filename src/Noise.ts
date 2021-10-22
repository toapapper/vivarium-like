import SimplexNoise from "../node_modules/simplex-noise/dist/esm/simplex-noise.js";
import { Color } from "./ImageUtils.js";
import { Rectangle, Vector2 } from "./Maths.js";

let drawCanvas:HTMLCanvasElement = document.createElement("canvas");
let drawCanvasContext = drawCanvas.getContext("2d");


export class NoiseMapGenerator{

    gen = new SimplexNoise();
    currentMap:number[][];
    
    get mapSize(): Vector2{
        try{
            return new Vector2(this.currentMap.length, this.currentMap[0].length);
        }
        catch(error){
            return Vector2.zero;
        }
    }

    mapsCombined:number = 0;
    
    //for drawing the noisemap
    waterColor:Color = new Color(20,200,266);
    groundColor: Color = new Color(75, 225, 75);
    baseColor: Color = new Color(127, 127, 127);
    treeColor: Color = new Color(20 ,20 ,20);


    setNoiseSeed(seed:number|string): void{
        this.gen = new SimplexNoise(seed);
    }
    
    /**
     * Generates a noise map and combines it into currentMap
     */
    GenerateNoiseMap(rect:Rectangle, mapSize:Vector2): void{
        let map:number[][] = [];
        let pixelSizeX = rect.width/mapSize.x;
        let pixelSizeY = rect.height/mapSize.y;

        for(let x = 0; x < mapSize.x; x++){
            map.push([]);
            let posX = (x * pixelSizeX) + rect.left;

            for(let y = 0; y < mapSize.y; y++){
                let posY = (y * pixelSizeY) + rect.top;
                map[x].push(this.gen.noise2D(posX, posY));
            }
        }

        this.CombineMaps(map);
    }

    /**
     * Generates blue-noise dots, supposed to represent some kind of tree placement
     * @param rect world offset so to say
     * @param waterLevel trees cant spawn here
     * @param minR R dictates the densite, lower R higher density, R increases between minimum and maximum the higher above the waterlevel we get
     * @param maxR 
     */
    GenerateBlueNoiseDots(rect: Rectangle, waterLevel:number, minR:number, maxR:number){
        let blueNoise:number[][] = [];
        let R = 2;//kan ändra beroende på höjd av landet

        

        for(let x = 0; x < this.mapSize.x; x++){
            blueNoise.push([]);
            for(let y = 0; y < this.mapSize.y; y++){
                let nX = x/this.mapSize.x - .5;
                let nY = y/this.mapSize.y - .5;

                blueNoise[x].push(this.gen.noise2D(50 * x, 50 * y));
            }
        }

        for(let xc = 0; xc < this.mapSize.x; xc++){
            for(let yc = 0; yc < this.mapSize.y; yc++){
                let max = 0;

                for(let xn  = xc - R; xn < xc + R; xn++){
                    for(let yn = yc - R; yn < yc + R; yn++){
                        if(yn >= 0 && yn < this.mapSize.y && xn >= 0 && xn < this.mapSize.x){
                            let e = blueNoise[xn][yn];
                            if(e > max){
                                max = e;
                            }
                        }
                    }
                }
                if(blueNoise[xc][yc] == max){
                    //place tree
                    this.currentMap[xc][yc] = 2;
                }
            }
        }
    }

    SinkEdges(){
        let sinkEdgeFunc = function(position: Vector2, size:Vector2): number{
            //vill att noll i ekvationen ska vara i mitten av skärmen, måste därför göra offset till -size/2
            let offset:Vector2 = size.multiply(.5);
            let distance = position.subtract(offset).length() / (size.x/2);//from center normalized to one

            if(distance < .6){
                return 0;
            }

            return Math.pow((distance - .6)*3, 2) * -1;// + Math.pow(distance / 4, 2) + .4;//height = -x^2.3 + 1 
        }

        console.log(this.mapSize.multiply(.5));

        for(let x = 0; x < this.mapSize.x; x++){
            for(let y = 0; y < this.mapSize.y; y++){
                this.currentMap[x][y] += sinkEdgeFunc(new Vector2(x,y), this.mapSize);
            }
        }

    }

    /** Combines @param map into this.currentMap, dividing each value by two so as to keep them between -1 and 1 */
    CombineMaps(map:number[][]): void{
        if(this.currentMap == undefined){
            this.currentMap = map;
            return;
        }

        this.mapsCombined++;
        let mapsCombinedInv = 1/this.mapsCombined;
        for(let x = 0; x < map.length; x++){
            
            if(this.currentMap[x] == undefined){//if this column is undefined
                this.currentMap.push(map[x]);
                continue;
            }

            for(let y = 0; y < map[x].length; y++){
                if(this.currentMap[x][y] == undefined){
                    this.currentMap[x].push(map[x][y]);
                    continue;
                }
                this.currentMap[x][y] = this.currentMap[x][y] * (1-mapsCombinedInv) + map[x][y] * mapsCombinedInv;
            }
        }
    }

    ResetCurrentMap(){
        this.currentMap = [];
        this.mapsCombined = 0;
    }

    DrawCurrentMap(context:CanvasRenderingContext2D, size:Vector2, waterHeight:number = -1): void{
        let pixels: number = this.currentMap.length * this.currentMap[0].length;
        let imgData:ImageData = context.getImageData(0,0,this.currentMap.length, this.currentMap[0].length);

        for(let i = 0; i < pixels; i++){
            let x = i % this.currentMap.length;
            let y = Math.floor(i / this.currentMap.length);
            let height = this.currentMap[x][y];

            if(height < waterHeight){
                try{
                    this.waterColor.WriteToArray(imgData.data, i * 4);
                }
                catch(error){
                    console.log(error + " when drawing currentMap");
                    continue;
                }
            }
            else if(height == 2){
                try{
                    this.treeColor.WriteToArray(imgData.data, i * 4);
                }
                catch(error){
                    console.log(error + " when drawing currenMap");
                    continue;
                }
            }
            else{
                // imgData.data[i * 4] = ((height + 1)/2) * 255;
                // imgData.data[(i * 4) + 1] =  ((height + 1)/2) * 255;
                // imgData.data[(i * 4) + 2] = ((height + 1)/2) * 255;
                // imgData.data[(i * 4) + 3] = 255;
                imgData.data[i * 4] = this.baseColor.r + height * this.groundColor.r/2;
                imgData.data[(i * 4) + 1] =  this.baseColor.g + height * this.groundColor.g/2;
                imgData.data[(i * 4) + 2] = this.baseColor.b + height * this.groundColor.b/2;
                imgData.data[(i * 4) + 3] = 255;
            }
        }

        drawCanvas.width = this.currentMap.length;
        drawCanvas.height = this.currentMap[0].length;
        drawCanvasContext.putImageData(imgData, 0, 0, 0, 0, size.x, size.y);
        let drawImg = new Image();
        drawImg.src = drawCanvas.toDataURL("image/png");
        let _this = this;
        drawImg.onload = function(){
            context.drawImage(drawImg, 0,0,_this.currentMap.length, _this.currentMap[0].length,0,0,size.x,size.y);
        }
    }
}