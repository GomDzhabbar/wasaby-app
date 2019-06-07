const path = require('path');
const fs = require('fs');

// Создаем папку с модулями из исходников
const root = path.resolve(__dirname, '../../');
const srcFolder = path.join(root, 'src');
const srcUnitFolder = path.resolve(root, 'test/unit');
const standSrcFolder = path.join(__dirname, 'src');
const standUnitFolder = path.resolve(standSrcFolder, 'tests');

if (!fs.existsSync(srcFolder)) {
    console.error('Folder is not exists!', srcFolder);
    return;
}

if (fs.existsSync(standSrcFolder)) { delDirSync(standSrcFolder); }
linkModules(getModulesPaths(srcFolder), standSrcFolder);

if (fs.existsSync(standUnitFolder)) { delDirSync(standUnitFolder); }
linkModules(getModulesPaths(srcUnitFolder), standUnitFolder);

const standUnitPaths = getTestsDep(srcUnitFolder).map((p) => `src/tests/${p}`);

fs.writeFile(path.join(__dirname, '_settings.js'),
    `if (!chai) var chai = require('chai');
    var assert = chai.assert;
    var unitTests = ${ JSON.stringify(standUnitPaths)};
    if (typeof module !== 'undefined') module.exports = unitTests;`, (e) => e && console.error(e));


/**
 * @param {string} dir Путь до директории с тестами
 * @returns {string[]} Список путей до *.test.js unit-тестов
 */
function getTestsDep(dir) {
    return fs.readdirSync(dir).reduce((paths, item) => {
        const itemPath = `${dir}/${item}`;
        if (!fs.statSync(itemPath).isFile() || !item.includes('.test.js')) { return paths; }
        return [...paths, item];
    }, []);
}

/** Возвращает словарь путей до модулей в переданной директории { <имя_модуля>: <абс.путь> } */
function getModulesPaths(dirPath) {
    return fs.readdirSync(dirPath).reduce((paths, module_name) => {
        paths[module_name] = path.resolve(dirPath, module_name);
        return paths;
    }, Object.create(null));
}

/** Линк словаря путей модулей в указанную директорию  */
function linkModules(paths, targetDir) {
    Object.keys(paths)
        .filter((entity_name) => fs.lstatSync(paths[entity_name]).isDirectory())
        .forEach((module_name) => {
            const target = path.resolve(targetDir, module_name);
            if (fs.existsSync(target)) { delDirSync(target); }
            fs.symlinkSync(paths[module_name], target, 'dir');
        });
}

/** Рекурсивное удаление */
function delDirSync(dir_path) {
    if (!fs.existsSync(dir_path)) { return; }
    fs.readdirSync(dir_path)
        .map((file_path) => path.join(dir_path, file_path))
        .forEach((entity_path) => (fs.lstatSync(entity_path).isDirectory()) ? delDirSync(entity_path) : fs.unlinkSync(entity_path));
    fs.rmdirSync(dir_path);
}