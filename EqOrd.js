const { tryCoerceEmptyOrPure } = require('./coerce')
const { compose, complement } = require('./function');

const eq = a => b => {
  let [_a, _b] = tryCoerceEmptyOrPure(a, b);
  if(typeof _a == 'object' && '@@equals@@' in _a) {
    return _a['@@equals@@'](_b);
  } else {
    return a === b;
  }
}

const lte = a => b => {
  let [_a, _b] = tryCoerceEmptyOrPure(a, b);
  if(typeof _a == 'object' && '@@lte@@' in _a) {
    return _a['@@lte@@'](_b);
  } else {
    return a <= b;
  }
}

const neq = compose([complement, eq]);
const gt = compose([complement, lte]);
const lt = a => b => lte(a)(b) && neq(a)(b);
const gte = a => b => gt(a)(b) || eq(a)(b);

module.exports = {
  eq, neq, lt, gt, lte, gte
}