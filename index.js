const { some, nothing, maybe, isSome } = require('./maybe');
const { mappend } = require('./mappend');
const { empty } = require('./empty');
const { eq, lte } = require('./EqOrd');
const { foldr } = require('./array');

//functor
const fmap = f => a => a['@@fmap@@'](f);

//apply
const ap = f => a => a['@@ap@@'](f);
const lift2 = f => a => ap(fmap(f)(a));
const lift3 = f => a => b => ap(ap(fmap(f)(a))(b));

//monad
const chain = (f) => (a) => a['@@chain@@'](f);

//object
const prop = p => obj =>  p in obj ? some(obj[p]) : nothing();
const propEq = p => val => pipe([prop(p), eq(some(val))]);
const assoc = p => value => obj => Object.assign(obj, {[p]: value});
const dissoc = p => obj => {let r = {...obj}; delete r[p]; return r};
const safeAssoc = p => ma => o => maybe(flip(assoc(p))(o))(always(o))(ma);

//parse
const safeParseInt = radix => string => {let result = parseInt(string, radix); return isNaN(result) ? nothing() : some(result)};

//functions
const pipe = funcs => val => funcs.reduce((a, v) => v(a), val);
const compose = funcs => val => funcs.reduceRight((a, v) => v(a), val);
const applyTo = a => func => func(a);
const $ = a => func => b => func(a)(b); //infix function
const flip = f => a => b => f(b)(a);
const always = x => () => x;

const ifElse = iftrue => iffalse => a => a ? iftrue() : iffalse();

const print = x => console.log(x.toString());
const filter = pred => arr => arr.filter(pred);
const reject = pred => arr => arr.filter(complement(pred));


// mconcat(['a', 'b', 'c']) = 'abc'
// const mconcat = foldr(mappend)(empty());

const not = a => !a;

let complement = func => compose([not, func]);
let neq = compose([complement, eq]);
let gt = compose([complement, lte]);
let lt = a => b => lte(a)(b) && neq(a)(b);
let gte = a => b => gt(a)(b) || eq(a)(b);