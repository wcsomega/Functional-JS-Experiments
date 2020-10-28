const { mappend } = require('./mappend');
const { isEmpty } = require('./empty');
const { isPure } = require('./pure');
const { eq, lte } = require('./EqOrd');

function Maybe (_isNothing, _value) {

  //instance Functor
  const _fmap = this['@@fmap@@'] = function(func) {
    return _isNothing ? nothing() : some(func(_value));
  }

  //instance Applicative
  const _ap = this['@@ap@@'] = function (func) {
    // console.log(value);
    return func['@@isNothing@@'] ? nothing() : _fmap(value(func));
  }
  const _fromPure = this['@@fromPure@@'] = some;

  //instance Monad
  const _chain = this['@@chain@@'] = function (func) {
    return _isNothing ? nothing() : func(_value);
  }

  //instance Semigroup
  const _mappend = this['@@mappend@@'] = function(f) {
    if (_isSome) {
      if(isSome(f)) { return some(mappend(_value)(value(f))); }
      else { return some(_value); }
    } else {
      if (isSome(f)) { return some(value(f)); }
      else { return nothing(); }
    }
  }

  //instance Eq
  const _equals = this['@@equals@@'] = function (f) {
    if (_isNothing && isNothing(f)) {
      return true;
    } else if (_isSome && isSome(f)) {
      return eq(_value)(value(f));
    } else {
      return false;
    }
  }

  //instance Ord
  const _lte = this['@@lte@@'] = function (f) {
    if (_isNothing && isNothing(f)) {
      return true;
    } else if (_isSome && isSome(f)) {
      return lte(_value)(value(f));
    } else if(_isSome) {
      return false;
    } else {
      return true;
    }
  }

  //instance Monoid
  const _fromEmpty = this['@@fromEmpty@@'] = nothing;

  this['@@isNothing@@'] = _isNothing;
  const _isSome = this['@@isSome@@'] = !_isNothing;
  this['@@value@@'] = _value;

  this.toString = function() {
    return _isNothing ? 'Nothing' : `Some (${_value})`;
  }
}

function some (a) { return new Maybe(false, a) }
function nothing () { return new Maybe(true) }
function isNothing (a) { return a['@@isNothing@@'] }
function isSome (a) { return a['@@isSome@@'] }
function value (a) { return a['@@value@@'] }

const fromEmpty = f =>  isEmpty(f) ? nothing() : f;
const fromPure = f => isPure(f) ? some(f.contents) : f;

const maybe = (ifSome) => (ifNothing) => (m) => {
  if (m['@@isNothing@@']()) {
    return ifNothing();
  } else {
    return ifSome(m['@@value@@']());
  }
};

module.exports = {
  some,
  nothing,
  maybe,
  isSome,
};