const { mappend } = require('./mappend');

function Either (_isLeft, lval, rval) {

  //instance Functor
  const _fmap = this['@@fmap@@'] = function(f) {
    return _isLeft ? left(lval) : right(f(rval))
  }

  //instance Applicative
  const _ap = this['@@ap@@'] = function(f) {
    return isLeft(f) ? left(_lval(f)) : _fmap(_rval(f));
  }
  const _fromPure = this['@@fromPure@@'] = right;
  
  //instance Monad
  const _chain = this['@@chain@@'] = function(f) {
    return _isLeft ? left(lval) : f(rval);
  }

  //instance Semigroup
  const _mappend = this['@@mappend@@'] = function (f) {
    if (_isLeft) {
      if (isLeft(f)) { return left(mappend(lval)(_lval(f))); }
      else { return right(_rval(f)); }
    } else {
      if (isRight(f)) { return right(mappend(rval)(_rval(f))); }
      else { return right(rval); }
    }
  }

  this['@@isLeft@@'] = _isLeft;
  const _isRight = this['@@isRight@@'] = !_isLeft;
  this['@@rval@@'] = rval;
  this['@@lval@@'] = lval;

  this.toString = function() {
    return _isLeft ? `Left (${lval})` : `Right (${rval})`;
  }
}

function isLeft(m) { return m['@@isLeft@@']; }
function isRight(m) { return m['@@isRight@@']; }
function _rval(m) { return m['@@rval@@']; }
function _lval(m) { return m['@@lval@@']; }

const fromRight = def => e => isRight(e) ? _rval(e) : def;
const fromLeft = def => e => isLeft(e) ? _lval(e) : def;
const either = ifleft => ifright => e => isLeft(e) ? ifleft(_lval(e)) : ifright(_rval(e));

function left(value) {
  return new Either(true, value, null);
}

function right(value) {
  return new Either(false, null, value);
}

module.exports = {
  right,
  left,
  fromLeft,
  fromRight,
  either,
  isLeft,
  isRight,
}