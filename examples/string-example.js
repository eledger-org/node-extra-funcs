/* eslint-disable no-console */

var strFuncController = require("../").string;

strFuncController.enableAll();
console.log("\n");

console.log("5".padLeft("0", 5));
console.log("");
/* 00005 */

console.log("FUN!".padLeft("-", 9));
console.log("");
/* -----FUN! */

console.log("1".padRight(",000", 13));
console.log("");
/* 1,000,000,000 */

console.log("fix".prepend("pre"));
console.log("");
/* prefix */

console.log(JSON.stringify({
  "name": "Fred",
  "role": "Superhero",
  "mascot": "Platypus"
}, null, 2).indent(4));
console.log("");

/*
    {
      "name": "Fred",
      "role": "Superhero",
      "mascot": "Platypus"
    }
*/

