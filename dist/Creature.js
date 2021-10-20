import { Rectangle } from "./Maths.js";
import { TintImage } from "./ImageUtils.js";
export class Creature {
    constructor(position, img, tint) {
        this.rect = new Rectangle(position.x, position.y, 1, 1);
        this.sprite = TintImage(img, tint);
    }
    draw(camera) {
        camera.DrawImage(this.sprite, this.rect);
    }
}
//# sourceMappingURL=Creature.js.map