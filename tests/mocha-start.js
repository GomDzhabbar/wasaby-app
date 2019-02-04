"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requirejs = require("requirejs");
const pathMod = require("path");
const fs = require("fs");
const chai = require("chai");
const global = (0, eval)('this');
global.requirejs = requirejs;
global.define = requirejs.define;
global.assert = chai.assert;
const config = {
    "baseUrl": "./tests/server/src",
    "paths": {},
    "waitSeconds": 0
};
requirejs.config(config);
function getTestFromDir(path) {
    let files = [];
    fs.readdirSync(path).forEach((fileName) => {
        const filePath = pathMod.join(path, fileName);
        if (!fileName.toLowerCase().includes('test')) {
            return;
        }
        if (fs.statSync(filePath).isDirectory()) {
            return getTestFromDir(filePath).forEach((fileTests) => {
                files.push(fileTests);
            });
        }
        files.push(filePath);
    });
    return files;
}
function run() {
    const singleTest = process.argv.pop().substring('--test='.length);
    if (singleTest !== 'all') {
        return requirejs(singleTest);
    }
    const unitTestFolder = pathMod.join(__dirname, 'unit');
    getTestFromDir(unitTestFolder).forEach(requirejs);
}
run();
