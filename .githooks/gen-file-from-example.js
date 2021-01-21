"use strict";
/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */
Object.defineProperty(exports, "__esModule", { value: true });
const init_example_file_1 = require("./init-example-file");
const init_utils_1 = require("./init-utils");
const init_config_1 = require("./init.config");
const rootDir = init_utils_1.join(__dirname, '..');
init_example_file_1.genFileFromExample(rootDir, init_config_1.default)
    .then(files => {
    console.info('生成文件：', files);
})
    .catch(console.error);
