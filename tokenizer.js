
class Tokenizer {
  constructor(sourceCode, keywords=[], punctuations={}, ignoreWhitespace=false) {
    this.position = -1;
    this.lineNumber = 1;
    this.ignoreWhitespace = ignoreWhitespace;
    this.stepKeywords = keywords;
    this.punctuations = punctuations;
    this.sourceCode = sourceCode;
    this.length = this.sourceCode.length;
  }
}