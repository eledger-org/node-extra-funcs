"use strict";

/**
 * Provides an API for enabling extra math functions.
 *
 * @module math
 *
 * @author Henry Brown
 */


/**
 * Enables all of the math functions including
 *  - {@link module:math.floor10 floor10}
 *  - {@link module:math.ceil10  ceil10}
 *  - {@link module:math.round10 round10}
 *
 * @throws {Error}        If Math has already implemented any of the above
 *                        functions
 */
module.exports.enableAll = function() {
  let s = require("./math.js");

  s.enableFloor10();
  s.enableCeil10();
  s.enableRound10();
};

/**
 * A floor function allowing for more discrete control over the rounding
 *  location.
 *
 * @param {Number} value  The value on which you want to perform the floor.
 * @param {Number} exp    The exponent of 10 marking the location from which to
 *                        perform the floor.  floor10(987, 2) will round down to
 *                        900.
 *
 * @returns {Number}      The floored value (900 in the case above)
 */
module.exports.floor10 = function(value, exp) {
  return decimalAdjust("floor", value, exp);
};

/**
 * Attaches the {@link module:math.floor10 floor10} function to the Math global.
 *
 * @throws {Error}        If Math has already implemented floor10.
 */
module.exports.enableFloor10 = function() {
  if (Math.floor10 === undefined) {
    this.enabledFloor10 = true;

    Math.floor10 = require("./math").floor10;
  } else {
    if (this.enabledFloor10 !== true) {
      throw new Error("Attempted to redefine floor10 function");
    }
  }
};

/**
 * Detaches the {@link module:math.floor10 floor10} function from the Math
 *  global.
 */
module.exports.disableFloor10 = function() {
  if (this.enabledFloor10 === true) {
    delete Math.floor10;
  }
};

/**
 * A ceiling function allowing for more discrete control over the rounding
 *  location.
 *
 * @param {Number} value  The value on which you want to perform the ceiling.
 * @param {Number} exp    The exponent of 10 marking the location from which to
 *                        perform the ceiling.  ceil10(456, 2) will round up to
 *                        500.
 *
 * @returns {Number}      The ceiled value (500 in the case above)
 */
module.exports.ceil10 = function(value, exp) {
  return decimalAdjust("ceil", value, exp);
};

/**
 * Attaches the {@link module:math.ceil10 ceil10} function to the Math global.
 *
 * @throws {Error}        If Math has already implemented ceil10
 */
module.exports.enableCeil10 = function() {
  if (Math.ceil10 === undefined) {
    this.enabledCeil10 = true;

    Math.ceil10 = require("./math").ceil10;
  } else {
    if (this.enabledCeil10 !== true) {
      throw new Error("Attempted to redefine ceil10 function");
    }
  }
};

/**
 * Detaches the {@link module:math.ceil10 ceil10} function from the Math global.
 */
module.exports.disableCeil10 = function() {
  if (this.enabledCeil10 === true) {
    delete Math.ceil10;
  }
};

/**
 * A rounding function allowing for more discrete control over the rounding
 *  location.
 *
 * @param {Number} value  The value on which you want to perform the round.
 * @param {Number} exp    The exponent of 10 marking the location from which to
 *                        perform the round.  round10(1251, 2) will round up to
 *                        1300.
 *
 * @returns {Number}      The rounded value (1300 in the case above)
 */
module.exports.round10 = function(value, exp) {
  return decimalAdjust("round", value, exp);
};

/**
 * Attaches the {@link module:math.round10 round10} function to the Math global.
 *
 * @throws {Error}        If Math has already implemented round10
 */
module.exports.enableRound10 = function() {
  if (Math.round10 === undefined) {
    this.enabledRound10 = true;

    Math.round10 = require("./math").round10;
  } else {
    if (this.enabledRound10 !== true) {
      throw new Error("Attempted to redefine round10 function");
    }
  }
};

/**
 * Detaches the {@link module:math.round10 round10} function from the Math
 *  global.
 */
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
 * @param {Integer} exp         The exponent (the 10 logarithm of the adjustment
 *                              base).
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

