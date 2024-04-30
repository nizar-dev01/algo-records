class Node {
    constructor(value, priority){
        this.value = value
        this.priority = priority
    }
}

class PriorityQueue {
    constructor(){
        this.values = []
    }

    enqueue(value, priority){
        const node = new Node(value, priority)
        this.values.push(node)
        this.bubbleUp(value)
    }

    bubbleUp(){
        const values = this.values
        let index = values.length - 1
        const element = values[index]
        while(index > 0){
            const parentIndex = Math.floor((index - 1) / 2)
            const parent = values[parentIndex]
            if(parent.priority >= element.priority) break
            values[index] = parent
            values[parentIndex] = element
            index = parentIndex
        }
    }

    dequeue(){
        const values = this.values
        if(values.length === 0) return null
        const head = values[0]
        const tail = values.pop()
        if(values.length){
            values[0] = tail
            this.sinkDown()
        }
        return head
    }

    sinkDown(){
        const values = this.values
        const length = values.length
        let index = 0
        while(true){
            const c1i = (index * 2) + 1
            const c2i = (index * 2) + 2
            let maxi;
            const element = values[index]
            let c1, c2
            
            if(c1i <  length){
                c1 = values[c1i]
                if(c1.priority > element.priority) {
                    maxi = c1i
                }
            }

            if(c2i < length) {
                c2 = values[c2i]
                if(
                    c1 && c1.priority < c2.priority
                    && c2.priority > element.priority
                    || !c1 && c2
                    && c2.priority > element.priority
                ){
                    maxi = c2i
                }
            }

            const currentEl = values[maxi] || 0
            if(values[index] >= currentEl) break
            values[maxi] = values[index]
            values[index] = currentEl
            index = maxi
        }
    }
}


const ER = new PriorityQueue()

ER.enqueue("common cold", 1)
ER.enqueue("gunshot wound", 5)
ER.enqueue("high fever", 2 )
