'use strict';

const webfonts = require('..');
const assert = require('assert').strict;

assert.strictEqual(webfonts(), 'Hello from webfonts');
console.info("webfonts tests passed");
