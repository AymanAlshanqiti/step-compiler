const tokenizerFile = require('./tokenizer');
const parserFile = require('./parser');

// to import file system module
const fs = require('fs');

const stepKeywords = ['let', 'var', 'int', 'float', 'string', 'boolean', 'if', 'else', 'for', 'while', 'end', 'print', 'def', 'return'];
const stepPunctuations = {
  '(': 'leftParen',
  ')': 'rightParen',
  '[': 'leftSquare',
  ']': 'rightSquare',
  ';': 'semicolon',
  ',': 'comma',
  '{': 'leftCurly',
  '}': 'rightCurly',
  ':': 'colon'
};
  
let sourceCode = fs.readFileSync('./examples/main.stp').toString('utf8');
let tokenizer = new tokenizerFile.Tokenizer(sourceCode, stepKeywords, stepPunctuations, true);

while (! tokenizer.isEof()) {
  console.log(tokenizer.tokenize());
}


// let parser = new parserFile.Parser(tokenizer);
