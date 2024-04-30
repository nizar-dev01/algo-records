class Node {
    constructor(value, priority){
        this.value = value
        this.priority = priority
    }
}

// Have some issues while iterating. That's why the naive implementation of the PriorityQueue bellow is used in the algorithm
class _PriorityQueue {
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
            if(element.priority >= parent.priority) break
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

class PriorityQueue {
    constructor(){
        this.values = []
    }

    enqueue(value, weight){
        this.values.push({value, weight})
        this.sort()
    }

    dequeue(){
        return this.values.shift()
    }

    sort(){
        this.values.sort((a, b) => a.weight - b.weight)
    }
}

class WeightedGraph {
    constructor(){
        this.adjacencyList = {}
    }

    addVertex(vertex){
        if(this.adjacencyList[vertex]) return console.error(`The value "${vertex}" already exists`)
        this.adjacencyList[vertex] = []
    }

    addEdge(v1, v2, weight){
        if(this.adjacencyList[v1] && this.adjacencyList[v2]){
            this.adjacencyList[v1].push({
                node: v2,
                weight
            })
            this.adjacencyList[v2].push({
                node: v1,
                weight
            })
        } else {
            return console.log("Please make sure the values you provide exist in the graph.")
        }
    }

    _Dijkstra(start, finish){
        const nodes = new PriorityQueue() // visited
        const distances = {}
        const previous = {}
        let visiting

        // Build up the initial state
        for(let vertex in this.adjacencyList){
            if(vertex === start){
                distances[vertex] = 0
                nodes.enqueue(vertex, 0)
            } else {
                distances[vertex] = Infinity
            }
            previous[vertex] = null
        }
        
        const path = {}
        // As long as there is something to visit
        while(nodes.values.length){
            // Visit the closest node in the queue (The queue is sorted, so the first item will be the closest always)
            visiting = nodes.dequeue().value
            // If we reach the end
            if(visiting === finish){
                // Done
                const _path = []
                let pathPrevious = visiting;
                while(pathPrevious){
                    _path.push(pathPrevious)
                    pathPrevious = previous[pathPrevious]
                }
                path.distance = distances[visiting]
                path.path = _path.reverse()
                break
                // Build up the path to return at the end
            }
            if(visiting && distances[visiting] !== Infinity){
                for(let neighbor of this.adjacencyList[visiting]){
                    const nbrNode = neighbor.node
                    const nbrNewDistance = distances[visiting] + neighbor.weight
                    const nbrCurrentDistance = distances[nbrNode]
                    // if the new distance is shorter
                    if(nbrNewDistance < nbrCurrentDistance){
                        // Updating the visiting distance from start to the neighbor
                        distances[nbrNode] = nbrNewDistance
                        // Updating the previous node, through which the new shortest distance is found
                        previous[nbrNode] = visiting
                        nodes.enqueue(nbrNode, nbrNewDistance)
                    }
                }
            }
        }
        return path
    }

    Dijkstra(start, finish){
        const nodes = new PriorityQueue()
        const distances = {}
        const previous_vertex_for_optimal_path = {}
        const optimal_path = {
            distance: Infinity,
            path_vertices: []
        }

        // Build up the initial data
        for(let vertex in this.adjacencyList){
            let _weight = vertex === start ? 0 : Infinity

            distances[vertex] = _weight
            if(!_weight) nodes.enqueue(vertex, _weight)
            // previous_vertex_for_optimal_path[vertex] = null
        }

        // Find the path
        while(nodes.values.length){
            const current_vertex = nodes.dequeue().value
            if(current_vertex === finish){
                let _prev_vertex = finish
                let _vertices = []
                while(_prev_vertex){
                    _vertices.push(_prev_vertex)
                    _prev_vertex = previous_vertex_for_optimal_path[_prev_vertex]
                }

                optimal_path.distance = distances[finish]
                optimal_path.path_vertices = _vertices.reverse()
                break
            } else {
                // Decide which way to go next
                for(let edge of this.adjacencyList[current_vertex]){
                    const nbrName = edge.node
                    const nbrDistanceNew = edge.weight + distances[current_vertex]
                    const nbrDistanceOld = distances[nbrName]

                    if(nbrDistanceNew < nbrDistanceOld){
                        distances[nbrName] = nbrDistanceNew
                        previous_vertex_for_optimal_path[nbrName] = current_vertex
                        nodes.enqueue(nbrName, nbrDistanceNew)
                    }
                }
            }
        }
        return optimal_path
    }
}

const g = new WeightedGraph()

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")

g.addEdge("A", "B", 4)
g.addEdge("A", "C", 2)
g.addEdge("B", "E", 3)
g.addEdge("C", "D", 2)
g.addEdge("C", "F", 4)
g.addEdge("D", "E", 3)
g.addEdge("D", "F", 1)
g.addEdge("E", "F", 2)

const paths = g.Dijkstra("A", "E")

console.log(paths)

// g.addVertex("A")
// g.addVertex("AA")
// g.addVertex("AB")
// g.addVertex("B")
// g.addVertex("BA")
// g.addVertex("BB")
// g.addVertex("C")
// g.addVertex("CA")
// g.addVertex("CB")
// g.addVertex("D")
// g.addVertex("DA")
// g.addVertex("DB")

// g.addEdge("A", "AA", 1)
// g.addEdge("A", "AB", 2)
// g.addEdge("B", "BA", 3)
// g.addEdge("B", "BB", 4)
// g.addEdge("C", "CA", 5)
// g.addEdge("C", "CB", 6)
// g.addEdge("D", "DA", 7)
// g.addEdge("D", "DB", 8)

// g.addEdge("A", "B", 9)
// g.addEdge("B", "C", 10)
// g.addEdge("C", "D", 11)

// module.exports = WeightedGraph