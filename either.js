function Either (_isLeft, lval, rval) {
  
  const _fmap = this['@@fmap@@'] = function(f) {
    return _isLeft ? left(lval) : right(f(rval))
  }

  const _ap = this['@@ap@@'] = function(f) {
    return isLeft(f) ? left(_lval(f)) : _fmap(_rval(f));
  }

  const _chain = this['@@chain@@'] = function(f) {
    return _isLeft ? left(lval) : f(rval);
  }

  //only applies === operator to wrapped values
  const _equals = this['@@equals@@'] = function(f) {
    if (_isLeft && isLeft(f)) {
      return lval === _lval(f);
    } else if (_isRight && isRight(f)){
      return rval === _rval(f);
    } else {
      return false;
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
const either = ifleft => ifright => e => ifLeft(e) ? ifleft(_lval(e)) : ifright(_rval(e));

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