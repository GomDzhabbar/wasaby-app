"use strict";
exports.__esModule = true;
var chai = require("chai");
var path = require("path");
var requirejs = require("requirejs");
function requireTests() {
    if (!process.argv.some(function (arg) { return arg.includes('--test='); })) {
        return;
    }
    var global = (0, eval)('this');
    global.requirejs = requirejs;
    global.define = requirejs.define;
    global.assert = chai.assert;
    requirejs.config({ baseUrl: path.resolve(__dirname, 'src') });
    var singleTest = process.argv.find(function (arg) { return arg.includes('--test='); }).substring('--test='.length);
    if (singleTest !== 'all') {
        return requirejs(singleTest);
    }
    var unitTests = require(__dirname + "/_settings");
    unitTests.forEach(requirejs);
}
requireTests();
