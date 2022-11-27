
class Node<T>{
    next:Node<T>;
    prev:Node<T>;
    value:T;

    constructor(value?:T, next?:Node<T>, prev?:Node<T>){
        this.value = value;

        if(next !== undefined){
            this.next = next;
        }
        else{
            this.next = this;
        }

        if(prev !== undefined){
            this.prev = prev;
        }
        else{
            this.prev = this;
        }
    }

    insert_before(node:Node<T>){
        this.prev.next = node;
        node.prev = this.prev;
        node.next = this;
        this.prev = node;
    }

    insert_after(node:Node<T>){
        this.next.insert_before(node);
    }

    erase(){
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }
}

export class LinkedList<T>{

    private head:Node<T>;
    
    get front():Node<T>{return this.head.next;}
    get back():Node<T>{return this.head.prev;}

    constructor(){
        this.head = new Node<T>();
        this.head.next = this.head;
        this.head.prev = this.head;
    }

    push_back(value:T):void{
        this.back.insert_after(new Node<T>(value));
    }

    push_front(value:T):void{
        this.front.insert_before(new Node<T>(value));
    }

    forEach(action: (node:Node<T>) => void){
        let currentNode:Node<T> = this.front;
        while(currentNode !== this.head){
            action(currentNode);
            currentNode = currentNode.next;
        }
    }

    count():number{
        if(this.head.next === this.head){
            return 0;
        }

        let c:number = 0;
        let currentNode:Node<T> = this.front;
        while(currentNode !== this.head){
            c++;
            currentNode = currentNode.next;
        }

        return c;
    }
}