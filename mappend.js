const { tryWrapArray } = require('./array');
const { tryCoerceEmptyOrPure } = require('./coerce');
const { empty } = require('./empty');
const { foldr } = require('./array');

const mappend = a => b => {
  let [_a, _b] = tryCoerceEmptyOrPure(a, b);
  _a = tryWrapArray(_a);
  _b = tryWrapArray(_b);

  if (typeof a == 'string' && typeof b == 'string') {
    return a.concat(b);
  }

  else if ('@@mappend@@' in _a) {
    return _a['@@mappend@@'](_b);
  }

  else if (a instanceof Object && b instanceof Object) {
    return Object.assign(a, b);
  }

  else {
    throw new Error("Tried to mappend 2 values that cannot be mappended");
  }
}
const mconcat = foldr(mappend)(empty());

module.exports = { mappend, mconcat }