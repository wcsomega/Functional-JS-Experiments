//methods on wrapped arrays all return unwrapped arrays.
//so wrapped arrays should only exist within library functions.

function __Array__ (__value__) {
  this['@@value@@'] = __value__;
  this['@@mappend@@'] = b => __value__.concat(value(b));
  this['@@fmap@@'] = b => __value__.map(b);
  this['@@fromPure@@'] = a => [a];
  this['@@fromEmpty@@'] = () => [];
  this['@@foldr@@'] = f => init => __value__.reduceRight((a, v) => f(v)(a), init);
  this['@@foldl@@'] = f => init => __value__.reduce((a, v) => f(a)(v), init);
  this['@@filter@@'] = pred => __value__.filter(pred);
  this['@@chain@@'] = func => __value__.map(x => func(x)).reduce((a, v) => a.concat(v), []);
  this['@@ap@@'] = b => value(b).map(f => __value__.map(v => f(v))).reduce((a, v) => a.concat(v), []);
  this.toString = () => __value__.toString();
}

const value = a => a['@@value@@'];
const tryWrapArray = (a) => a instanceof Array ? new __Array__(a) : a;

const foldr = f => init => array => {
  let _array = tryWrapArray(array);
  if(_array instanceof __Array__) {
    return _array['@@foldr@@'](f)(init);
  } else {
    throw new TypeError(`Cannot call foldr on type: ${array.constructor.name}. It can only be called on an Array`);
  }
}

const head = a => {
  let _a = a;
  if (typeof a == 'string') {
    _a = Array.from(a);
  }
  return _a[0];
};

const last = a => {
  let _a = a;
  if(typeof a == 'string'){
    _a = Array.from(a);
  }
  return _a[_a.length-1];
}

const take = n => a =>  {
  if (typeof a == 'string') {
    return Array.from(a).slice(0, n).join('');
  } else {
    return a.slice(0, n);
  }
}

const drop = n => a =>  {
  if (typeof a == 'string') {
    return Array.from(a).slice(n).join('');
  } else {
    return a.slice(n);
  }
}

const uncons = ([head, ...tail]) => {
  return [head, tail];
}

const nth = n => a => {
  return a[n];
}

const takeLast = n => drop(-n);
const dropLast = n => take(-n);
const tail = drop(1);
const init = dropLast(1);

const length = a => {
  return a.length;
}

module.exports = {
  tryWrapArray, foldr, head, last, tail, init,
  length, take, drop, takeLast, dropLast, nth,
  uncons,
}