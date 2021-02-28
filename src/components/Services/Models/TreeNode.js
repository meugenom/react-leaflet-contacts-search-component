class TreeNode {
    
    constructor(name) { 
      this.name = name;      
      this.descendants = [];
    }

    setName(name){
        this.name = name;
    }

    addNode(node){
      this.descendants.push(node);
    }

    getName(){
        return this.name;
    }

    findParent(searchedNode){
      this.descendants.forEach(node=>{
        if(node == searchedNode){
          return this.TreeNode;
        }
      })
      return;
    }
    
  }

export default TreeNode;