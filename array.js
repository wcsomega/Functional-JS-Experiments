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
  this['@@chain@@'] = undefined;
  this['@@ap@@'] = undefined;
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
module.exports = {
  tryWrapArray,
  foldr,
}