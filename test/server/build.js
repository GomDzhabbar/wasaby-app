// const requirejs = require('requirejs');
// const global = (0, eval)('this');
const path = require('path');
const fs = require('fs');

//const buildSettings = require(`${rootDir}/package.json`).testSettings;


// Создаем папку с модулями из исходников
const sourceFolder = path.join(__dirname, '../../src');
const demoSrcFolder = path.join(__dirname, 'src');
if (!fs.existsSync(sourceFolder)) {
   return console.error('Folder is not exists!', sourceFolder);
}

if (fs.existsSync(demoSrcFolder)) {
    console.warn(`Folder ${demoSrcFolder} is exists already. You should npm run test:clean if tests is not running correct.`)
    return;
}

fs.symlinkSync(sourceFolder, demoSrcFolder, 'dir', (err) => console.error(err));
