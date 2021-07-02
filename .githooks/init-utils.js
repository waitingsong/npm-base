"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomInt = exports.isPathAccessible = exports.pathAccessible = exports.normalize = exports.join = exports.dirname = exports.basename = exports.statAsync = exports.readDirAsync = exports.readFileAsync = exports.copyFileAsync = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
Object.defineProperty(exports, "basename", { enumerable: true, get: function () { return path_1.basename; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return path_1.dirname; } });
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return path_1.join; } });
Object.defineProperty(exports, "normalize", { enumerable: true, get: function () { return path_1.normalize; } });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const util_1 = require("util");
exports.copyFileAsync = (0, util_1.promisify)(fs_1.copyFile);
exports.readFileAsync = (0, util_1.promisify)(fs_1.readFile);
exports.readDirAsync = (0, util_1.promisify)(fs_1.readdir);
exports.statAsync = (0, util_1.promisify)(fs_1.stat);
/** Return path if accessible, blank if not accessible */
function pathAccessible(path) {
    return (0, rxjs_1.defer)(() => isPathAccessible(path)).pipe((0, operators_1.map)(exists => exists ? (0, path_1.normalize)(path) : ''));
}
exports.pathAccessible = pathAccessible;
// support relative file ('./foo')
function isPathAccessible(path) {
    return path
        ? new Promise(resolve => (0, fs_1.access)(path, err => resolve(err ? false : true)))
        : Promise.resolve(false);
}
exports.isPathAccessible = isPathAccessible;
/**
 * Generate random integer
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function genRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.genRandomInt = genRandomInt;
