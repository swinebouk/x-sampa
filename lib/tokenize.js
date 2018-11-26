const {Seq} = require('immutable');
const symbols = require('./symbols');
const splitAt = require('split-at');

const symbolsByLength = new Seq(symbols).sortBy(([xsampa]) => -xsampa.length);

class Tokenizer {
  constructor(string) {
    this.string = string;
    this.tokens = [];
  }

  tokenize() {
    while (this.string && this.string.length > 0) {
      const [token, string] = this.nextToken();
      this.tokens.push(token);
      this.string = string;
    }
    return this.tokens;
  }

  nextToken() {
    const knownValuePair = symbolsByLength.find(([s]) => this.string.startsWith(s));
    const knownValue = knownValuePair && knownValuePair[0];
    const splitLength = knownValue ? knownValue.length - 1 : 0;
    const [token, rest] = splitAt(this.string, splitLength);
    return [token, rest || ''];
  }
}

function tokenize(string) {
  return (new Tokenizer(string)).tokenize();
}

module.exports = tokenize;
