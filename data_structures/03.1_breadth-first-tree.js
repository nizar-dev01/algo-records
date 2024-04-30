const { LinkedList } = require("./01_singly-linked-list");
const { Tree } = require("./03_binary-search-tree");

function findInTree(tree, val){
    const Queue = new LinkedList()
    Queue.push(tree.root)
    let found = null
    let end = false
    let current;
    
    while(found === null && end === false){
        if(Queue.length){
            current = Queue.shift().value
            console.log("Current value : ", current.value)
            if(current.value === val){
                found = current
            } else {
                if(current.left) Queue.push(current.left)
                if(current.right) Queue.push(current.right)
            }
        } else end = true
    }
    return found
}

const tree = new Tree()
tree._fill_random(100)

const done = true