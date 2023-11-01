class Node {
    constructor(value){
        this.value = value
        this.next = null
        this.previous = null
    }
}
class DoublyLinkedList {
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }

    push(value){
        const node = new Node(value)
        if(this.length === 0){
            this.head = this.tail = node
        } else {
            node.previous = this.tail
        }
        this.length += 1
    }

}