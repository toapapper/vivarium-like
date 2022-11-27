import { Creature } from "../GameObjects/Creature";
import { Vector2 } from "../Maths.js";

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
    target:Creature;

    constructor(action:AgentActionTypes, direction?:Vector2, target?:Creature){
        this.action = action;
        if(direction !== undefined){
            this.direction = direction;
        }
        if(target !== undefined){
            this.target = target;
        }
    }
}

export class AI{ //TODO:implement. right now its just a temporary movement in any direction.
    
    direction:Vector2;
    count:number = 10;

    solve():AgentAction{ //TODO: write

        if(this.count >= 10){
            let num = Math.round(Math.random() * 3);
    
            switch(num){
                case 0:
                    this.direction = Vector2.left;
                    break;
                case 1:
                    this.direction = Vector2.down;
                    break;
                case 2:
                    this.direction = Vector2.right;
                    break;
                case 3:
                    this.direction = Vector2.up;
                    break;
            }
            this.count = 0;
        }
 
        this.count++;
        return new AgentAction(AgentActionTypes.move, this.direction);
    }
}