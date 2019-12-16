const TokenizerFile = require('./tokenizer');


class Parser {
  constructor(tokens=[]) {
    this.tokens = tokens;
    this.length = this.tokens.length;
    this.position = -1;
    this.currentToken = null;
    this.nextToken = null;
    this.currentLevel = 0;
    // this.isFirstToken = true;
  }

  syntaxError = (token, message) => {
    console.error('[Step(syntax error)]: ' + message + ', ' + token.value + ', line number: ' + token.lineNumber.toString() + ', position: ' + token.position.toString());
  }

  isEot = () => {
    return !(this.position < this.length);
  }

  isPeekable = () => {
    return (this.position + 1) < this.length;
  }
  
  peek = () => {
    if (this.isPeekable()) {
      return this.tokens[this.position + 1];
    }
    return null;
  }

  letParser = () => {
    // let dataType identifier = value
    let let_token = this.currentToken;
    return 'this is a let statement';
  }

  parse = () => {
    let statements = [];
    this.position += 1;
    while (!this.isEot()) {
      this.currentToken = this.tokens[this.position];
      this.nextToken = this.tokens[this.position + 1];   
      if (this.currentToken.category == 'keyword') {
        if (this.currentToken.value == 'let') {
          statements.push(this.letParser());
        }
      }
      this.position += 1;
    }
    return statements;
  }
}

module.exports.Parser = Parser;
