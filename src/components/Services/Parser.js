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
        //make searched map
        this.prepare();
    }


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

    getAnyTokenByID(id){
        var list = this.sortedStream;
        var result = []
        list.map(function(token){
            //console.log("id: "+ id + "  token.id: "+ token.getId())            
            if(id == token.getId()){
              result.push(token);  
            }
        })
         return this.uniq(result);
    }

    search(word) {
        var list = this.sortedStream;
        var result = []
        var patternWord = word.toLowerCase();
        //var pattern = "/" + patternWord + "/"

        if (word.length >= 2) {

            list.map(function (token) {

                //number returns already undefined
                // it will be checked as string or number
                if (isNaN(token.getValue())) {

                    var value = token.getValue();
                    var type = token.getType();

                    if (value.toLowerCase() == patternWord || type == patternWord) {

                        result.push(token);

                    }

                } else {

                    if (token.getValue() == patternWord) {

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

    findMatches(str, pattern) {
        return str.match(pattern)
    }

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
            //console.log(item.getId())
            return !pos || item.getId() != ary[pos - 1].getId();
        });
    }

}