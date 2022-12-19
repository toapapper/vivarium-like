import { Creature } from "../GameObjects/Creature";
import { Edible } from "../GameObjects/GameObject";
import { Vector2 } from "../Maths.js";
import { Tile } from "../Tile.js";
import { AIDecision, BDT } from "./BinaryDecisionTree.js";

export enum AgentActionTypes{
    none,
    move,
    attack,
    eat,
    mate
}

//Package of the chosen action and a direction
export class AgentAction{
    action:AgentActionTypes;
    direction:Vector2;
    targetCreature:Creature;
    targetEdible:Edible;

    constructor(action:AgentActionTypes, direction?:Vector2, target?:Creature, edible?:Edible){
        this.action = action;
        if(direction !== undefined){
            this.direction = direction;
        }
        if(target !== undefined){
            this.targetCreature = target;
        }
        if(edible !== undefined){
            this.targetEdible = edible;
        }
    }
}

export class AI{
    tree:BDT;
    myCreature:Creature;
    lastTarget:Tile;
    currentPath:Tile[]; //IMPORTANT THAT IT IS ordered so that the next tile to step on is the last in the array.

    constructor(myCreature:Creature){
        this.myCreature = myCreature;
        this.tree = new BDT(myCreature);
    }

    think():AgentAction{
        let decision:AIDecision = this.tree.evaluate();
        let action:AgentAction = new AgentAction(AgentActionTypes.none);

        let targetPosition:Vector2 = undefined;
        if(decision.targetCreature != undefined){
            targetPosition = decision.targetCreature.position;
        }
        else if(decision.targetTile != undefined){
            targetPosition = decision.targetTile.position;
        }

        if(targetPosition.withinOne(this.myCreature.position) && decision.chosenAction != AgentActionTypes.move){
            action.action = decision.chosenAction;
            action.targetCreature = decision.targetCreature;
            action.targetEdible = decision.targetEdible;
            action.direction = targetPosition.subtract(this.myCreature.position);

            return action;
        }

        //Pathfind and such
        if(!targetPosition.equals(this.lastTarget.position)){
            this.pathfind();
        }
        else if(this.validatePath(this.currentPath)){
            this.pathfind();
        }

        action.action = AgentActionTypes.move;
        action.direction = this.currentPath.pop().position.subtract(this.myCreature.position);

        return action;
    }

    private validatePath(path:Tile[]):boolean{
        path.forEach((tile:Tile)=>{
            if(tile.occupied){
                return false;
            }
        });

        return true;
    }

    private pathfind(){
        //construct path.

        //A-star
    }


}