export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static get zero() { return new Vector2(0, 0); }
    static get up() { return new Vector2(0, -1); }
    static get down() { return new Vector2(0, 1); }
    static get left() { return new Vector2(-1, 0); }
    static get right() { return new Vector2(1, 0); }
    get intX() { return Math.round(this.x); }
    set intX(value) { this.x = Math.round(value); }
    get intY() { return Math.round(this.y); }
    set intY(value) { this.y = Math.round(value); }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(other) {
        return new Vector2(other.x + this.x, other.y + this.y);
    }
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    multiply(n) {
        return new Vector2(this.x * n, this.y * n);
    }
    divide(n) {
        return new Vector2(this.x / n, this.y / n);
    }
}
export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static get one() { return new Rectangle(0, 0, 1, 1); }
    get position() { return new Vector2(this.x, this.y); }
    set position(value) { this.x = value.x; this.y = value.y; }
    get size() { return new Vector2(this.width, this.height); }
    set size(value) { this.width = value.x; this.height = value.y; }
    get left() { return this.x - this.width / 2; }
    get right() { return this.x + this.width / 2; }
    get top() { return this.y - this.height / 2; }
    get bottom() { return this.y + this.height / 2; }
    get topLeft() { return new Vector2(this.left, this.top); }
    get topRight() { return new Vector2(this.right, this.top); }
    get bottomLeft() { return new Vector2(this.left, this.bottom); }
    get bottomRight() { return new Vector2(this.right, this.bottom); }
    get points() { return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]; }
    contains(point) {
        if (point.x > this.left && point.x < this.right && point.y > this.top && point.y < this.bottom) {
            return true;
        }
        return false;
    }
    intersects(other) {
        //checks if either one is to the left of the other or above, if not they must be intersecting
        if (this.left > other.right || this.right < other.left) {
            return false;
        }
        if (this.top > other.bottom || this.bottom < other.top) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=Maths.js.map