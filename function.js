const chain = f => a => a['@@chain@@'](f);

const id = x => x;
const pipe = funcs => val => funcs.reduce((a, v) => v(a), val);
const compose = funcs => val => funcs.reduceRight((a, v) => v(a), val);
const applyTo = a => func => func(a);
const $ = a => func => b => func(a)(b); //infix function
const flip = f => a => b => f(b)(a);
const always = x => () => x;
const not = a => !a;
const complement = func => compose([not, func]);

const pipeK = ([init, ...funcs]) => x => funcs.reduce((a, v) => chain(v)(a), init(x));
const composeK = funcs => pipeK([...funcs].reverse());

module.exports = {
  pipe, compose, applyTo, $, flip, always, not, complement, id, pipeK, composeK
}