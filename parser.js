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
    console.error('[Step(syntax error)]: ' + message + ', ' + (token.value == ' ' ? 'whitespace' : token.value) + ', line number: ' + token.lineNumber.toString() + ', position: ' + token.position.toString());
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

  match = (value) => {
    if ((this.peek().category == value) || (this.peek().value == value)) {
      return true;
    }
  }

  letParser = () => {
    // let dataType identifier = value
    let letToken = this.tokens[this.position];
    let datatypeToken = null;
    let identifierToken = null;
    let valueToken = null;

    if (!this.match('whitespace')) {
      this.position += 1;
      this.unexpectedToken();
    } else {
      this.position += 1;
      if (!this.match('datatype')) {
        this.position += 1;
        this.unexpectedToken();
      } else {
        this.position += 1;
        datatypeToken = this.tokens[this.position];
        if (!this.match('whitespace')) {
          this.position += 1;
          this.unexpectedToken();
        } else { 
          this.position += 1;
          if (!this.match('identifier')) {
            this.position += 1;
            this.unexpectedToken();
          } else { 
            this.position += 1;
            identifierToken = this.tokens[this.position];
            if (!this.match('whitespace')) {
              this.position += 1;
              this.unexpectedToken();
            } else { 
              this.position += 1;
              if (!this.match('=')) {
                this.position += 1;
                this.unexpectedToken();
              } else { 
                this.position += 1;
                if (!this.match('whitespace')) {
                  this.position += 1;
                  this.unexpectedToken();
                } else { 
                  this.position += 1;
                  if (!this.match('literal')) {
                    this.position += 1;
                    this.unexpectedToken();
                  } else { 
                    this.position += 1;
                    valueToken = this.tokens[this.position];
                  }
                }
              }
            }
          }
        }
      }
    }
    return new LetStatement(letToken, datatypeToken, identifierToken, valueToken);
  }

  parse = () => {
    let statements = [];
    this.position += 1;
    while (!this.isEndOfTokens()) { 
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
