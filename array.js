module.exports = {
  array$foldr: func => init => arr => arr.reduceRight((a, v) => func(a)(v), init),
  array$mappend: a => b => a.concat(b),
  array$empty: () => [],
  array$of: (a) => [a],
}