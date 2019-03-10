const render = require('./render');
const tokenize = require('./tokenize');

function translate(xsampa) {
	const tokens = tokenize(xsampa);
	return render(tokens);
}

module.exports = translate;
