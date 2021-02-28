import Lexer from './Lexer'
import Parser from './Parser'

import data from '../../../data/persons.json'

describe('Testing ability to sorting stream with different data sets', () => {
    
    it('if data is null then return  clearly array', () => {
        
        const data = null
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)
        const sortedstream = parser.prepare()
        expect(sortedstream).toEqual([]);

    });

    
    it('if data is clearly array then returns clearly array', () => {
        
        const data = []
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)
        const sortedstream = parser.prepare()
        expect(sortedstream).toEqual([]);

    });


    it('if data is not clearly and has null properties', () => {
        
        const data = {
            "type": "FeatureCollection",
            "features": [
              {
                "type":"Feature",
                "id":0,
                "geometry":{
                    "coordinates":[8.6820917, 50.1106444],
                    "type":"Point"},
                "properties":{
                    "city": null,
                    "about":"Java",
                    "state": "Hessen",
                    "name": null,
                    "username":"Boris Backer",
                    "img" : null
                }
            },
            { 
                "type":"Feature",
                "id":1,
                "geometry":{
                    "coordinates":[8.7665, 50.1006],
                    "type":"Point"},
                "properties":{
                    "city":"Offenbach",
                    "about": null,
                    "state": null,
                    "name":"Eugen M.",
                    "username":"eugenemdev",
                    "img" : "https://homepages.cae.wisc.edu/~ece533/images/cat.png"
                }
            }]}
        
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)
        const sortedstream = parser.prepare()
        expect(sortedstream.length).toBe(stream.length);

    });

    it('if data is simple array from ./data/persons.json and number of tokens in the stream is 74', () => {
        
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)
        const sortedstream = parser.prepare()
        expect(sortedstream.length).toBe(stream.length);

    });
    

});