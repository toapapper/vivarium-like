export class UI_Image {
    constructor(rect, image) {
        this.rect = rect;
        if (image != undefined)
            this.image = image;
    }
    draw(context) {
        context.drawImage(this.image, this.rect.top, this.rect.left, this.rect.width, this.rect.height);
    }
}
//The font is hard coded as Arial at the moment. Might be good to have some kind of engine-settings file where that can be changed
export class UI_Text {
    constructor(text, fontSize, color, position) {
        this.text = text;
        this.fontSize = fontSize;
        this.color = color;
        this.position = position;
    }
    draw(context) {
        context.font = this.fontSize + "px Arial";
        context.fillStyle = this.color.toHex();
        context.fillText(this.text, this.position.x, this.position.y);
    }
}
//# sourceMappingURL=UI_Element.js.map