import { Camera } from "./Camera.js";
import { Rectangle, Vector2 } from "./Maths.js";
import { Color } from "./ImageUtils.js";
import { Creature } from "./Creature.js";
let canvas = document.getElementById("GameCanvas");
let context = canvas.getContext("2d");
let camera = new Camera(context, new Vector2(canvas.width, canvas.height));
context.fillStyle = "#cc88cc";
context.imageSmoothingEnabled = false;
context.fillRect(0, 0, canvas.width, canvas.height);
let tintedImg = new Image();
let testImg = new Image();
testImg.src = "./sprites/bear.png";
let testCreature;
let testCreature2;
testImg.onload = function () {
    camera.DrawImage(testImg, new Rectangle(0, 0, 1, 1));
    testCreature = new Creature(new Vector2(-3, 4), testImg, new Color(0, 255, 255));
};
setInterval(function () {
    testCreature.draw(camera);
    camera.Update();
}, 32);
document.addEventListener("keydown", function (event) {
    if (event.key === "a") {
        camera.Move(Vector2.left);
    }
    else if (event.key === "d") {
        camera.Move(Vector2.right);
    }
    else if (event.key === "w") {
        camera.Move(Vector2.up);
    }
    else if (event.key === "s") {
        camera.Move(Vector2.down);
    }
    else if (event.key === "z") {
        camera.Zoom(1);
    }
    else if (event.key === "x") {
        camera.Zoom(-1);
    }
});
//# sourceMappingURL=Game.js.map