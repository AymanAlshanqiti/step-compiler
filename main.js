const tokenizerFile = require('./tokenizer');
const parserFile = require('./parser');

// to import file system module
const fs = require('fs');

const stepKeywords = ['let', 'if', 'else', 'for', 'while', 'end', 'print', 'def', 'return'];
const datatypes = ['int', 'float', 'string', 'boolean'];
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
let tokenizer = new tokenizerFile.Tokenizer(sourceCode, stepKeywords, datatypes, stepPunctuations);
let tokens = [];

while (!tokenizer.isEof()) {
  tokens.push(tokenizer.tokenize());
}

let parser = new parserFile.Parser(tokens);

let syntaxTree = [];

syntaxTree = parser.parse();

toJSON = (tokens) => {
  let tokensArray = tokens;
  // console.log(tokensArray);
}

toJSON(tokens);

// console.log('tokens: ', tokens);
console.log('syntaxTree: ', syntaxTree);
// console.log(parser.parse());
