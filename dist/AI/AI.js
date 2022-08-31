import { Vector2 } from "../Maths.js";
export var AgentActionTypes;
(function (AgentActionTypes) {
    AgentActionTypes[AgentActionTypes["none"] = 0] = "none";
    AgentActionTypes[AgentActionTypes["move"] = 1] = "move";
    AgentActionTypes[AgentActionTypes["attack"] = 2] = "attack";
    AgentActionTypes[AgentActionTypes["mate"] = 3] = "mate";
})(AgentActionTypes || (AgentActionTypes = {}));
//Package of the chosen action and a direction
export class AgentAction {
    constructor(action, direction, target) {
        this.action = action;
        if (direction !== undefined) {
            this.direction = direction;
        }
        if (target !== undefined) {
            this.target = target;
        }
    }
}
export class AI {
    constructor() {
        this.count = 10;
    }
    solve() {
        if (this.count >= 10) {
            let num = Math.round(Math.random() * 3);
            switch (num) {
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
//# sourceMappingURL=AI.js.map