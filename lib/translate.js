const render = require('./render');
const tokenize = require('./tokenize');

module.exports = function translate(xsampa) {
	tokens = tokenize(xsampa);
	return render(tokens);
};
