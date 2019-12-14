class Token {
  constructor(tid, value, category, position, lineNumber) {
    this.tid = tid;
    this.value = value;
    this.category = category;
    this.position = position;
    this.lineNumber = lineNumber;
  }
}

module.exports.Token = Token;