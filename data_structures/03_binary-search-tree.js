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

    bfs() {
        const data = []
        const queue = new LinkedList()
        queue.push(this.root)

        let current;
        while (queue.length) {
            current = queue.shift().value
            data.push(current.value)
            if (current.left) queue.push(current.left)
            if (current.right) queue.push(current.right)
        }
        return data
    }

    dfs(mode = "pre") {
        const data = []
        const traverse = node => {
            if (mode !== "post") data.push(node.value)
            if (node.left) traverse(node.left)
            if (node.right) traverse(node.right)
            if (mode === "post") data.push(node.value)
        }
        traverse(this.root)
        return data
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