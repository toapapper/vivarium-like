import { TintImage } from "./ImageUtils.js";
import { GameObject } from "./GameObject.js";
import { AgentActions } from "./Ai.js";
/**
 * Should essentially be a container for all the data pertaining to a creature. The agent is contained within
 */
export class Creature extends GameObject {
    constructor(position, sprite, tint) {
        super(position);
        this.sprite = TintImage(sprite, tint);
    }
    /** run ai, evaluate next action. Could have a "reactionTime-cooldown on evaluating a new one. Could save on performance." */
    GetAgentAction() {
        return AgentActions.none;
    }
}
//# sourceMappingURL=Creature.js.map