const {lines, unlines, words, unwords} = require('./String');

test('lines', () => {
  expect(lines('line 1\nline 2\nline 3')).toEqual(['line 1', 'line 2', 'line 3']);
});
test('unlines', () => {
  expect(unlines(['line 1', 'line 2', 'line 3'])).toEqual('line 1\nline 2\nline 3');
});
test('words', () => {
  expect(words('the quick brown fox')).toEqual(['the', 'quick', 'brown', 'fox']);
});
test('unwords', () => {
  expect(unwords(['the', 'quick', 'brown', 'fox'])).toEqual('the quick brown fox');
});
