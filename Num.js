const add = a => b => a + b;
const mul = a => b => a * b;
const div = a => b => b / a;
const sub = a => b => b - a;
const mod = a => b => b % a;
const neg = mul(-1);
const inc = add(1);
const dec = sub(1);

module.exports = {
  add, mul, div, sub, mod, neg, inc, dec
}