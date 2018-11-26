import test from 'ava';
import tokenize from '../lib/tokenize';

function testTokenizer(t, input, output) {
	t.deepEqual(tokenize(input), output);
}

test('Single character', testTokenizer, 't', ['t']);
test('Three distinct symbols inside slashes', testTokenizer, '/aba/', ['/', 'a', 'b', 'a', '/']);
test('Character with backslashes', testTokenizer, 'J\\aj', ['J\\', 'a', 'j']);
