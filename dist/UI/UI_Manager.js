import { UI_CreatureInfo } from "./UI_CreatureInfo.js";
import { World } from "../World.js";
import { Creature } from "../GameObjects/Creature.js";
import { Vector2 } from "../Maths.js";
import { LinkedList } from "../DataStructures/LinkedList.js";
export class UI_Manager {
    constructor() {
        this.creatureInfos = new LinkedList();
        World.Instance.gameObjects.forEach(gObj => {
            if (gObj instanceof Creature) {
                this.creatureInfos.push_back(new UI_CreatureInfo(gObj, Vector2.zero));
            }
        });
    }
    addCreature(creature) {
        this.creatureInfos.push_back(new UI_CreatureInfo(creature, Vector2.zero));
    }
    draw(context) {
        this.creatureInfos.forEach(node => {
            if (node.value.creature.currentHealth <= 0) {
                node.erase();
            }
            node.value.draw(context);
        });
    }
}
//# sourceMappingURL=UI_Manager.js.map