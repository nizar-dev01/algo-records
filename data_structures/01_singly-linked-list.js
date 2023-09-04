class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class singlyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    push(value) {
        const newNode = new Node(value)
        if (!this.head) {
            this.head = this.tail = newNode
        } else {
            this.tail.next = this.tail = newNode
        }
        this.length += 1
    }

    pop() {
        if (!this.length) {
            return undefined
        } else if (this.length === 1) {
            const ghost_node = this.head
            this.head = this.tail = null
            this.length = 0
            return ghost_node
        } else {
            let current = this.head
            let newTail = current
            while (current.next) {
                newTail = current
                current = current.next
            }
            this.tail = newTail
            this.tail.next = null
            this.length -= 1
            return current

        }
    }

    shift() {
        if(!this.length) return undefined
        const orphan = this.head
        this.head = orphan.next
        this.length -= 1
        if(this.length === 0) this.tail = null
        return orphan
    }

    unshift(value) {
        const newNode = new Node(value)
        if(this.length === 0){
            this.head = this.tail = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length += 1
        return newNode
    }

    get(index){
        if(index < 0 || index >= this.length) return null
        let currentNode = this.head
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next
        }
        return currentNode
    }

    set(index, value){
        const currentNode = this.get(index)
        if(currentNode){
            currentNode.value = value
        }
        return !!currentNode
    }

    reverse(){
        if(!this.length || this.length === 1) return false
        let currentNode = this.head
        let previousNode = null
        while(currentNode){
            const next = currentNode.next
            currentNode.next = previousNode
            
            previousNode = currentNode
            currentNode = next
        }
        const detachedHead = this.head
        this.head = this.tail
        this.tail = detachedHead
        return true
    }

    print() {
        const temp_list = []
        let current_node = this.head
        while (current_node) {
            temp_list.push(current_node.value)
            current_node = current_node.next
        }
        console.log(temp_list)
    }
}


const list = new singlyLinkedList();
["1", "2", "3", "4", "5"].forEach(el => list.push(el))

console.log("\nBefore popping\n---------------------\n", list)

list.pop()

console.log("\nAfter popping\n---------------------\n", list)