const { some, nothing, maybe, isSome } = require('./maybe');
const { right, left, isRight } = require('./either');
const { mappend } = require('./mappend');
const { empty } = require('./empty');
const { pure } = require('./pure');

const add = a => b => a + b;
const mul = a => b => a * b;
const div = a => b => b / a;
const sub = a => b => b - a;
const mod = a => b => b % a;
const neg = mul(-1);
const inc = add(1);
const dec = sub(1);

//setoid
const equals = a => b => a['@@equals@@'](b);

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
const assoc = p => value => obj => Object.assign(obj, {[p]: value});
const dissoc = p => obj => {let r = {...obj}; delete r[p]; return r};
const safeAssoc = p => ma => o => maybe(flip(assoc(p))(o))(always(o))(ma);

//parse
const safeParseInt = radix => string => {let result = parseInt(string, radix); return isNaN(result) ? nothing() : some(result)};

//functions
const pipe = funcs => val => funcs.reduce((a, v) => v(a), val);
const compose = funcs => val => funcs.reduceRight((a, v) => v(a), val);
const applyTo = a => func => func(a);
const flip = f => a => b => f(b)(a);
const always = x => () => x;

const ifElse = iftrue => iffalse => a => a ? iftrue() : iffalse();

const print = x => console.log(x.toString());

const foldr = func => init => arr => arr.reduceRight((a, v) => func(v)(a), init);


// mconcat(['a', 'b', 'c']) = 'abc'
const mconcat = foldr(mappend)(empty());

let result = mconcat([
  some([1]),
  some([2]),
  some([3]),
])

print(result);