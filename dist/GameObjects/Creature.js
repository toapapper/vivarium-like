import { ColorWhites } from "../ImageUtils.js";
import { GameObject, Edible } from "./GameObject.js";
import { AgentActionTypes, AI } from "../AI/AI.js";
import { World } from "../World.js";
export var FoodType;
(function (FoodType) {
    FoodType[FoodType["herbivore"] = 0] = "herbivore";
    FoodType[FoodType["omnivore"] = 1] = "omnivore";
    FoodType[FoodType["carnivore"] = 2] = "carnivore";
})(FoodType || (FoodType = {}));
export class Species {
    constructor(name, tint, sprite, foodType, attributes, defaultBehaviour) {
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
export class Creature extends GameObject {
    constructor(position, species, attributes) {
        super(position);
        this.moveCooldown = 0; //number of ticks until it can move
        this.attackCooldown = 0; //independent from movement cooldown but resets to same value
        this.sprite = species.sprite;
        this.species = species;
        if (attributes !== undefined) {
            this.attributes = attributes;
        }
        else {
            this.attributes = species.defaultAttributes;
        }
        this.currentHealth = this.attributes.size;
        this.maxHealth = this.attributes.size;
        this.currentEnergy = this.attributes.stomachSize;
        this.maxEnergy = this.attributes.stomachSize;
        this.ai = new AI();
    }
    //Each tick
    Update() {
        if (this.moveCooldown == 0) {
            let action = this.GetAgentAction();
            switch (action.action) {
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
        if (this.currentEnergy <= 0) {
            this.currentEnergy = 0;
            this.currentHealth -= (this.maxHealth * 0.01);
            if (this.currentHealth <= 0) {
                this.Die();
            }
        }
        if (this.currentHealth < this.maxHealth) {
            this.currentHealth += this.maxHealth * 0.001;
            if (this.currentHealth > this.maxHealth) {
                this.currentHealth = this.maxHealth;
            }
        }
    }
    Move(direction) {
        if (direction == undefined || direction == null) {
            return;
        }
        let newPos = this.position.add(direction);
        let world = World.Instance;
        let newTile = world.GetTileAt(newPos);
        if (newTile == undefined || newTile.occupied || newTile.water) {
            return;
        }
        world.GetTileAt(this.position).occupied = false;
        world.GetTileAt(this.position).occupiedBy = null;
        newTile.occupied = true;
        newTile.occupiedBy = this;
        this.position = newPos;
        this.currentEnergy -= this.attributes.walkingCost;
    }
    Attack(target) {
        if (target == null || target == this) { //invalid targets
            return;
        }
        target.TakeDamage(this.attributes.attackDamage);
    }
    Eat(target) {
        //check food type etc..
        this.currentEnergy += target.takeBite(this.attributes.biteSize);
        if (this.currentEnergy > this.maxEnergy) {
            this.currentEnergy = this.maxEnergy;
        }
    }
    Mate(target) {
    }
    TakeDamage(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.Die();
        }
    }
    Die() {
        World.Instance.RemoveGameObject(this);
        World.Instance.SpawnGameObject(this.position, new Edible(this.position, false, this.attributes.size * 100, this.attributes.size * 100)); //TODO: balance
    }
    /** Happens every time it should move  */
    GetAgentAction() {
        return this.ai.solve();
    }
}
//# sourceMappingURL=Creature.js.map