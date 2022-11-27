import { Camera } from "../Camera.js";
import { Creature } from "../GameObjects/Creature.js";
import { Color } from "../ImageUtils.js";
import { Vector2 } from "../Maths.js";
import { UI_Text } from "./UI_Element.js";


export class UI_CreatureInfo{
    creature:Creature;
    textElement:UI_Text;
    position:Vector2;

    constructor(creature:Creature, position:Vector2){
        this.creature = creature;
        this.position = position;
        this.textElement = new UI_Text(creature.species.name, 10, Color.black, this.position);
    }

    draw(context:CanvasRenderingContext2D){
        this.position = Camera.main.WorldToViewportPoint(this.creature.position);
        this.textElement.position = this.position;
        this.textElement.text = (""+this.creature.currentHealth).slice(0,4) + "hp\n" + (""+this.creature.currentEnergy).slice(0,4) + "en";
        this.textElement.draw(context);
    }
}