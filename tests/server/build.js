// const requirejs = require('requirejs');
// const global = (0, eval)('this');
const path = require('path');
const fs = require('fs');

//const buildSettings = require(`${rootDir}/package.json`).testSettings;


// Создаем папку с модулями из исходников
const sourceFolder = path.join(__dirname, '../../src');
const demoSrcFolder = path.join(__dirname, 'src');
if (!fs.existsSync(sourceFolder)) {
   return console.error("Folder is not exists!", sourceFolder);
}

if (demoSrcFolder) {
    return;
}

fs.symlinkSync(sourceFolder, demoSrcFolder, 'dir', (err) => console.error(err));
