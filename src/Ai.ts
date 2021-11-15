import { Vector2 } from "./Maths";

export enum AgentActions{
    none,
    attack,
    eat,
    mate, //should not be taken lightly and will have a significant time where no other action is possible associated with it. Additionally birth will make the animal vulnerable.
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    moveUpLeft,
    moveUpRight,
    moveDownLeft,
    moveDownRight
}


export class Ai{

}