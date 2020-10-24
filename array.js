function __Array__ (__value__) {
  this['@@value@@'] = __value__;
  this.toString = () => __value__.toString();
  this['@@mappend@@'] = b => new __Array__(__value__.concat(value(b)));
  this['@@fmap@@'] = b => new __Array__(__value__.map(b));
  this['@@fromPure@@'] = a => new __Array__ ([a]);
  this['@@fromEmpty@@'] = () => new __Array__ ([]);
  this['@@chain@@'] = undefined;
  this['@@ap@@'] = undefined;
}

const value = a => a['@@value@@'];

module.exports = {
  tryWrapArray: (a) => a instanceof Array ? new __Array__(a) : a,
}