import { Rectangle, Vector2 } from "../Maths.js";
import { Color, TintImage } from "../ImageUtils.js";
import { Camera } from "../Camera.js";
import { GameObject, Edible} from "./GameObject.js";
import { AgentActionTypes, AI, AgentAction } from "../AI/AI.js";
import { World } from "../World.js";
import { Tile } from "../Tile.js"

export enum FoodType{
    herbivore,
    omnivore,
    carnivore
}

let MAX_ATTRIBUTE_VALUE:number = 16;

let SIZE_METABOLISM:number = 1;
let STRENGTH_METABOLISM:number = 1;
let SPEED_METABOLISM:number = 1;
let SENSES_METABOLISM:number = 1;

let STOMACHSIZE_FACTOR:number = 5;

let BITESIZE_FACTOR:number = 5;

let WALKINGCOST_CONSTANT = 1;
let WALKINGCOST_SIZE_FACTOR:number = 1;
let WALKINGCOST_SPEED_MAX_REDUCTION:number = .5;

let ATTACKDAMAGE_FACTOR = 1;

export class Attributes{
    size:number;
    strength:number;
    speed:number;
    senses:number;

    //related to size and maybe speed and strength?
    metabolism:number;      //Passive energy usage. Drained each tick increases with size, strength, speed, and senses.
    stomachSize:number;     //Amount of food possible to store
    biteSize:number;        //how much food they get per bite
    walkingCost:number;     //how much food is drained when walking. increases with size and decreases with speed.
    attackDamage:number;
    moveCooldown:number;

    constructor(size:number, strength:number, speed:number, senses:number){
        this.size = size;
        this.strength = strength;
        this.speed = speed;
        this.senses = senses;

        this.metabolism = size * SIZE_METABOLISM + strength * STRENGTH_METABOLISM + speed * SPEED_METABOLISM + senses * SENSES_METABOLISM;
        this.stomachSize = size * STOMACHSIZE_FACTOR;
        this.biteSize = size * BITESIZE_FACTOR;
        this.walkingCost = (WALKINGCOST_CONSTANT + size * WALKINGCOST_SIZE_FACTOR) * (2 * MAX_ATTRIBUTE_VALUE - speed)/(MAX_ATTRIBUTE_VALUE/WALKINGCOST_SPEED_MAX_REDUCTION);
        //Speed related reduction in walking cost rules if 16 = max and max reduction = 0.5: 1 -> 1 & 16 -> 0.5 16/32 = 0.5 ==>  f(x) = (32 - x)/32. Solves it close enough. I know this function gives the result of one when x = 0 but i don't care.
        this.attackDamage = size + strength * ATTACKDAMAGE_FACTOR;
        this.moveCooldown = MAX_ATTRIBUTE_VALUE - speed;
    }
}

export class Species{
    tint:Color;
    sprite:HTMLImageElement;
    name:string;
    defaultBehaviour:number; //behaviour code. (numeric value that can be translated to a decision tree)
    foodType:FoodType;
    defaultAttributes:Attributes;

    constructor(name:string, tint:Color, sprite:HTMLImageElement, foodType:FoodType, attributes:Attributes, defaultBehaviour:number){
        this.sprite = TintImage(sprite, tint);
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
    
    attributes:Attributes;
    species:Species;

    currentEnergy:number;
    maxEnergy:number;

    currentHealth:number;
    maxHealth:number;

    moveCooldown:number = 0; //number of ticks until it can move
    attackCooldown:number = 0; //independent from movement cooldown but resets to same value
    ai:AI;



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

        this.ai = new AI();
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
                    this.Attack(action.target);
                    break;
                case AgentActionTypes.mate:
                    this.Mate(action.target);
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

        let newPos:Vector2 = this.position.add(direction);
        let world:World = World.Instance;
        let newTile:Tile = world.GetTileAt(newPos);
        
        if(newTile == undefined || newTile.occupied){
            return;
        }
        
        world.GetTileAt(this.position).occupied = false;
        world.GetTileAt(this.position).occupiedBy = null;
        newTile.occupied = true;
        newTile.occupiedBy = this;

        this.position = newPos;
        this.currentEnergy -= this.attributes.walkingCost;
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
        return this.ai.solve();
    }

}