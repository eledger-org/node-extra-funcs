"use strict";

/**
 * Provides an API for enabling extra string functions.
 *
 * @module string
 *
 * @author Henry Brown
 */


/**
 * A helper function that's used to get the number of repeats of padValue needed
 *  to pad string's length to padLength without exceeding padLength while only
 *  repeating whole portions of padValue.
 *
 * @example
 * //returns 2 because the length of "freddyblabla" is 12, and additional
 * // repetitions of bla would cause us to exceed the specified padLength of 13
 * padCount("freddy", "bla", 13);
 */
module.exports.padCount = function(string, padValue, padLength) {
  return Math.floor(Math.max(0, padLength - string.length) / padValue.length);
};

/**
 * Enables all of the string functions including:
 *  - {@link module:string.padLeft  padLeft}
 *  - {@link module:string.padRight padRight}
 *  - {@link module:string.prepend  prepend}
 *  - {@link module:string.indent   indent}
 *
 * @throws {Error}        If String has already implemented any of the above
 *                        functions
 */
module.exports.enableAll = function() {
  let s = require("./string.js");

  s.enablePadLeft();
  s.enablePadRight();
  s.enablePrepend();
  s.enableIndent();
};

/**
 * Pads the left hand side of this string with copies of padValue until another
 *  would cause the string's length to exceed padLength.
 *
 * @param {String} padValue   The value to repeat
 * @param {String} padLength  The max length of the string after padding
 *
 * @returns {String}          A padded string
 *
 * @example
 * //returns "00007"
 * "7".padLeft("0", 5)
 */
module.exports.padLeft = function(padValue, padLength) {
  if (padLength < 0) {
    throw new Error("Invalid pad length");
  } else if (typeof this !== "string") {
    throw new Error("This function can only be used on a string object after" +
      "calling require(\"node-extra-funcs\").string.enablePadLeft();");
  }

  return String(padValue.repeat(require("./string")
    .padCount(this, padValue, padLength)) + this);
};

/**
 * Attaches the {@link module:string.padLeft padLeft} function to the String
 *  prototypes so that it can be used on any String objects in the application.
 *
 * @throws {Error}            If String has already implemented padLeft.
 */
module.exports.enablePadLeft = function() {
  if (String.prototype.padLeft === undefined) {
    this.enabledPadLeft = true;

    String.prototype.padLeft = require("./string").padLeft;
  } else {
    if (this.enabledPadLeft !== true) {
      throw new Error("Attempted to redefine padLeft function");
    }
  }
};

/**
 * Detaches the {@link module:string.padLeft padLeft} function from the String
 *  prototypes.
 */
module.exports.disablePadLeft = function() {
  if (this.enabledPadLeft === true) {
    delete String.prototype.padLeft;
  }
};

/**
 * Pads the right hand side of this string with copies of padValue until another
 *  would cause the string's length to exceed padLength.
 *
 * @param {String} padValue   The value to repeat
 * @param {String} padLength  The max length of the string after padding
 *
 * @returns {String}          A padded string
 *
 * @example
 * //returns "Noooo"
 * "N".padRight("o", 5)
 */
module.exports.padRight = function(padValue, padLength) {
  if (padLength < 0) {
    throw new Error("Invalid pad length");
  }

  return String(this + padValue.repeat(require("./string")
    .padCount(this, padValue, padLength)));
};

/**
 * Attaches the {@link module:string.padRight padRight} function to the String
 *  prototypes so that it can be used on any String objects in the application.
 *
 * @throws {Error}            If String has already implemented padRight.
 */
module.exports.enablePadRight = function() {
  if (String.prototype.padRight === undefined) {
    this.enabledPadRight = true;

    String.prototype.padRight = require("./string").padRight;
  } else {
    if (this.enabledPadRight !== true) {
      throw new Error("Attempted to redefine padRight function");
    }
  }
};

/**
 * Detaches the {@link module:string.padRight padRight} function from the String
 *  prototypes.
 */
module.exports.disablePadRight = function() {
  if (this.enabledPadRight === true) {
    delete String.prototype.padRight;
  }
};

/**
 * Concatenates the prefix parameter and this string together.
 *
 * @param {String} prefix     The value to prepend.
 *
 * @returns {String}          The concatenated string.
 *
 * @example
 * //returns "prefix"
 * "fix".prepend("pre");
 */
module.exports.prepend = function(prefix) {
  return String(prefix + this);
};

/**
 * Attaches the {@link module:string.prepend prepend} function to the String
 *  prototypes so that it can be used on any String objects in the application.
 *
 * @throws {Error}            If String has already implemented prepend.
 */
module.exports.enablePrepend = function() {
  if (String.prototype.prepend === undefined) {
    this.enabledPrepend = true;

    String.prototype.prepend = require("./string").prepend;
  } else {
    if (this.enabledPrepend !== true) {
      throw new Error("Attempted to redefine prepend function");
    }
  }
};

/**
 * Detaches the {@link module:string.prepend prepend} function from the String
 *  prototypes.
 */
module.exports.disablePrepend = function() {
  if (this.enabledPrepend === true) {
    delete String.prototype.prepend;
  }
};

/**
 * Indents this string by a number of spaces characters equal to the
 *  indentSize parameter.
 *
 * @param {Number} indentSize The number of spaces to indent each line
 *
 * @returns {String}          The indented string.
 *
 * @example
 * //outputs:
 * //    {
 * //      "name": "Fred",
 * //      "role": "Superhero",
 * //      "mascot": "Platypus"
 * //    }
 * console.log(JSON.stringify({
 *   "name": "Fred",
 *   "role": "Superhero",
 *   "mascot": "Platypus"
 * }, null, 2).indent(4));
 */
module.exports.indent = function(indentSize) {
  /* prepend a new line in order to indent the first line as well */
  return ("\n" + this)
  /* replace all consecutive end of line characters with \n and indentSize
      spaces */
    .replace(/[\r\n]+/g, "\n" + " ".repeat(indentSize))
  /* pulls off the first newline (which we prepended in order to indent the
      first line.) */
    .slice(1);
};

/**
 * Attaches the {@link module:string.indent indent} function to the String
 *  prototypes so that it can be used on any String objects in the application.
 *
 * @throws {Error}            If String has already implemented indent.
 */
module.exports.enableIndent = function() {
  if (String.prototype.indent === undefined) {
    this.enabledIndent = true;

    String.prototype.indent = require("./string").indent;
  } else {
    if (this.enabledIndent !== true) {
      throw new Error("Attempted to redefine indent function");
    }
  }
};

/**
 * Detaches the {@link module:string.indent indent} function from the String
 *  prototypes.
 */
module.exports.disableIndent = function() {
  if (this.enabledIndent === true) {
    delete String.prototype.indent;
  }
};

