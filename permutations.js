#!/usr/bin/env node

var _     = require('lodash');
var argv  = require('optimist')
                .usage('Usage: $0 -s [string]')
                .demand(['s'])
                .argv;

if (typeof argv.s !== 'string' || !argv.s.length) {
  console.log('Please pass in a string', typeof argv.s, argv.s.length);
  process.exit(-1);
}

var findPermutations = function(str, index, replacers, results) {
    results = results || {};
    if (index === str.length) {
      return results[index - 1];
    }
    var originalChar = str[index];
    var set = [originalChar].concat(replacers[originalChar] || []);
    set = _.uniq(set);
    results[index] = [];
    set.forEach(function(character) {
      var prefixes = results[index - 1] || [''];
      prefixes.forEach(function(prefix) {
        results[index].push(prefix + character);
      });
    });
    return findPermutations(str, index + 1, replacers, results);
};

var replacers = {
  a: ['0', '@'],
  s: ['$']
};

console.log(findPermutations(argv.s, 0, replacers));

