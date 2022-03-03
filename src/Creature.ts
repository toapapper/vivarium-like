import { Rectangle, Vector2 } from "./Maths.js";
import { Color, ColorWhites } from "./ImageUtils.js";
import { Camera } from "./Camera.js";
import { GameObject } from "./GameObject.js";
import { AgentActions } from "./Ai.js";

/**
 * Should essentially be a container for all the data pertaining to a creature. The agent is contained within
 */
export class Creature extends GameObject{//Placeholder än så länge
    
    constructor(position:Vector2, sprite:HTMLImageElement, tint:Color){
        super(position);
        this.sprite = ColorWhites(sprite, tint);

    }

    /** run ai, evaluate next action. Could have a "reactionTime-cooldown on evaluating a new one. Could save on performance and make for better behavior." */
    GetAgentAction(): AgentActions {
        return AgentActions.none;
    }

}