import test from 'ava';
import render from '../lib/render';

function testRender(t, input, output) {
	t.deepEqual(render(input), output);
}

test('Single character', testRender, ['t'], 't');
test(
	'Render other symbols',
	testRender,
	['/', 'a', 'b', 'a', '/'],
	'/aba/'
);
test(
	'Render char with trailing slash (J\\ -> ɟ)',
	testRender,
	['J\\'],
	'ɟ'
);
test(
	'Render char with modifier (o~ -> o)',
	testRender,
	['o', '~'],
	'õ'
);
test(
	'Character with modifier without descender /oʊ̯, haɪ̯/',
	testRender,
	['o', 'U', '_^', ',', ' ', 'h', 'a', 'I', '_^'],
	'oʊ̯, haɪ̯'
);
test(
	'Character with modifier with descender /ɪk bən lœy̑k/',
	testRender,
	['I', 'k', ' ', 'b', '@', 'n', ' ', 'l', '9', 'y', '_^', 'k'],
	'ɪk bən lœy̑k'
);
