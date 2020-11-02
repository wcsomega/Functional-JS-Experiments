const { mappend, mconcat, sum } = require('./mappend');
const { some, nothing, isSome, fromSome } = require('./maybe');
const { left, right, isLeft, isRight, fromRight, fromLeft } = require('./either');

test('mappend []', () => {
  expect(mappend([1, 2])([3, 4])).toEqual([1, 2, 3, 4]);
})

test('mappend String', () => {
  expect(mappend('hello ')('world!')).toEqual('hello world!');
})

test('mappend Object', () => {
  const o1 = {a: 1, b: 2};
  const o2 = {b: 3, c: 4};
  expect(mappend(o1)(o2)).toEqual({a: 1, b: 3, c: 4});
})

test('mappend Sum', () => {
  const result = mappend(sum(1))(sum(2))['@@value@@'];
  expect(result).toBe(3);
})

test('mappend Maybe []', () => {
  const s1 = some([1]);
  const s2 = some([2]);
  const n1 = nothing();
  const n2 = nothing();
  expect(isSome(mappend(s1)(n1))).toBe(true);
  expect(isSome(mappend(n1)(s1))).toBe(true);
  expect(isSome(mappend(n1)(n2))).toBe(false);
  expect(isSome(mappend(s1)(s2))).toBe(true);
  expect(fromSome(mappend(s1)(s2))).toEqual([1, 2]);
})

test('mappend Either []', () => {
  const r1 = right([1]);
  const r2 = right([2]);
  const la = left(['a']);
  const lb = left(['b']);
  expect(isRight(mappend(r1)(r2))).toBe(true);
  expect(fromRight(0)(mappend(r1)(r2))).toEqual([1, 2]);
  expect(isRight(mappend(r1)(la))).toBe(true);
  expect(fromRight(0)(mappend(r1)(la))).toEqual([1]);
  expect(isRight(mappend(la)(r2))).toBe(true);
  expect(fromRight(0)(mappend(la)(r2))).toEqual([2]);
  expect(isLeft(mappend(la)(lb))).toBe(true);
  expect(fromLeft(0)(mappend(la)(lb))).toEqual(['a', 'b']);
})

test('mconcat []', () => {
  expect(mconcat([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
})

test('mconcat Sum', () => {
  const result = mconcat([sum(1), sum(2), sum(3)])['@@value@@'];
  expect(result).toBe(6);
})

test('mconcat Maybe []', () => {
  const s1 = some([1]);
  const s2 = some([2]);
  const s3 = some([3]);
  const n = nothing();
  const result = mconcat([s1, s2, s3, n]);
  expect(isSome(result)).toBe(true);
  expect(fromSome(result)).toEqual([1, 2, 3]);
})