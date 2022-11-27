import { UI_CreatureInfo } from "./UI_CreatureInfo.js";
import { World } from "../World.js";
import { Creature } from "../GameObjects/Creature.js";
import { Vector2 } from "../Maths.js";
import { LinkedList } from "../DataStructures/LinkedList.js";

export class UI_Manager{

    creatureInfos:LinkedList<UI_CreatureInfo>;

    constructor(){
        this.creatureInfos = new LinkedList<UI_CreatureInfo>();

        World.Instance.gameObjects.forEach(gObj => {
            if(gObj instanceof Creature){
                this.creatureInfos.push_back(new UI_CreatureInfo(gObj, Vector2.zero));
            }
        });
    }

    addCreature(creature:Creature):void{
        this.creatureInfos.push_back(new UI_CreatureInfo(creature, Vector2.zero));
    }

    draw(context:CanvasRenderingContext2D){
        this.creatureInfos.forEach(node => {
            if(node.value.creature.currentHealth <= 0){
                node.erase();
            }

            node.value.draw(context);
        });
    }

}