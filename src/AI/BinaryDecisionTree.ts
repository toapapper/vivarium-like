import { Creature } from "../GameObjects/Creature.js";
import { Edible } from "../GameObjects/GameObject.js";
import { Tile } from "../Tile.js";
import { World } from "../World.js";
import { AgentAction, AgentActionTypes } from "./AI.js";

let CREATURE:number = 0;
let CLOSEST_FRIEND:number = 1;
let CLOSEST_FOE:number = 2;
let CLOSEST_APPLE:number = 3;

class SharedData{
    me:Creature;
    closestFoe:Creature;
    closestFriend:Creature;
    closestApple:Edible;
    closestCorpse:Edible;
}

export class AIDecision{
    targetTile:Tile;
    targetCreature:Creature;
    targetEdible:Edible;
    chosenAction:AgentActionTypes;
}

export class BDT{
    sharedData:SharedData;
    head:Node;

    constructor(creature:Creature){
        this.sharedData.me = creature;
        this.head = new Node(this.sharedData);
    }

    evaluate():AIDecision{
        return this.head.evaluate();
    }
}

//Nodes
class Node{
    action:AIDecision;
    sharedData:SharedData;
    left:Node;
    right:Node;

    constructor(sharedData:SharedData){
        this.sharedData = sharedData;
    }

    protected condition():boolean{
        return false;
    }

    evaluate():AIDecision{
        if(this.action !== undefined){
            return this.action;
        }

        if(this.condition()){
            return this.right.evaluate();
        }
        else{
            return this.left.evaluate();
        }
    }
}

//0(number)
class IsFoeNearNode extends Node{
    near:number;

    constructor(sharedData:SharedData, threshold:number){
        super(sharedData);
        this.near = threshold;
    }

    condition():boolean{
        if(this.sharedData.closestFoe === undefined){
            let closestDistance = Number.MAX_VALUE;
            let closest:Creature = undefined;
            let me = this.sharedData.me;

            World.Instance.creatures.forEach((node)=>{
                if(node.value.species.name !== me.species.name){
                    let distance = me.position.subtract(node.value.position).length();
                    if(distance < closestDistance){
                        closest = node.value;
                        closestDistance = distance;
                    }
                }
            });

            if(closest === undefined){
                return false;
            }
        }

        return this.sharedData.me.position.subtract(this.sharedData.closestFoe.position).length() <= this.near;
    }
}

//1(number)
class ImHurt extends Node{
    threshold:number;//percentage

    constructor(sharedData:SharedData, threshold:number){
        super(sharedData);
        this.threshold = threshold;
    }

    protected condition():boolean{
        return this.sharedData.me.currentHealth/this.sharedData.me.maxHealth <= this.threshold;
    }
}