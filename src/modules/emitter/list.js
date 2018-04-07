export class LinkedList {

    // node
    // { value : something; next: (item | null)} // это пока на стек больше будет похоже все в конец херачится

    constructor(){
        this._head = null; // type node
        this._tail = null; // type node
        this._size = 0;
    }

    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    get size() {
        return this._size;
    }

    createNode(value){
        return{
            value,
            head: null
        }
    }

    add(node){
        const newNode = this.createNode(node);

        // index === size

        if (this._size === 0 || this._tail === null){
            this._head = newNode;
            this._tail = newNode;
        } else { // вставка в конец
            this._tail.next = newNode;
            this._tail = newNode;
        }

        this._size++;
    }

    forEach(event){
        // let node = this._head;
        // while (node !== null) {
        //     node = node.next;
        // }
    }

    remove(){
        // что то делаем в условиях наших эвентов  удаляем по value ?
    }
}