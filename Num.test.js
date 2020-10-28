const { add, sub, mul, div, mod, inc, dec, neg } = require('./Num');

test('add', () => {
  expect(add(1)(2)).toBe(3);
});

test('sub', () => {
  expect(sub(1)(3)).toBe(2);
});

test('mul', () => {
  expect(mul(2)(3)).toBe(6);
});

test('div', () => {
  expect(div(2)(6)).toBe(3);
});

test('mod', () => {
  expect(mod(2)(3)).toBe(1);
});

test('inc', () => {
  expect(inc(4)).toBe(5);
});

test('dec', () => {
  expect(dec(3)).toBe(2);
});

test('neg', () => {
  expect(neg(3)).toBe(-3);
});