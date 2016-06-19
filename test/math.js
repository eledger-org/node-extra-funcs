/* eslint-env mocha */

"use strict";

var assert = require("chai").assert;
let mathFuncController = require("../index.js").math;

describe("math.js", function() {
  describe("enable*()", function() {
    describe("Test that by default, none of the math functions are enabled", function() {
      it("should not have enabled Math.floor10", function() {
        assert.isUndefined(Math.floor10);
      });

      it("should not have enabled Math.ceil10", function() {
        assert.isUndefined(Math.ceil10);
      });

      it("should not have enabled Math.round10", function() {
        assert.isUndefined(Math.round10);
      });
    });
  });

  describe("enableFloor10()", function() {
    it("should enable Math.floor10", function() {
      mathFuncController.enableFloor10();

      assert.isDefined(Math.floor10);
    });
  });

  describe("enableCeil10()", function() {
    it("should enable Math.ceil10", function() {
      mathFuncController.enableCeil10();

      assert.isDefined(Math.ceil10);
    });
  });

  describe("enableRound10()", function() {
    it("should enable Math.round10", function() {
      mathFuncController.enableRound10();

      assert.isDefined(Math.round10);
    });
  });

  describe("Test for existing function clobbering", function() {
    it("should not clobber an existing floor10 function", function() {
      assert.isTrue(mathFuncController.enabledFloor10);
      assert.isDefined(Math.floor10);

      delete mathFuncController.enabledFloor10;

      assert.throws(function() {
        mathFuncController.enableFloor10();
      });

      delete Math.floor10;

      assert.isUndefined(Math.floor10);
    });

    it("should not clobber an existing ceil10 function", function() {
      assert.isTrue(mathFuncController.enabledCeil10);
      assert.isDefined(Math.ceil10);

      delete mathFuncController.enabledCeil10;

      assert.throws(function() {
        mathFuncController.enableCeil10();
      });

      delete Math.ceil10;

      assert.isUndefined(Math.ceil10);
    });

    it("should not clobber an existing round10 function", function() {
      assert.isTrue(mathFuncController.enabledRound10);
      assert.isDefined(Math.round10);

      delete mathFuncController.enabledRound10;

      assert.throws(function() {
        mathFuncController.enableRound10();
      });

      delete Math.round10;

      assert.isUndefined(Math.round10);
    });
  });

  describe("enableAll()", function() {
    it("should enable all math functions", function() {
      assert.isUndefined(Math.floor10);
      assert.isUndefined(Math.ceil10);
      assert.isUndefined(Math.round10);

      mathFuncController.enableAll();

      assert.isDefined(Math.floor10);
      assert.isDefined(Math.ceil10);
      assert.isDefined(Math.round10);
    });
  });

  describe("floor10()", function() {
    it("should allow to round down at the 10^exp's place floor10(value, exp)", function() {
      assert.equal(Math.floor10(999, 3), 0);
      assert.equal(Math.floor10(999, 2), 900);
      assert.equal(Math.floor10(999, 1), 990);

      assert.equal(Math.floor10(999.99, -1), 999.9);
    });
  });

  describe("ceil10()", function() {
    it("should allow to round up at the 10^exp's place ceil10(value, exp)", function() {
      assert.equal(Math.ceil10(111, 3), 1000);
      assert.equal(Math.ceil10(111, 2), 200);
      assert.equal(Math.ceil10(111, 1), 120);

      assert.equal(Math.ceil10(111.11, -1), 111.2);
    });
  });

  describe("round10()", function() {
    it("should allow rounding at the 10^exp's place round10(value, exp)", function() {
      assert.equal(Math.round10(445, 3), 0);
      assert.equal(Math.round10(455, 3), 0);
      assert.equal(Math.round10(555, 3), 1000);
    });
  });
});

