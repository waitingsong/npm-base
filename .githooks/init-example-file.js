"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genFileFromExample = void 0;
/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */
const init_utils_1 = require("./init-utils");
// const rootDir = join(__dirname, '..')
async function genFileFromExample(rootDir, list) {
    const copied = [];
    for (const dir of list) {
        const path = init_utils_1.join(rootDir, dir.replace(/\.{2,}/, '/'));
        if (!await init_utils_1.isPathAccessible(path)) {
            continue;
        }
        const files = await init_utils_1.readDirAsync(path);
        for (const file of files) {
            if (!hasExampleSuffix(file)) {
                continue;
            }
            const source = init_utils_1.join(path, file);
            const stripped = stripExampleSuffix(file);
            const target = init_utils_1.join(path, stripped);
            if (!await init_utils_1.isPathAccessible(target)) {
                await init_utils_1.copyFileAsync(source, target);
                copied.push(`${dir}/${stripped}`);
            }
        }
    }
    return copied;
}
exports.genFileFromExample = genFileFromExample;
function hasExampleSuffix(name) {
    if (!name) {
        return false;
    }
    if (name === '.example') {
        return false;
    }
    const arr = name.split('.');
    if (arr.length > 1 && arr[arr.length - 1] === 'example') { // 排除  '.example'
        return true;
    }
    else {
        return false;
    }
}
function stripExampleSuffix(name) {
    const arr = name.split('.');
    if (arr.length > 1 && arr[arr.length - 1] === 'example') {
        return arr.slice(0, arr.length - 1).join('.');
    }
    return name;
}
