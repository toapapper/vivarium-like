import { Rectangle } from "../Maths.js";
let appleSprite = new Image();
appleSprite.src = "../sprites/apple.png";
let corpseSprite = new Image();
corpseSprite.src = "../sprites/corpse.png";
let mountainSprite = new Image();
mountainSprite.src = "../sprites/mountain_tile.png";
//This is a file containing the base gameObject class and some simpler gameObject-classes(tree, apple)
export class GameObject {
    constructor(position) {
        this.rect = new Rectangle(position.x, position.y, 1, 1);
    }
    get position() {
        return this.rect.position;
    }
    set position(pos) {
        this.rect.position = pos;
    }
    //Happens on ticks. Game preset is 16 ticks per second
    Update() { }
    Draw(camera) {
        if (this.sprite != undefined) {
            camera.DrawImage(this.sprite, this.rect);
        }
    }
}
export class Mountain extends GameObject {
    constructor(position) {
        super(position);
        this.sprite = mountainSprite;
    }
}
//antingen äpple eller lik
export class Edible extends GameObject {
    constructor(position, isApple, nutrition, decay) {
        super(position);
        this.isAnApple = true;
        this.isAnApple = isApple;
        this.nutrition = nutrition;
        this.decay = decay;
        this.sprite = isApple ? appleSprite : corpseSprite;
    }
    isCorpse() {
        return !this.isAnApple;
    }
    isApple() {
        return this.isAnApple;
    }
    takeBite(biteSize) {
        this.nutrition -= biteSize;
        if (this.nutrition <= 0) {
            return this.nutrition + biteSize;
        }
        else {
            return biteSize;
        }
    }
    Draw(camera) {
        if (this.nutrition > 0) {
            super.Draw(camera);
        }
    }
}
//# sourceMappingURL=GameObject.js.map