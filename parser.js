const TokenizerFile = require('./tokenizer');


class LetStatement {
  constructor(token, datatype, identifier, value) {
    this.token = token;
    this.datatype = datatype;
    this.identifier = identifier;
    this.value = value;
  }
}

class Parser {
  constructor(tokens=[]) {
    this.tokens = tokens;
    this.length = this.tokens.length;
    this.position = -1;
    // this.currentToken = null;
    // this.nextToken = null;
    this.currentLevel = 0;
    // this.isFirstToken = true;
  }

  syntaxError = (token, message) => {
    console.error('[Step(syntax error)]: ' + message + ', ' + token.value + ', line number: ' + token.lineNumber.toString() + ', position: ' + token.position.toString());
  }

  unexpectedToken = () => {
    this.syntaxError(this.tokens[this.position], 'unexpected token!');
  }

  isEndOfTokens = () => {
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
    let letToken = this.tokens[this.position];
    if (this.peek().category != 'whitespace') {
      this.unexpectedToken();
    }
    this.position += 1;

    if (this.peek().category != 'datatype') {
      this.unexpectedToken();
    }
    this.position += 1;
    let datatypeToken = this.tokens[this.position];
    
    if (this.peek().category != 'whitespace') {
      this.unexpectedToken();
    }
    this.position += 1;

    if (this.peek().category != 'identifier') {
      this.unexpectedToken();
    }
    this.position += 1;
    let identifierToken = this.tokens[this.position];

    if (this.peek().category != 'whitespace') {
      this.unexpectedToken();
    }
    this.position += 1;
    if (this.peek().value != '=') {
      this.unexpectedToken();
    }
    this.position += 1;
    if (this.peek().category != 'whitespace') {
      this.unexpectedToken();
    }
    this.position += 1;
    if (this.peek().category != 'literal') {
      this.unexpectedToken();
    }
    this.position += 1;
    let valueToken = this.tokens[this.position];

    return new LetStatement(letToken, datatypeToken, identifierToken, valueToken);
  }

  parse = () => {
    let statements = [];
    this.position += 1;
    while (!this.isEndOfTokens()) {
      this.tokens[this.position] = this.tokens[this.position];
      this.nextToken = this.tokens[this.position + 1];   
      if (this.tokens[this.position].category == 'keyword') {
        if (this.tokens[this.position].value == 'let') {
          statements.push(this.letParser());
        }
      }
      this.position += 1;
    }
    return statements;
  }
}

module.exports.Parser = Parser;
