function findLongestSubstring(str){
    let start = 0
    let end = 0
    let minlen = 0
    
    while(true){
        let currentLetter = str[end]
        let nextLetter = str[end + 1]
        if(currentLetter === nextLetter){
            minlen = end - start
            start++
            end++
        } else if(currentLetter != nextLetter && end < str.length){
            end++
        } else {
            break
        }
    }
    return minlen
}