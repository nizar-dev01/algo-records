class MaxBinaryHeap {
    constructor (){
        this.values = []
    }

    insert(value){
        this.values.push(value)
        this.pubbleUp()
    }

    bubbleUp(){
        const values = this.values
        let index = values.length
        while(index > 0){
            const parentIndex = Math.floor((index - 1) / 2)
            const parent = values[parentIndex]
            if(parent >= value) break
            values[index] = parent
            values[parentIndex] = value
            index = parentIndex
        }
    }

    extractMax(){
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
            const value = values[index]
            let c1, c2
            
            if(c1i <  length){
                c1 = values[c1i]
                if(c1 > value) {
                    maxi = c1i
                }
            }

            if(c2i < length) {
                c2 = values[c2i]
                if(c1 && c1 < c2 && c2 > value || !c1 && c2 > value){
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

const heap = new MaxBinaryHeap();

[1,2,3,4,5].forEach(el => heap.insert(el))


const done = true