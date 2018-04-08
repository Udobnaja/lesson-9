export class LinkedList {

    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    createNode(value){
        return{
            value,
            next: null
        }
    }

    add(node){
        const newNode = this.createNode(node);

        if (this.size === 0 || this.tail === null){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    forEach(event){
        let node = this.head;

        while (node) {
            if (node.value.event === event){
                node.value.handler();
            }

            node = node.next;
        }
    }

    remove({event, handler}){
        if (this.size > 0){
            let prev = null;
            let node = this.head;

            while (node) {
                if (node.value.event === event && node.value.handler === handler){
                   if (!prev){
                       this.head = node.next;
                       if (this.head === this.tail){
                            this.tail = null;
                       }
                   } else if (node === this.tail){
                       this.tail = prev;
                       prev.next = node.next;
                       node.next = null;
                   } else {
                       prev.next = node.next;
                       node.next = null;
                   }

                   this.size--;
                   break;
                }
                prev = node;
                node = node.next;
            }
        }
    }
}