import persons from '../../data/persons.json';
import grammar from './Grammar'
import Token from './Token'

/**
 * Lexer's concept is:
 *   - token stream
 *   - token
 *   - lexical scoping
 *   - lexical context
 *   
 *   @param json file with information about developers
 *   @param Grammar.js with description of tokens      
 *   @return token stream
 *   
 *   @example:
 *       {
 *           type: 'text',
 *           value: 'this is the test',
 *           id: 12,
 *           position : {
 *              start: {
 *                  line: 0,
 *                  column: 1
 *              },
 *              end: {
 *                  line: 0,
 *                  column: 3
 *              }  
 *           },
 *           "geometry": {
 *              "type": "Point",
 *              "coordinates": [ "7.705953", "52.358919"]
 *            }   
 *        }
 *
 */

const Lexer =  class Lexer {

    constructor(){
        
        this.stream = [];
        this.data = persons;

    }
    
    getStream(){

        var patterns = grammar.tokens.patterns;

        this.data.features.forEach(feature => {                    
            
            this.createToken(feature, 'name');
            this.createToken(feature, 'username');
            this.createToken(feature, 'company');
            this.createToken(feature, 'age');       
                 
            this.checkTokens(feature.properties.about, feature);
            this.checkTokens(feature.properties.address, feature);        
            
        })  

        return this.stream
    }

    checkTokens(str, feature){
        var patterns = grammar.tokens.patterns;
        var line = 0;
        var column = 0;

        for(var key in patterns){            
            const array = this.findMatches(str, patterns[key]);           
            if(array!=null){
                array.forEach(value => {
                    
                    var token = new Token();
                    token.setType(key);
                    token.setValue(value);
                    token.setPositionStartLine(line);
                    token.setPositionStartColumn(column);
                    column = String(value).length;
                    token.setPositionEndLine(line);
                    token.setPositionEndColumn(column);
                    token.setId(feature.id);
                    token.setFeature(feature);
                    this.stream.push(token);           

                })
            }
            
        }

    }

    createToken(feature, type){
        
        var line = 0;
        var column = String(feature.properties[type]).length;
        var token = new Token();

        token.setType(type);
        token.setValue(feature.properties[type]);
        token.setPositionStartLine(line);
        token.setPositionStartColumn(0);            
        token.setPositionEndLine(line);
        token.setPositionEndColumn(column);
        token.setId(feature.id);
        token.setFeature(feature);                     
        
        this.stream.push(token);           
    }
     
    findMatches(str, pattern){        
        return str.match(pattern)
    }


}

export default Lexer;