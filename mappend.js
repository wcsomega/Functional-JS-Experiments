const { tryWrapArray } = require('./array');
const { tryCoerceEmptyOrPure } = require('./coerce');
const { empty } = require('./empty');
const { foldr } = require('./array');

const mappend = a => b => {
  let _a = tryWrapArray(a);
  let _b = tryWrapArray(b);
  [_a, _b] = tryCoerceEmptyOrPure(_a, _b);

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

function All (_value) {
  //monoid under conjunction (&&)
  this['@@mappend@@'] = b => all(_value && value(b));
  this['@@fromEmpty@@'] = () => all(true);
  this['@@fromPure@@'] = a => all(a);
  this['@@value@@'] = _value;
}

function Any (_value) {
  //monoid under disjunction (||)
  this['@@mappend@@'] = b => any(_value || value(b));
  this['@@fromEmpty@@'] = () => any(false);
  this['@@fromPure@@'] = a => any(a);
  this['@@value@@'] = _value;
}

function Sum (_value) {
  //monoid under addition
  this['@@mappend@@'] = b => sum(_value + value(b));
  this['@@fromEmpty@@'] = () => sum(0);
  this['@@fromPure@@'] = a => sum(a);
  this['@@value@@'] = _value;
}

function Product (_value) {
  //monoid under multiplication
  this['@@mappend@@'] = b => product(_value * value(b));
  this['@@fromEmpty@@'] = () => product(1);
  this['@@fromPure@@'] = a => product(a);
  this['@@value@@'] = _value;
}

const value = a => a['@@value@@'];
const all = a => new All(a);
const any = a => new Any(a);
const sum = a => new Sum(a);
const product = a => new Product(a);

module.exports = { mappend, mconcat, all, any, sum, product }