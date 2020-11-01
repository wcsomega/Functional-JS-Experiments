const { some, nothing, isSome, isNothing, fromSome, fromMaybe, maybe } = require('./maybe');

test('some', () => {
  const a = some(1);
  expect(isSome(a)).toBe(true);
  expect(isNothing(a)).toBe(false);
  expect(fromSome(a)).toBe(1);
  expect(fromMaybe(0)(a)).toBe(1);

  const fn1 = jest.fn();
  const fn2 = jest.fn();
  maybe(fn1)(fn2)(a);
  expect(fn1).toHaveBeenCalled();
  expect(fn2).not.toHaveBeenCalled();
})

test('nothing', () => {
  const a = nothing();
  expect(isSome(a)).toBe(false);
  expect(isNothing(a)).toBe(true);
  expect(() => fromSome(a)).toThrow('Tried to extract a value from Nothing.');
  expect(fromMaybe(0)(a)).toBe(0);

  const fn1 = jest.fn();
  const fn2 = jest.fn();
  maybe(fn1)(fn2)(a);
  expect(fn1).not.toHaveBeenCalled();
  expect(fn2).toHaveBeenCalled();
})