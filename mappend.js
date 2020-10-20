const mappend = a => b => {
  if (a instanceof Array && a instanceof Array) {
    return a.concat(b);
  } else if (typeof a == 'string' && typeof b == 'string') {
    return a.concat(b);
  } else if ('@@mappend@@' in a && '@@mappend@@' in b) {
    return a['@@mappend@@'](b);
  } else if (a instanceof Object && b instanceof Object) {
    return Object.assign(a, b);
  } else {
    throw new Error("Tried to mappend 2 values that cannot be mappended");
  }
}

module.exports = { mappend }