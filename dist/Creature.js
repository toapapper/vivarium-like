import { TintImage } from "./ImageUtils.js";
import { GameObject } from "./GameObject.js";
export class Creature extends GameObject {
    constructor(position, sprite, tint) {
        super(position);
        this.sprite = TintImage(sprite, tint);
    }
}
//# sourceMappingURL=Creature.js.map