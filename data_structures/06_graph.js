class Graph {
    constructor(){
        this.adjacencyList = {}
    }

    addVertex(data){
        if(this.adjacencyList[data]) return console.error(`The value "${data}" already exists`)
        this.adjacencyList[data] = []
    }

    addEdge(v1, v2){
        if(this.adjacencyList[v1] && this.adjacencyList[v2]){
            this.adjacencyList[v1].push(v2)
            this.adjacencyList[v2].push(v1)
        } else {
            return console.log("Please make sure the values you provide exist in the graph.")
        }
    }

    removeEdge(v1, v2){
        if(this.adjacencyList[v1] && this.adjacencyList[v2]){
            const v1Index = this.adjacencyList[v1].indexOf(v2)
            const v2Index = this.adjacencyList[v2].indexOf(v1)
            if(v1Index >= 0) this.adjacencyList[v1].splice(v1Index, 1)
            if(v2Index >= 0) this.adjacencyList[v2].splice(v2Index, 1)
        } else {
            return console.log("Please make sure the values you provide exist in the graph.")
        }
    }

    removeVertex(v){
        const vertex = this.adjacencyList[v]
        if(vertex){
            vertex.forEach(ver => {
                this.removeEdge(v, ver)
            })
            delete this.adjacencyList[v]
        } else return console.error("You cannot remove a vertext that doesn't exist in the graph!")
    }

    // Visit all vertices that are chained to the given vertex
    depthFirstRecursive(start){
        const result = []
        const visited = {}

        const dfs = vertex => {
            if(!vertex) return
            visited[vertex] = true
            result.push(vertex)
            this.adjacencyList[vertex].forEach(
                neighbor => {
                    if(!visited[neighbor]){
                        dfs(neighbor)
                    }
                }
            )
        }; dfs(start)

        return result
    }

    depthFirstIterative(start){
        const tmp = []
        tmp.push(start)

        const visited = {}
        const result = []

        while(tmp.length){
            const vertex = tmp.pop()
            if(!visited[vertex]){
                visited[vertex] = true
                result.push(vertex)
                this.adjacencyList[vertex].forEach(el => tmp.push(el))
            }
        }

        return result
    }

    breadthFirstIterative(start){
        const visited = {}
        const _process_queue = [start]
        
        const results = []
        while(_process_queue.length){
            const curr = _process_queue.shift()
            if(!visited[curr]) {
                visited[curr] = true
                results.push(curr)
                this.adjacencyList[curr].forEach(n => _process_queue.push(n))
            }
        }

        return results
    }
}

const g = new Graph()
g.addVertex("A")
g.addVertex("AA")
g.addVertex("AB")
g.addVertex("B")
g.addVertex("BA")
g.addVertex("BB")
g.addVertex("C")
g.addVertex("CA")
g.addVertex("CB")
g.addVertex("D")
g.addVertex("DA")
g.addVertex("DB")

g.addEdge("A", "AA")
g.addEdge("A", "AB")
g.addEdge("B", "BA")
g.addEdge("B", "BB")
g.addEdge("C", "CA")
g.addEdge("C", "CB")
g.addEdge("D", "DA")
g.addEdge("D", "DB")

g.addEdge("A", "BA")
// g.addEdge("B", "C")
// g.addEdge("C", "D")

// console.log(g.adjacencyList)
const bfs = g.breadthFirstIterative("A")
console.log(bfs)

// g.removeEdge("A", "C")
// g.removeEdge("A", "B")
// g.removeEdge("A", "B")

// console.log(g.adjacencyList)

// g.removeVertex("A")

// console.log(g.adjacencyList)

// console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
// console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
// g.depthFirstRecursive("A")


// console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
// console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
// g.addEdge("C", "D")
// g.depthFirstIterative("A")

// console.log("---------------")
// g.addVertex("D")
// g.addEdge("A", "D")
// g.addEdge("C", "D")
// g.deptFirstRecursive("A")

