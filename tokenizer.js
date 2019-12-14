const tokenFile = require('./token');

class Tokenizer {
  constructor(sourceCode, stepKeywords, punctuations) {
    this.position = -1;
    this.lineNumber = 1;
    this.ignoreWhitespace = true;
    this.stepKeywords = stepKeywords;
    this.punctuations = punctuations;
    this.sourceCode = sourceCode;
    this.length = this.sourceCode.length;
  }
}

// to crate a new token
// let token = new tokenFile.Token('tid', 'value', 'category', position, lineNumber);

module.exports.Tokenizer = Tokenizer;
