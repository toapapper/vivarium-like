//TODO: fundera ut ett bättre system. t.ex. att den gör actions automatiskt när den kommer nära ett "eligeble" föremål och att den bara ändrar vilken sådan action den gör automatiskt isåfall
// t.ex. Hunt-mode. attackera närliggande svagare djur
//move commands bör ge en position också sedan går den längs en uträknad väg
//dessa olika lägen kan sedan vara olika condition-noder i nodträdet.
export var AgentActions;
(function (AgentActions) {
    AgentActions[AgentActions["none"] = 0] = "none";
    AgentActions[AgentActions["attack"] = 1] = "attack";
    AgentActions[AgentActions["eat"] = 2] = "eat";
    AgentActions[AgentActions["mate"] = 3] = "mate";
    AgentActions[AgentActions["moveLeft"] = 4] = "moveLeft";
    AgentActions[AgentActions["moveRight"] = 5] = "moveRight";
    AgentActions[AgentActions["moveUp"] = 6] = "moveUp";
    AgentActions[AgentActions["moveDown"] = 7] = "moveDown";
    AgentActions[AgentActions["moveUpLeft"] = 8] = "moveUpLeft";
    AgentActions[AgentActions["moveUpRight"] = 9] = "moveUpRight";
    AgentActions[AgentActions["moveDownLeft"] = 10] = "moveDownLeft";
    AgentActions[AgentActions["moveDownRight"] = 11] = "moveDownRight";
})(AgentActions || (AgentActions = {}));
export class Ai {
}
//# sourceMappingURL=Ai.js.map