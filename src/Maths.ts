export class Vector2{
    static get zero(): Vector2{ return new Vector2(0, 0); }
    static get one(): Vector2{ return new Vector2(1,1); }
    static get up(): Vector2{ return new Vector2(0, -1); }
    static get down(): Vector2{ return new Vector2(0, 1); }
    static get left(): Vector2{ return new Vector2(-1, 0); }
    static get right(): Vector2{ return new Vector2(1, 0); }
    
    x:number;
    y:number;

    /** x rounded to nearest integer */
    get intX(): number{ return Math.round(this.x); }
    /** set x but value is rounded to nearest integer */
    set intX(value:number){ this.x = Math.round(value); }

    /** y rounded to nearest integer */
    get intY(): number{ return Math.round(this.y); }
    /** set y but value is rounded to nearest integer */
    set intY(value:number){ this.y = Math.round(value); }
    
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    
    round(): Vector2{
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    length(): number{
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(other: Vector2): Vector2{
        return new Vector2(other.x + this.x, other.y + this.y);
    }

    subtract(other: Vector2): Vector2{
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    multiply(n:number): Vector2{
        return new Vector2(this.x * n, this.y * n);
    }

    divide(n:number): Vector2{
        return new Vector2(this.x/n, this.y/n);
    }

}

export class Rectangle{
    static get one(): Rectangle{return new Rectangle(0,0,1,1); }

    x:number;
    y:number;
    width:number;
    height:number;

    get position(): Vector2{ return new Vector2(this.x, this.y); }
    set position(value: Vector2){ this.x = value.x; this.y = value.y; }

    get size(): Vector2{ return new Vector2(this.width, this.height); }
    set size(value: Vector2){ this.width = value.x; this.height = value.y; }

    get left(): number{ return this.x - this.width/2; }
    get right(): number{ return this.x + this.width/2; }
    get top(): number{ return this.y - this.height/2; }
    get bottom(): number{ return this.y + this.height/2; }

    get topLeft(): Vector2{ return new Vector2(this.left, this.top); }
    get topRight(): Vector2{ return new Vector2(this.right, this.top); }
    get bottomLeft(): Vector2{ return new Vector2(this.left, this.bottom); }
    get bottomRight(): Vector2{ return new Vector2(this.right, this.bottom); }

    get points(): Vector2[]{ return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]; }

    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point: Vector2): boolean{
        if(point.x > this.left && point.x < this.right && point.y > this.top && point.y < this.bottom){
            return true;
        }
        return false;
    }

    intersects(other: Rectangle): boolean{
        //checks if either one is to the left of the other or above, if not they must be intersecting
        if(this.left > other.right || this.right < other.left){
            return false;
        }

        if(this.top > other.bottom || this.bottom < other.top){
            return false;
        }

        return true;
    }
}