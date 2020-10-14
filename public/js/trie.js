class trieNode{
    constructor(){
        this.terminationCount = 0; //marks the number of strings that end at a particular node
        this.childrenNodes = {} //stores the children of each trieNode
        this.facultyMatches = [] //contains data related to faculty with the matching name
    }
}

class trie {
    constructor(){
        this.root = new trieNode()
    }
    
    findNearMatches(baseNode,name,matches){
        let childrenNodes = baseNode.childrenNodes
        let childrenKeys  = Object.keys(childrenNodes)
        if(baseNode.terminationCount>0){
            //means near match found
            matches["data"] = matches["data"].concat(baseNode.facultyMatches)
        }
        
        for( const childKey of childrenKeys){
            this.findNearMatches(childrenNodes[childKey],name+childKey,matches)
        }
    }
    
    //method to allow searching for a particular string "q" in trie
    queryExact(q){ 
        let currentNode = this.root
        for(const character of q){
            if(Object.keys(currentNode.childrenNodes).includes(character)){
                currentNode =  currentNode.childrenNodes[character]
            }
            else{
                return null //match not found, ends query function here
            }
        }
        
        return currentNode  //useful for other methods like query 
    }
    
    query(q){
        //search for the trie for given query first
        let t1= performance.now()
        let baseNode = this.queryExact(q)
        
        if(!baseNode){  //checks first if an exact match even exists
            
            //means "q" not found in trie
            let t2 = performance.now()
            return {data: [], time: t2-t1}

        }
        else{
            //then report exact matches first
            
            //then check children of currentNode to find near matches
            let matches = {
                data: []    // empty array indicates no exact or near match found
            }

            for(let i=0;i<baseNode.terminationCount;i++){
                matches["data"] = matches["data"].concat(baseNode.facultyMatches)
            }
            
            this.findNearMatches(baseNode,q,matches)
            
            let t2 = performance.now()

            return {
                        data: matches["data"],
                        time:t2-t1
                   }  //returns data to be update in UI
            
        }
    }
    
    //method to insert string s in trie
    insert(faculty){
        let currentNode = this.root
        for(const character of faculty.name){

            //checks if child node from corresponding character already exists
            if(Object.keys(currentNode.childrenNodes).includes(character)){
            
                //child node already exists and doesn't need to be created newly
            
            }
            else{
                //child node doesn't exist so new one has to be created
                currentNode.childrenNodes[character] = new trieNode()
            }
            
            //assigning current node to the next child node for the string s
            currentNode = currentNode.childrenNodes[character]
        }
        
        //increasing termination count for last child node where string ends
        currentNode.terminationCount += 1;
        
        //add info of current faculty to trie
        currentNode.facultyMatches.push(faculty)
        
    }
    
    insertMultiple(data){
        for(const string of data){
            this.insert(string)
        }
    }
}


t= new trie()
t.insertMultiple(data)  // stores data stored in linear fashion in a trie