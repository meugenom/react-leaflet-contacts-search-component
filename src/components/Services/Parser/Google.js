import streamStore from '../StreamStore';
import grammar from '../Grammar';

export default class Google {

    /**
     * 
     * @param {searched value from input search, typed in the browser} word 
     * @returns {array of tokens, which have token.value like @param:word}
     */

    find(word) {

        var list = streamStore.get();
        var result = []
        var patterns = grammar.tokens.patterns;

        if (word != null && word.length >= 1 && word != undefined) {

            word = word.toLowerCase();
            //slice word if > 20 symbols
            word = word.slice(0, 20);

            //replace html entities from  the string            
            word = word.replace(/([&<>\"'@#*+\(\)])/g, "");

            //delete backspaces in the start and end of the word
            word = word.trim();

            //if in the search input we have more searched words
            var splitedWords = this.splitWord(word);
            splitedWords = this.replaceUncorrectedWords(splitedWords, patterns)                

            list.map(token => {

                for (var keyWord in splitedWords) {

                    var splitedWord = splitedWords[keyWord];


                //number returns already undefined
                // it will be checked as string or number
                if (isNaN(token.getValue())) {

                    var value = token.getValue();
                    var type = token.getType();       
                
                    if ((value.toLowerCase()).match(splitedWord) || type == splitedWord) {
                        
                        result.push(token);

                    }

                } else {
                
                    if ((token.getValue()).match(splitedWord)) {
                        
                        result.push(token);

                    }
                }
            }
            
        })

            return this.matchBySearchedWords(result, splitedWords)
            
            //remove double values and return 
            //return this.uniq(result);
            
        }
        //if result []
        return result;
    }

    /**
     * 
     * @param {*} inputArray 
     * @param {*} splitedWords 
     */

    matchBySearchedWords(inputArray, splitedWords) {

        var inputObject = {};
        for (var keyWord in splitedWords) {
            inputObject[splitedWords[keyWord]] = []
        }
        inputObject["text@en"] = []
        inputObject["text@ru"] = []

        inputArray.map(token => {
            for (var key in inputObject) {
                if (token.getType() == key && key != 'text@en' && key != 'text@ru') {
                    (inputObject[key]).push(token)
                }
                if (token.getValue().toLowerCase().match(key)) {
                    (inputObject[key]).push(token)
                }
            }
        })


        for (var key in inputObject) {
            inputObject[key] = this.uniq(inputObject[key])
        }


        var resultObject = {}
        var count = 0;
        for (var key in inputObject) {
            if (count > 0 && inputObject[key].length > 0) {
                var b = inputObject[key]
                resultObject[count] = [];
                // eslint-disable-next-line no-loop-func
                b.map(tokenB => {
                    resultObject[count - 1].map(token => {
                        if (token.getId() == tokenB.getId()) {
                            resultObject[count].push(token);
                        }
                    })
                })
                count++;
            }
            if (count == 0) {
                resultObject[count] = inputObject[key];
                count++;
            }
        }
        console.log(splitedWords)
        //console.log(result)
        //console.log('count: '+count)
        //console.log(inputObject)
        //console.log(resultObject[count-1])
        return resultObject[count - 1]
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
        }).filter(function (item, pos, ary) {
            return !pos || item.getId() != ary[pos - 1].getId();
        });
    }

    splitWord(word) {
        return word.split(' ');
    }

    findMatches(word, pattern) {
        return word.match(pattern)
    }

    /**
     * 
     * @param {*} splitedWords is array with splited words from search input
     * @param {*} patterns is regex expressions from Grammar.js
     * @return corrected array if we have errors in the search input
     * for example in search input 'pithon java js'
     * this function returns ['python','java','javascript']
     */
    replaceUncorrectedWords(splitedWords, patterns) {
        //need to correct words if we type js or angularjs or javascript ... it's all about javascript
        for (var keyWord in splitedWords) {
            for (var keyPatern in patterns) {
                const array = this.findMatches(splitedWords[keyWord], patterns[keyPatern]);
                if (array != null) {
                    array.forEach(value => {
                        if (keyPatern != 'text@en' && keyPatern != 'text@ru' && value != undefined && value != null) {
                            splitedWords[keyWord] = keyPatern;
                            //console.log('real-word: '+splitedWords[keyWord]+'  pattern-word: '+keyPatern +' value: '+value);           
                        }
                    })
                }
            }
        }

        return splitedWords;
    }
}