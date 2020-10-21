function Empty() {}

function empty() { return  new Empty() }
function isEmpty(a) { return a instanceof Empty }
Empty.prototype.toString = function () {return `Empty`;}

module.exports = {
  empty,
  isEmpty,
}