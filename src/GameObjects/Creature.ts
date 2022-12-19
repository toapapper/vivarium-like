import { absolute, Rectangle, sign, Vector2 } from "../Maths.js";
import { Color, ColorWhites } from "../ImageUtils.js";
import { Camera } from "../Camera.js";
import { GameObject, Edible} from "./GameObject.js";
import { AgentActionTypes, AI, AgentAction } from "../AI/AI.js";
import { World } from "../World.js";
import { Tile } from "../Tile.js"
import {Attributes} from "./Attributes.js"

export enum FoodType{
    herbivore,
    omnivore,
    carnivore
}


export class Species{
    tint:Color;
    sprite:HTMLImageElement;
    name:string;
    defaultBehaviour:number; //behaviour code. (numeric value that can be translated to a decision tree)
    foodType:FoodType;
    defaultAttributes:Attributes;

    constructor(name:string, tint:Color, sprite:HTMLImageElement, foodType:FoodType, attributes:Attributes, defaultBehaviour:number){
        this.sprite = ColorWhites(sprite, tint);
        this.tint = tint;
        this.name = name;
        this.foodType = foodType;
        this.defaultAttributes = attributes;
        this.defaultBehaviour = defaultBehaviour;
    }
}

/**
 * Should essentially be a container for all the data pertaining to a creature. The agent is contained within
 */
export class Creature extends GameObject{//Placeholder än så länge
    
    readonly attributes:Attributes;
    readonly species:Species;
    readonly ai:AI;

    readonly maxEnergy:number;
    readonly maxHealth:number;
    
    currentEnergy:number;
    currentHealth:number;

    moveCooldown:number = 0; //number of ticks until it can move
    attackCooldown:number = 0; //independent from movement cooldown but resets to same value

    constructor(position:Vector2, species:Species, attributes?:Attributes){
        super(position);
        this.sprite = species.sprite;
        this.species = species;
        if(attributes !== undefined){
            this.attributes = attributes;
        }
        else{
            this.attributes = species.defaultAttributes;
        }

        this.currentHealth = this.attributes.size;
        this.maxHealth = this.attributes.size;

        this.currentEnergy = this.attributes.stomachSize;
        this.maxEnergy = this.attributes.stomachSize;

        this.ai = new AI(this);
    }

    //Each tick
    Update(): void {
        
        if(this.moveCooldown == 0){
            let action = this.GetAgentAction();
            switch(action.action){
                case AgentActionTypes.move:
                    this.Move(action.direction);
                    break;
                case AgentActionTypes.attack:
                    this.Attack(action.targetCreature);
                    break;
                case AgentActionTypes.mate:
                    this.Mate(action.targetCreature);
                    break;
            }
            this.moveCooldown = this.attributes.moveCooldown;
        }
        this.moveCooldown--;

        this.currentEnergy -= this.attributes.metabolism;
        if(this.currentEnergy <= 0){
            this.currentEnergy = 0;
            this.currentHealth -= (this.maxHealth * 0.01);
            if(this.currentHealth <= 0){
                this.Die();
            }
        }

        if(this.currentHealth < this.maxHealth){
            this.currentHealth += this.maxHealth * 0.001;
            if(this.currentHealth > this.maxHealth){
                this.currentHealth = this.maxHealth;
            }
        }
    }

    Move(direction:Vector2):void{
        if(direction == undefined || direction == null){
            return;
        }

        //limit to 1 and in one direction
        if(absolute(direction.x) >= 0){
            direction.x = sign(direction.x);
            direction.y = 0;
        }
        else {
            direction.x = 0;
            direction.y = sign(direction.y);
        }

        let newPos:Vector2 = this.position.add(direction);
        let world:World = World.Instance;
        let newTile:Tile = world.GetTileAt(newPos);
        
        if(newTile == undefined || newTile.occupied || newTile.water){
            return;
        }

        world.GetTileAt(this.position).occupied = false;
        world.GetTileAt(this.position).occupiedBy = null;
        newTile.occupied = true;
        newTile.occupiedBy = this;

        this.position = newPos;
        this.currentEnergy -= this.attributes.walkingCost; //Might be unnecessary
    }

    Attack(target:Creature):void{
        if(target == null || target == this){//invalid targets
            return;
        }

        target.TakeDamage(this.attributes.attackDamage);
    }

    Eat(target:Edible):void{
        //check food type etc..
        this.currentEnergy += target.takeBite(this.attributes.biteSize);
        if(this.currentEnergy > this.maxEnergy){
            this.currentEnergy = this.maxEnergy;
        }
    }

    Mate(target:Creature):void{
 
    }

    TakeDamage(amount:number):void{
        this.currentHealth -= amount;
        if(this.currentHealth <= 0){
            this.Die();
        }
    }

    Die():void{
        World.Instance.RemoveGameObject(this);
        World.Instance.SpawnGameObject(this.position, new Edible(this.position, false, this.attributes.size * 100, this.attributes.size * 100));//TODO: balance
    }

    /** Happens every time it should move  */
    GetAgentAction(): AgentAction {
        return this.ai.think();
    }

}