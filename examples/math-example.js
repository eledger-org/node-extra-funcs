/* eslint-disable no-console */

var mathFuncController = require("../").math;

mathFuncController.enableAll();
console.log("\n");

console.log(Math.floor10(999, 2));
console.log();
/* 900 */

console.log(Math.ceil10(111, 3));
console.log();
/* 1000 */

console.log(Math.round10(5000, 4));
console.log();
/* 10000 */
