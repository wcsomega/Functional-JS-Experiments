const { isPure } = require('./pure');
const { isEmpty } = require('./empty');

const tryCoerceEmptyOrPure = (a, b) => {
  let _a = a;
  let _b = b;

  let a_isPure = isPure(a);
  let b_isPure = isPure(b);
  let a_isEmpty = isEmpty(a);
  let b_isEmpty = isEmpty(b);

  if( (a_isPure || a_isEmpty) && (b_isPure || b_isEmpty) ) {
    throw new TypeError('Error: cannot coerce two empty or pure values');
  }

  if(a_isPure) {
    _a = b['@@fromPure@@'](a);
  }

  if(a_isEmpty) {
    _a = b['@@fromEmpty@@']();
  }
  
  if(b_isPure) {
    _b = a['@@fromPure@@'](b);
  }

  if(b_isEmpty) {
    _b = a['@@fromEmpty@@']();
  }

  return [_a, _b];
}

module.exports = {
  tryCoerceEmptyOrPure,
}