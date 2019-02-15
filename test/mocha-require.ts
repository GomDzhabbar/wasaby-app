import chai = require('chai');
import fs = require('fs');
import pathMod = require('path');
import requirejs = require('requirejs');
const global = (0, eval)('this');

global.requirejs = requirejs;
global.define = requirejs.define;
// @ts-ignore
global.assert = chai.assert;

const config =  {
    "baseUrl": "src",
    "paths": {},
    "waitSeconds": 0
};
requirejs.config(config);

function getTestFromDir(path: string): string[] {
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

function runTests() {
    const singleTest = process.argv.length > 2 && process.argv[2].includes('--test=')
        ? process.argv[2].substring('--test='.length)
        : false;

    if (singleTest === false) {
        return;
    }

    if (singleTest !== 'all') {
        return requirejs(singleTest);
    }
    const unitTestFolder = pathMod.join(__dirname, 'unit');
    getTestFromDir(unitTestFolder).forEach(requirejs);
}
runTests();
