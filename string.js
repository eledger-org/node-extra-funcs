"use strict";

function padCount(string, padValue, padLength) {
  return Math.floor(Math.max(0, padLength - string.length) / padValue.length);
}

module.exports.enableAll = function() {
  let s = require("./string.js");

  s.enablePadLeft();
  s.enablePadRight();
  s.enablePrepend();
  s.enableIndent();
};

module.exports.enablePadLeft = function() {
  if (String.prototype.padLeft === undefined) {
    this.enabledPadLeft = true;

    String.prototype.padLeft = function(padValue, padLength) {
      if (padLength < 0) {
        throw new Error("Invalid pad length");
      }

      return String(padValue.repeat(padCount(this, padValue, padLength)) + this);
    };
  } else {
    if (this.enabledPadLeft !== true) {
      throw new Error("Attempted to redefine padLeft function");
    }
  }
};

module.exports.disablePadLeft = function() {
  if (this.enabledPadLeft === true) {
    delete String.prototype.padLeft;
  }
};

module.exports.enablePadRight = function() {
  if (String.prototype.padRight === undefined) {
    this.enabledPadRight = true;

    String.prototype.padRight = function(padValue, padLength) {
      if (padLength < 0) {
        throw new Error("Invalid pad length");
      }

      return String(this + padValue.repeat(padCount(this, padValue, padLength)));
    };
  } else {
    if (this.enabledPadRight !== true) {
      throw new Error("Attempted to redefine padRight function");
    }
  }
};

module.exports.disablePadRight = function() {
  if (this.enabledPadRight === true) {
    delete String.prototype.padRight;
  }
};

module.exports.enablePrepend = function() {
  if (String.prototype.prepend === undefined) {
    this.enabledPrepend = true;

    String.prototype.prepend = function(prefix) {
      return String(prefix + this);
    };
  } else {
    if (this.enabledPrepend !== true) {
      throw new Error("Attempted to redefine prepend function");
    }
  }
};

module.exports.disablePrepend = function() {
  if (this.enabledPrepend === true) {
    delete String.prototype.prepend;
  }
};

module.exports.enableIndent = function() {
  if (String.prototype.indent === undefined) {
    this.enabledIndent = true;

    String.prototype.indent = function(indentSize) {
      return ("\n" + this).replace(/[\r\n]+/g, "\n" + " ".repeat(indentSize)).slice(1);
    };
  } else {
    if (this.enabledIndent !== true) {
      throw new Error("Attempted to redefine indent function");
    }
  }
};

module.exports.disableIndent = function() {
  if (this.enabledIndent === true) {
    delete String.prototype.indent;
  }
};

