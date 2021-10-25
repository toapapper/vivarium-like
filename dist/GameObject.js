import { Rectangle } from "./Maths.js";
let treeSprite = new Image();
treeSprite.src = "../sprites/tree.png";
let appleSprite = new Image();
appleSprite.src = "../sprites/apple.png";
//This is a file containing the base gameObject class and some simpler gameObject-classes(tree, apple)
export class GameObject {
    constructor(position) {
        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }
    Update(dt) {
    }
    Draw(camera) {
        if (this.sprite != undefined) {
            camera.DrawImage(this.sprite, this.rect);
        }
    }
}
export class Tree extends GameObject {
    constructor(position, appleTimerMin, appleTimerMax) {
        super(position);
        this.appleTimer = 0;
        this.sprite = treeSprite;
        this.appleTimerMin = appleTimerMin;
        this.appleTimerMax = appleTimerMax;
    }
    ResetAppleTimer() {
        this.appleTimer = Math.random();
    }
    Update(dt) {
        super.Update(dt);
    }
}
//# sourceMappingURL=GameObject.js.map