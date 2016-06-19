# node-extra-funcs
[![Build Status](https://travis-ci.org/eledger-org/node-extra-funcs.svg?branch=master)](https://travis-ci.org/eledger-org/node-extra-funcs)

## About

A node.js library intending to expand some of the functions available to built-ins

## Functions

You can find examples below, or hop over to the docs:
- [math](https://eledger-org.github.io/node-extra-funcs/module-math.html)
- [string](https://eledger-org.github.io/node-extra-funcs/module-string.html)

## Example

### Code (See examples/string-example.js)

    var strFuncController = require("../").string;

    strFuncController.enableAll();
    console.log("\n");

    console.log("5".padLeft("0", 5));
    console.log("");

    console.log("FUN!".padLeft("-", 9));
    console.log("");

    console.log("1".padRight(",000", 13));
    console.log("");

    console.log("fix".prepend("pre"));
    console.log("");

    console.log(JSON.stringify({
      "name": "Fred",
      "role": "Superhero",
      "mascot": "Platypus"
    }, null, 2).indent(4));

### Output

    00005

    -----FUN!

    1,000,000,000

    prefix

    {
      "name": "Fred",
      "role": "Superhero",
      "mascot": "Platypus"
    }

### Code (See examples/math-example.js

    var mathFuncController = require("../").math;

    mathFuncController.enableAll();
    console.log("\n");

    console.log(Math.floor10(999, 2));
    console.log();

    console.log(Math.ceil10(111, 3));
    console.log();

    console.log(Math.round10(5000, 4));
    console.log();

### Output

    900

    1000

    1000

