const tokenFile = require('./token');

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const letters = 'abcdefghijklmnopqrstuvwxyz';

class Tokenizer {
  constructor(sourceCode, stepKeywords=[], datatypes=[],  punctuations={}, ignoreWhitespace=false) {
    this.position = -1;
    this.lineNumber = 1;
    this.ignoreWhitespace = ignoreWhitespace;
    this.stepKeywords = stepKeywords;
    this.datatypes = datatypes;
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
    return token;
  }

  identifierTokenizer = () => {
    let character = this.sourceCode[this.position];
    let token = new tokenFile.Token('id', character, 'identifier', this.position, this.lineNumber);
    this.position += 1;
    while (!this.isEof()) {
      character = this.sourceCode[this.position]
      if (!((letters.includes(character.toLowerCase())) || (character == '_') || (character in numbers))) {
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
    } else if (this.datatypes.includes(token.value)) {
      token.category = 'datatype';
      token.tid = token.value + '_datatype';
      return token;
    }
    return token;
  }

  whitespaceTokenizer = () => {
    let character = this.sourceCode[this.position];
    let token = new tokenFile.Token('whitespace', character, 'whitespace', this.position, this.lineNumber);
    this.position += 1;
    while (!this.isEof()) {
      character = this.sourceCode[this.position]
      if (!character == ' ') {
        this.position -= 1;
        break;
      } else { // isspace
        if (character == '\n') {
          this.lineNumber += 1;
        }
        token.value += character;
        this.position += 1;
      }
    }
    return token;
  }

  oneLineCommentTokenizer = () => {
    this.position += 1;
    let character = this.sourceCode[this.position];
    let token = new tokenFile.Token('one_line_comment', character, 'comment', this.position, this.lineNumber);
    this.position += 1;
    while (!this.isEof()) {
      character = this.sourceCode[this.position];
      if (character == '\n') {
        this.position -= 1;
        break;
      } else {
        token.value += character;
        this.position += 1;
      }
    }
    return token;
  }

  multiLineCommentTokenizer = () => {
    if (this.peek() == '*') {
      this.position += 2;
      let character = this.sourceCode[this.position];
      let token = new tokenFile.Token('multi_line_comment', character, 'comment', this.position, this.lineNumber);
      this.position += 1;
      while (!this.isEof()) {
        character = this.sourceCode[this.position];
        if (character == '*') {
          if (this.peek() == '/') {
            this.position += 2;
            break;
          } else {
            token.value += character
            this.position += 1;
          }
        } else {
          token.value += character
          this.position += 1;
        }
      }
      return token;
    }
  }
 
  tokenize = () => {
    this.position += 1;
    while (!this.isEof()) {
      let character = this.sourceCode[this.position];
      if (character in numbers) {
        return this.numberTokenizer();
      } else if (letters.includes(character.toLowerCase()) || character === '_') {
        return this.identifierTokenizer();
      } else if ((character == ' ') || (character == '\n')) {
        return this.whitespaceTokenizer();
      } else if (character == '#') {
        return this.oneLineCommentTokenizer()
      } else if (character == '/') {
        return this.multiLineCommentTokenizer();
      } else {
        return new tokenFile.Token('error', character, 'error', this.position, this.lineNumber);
      }
    }
    return new tokenFile.Token('EOF', 'EOF', 'EOF', this.position, this.lineNumber);
  }
}
  
module.exports.Tokenizer = Tokenizer;
  