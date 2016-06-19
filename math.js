"use strict";

module.exports.enableAll = function() {
  let s = require("./math.js");

  s.enableFloor10();
  s.enableCeil10();
  s.enableRound10();
};

module.exports.enableFloor10 = function() {
  if (Math.floor10 === undefined) {
    this.enabledFloor10 = true;

    Math.floor10 = function(value, exp) {
      return decimalAdjust("floor", value, exp);
    };
  } else {
    throw new Error("Attempted to redefine floor10 function");
  }
};

module.exports.disableFloor10 = function() {
  if (this.enabledFloor10 === true) {
    delete Math.floor10;
  }
};

module.exports.enableCeil10 = function() {
  if (Math.ceil10 === undefined) {
    this.enabledCeil10 = true;

    Math.ceil10 = function(value, exp) {
      return decimalAdjust("ceil", value, exp);
    };
  } else {
    throw new Error("Attempted to redefine ceil10 function");
  }
};

module.exports.disableCeil10 = function() {
  if (this.enabledCeil10 === true) {
    delete Math.ceil10;
  }
};

module.exports.enableRound10 = function() {
  if (Math.round10 === undefined) {
    this.enabledRound10 = true;

    Math.round10 = function(value, exp) {
      return decimalAdjust("round", value, exp);
    };
  } else {
    throw new Error("Attempted to redefine round10 function");
  }
};

module.exports.disableRound10 = function() {
  if (this.enabledRound10 === true) {
    delete Math.round10;
  }
};

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type        The type of adjustment.
 * @param {Number}  value       The number.
 * @param {Integer} exp         The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? (+value[1] + exp) : exp));
}

