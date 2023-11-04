const { LinkedList } = require("./01_singly-linked-list");

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        const node = new Node(value)
        if (this.root === null) {
            this.root = node
            return this
        } else {
            let current = this.root
            while (true) {
                const currentVal = current.value
                if (value === currentVal) {
                    return undefined
                } else if (value > currentVal) {
                    if (!current.right) {
                        current.right = node
                        break
                    } else current = current.right
                } else {
                    if (!current.left) {
                        current.left = node
                        break
                    } else current = current.left
                }
            }
        }
    }

    find(value) {
        let current = this.root
        while (true) {
            const currentVal = current.value
            if (value === currentVal) return current
            else if (value > currentVal) {
                if (current.right) current = current.right
                else return null
            } else if (current.left) current = current.left
            else return null
        }
    }

    _fill_random(len = 100, min = 1) {
        for (let i = 0; i < len; i++) {
            this.insert(
                Math.floor(
                    min + Math.random() * (len - min) + 1
                )
            )
        }
    }
}