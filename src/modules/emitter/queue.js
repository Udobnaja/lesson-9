import {LinkedList} from "./list";

export class Queue {
    constructor() {
        this._list = new LinkedList();
    }

    // e
    enqueue(elem) {
        return this.list.add(elem);
    }

    dequeue() {

    }

}