import test from 'ava';
import render from '../lib/translate';

function testRender(t, input, output) {
	t.deepEqual(render(input), output);
}

test('Single character', testRender, 't', 't');
test(
	'Render other symbols',
	testRender,
	'/aba/',
	'/aba/'
);
test(
	'Render char with trailing slash (J\\ -> ɟ)',
	testRender,
	'J\\',
	'ɟ'
);
test(
	'Render char with modifier (o~ -> o)',
	testRender,
	'o~',
	'õ'
);
test(
	'Character with modifier without descender /oʊ̯, haɪ̯/',
	testRender,
	'oU_^, haI_^',
	'oʊ̯, haɪ̯'
);
test(
	'Character with modifier with descender /ɪk bən lœy̑k/',
	testRender,
	'Ik b@n l9y_^k',
	'ɪk bən lœy̑k'
);
