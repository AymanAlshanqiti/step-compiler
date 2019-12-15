const tokenFile = require('./token');

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const letters = 'abcdefghijklmnopqrstuvwxyz';

class Tokenizer {
  constructor(sourceCode, stepKeywords=[], punctuations={}, ignoreWhitespace=false) {
    this.position = -1;
    this.lineNumber = 1;
    this.ignoreWhitespace = true;
    this.stepKeywords = stepKeywords;
    this.punctuations = punctuations;
    this.sourceCode = sourceCode;
    this.length = this.sourceCode.length;
  }

  isEof = () => {
    return !(this.position < this.length);
  }
  
  isPeekable = () => {
    return (this.position + 1) < this.length;
  }
  
  peek = () => {
    if (this.isPeekable()) {
      return this.sourceCode[this.position + 1];
    }
    return '\0';
  }

  numberTokenizer = () => {
    let character = this.sourceCode[this.position];
    let token = new tokenFile.Token('integer_literal', character, 'literal', this.position, this.lineNumber);
    this.position += 1;
    while (!this.isEof()) {
      character = this.sourceCode[this.position];
      if (!(character in numbers)){
        this.position -= 1;
        break;
      } else {
        token.value += character;
        this.position += 1;
      } 
    }
    return token
  }

  identifierTokenizer = () => {
    let character = this.sourceCode[this.position];
    let token = new tokenFile.Token('id', character, 'identifier', this.position, this.lineNumber);
    this.position += 1;
    while (!this.isEof()) {
      character = this.sourceCode[this.position]
      if (!(letters.includes(character.toLowerCase())) || (character == '_')) {
        this.position -= 1;
        break;
      } else {
        token.value += character;
        this.position += 1;
      }
    }
    if (this.stepKeywords.includes(token.value)) {
      token.category = 'keyword';
      token.tid = token.value + '_keyword';
      return token;
    }
    return token;
  }
 
  tokenize = () => {
    this.position += 1;
    while (!this.isEof()) {
      let character = this.sourceCode[this.position];
      if (character in numbers) {
        return this.numberTokenizer();
      } else if (letters.includes(character.toLowerCase()) || character === '_') {
        
        return this.identifierTokenizer();
      } else {
        return new tokenFile.Token('error', character, 'error', this.position, this.lineNumber);
      }
    }
    return new tokenFile.Token('EOF', 'EOF', 'EOF', this.position, this.lineNumber);
  }
}
  
module.exports.Tokenizer = Tokenizer;
  