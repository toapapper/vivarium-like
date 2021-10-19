import { Camera } from "./Camera.js";
import { Vector2 } from "./Maths.js";
let canvas = document.getElementById("GameCanvas");
let context = canvas.getContext("2d");
let camera = new Camera(context, new Vector2(canvas.width, canvas.height));
context.fillStyle = "#cc88cc";
context.fillRect(0, 0, canvas.width, canvas.height);
let testImg = new Image();
testImg.src = "../sprites/bear.png";
//# sourceMappingURL=Game.js.map