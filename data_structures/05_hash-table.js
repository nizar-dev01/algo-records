class HashTable {
    constructor(size=53){
        this.keymap = new Array(size)
    }

    _hash(key){
        let total = 0;
        const WEIRD_PRIME = 31;
        for(let i = 0; i < Math.min(key.length, 100); i++){
            const char = key[i];
            const value = char.charCodeAt(0) - 96
            total = (total * WEIRD_PRIME + value) % this.keymap.length
        }
        return total
    }

    set(key, value){
        const hash = this._hash(key)
        const data = [key, value]
        const current_val = this.keymap[hash]
        if(current_val){
            const firstEl = current_val[0]
            if(Array.isArray(firstEl)){
                if(!current_val.find(entry => entry[0] === key)){
                    current_val.push(data)
                    return data
                } else return null
            } else if(typeof  firstEl=== "string"){
                this.keymap[hash] = [
                    current_val,
                    data
                ]
            }
        } else {
            this.keymap[hash] = [key, value]
        }
        return data
    }

    get(key){
        const hash = this._hash(key)
        const target_node = this.keymap[hash]
        if(!target_node) return null
        const target_val = target_node[0]
        if(typeof target_val === "string") return target_node
        if(Array.isArray(target_val)){
            const found = target_node.find(entry => entry[0] === key)
            return found || null
        }
        return null
    }
    
}
const ht = new HashTable()

ht.set('name', 'nizar')
ht.set('nizar', 'programmer')

const end = htrue