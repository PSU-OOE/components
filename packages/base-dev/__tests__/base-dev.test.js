'use strict';

const baseDev = require('..');
const assert = require('assert').strict;

assert.strictEqual(baseDev(), 'Hello from baseDev');
console.info("baseDev tests passed");
