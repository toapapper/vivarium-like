
let MAX_ATTRIBUTE_VALUE:number = 16;

let SIZE_METABOLISM:number = 1;
let STRENGTH_METABOLISM:number = 1;
let SPEED_METABOLISM:number = 1;
let SENSES_METABOLISM:number = 1;
let UNIVERSAL_METABOLISM:number = .01;

let STOMACHSIZE_FACTOR:number = 5;

let BITESIZE_FACTOR:number = 5;

let WALKINGCOST_CONSTANT = 1;
let WALKINGCOST_SIZE_FACTOR:number = 1;
let WALKINGCOST_SPEED_MAX_REDUCTION:number = .5;

let ATTACKDAMAGE_FACTOR = 1;

//TODO: NEEDS TO BE SPLIT UP INTO SEVERAL FILES

export class Attributes{
    readonly size:number;
    readonly strength:number;
    readonly speed:number;
    readonly senses:number;

    readonly metabolism:number;      //Passive energy usage. Drained each tick increases with size, strength, speed, and senses.
    readonly stomachSize:number;     //Amount of food possible to store
    readonly biteSize:number;        //how much food they get per bite
    readonly walkingCost:number;     //how much food is drained when walking. increases with size and decreases with speed.
    readonly attackDamage:number;
    readonly moveCooldown:number;

    constructor(size:number, strength:number, speed:number, senses:number){
        this.size = size;
        this.strength = strength;
        this.speed = speed;
        this.senses = senses;

        this.metabolism = (size * SIZE_METABOLISM + strength * STRENGTH_METABOLISM + speed * SPEED_METABOLISM + senses * SENSES_METABOLISM) * UNIVERSAL_METABOLISM;
        this.stomachSize = size * STOMACHSIZE_FACTOR;
        this.biteSize = size * BITESIZE_FACTOR;
        this.walkingCost = (WALKINGCOST_CONSTANT + size * WALKINGCOST_SIZE_FACTOR) * (2 * MAX_ATTRIBUTE_VALUE - speed)/(MAX_ATTRIBUTE_VALUE/WALKINGCOST_SPEED_MAX_REDUCTION);
        //Speed related reduction in walking cost rules if 16 = max and max reduction = 0.5: 1 -> 1 & 16 -> 0.5 16/32 = 0.5 ==>  f(x) = (32 - x)/32. Solves it close enough. I know this function gives the result of one when x = 0 but i don't care.
        this.attackDamage = size + strength * ATTACKDAMAGE_FACTOR;
        this.moveCooldown = MAX_ATTRIBUTE_VALUE - speed;
    }
}