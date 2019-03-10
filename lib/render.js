const ipaSymbolsWithDescenders = require('./ipa-symbols-with-descenders');
const modifiers = require('./modifiers');
const symbols = require('./symbols');

const descenderSet = new Set(ipaSymbolsWithDescenders);
const xSampaToIpaMap = new Map(symbols.map(({xSampa, ipa}) => [xSampa, ipa]));
const xSampaModToIpaMap = new Map(modifiers.map(({xSampa, ...rest}) => [xSampa, rest]));

function findNextChar(token, lastChar) {
	const nextChar = xSampaToIpaMap.get(token);
	if (nextChar) {
		return (nextChar);
	}

	const nextModifier = xSampaModToIpaMap.get(token);
	// TODO what happens if there is a modifier at the beginning of the input
	if (!nextModifier) {
		return token;
	}
	if (nextModifier.ipaAbove && descenderSet.has(lastChar)) {
		return (nextModifier.ipaAbove);
	}
	return (nextModifier.ipa);
}

function render(tokens) {
	const tokens2 = [...tokens];
	const result = [];
	while (tokens2.length) {
		const nextToken = tokens2.shift();
		const lastChar = result[result.length - 1];
		result.push(findNextChar(nextToken, lastChar));
	}
	return result.join('').normalize();
}

module.exports = render;
