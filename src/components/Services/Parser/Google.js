import streamStore from '../StreamStore'

export default class Google {
    constructor() {                      
    }


 /**
     * 
     * @param {searched value from input search, typed in the browser} word 
     * @returns {array of tokens, which have token.value like @param:word}
     */
    
    find(word) {
        
        //replace html entities from  the string
        word = word.replace(/([&<>\"'@#*\(\)])/g,"")       
        
        var list = streamStore.get();
        
        var result = []     
        var patternWord = word.toLowerCase();
        

        if (word.length >= 1) {
            list.map(function (token) {
                //number returns already undefined
                // it will be checked as string or number
                if (isNaN(token.getValue())) {

                    var value = token.getValue();
                    var type = token.getType();

                    //if (value.toLowerCase() == patternWord || type == patternWord) {
                    if ((value.toLowerCase()).match(patternWord)  || type==patternWord ) {
                        result.push(token);
                    }
                } else {
                    //if (token.getValue() == patternWord) {
                    if ((token.getValue()).match(patternWord)) {
                        result.push(token);
                    }
                }
            })            
            //remove double values and return 
            return this.uniq(result);
        }
        //if result []
        return result;
    }

    /**
     * @param {array with doubled tokens} a
     * @returns {array without unidue values}  
     */
    uniq(a) {
        return a.sort(function (a, b) {                                
            if (a.getId() > b.getId()) {
                return 1;
            }
            if (a.getId() < b.getId()) {
                return -1;
            }
            return 0;                
        }).filter(function(item, pos, ary) {
            return !pos || item.getId() != ary[pos - 1].getId();
        });
    }

}