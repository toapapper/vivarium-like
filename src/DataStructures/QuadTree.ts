import { Vector2 } from "../Maths.js"

//UNFINISHED. MIGHT BE TOTALLY UNNECESSARY

class Node<T>{
    value:T;
    
    bottomRight:Node<T>;
    bottomLeft:Node<T>;
    topLeft:Node<T>;
    topRight:Node<T>;

    center:Vector2;

    constructor(center:Vector2, value?:T){

    }

    Get(key:Vector2):T{
        if(this.value === undefined){
            if(key.x > this.center.x && key.y > this.center.y){
                return this.bottomRight.Get(key);
            }
            else if(key.x < this.center.x && key.y > this.center.y){
                return this.bottomLeft.Get(key);
            }
            else if(key.x < this.center.x && key.y < this.center.y){
                return this.topLeft.Get(key);
            }
            else if(key.x > this.center.x && key.y < this.center.y){
                return this.topRight.Get(key);
            }
        }
        return this.value;
    }

    Insert(value:T, position:Vector2){

    }
}

export class QuadTree<T>{
    size:Vector2;
    head:Node<T>;


}