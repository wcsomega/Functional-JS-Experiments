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

  const _equals = this['@@equals@@'] = function(f) {
    if(_isSome && isSome(f)){
      return _value === value(f);
    } else if (_isNothing && isNothing(f)) {
      return true;
    }else {
      return false;
    }
  }

  this['@@isNothing@@'] = _isNothing;
  this['@@value@@'] = _value;
  const _isSome = this['@@isSome@@'] = !_isNothing;

  this.toString = function() {
    return isNothing ? 'Nothing' : `Some (${_value})`;
  }
}

function some (a) { return new Maybe(false, a) }
function nothing () { return new Maybe(true) }
function isNothing (a) { return a['@@isNothing@@'] }
function isSome (a) { return a['@@isSome@@'] }
function value (a) { return a['@@value@@'] }

const maybe = (ifSome) => (ifNothing) => (m) => {
  if (m['@@isNothing@@']()) {
    return ifNothing();
  } else {
    return ifSome(m['@@value@@']());
  }
}

module.exports = {
  some,
  nothing,
  maybe,
}