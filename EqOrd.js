const { tryCoerceEmptyOrPure } = require("./coerce")

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

module.exports = {
  eq,
  lte,
}