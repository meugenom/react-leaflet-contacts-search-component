import grammar from '../Grammar'
import Lexer from './Lexer'
import Parser from './Parser'
import Google from './Google'
import streamStore from '../../Services/StreamStore'
import data from '../../../data/persons.json'



describe('Testing ability to search words for Google module with different words', () => {
    
    it('if word is null value', () => {
        
        //prepare stream
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)        
        const sortedstream = parser.prepare()
        streamStore.set(sortedstream);

        const word = null
        const finder = new Google();
        const result = finder.find(word)

        expect(result).toEqual([]);

    });

    it('if word has > 20 symbols', () => {
        
        //prepare stream
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)        
        const sortedstream = parser.prepare()
        streamStore.set(sortedstream);

        const word = 'asdsdsdkjjwkekwedfghjkl1qwertyuiopzxcvbnm,'
        const finder = new Google();
        const result = finder.find(word)

        expect(result).toEqual([]);

    });

    it('if word has html symbols and backspaces', () => {
        
        //prepare stream
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)        
        const sortedstream = parser.prepare()
        streamStore.set(sortedstream);

        const word = '< java>#@& <>*'
        const finder = new Google();
        const result = finder.find(word)

        expect(result.length).toEqual(8);

    });

    it('if word has uppercase and lowercase symbols', () => {
        
        //prepare stream
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)        
        const sortedstream = parser.prepare()
        streamStore.set(sortedstream);

        const word = 'jAvA'
        const finder = new Google();
        const result = finder.find(word)

        expect(result.length).toEqual(8);

    });

    it('test function for correction word\'s  from input search replaceUncorrectedWords()', () => {
        var patterns = grammar.tokens.patterns;
        
        const array = ['js', 'java', 'pithon']
        const finder = new Google();
        const result = finder.replaceUncorrectedWords(array, patterns)

        expect(result).toEqual(['javascript','java','python']);

    });
    
    it('if word has two and more searched values', () => {
        
        //prepare stream
        const lexer = new Lexer(data);
        const stream = lexer.getStream();
        const parser = new Parser(stream)        
        const sortedstream = parser.prepare()
        streamStore.set(sortedstream);

        const word = 'java ai vava'
        const finder = new Google();
        const result = finder.find(word)
        
        //console.log(result[0].getId())

        expect(result[0].getId()).toEqual(8);

    });


});