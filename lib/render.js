const symbols = require('./symbols');
const ipaSymbolsWithDescenders = require('./ipa-symbols-with-descenders');

const setOfSymbolsWithDescenders = new Set(ipaSymbolsWithDescenders);
const xsampaToIpaMap = new Map(symbols.map(({'x-sampa': xSampa, ipa}) => [xSampa, ipa]));

function hasDescender(char) {
	return setOfSymbolsWithDescenders.has(char);
}

function replaceByDescender(withoutDescender, withDescender) {
	return char => hasDescender(char) ? withDescender : withoutDescender;
}

const syllabicModifier = replaceByDescender('\u0329', '\u030D');
const nonSyllabicModifier = replaceByDescender('\u032F', '\u0311');

function extractModifier(tokens, symbol, modifier) {
	if (tokens[1] !== symbol) {
		return undefined;
	}
	tokens.splice(1, 1);
	return typeof modifier === 'function' ? modifier(tokens[0]) : modifier;
}

function render(tokens) {
	const tokens2 = [...tokens];
	const resultSymbols = [];
	while (tokens2.length) {
		const modifiers = [
			extractModifier(tokens2, '~', '\u0303'), // Nasalized
			extractModifier(tokens2, '=', syllabicModifier),
			extractModifier(tokens2, '_^', nonSyllabicModifier)
		].filter(m => m);
		const [first] = tokens2.splice(0, 1);
		resultSymbols.push(xsampaToIpaMap.get(first) || first, ...modifiers);
	}
	const result = resultSymbols.join('').normalize();
	return result;
}

module.exports = render;
