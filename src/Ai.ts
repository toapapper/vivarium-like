import { Vector2 } from "./Maths";

//TODO: fundera ut ett bättre system. t.ex. att den gör actions automatiskt när den kommer nära ett "eligeble" föremål och att den bara ändrar vilken sådan action den gör automatiskt isåfall
// t.ex. Hunt-mode. attackera närliggande svagare djur
//move commands bör ge en position också sedan går den längs en uträknad väg
//dessa olika lägen kan sedan vara olika condition-noder i nodträdet.

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