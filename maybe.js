const { mappend } = require('./mappend');
const { isEmpty } = require('./empty');
const { isPure } = require('./pure');

function Maybe (_isNothing, _value) {

  //fmap :: Functor f => f a ~> (a -> b) -> f b
  const _fmap = this['@@fmap@@'] = function(func) {
    return _isNothing ? nothing() : some(func(_value));
  }

  //ap :: Apply f => f a ~> f (a -> b) -> f b
  const _ap = this['@@ap@@'] = function (func) {
    // console.log(value);
    return func['@@isNothing@@'] ? nothing() : _fmap(value(func));
  }

  //chain :: Chain f => f a ~> (a -> f b) => f b
  const _chain = this['@@chain@@'] = function (func) {
    return _isNothing ? nothing() : func(_value);
  }

  //equals :: Setoid f => f a ~> f b -> Boolean
  const _equals = this['@@equals@@'] = function(f) {
    if(_isSome && isSome(f)){
      return _value === value(f);
    } else if (_isNothing && isNothing(f)) {
      return true;
    }else {
      return false;
    }
  }

  const _mappend = this['@@mappend@@'] = function(f) {
    // let _f = fromEmpty(f);
    // _f = fromPure(_f);

    if (_isSome) {
      if(isSome(f)) { return some(mappend(_value)(value(f))); }
      else { return some(_value); }
    } else {
      if (isSome(f)) { return some(value(f)); }
      else { return nothing(); }
    }
  }

  const _fromPure = this['@@fromPure@@'] = some;
  const _fromEmpty = this['@@fromEmpty@@'] = nothing;

  this['@@isNothing@@'] = _isNothing;
  this['@@value@@'] = _value;
  const _isSome = this['@@isSome@@'] = !_isNothing;

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