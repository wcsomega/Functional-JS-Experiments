const { some, nothing, maybe } = require('./maybe');
const { eq } = require('./EqOrd');
const { pipe, id } = require('./function');
const { tryWrapArray } = require('./array');

//functor
const fmap = f => a => a['@@fmap@@'](f);

//apply
const ap = f => a => a['@@ap@@'](f);
const lift2 = f => a => ap(fmap(f)(a));
const lift3 = f => a => b => ap(ap(fmap(f)(a))(b));

//monad
const chain = f => a => a['@@chain@@'](f);
const join = chain(id);

//object
const prop = p => obj => p in obj ? some(obj[p]) : nothing();
const pick = ps => obj => ps.reduce((a, v) => v in obj ? {...a, [v]: obj[v]} : a, {});
const propEq = p => val => pipe([prop(p), eq(some(val))]);
const assoc = p => value => obj => Object.assign(obj, {[p]: value});
const dissoc = p => obj => {let r = {...obj}; delete r[p]; return r};
const safeAssoc = p => ma => o => maybe(flip(assoc(p))(o))(always(o))(ma);
const pluck = p => fmap(prop(p));

//parse
const safeParseInt = radix => string => {let result = parseInt(string, radix); return isNaN(result) ? nothing() : some(result)};

const ifElse = iftrue => iffalse => a => a ? iftrue() : iffalse();

const print = x => console.log(x.toString());
const filter = pred => arr => arr.filter(pred);
const reject = pred => arr => arr.filter(complement(pred));

const objs = tryWrapArray([
  {a: 1, b: 2, c: 1},
  {a: 1, b: 4, c: 4},
  {a: 2, b: 6, c: 9},
  {a: 3, b: 8, c: 16},
  {a: 5, b: 10, c: 25},
  {a: 8, b: 12, c: 36},
  {a: 13, b: 14, c: 49},
]);

const obj2 = fmap(pick(['a', 'c']))(objs);

console.log(JSON.stringify(obj2));