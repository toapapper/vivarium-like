let MAX_ATTRIBUTE_VALUE = 16;
let SIZE_METABOLISM = 1;
let STRENGTH_METABOLISM = 1;
let SPEED_METABOLISM = 1;
let SENSES_METABOLISM = 1;
let UNIVERSAL_METABOLISM = .01;
let STOMACHSIZE_FACTOR = 5;
let BITESIZE_FACTOR = 5;
let WALKINGCOST_CONSTANT = 1;
let WALKINGCOST_SIZE_FACTOR = 1;
let WALKINGCOST_SPEED_MAX_REDUCTION = .5;
let ATTACKDAMAGE_FACTOR = 1;
//TODO: NEEDS TO BE SPLIT UP INTO SEVERAL FILES
export class Attributes {
    constructor(size, strength, speed, senses) {
        this.size = size;
        this.strength = strength;
        this.speed = speed;
        this.senses = senses;
        this.metabolism = (size * SIZE_METABOLISM + strength * STRENGTH_METABOLISM + speed * SPEED_METABOLISM + senses * SENSES_METABOLISM) * UNIVERSAL_METABOLISM;
        this.stomachSize = size * STOMACHSIZE_FACTOR;
        this.biteSize = size * BITESIZE_FACTOR;
        this.walkingCost = (WALKINGCOST_CONSTANT + size * WALKINGCOST_SIZE_FACTOR) * (2 * MAX_ATTRIBUTE_VALUE - speed) / (MAX_ATTRIBUTE_VALUE / WALKINGCOST_SPEED_MAX_REDUCTION);
        //Speed related reduction in walking cost rules if 16 = max and max reduction = 0.5: 1 -> 1 & 16 -> 0.5 16/32 = 0.5 ==>  f(x) = (32 - x)/32. Solves it close enough. I know this function gives the result of one when x = 0 but i don't care.
        this.attackDamage = size + strength * ATTACKDAMAGE_FACTOR;
        this.moveCooldown = MAX_ATTRIBUTE_VALUE - speed;
    }
}
//# sourceMappingURL=Attributes.js.map