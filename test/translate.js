import {readFileSync} from 'fs';
import {join} from 'path';
import test from 'ava';

import translate from '../lib/translate';

function readFile(fileName) {
	return readFileSync(join(__dirname, fileName), {encoding: 'utf-8'});
}

function testTranslate(t, input, output) {
	t.deepEqual(translate(input), output);
}

test('Single character', testTranslate, 't', 't');

test('Other symbols', testTranslate, '/aba/', '/aba/');

test('Trailing slash', testTranslate, 'J\\', 'ɟ');

test('Nasal vowel', testTranslate, 'o~', 'õ');

// Syllabicity

test('Syllabic', testTranslate, 'n=N=', 'n̩ŋ̍');

test('Non-syllabic', testTranslate, 'I_^y_^', 'ɪ̯y̑');

// Consonant release

test('Unreleased stop', testTranslate, 'p_}', 'p̚');

test('Aspirated stop', testTranslate, 'p_h', 'pʰ');

test('Nasalised release', testTranslate, 'p_n', 'pⁿ');

test('Lateral release', testTranslate, 'd_l', 'dˡ');

// Voicing

test('Voiceless', testTranslate, 'd_0 N_0', 'd̥ ŋ̊');

test('Voiced', testTranslate, 's_v', 's̬');

test('Breathy voice', testTranslate, 'b_t', 'b̤');

// Other

test('The Sun and the North Wind (English)', testTranslate, readFile('en-us-input.txt'), readFile('en-us-output.txt'));
