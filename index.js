"use strict";

/**
 * The main entry point for node-extra-funcs just enables access to the
 *  controllers:
 *
 *  - {@link module:string string}
 *  - {@link module:math   math}
 *
 * @module index
 *
 * @author Henry Brown
 */

/**
 * The external API for getting the {@link module:string string} module.
 */
module.exports.string = require("./string");

/**
 * The external API for getting the {@link module:math   math} module.
 */
module.exports.math   = require("./math");
