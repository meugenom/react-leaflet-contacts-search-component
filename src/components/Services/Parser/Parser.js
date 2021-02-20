import Lexer from './Lexer'

/**
 *  Syntax Tree is possible, but for first realisaton and quick search we need 
 *  to use 'map' and function 'sort()' for abc-sorting 
 *
 *  it will be in the future:
 *  Parses a stream of tokens into an Abstract Syntax Tree (AST)
 *  Concept: Absract Syntax Tree (AST), nodes , dynamic scoping, dynamic context
 *  Target: By nodes we can search more quickly and effecient. Nodes we can show as
 *          some filters in our html template
 *  
 *   {
 *      type: 'root',
 *      nodes: [
 *          {
 *          type: 'text',
 *          value: 'abc',
 *          position: {start: {column: 1 line: 1}, end: {column: 3, line: 1}}
 *          },
 *          {
 *          type: 'text',
 *          value: 'fde',
 *          position: {start: {column: 4 line: 1}, end: {column: 8, line: 1}}
 *          }, 
 *          ...
 *      ]
 *   }
 * 
 * 
 */

export default class Parser {
    constructor() {
        this.stream = new Lexer().getStream();
        this.sortedStream = [];
        
        //prepare stream to quick search
        this.prepare();
    }

    /**
     * @param {no}
     * @returns sorted stream for next using by searching of some value
     * this method isn't actuall if we havn't  hierarchial searching
     * @TODO need make hierarchial searching by word 
     */

    prepare(){
        // temp array consists of objects with position and sorting's value
        var list = this.stream
        var mapped = list.map(function (el, i) {
            return {
                index: i,
                token: el
            };
        });

        //sorting array
        mapped.sort(function (a, b) {
            if (a.token.getValue() > b.token.getValue()) {
                return 1;
            }
            if (a.token.getValue() < b.token.getValue()) {
                return -1;
            }
            return 0;
        });

        //result container
        var result = mapped.map(function (token) {
            return list[token.index];
        });
        this.sortedStream = result;        
        return result
    }

    /**
     * 
     * @param {searched value from input search, typed in the browser} word 
     * @returns {array of tokens, which have token.value like @param:word}
     */
    search(word) {
        var list = this.sortedStream;
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