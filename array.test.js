const { head, last, tail, init, length, take, drop, takeLast, dropLast, tryWrapArray,
        uncons, nth } = require('./array');
const { add, mul } = require('./Num');
const { id } = require('./function');

const ap = f => a => a['@@ap@@'](f);
const chain = f => a => a['@@chain@@'](f);
const join = chain(id);

test('head', () => {
  expect(head('abc')).toEqual('a');
  expect(head([0, 1, 2])).toEqual(0);
});

test('last', () => {
  expect(last('abc')).toEqual('c');
  expect(last([0, 1, 2])).toEqual(2);
});

test('tail', () => {
  expect(tail('abc')).toEqual('bc');
  expect(tail([0, 1, 2])).toEqual([1, 2]);
});

test('init', () => {
  expect(init('abc')).toEqual('ab');
  expect(init([0, 1, 2])).toEqual([0, 1]);
});

test('length', () => {
  expect(length('abc')).toEqual(3);
  expect(length([0, 1, 2])).toEqual(3);
});

test('take', () => {
  expect(take(2)('abcd')).toEqual('ab');
  expect(take(2)([0, 1, 2, 3])).toEqual([0, 1]);
});

test('drop', () => {
  expect(drop(2)('abcd')).toEqual('cd');
  expect(drop(2)([0, 1, 2, 3])).toEqual([2, 3]);
});

test('takeLast', () => {
  expect(takeLast(2)('abcd')).toEqual('cd');
  expect(takeLast(2)([0, 1, 2, 3])).toEqual([2, 3]);
});

test('dropLast', () => {
  expect(dropLast(2)('abcd')).toEqual('ab');
  expect(dropLast(2)([0, 1, 2, 3])).toEqual([0, 1]);
});

test('uncons', () => {
  expect(uncons([1, 2, 3, 4])).toEqual([1, [2, 3, 4]]);
});

test('nth', () => {
  expect(nth(2)([1, 2, 3, 4])).toEqual(3);
})

test('ap', () => {
  const a1 = tryWrapArray([add(3), mul(3), x => x * x]);
  const a2 = tryWrapArray([1, 2, 3, 4]);
  expect(ap(a1)(a2)).toEqual([4, 5, 6, 7, 3, 6, 9, 12, 1, 4, 9, 16]);
})

test('chain', () => {
  const a1 = x => [x * 2, x * 3];
  const a2 = tryWrapArray([1, 2, 3, 4]);
  expect(chain(a1)(a2)).toEqual([2, 3, 4, 6, 6, 9, 8, 12]);
})

test('join', () => {
  const a1 = tryWrapArray([[1, 2, 3, 4]]);
  expect(join(a1)).toEqual([1, 2, 3, 4]);
})