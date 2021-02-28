import Lexer from './Lexer'
import data from '../../../data/persons.json'

describe('Testing ability to make streams for Lexer module with different data sets', () => {
    
    it('if data is null then return  clearly array', () => {
        
        const data = null
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        expect(stream).toEqual([]);

    });

    it('if data is clearly array then returns clearly array', () => {
        
        const data = []
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        expect(stream).toEqual([]);

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
                
        expect(stream).toBe(stream);

    });

    it('if data is not clearly and has html symbols', () => {
        
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
                    "city": "<\>Offenbach* &am Main",
                    "about":"Java, %@!^",
                    "state": "Hessen",
                    "name": "test&#9<>name/>",
                    "username":"Boris Backer",
                    "img" : ""
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
                    "about": "-@&*! Javascript",
                    "state": "Hessen",
                    "name":"Eugen M.",
                    "username":"eugenemdev",
                    "img" : "https://homepages.cae.wisc.edu/~ece533/images/cat.png"
                }
            }]}

        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        expect(stream).toBe(stream);

    });


    it('if data is simple array from ./data/persons.json and number of tokens in the stream is 82', () => {
        
        const lexer = new Lexer(data);
        const stream = lexer.getStream();        
        //console.log(stream)        
        expect(stream.length).toBe(82);

    });


});