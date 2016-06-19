/* eslint-env mocha */

/**
 * Automated mocha and chai tests for the module {@link module:string string.js}.
 *
 * @module test/string
 *
 * @author Henry Brown
 */

"use strict";

var assert = require("chai").assert;
let strFuncController = require("../index.js").string;

describe("string.js", function() {
  describe("enable*()", function() {
    describe("Test that by default, none of the string functions are enabled", function() {
      it("should not have enabled String.padLeft", function() {
        assert.isUndefined("".padLeft);
      });

      it("should not have enabled String.padRight", function() {
        assert.isUndefined("".padRight);
      });

      it("should not have enabled String.prepend", function() {
        assert.isUndefined("".prepend);
      });

      it("should not have enabled String.indent", function() {
        assert.isUndefined("".indent);
      });
    });
  });

  describe("enablePadLeft()", function() {
    it("should enable String.padLeft", function() {
      strFuncController.enablePadLeft();

      assert.isDefined("".padLeft);
    });

    it("shouldn't throw an error if you enable it again", function() {
      assert.doesNotThrow(function() {
        strFuncController.enablePadLeft();
      });
    });
  });

  describe("enablePadRight()", function() {
    it("should enable String.padRight", function() {
      strFuncController.enablePadRight();

      assert.isDefined("".padRight);
    });

    it("shouldn't throw an error if you enable it again", function() {
      assert.doesNotThrow(function() {
        strFuncController.enablePadRight();
      });
    });
  });

  describe("enablePrepend()", function() {
    it("should enable String.prepend", function() {
      strFuncController.enablePrepend();

      assert.isDefined("".prepend);
    });

    it("shouldn't throw an error if you enable it again", function() {
      assert.doesNotThrow(function() {
        strFuncController.enablePrepend();
      });
    });
  });

  describe("enableIndent()", function() {
    it("should enable String.indent", function() {
      strFuncController.enableIndent();

      assert.isDefined("".indent);
    });

    it("shouldn't throw an error if you enable it again", function() {
      assert.doesNotThrow(function() {
        strFuncController.enableIndent();
      });
    });
  });

  describe("Test for existing function clobbering", function() {
    it("should not clobber an existing padLeft function", function() {
      assert.isTrue(strFuncController.enabledPadLeft);
    });

    it("should not clobber an existing padRight function", function() {
      assert.isTrue(strFuncController.enabledPadRight);
    });

    it("should not clobber an existing prepend function", function() {
      assert.isTrue(strFuncController.enabledPrepend);
    });

    it("should not clobber an existing indent function", function() {
      assert.isTrue(strFuncController.enabledIndent);
    });
  });

  describe("padLeft()", function() {
    it("should pad single characters", function() {
      assert.equal("5".padLeft("0", 5), "00005");
    });

    it("should pad strings provided such that it will not exceed the padLength", function() {
      assert.equal("bla".padLeft("alb", 6), "albbla");
    });

    it("should pad fewer than padLength if the string to pad is too long", function() {
      assert.equal("bla".padLeft("alb", 7), "albbla");
    });

    it("shouldn't change a string that already has a length >= padLength", function() {
      let startStr = "this is an example string";

      assert.equal(startStr, startStr.padLeft("0", 5));
      assert.equal(startStr, startStr.padLeft("0", startStr.length));
    });

    it("throws an error if you try to padLeft a negative amount", function() {
      assert.throws(function() {
        return " ".padLeft(" ", -1);
      });
    });
  });

  describe("padRight()", function() {
    it("should pad single characters", function() {
      assert.equal("N".padRight("o", 5), "Noooo");
    });

    it("should pad strings provided but not exceed padLength", function() {
      assert.equal(" ".padRight("sos ", 17), " sos sos sos sos ");
    });

    it("should pad fewer than padLength if the string to pad is too long", function() {
      assert.equal("alb".padRight("bla", 7), "albbla");
    });

    it("shouldn't change a string that already has a length >= padLength", function() {
      let startStr = "this is an example string";

      assert.equal(startStr, startStr.padRight("0", 5));
      assert.equal(startStr, startStr.padRight("0", startStr.length));
    });

    it("throws an error if you try to padRight a negative amount", function() {
      assert.throws(function() {
        return " ".padRight(" ", -1);
      });
    });
  });

  describe("prepend()", function() {
    it("should put the prefix string before the existing string content", function() {
      assert.equal("bla".prepend("alb"), "albbla");
    });
  });

  describe("indent()", function() {
    it("should indent the first line as well as any additional lines", function() {
      assert.equal("bla".indent(4), "    bla");
    });

    it("should indent all passed content at each newline by the indentSize", function() {
      assert.equal("bla\nbla".indent(4), "    bla\n    bla");
    });

    it("throws an error if you try to indent a negative size", function() {
      assert.throws(function() {
        return "".indent(-1);
      });
    });
  });
});

