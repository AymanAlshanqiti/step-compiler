const Tokenizer = require('./tokenizer');


class Parser {
  constructor(tokenizer) {
    this.tokenizer = tokenizer;
    this.currentToken = null;
    this.nextToken = null;
    this.currentLevel = 0;
    this.isFirstToken = true;
  }
}

module.exports.Parser = Parser;
