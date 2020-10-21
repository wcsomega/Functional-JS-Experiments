function Pure(a){
  this.contents = a;
  this.toString = function() {
    return `Pure (${a})`;
  }
}

function isPure(a) { return a instanceof Pure; }
function pure(a) { return new Pure(a); }

module.exports = {
  isPure,
  pure,
}