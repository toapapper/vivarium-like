class Node {
    constructor(value, next, prev) {
        this.value = value;
        if (next !== undefined) {
            this.next = next;
        }
        else {
            this.next = this;
        }
        if (prev !== undefined) {
            this.prev = prev;
        }
        else {
            this.prev = this;
        }
    }
    insert_before(node) {
        this.prev.next = node;
        node.prev = this.prev;
        node.next = this;
        this.prev = node;
    }
    insert_after(node) {
        this.next.insert_before(node);
    }
    erase() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }
}
export class LinkedList {
    constructor() {
        this.head = new Node();
        this.head.next = this.head;
        this.head.prev = this.head;
    }
    get front() { return this.head.next; }
    get back() { return this.head.prev; }
    push_back(value) {
        this.back.insert_after(new Node(value));
    }
    push_front(value) {
        this.front.insert_before(new Node(value));
    }
    forEach(action) {
        let currentNode = this.front;
        while (currentNode !== this.head) {
            action(currentNode);
            currentNode = currentNode.next;
        }
    }
    count() {
        if (this.head.next === this.head) {
            return 0;
        }
        let c = 0;
        let currentNode = this.front;
        while (currentNode !== this.head) {
            c++;
            currentNode = currentNode.next;
        }
        return c;
    }
}
//# sourceMappingURL=LinkedList.js.map