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
}


const list = new singlyLinkedList();
["1", "2", "3", "4", "5"].forEach(el => list.push(el))

console.log("\nBefore popping\n---------------------\n", list)

list.pop()

console.log("\nAfter popping\n---------------------\n", list)