const { array$mappend } = require('./array');
const { tryCoerceEmptyOrPure } = require('./coerce');

const mappend = a => b => {
  let [_a, _b] = tryCoerceEmptyOrPure(a, b);

  if (a instanceof Array && b instanceof Array) {
    return array$mappend(a)(b);
  }

  else if (typeof a == 'string' && typeof b == 'string') {
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

module.exports = { mappend }