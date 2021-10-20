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
testImg.onload = function () {
    camera.DrawImage(testImg, new Rectangle(0, 0, 1, 1));
    testCreature = new Creature(new Vector2(-3, 4), testImg, new Color(0, 255, 255));
};
setInterval(function () {
    testCreature.draw(camera);
    camera.Update();
}, 16);
document.addEventListener("keydown", function (event) {
    console.log(event.key);
});
//# sourceMappingURL=Game.js.map