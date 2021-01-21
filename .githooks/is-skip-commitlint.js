"use strict";
/**
 * 通过设置执行结果 code， 检查是否需要执行 commitlint
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const init_utils_1 = require("./init-utils");
const is_skip_commitlint_rule_1 = require("./is-skip-commitlint-rule");
const test_skip_commitlint_1 = require("./test-skip-commitlint");
const args = process.argv;
const baseDir = init_utils_1.join(__dirname, '..');
test_skip_commitlint_1.isSkipCommitlint({
    baseDir,
    branchName: args[3],
    COMMIT_EDITMSG: args[2],
    protectBranch: is_skip_commitlint_rule_1.protectBranch,
    skipMsg: is_skip_commitlint_rule_1.skipMsg,
}).pipe(operators_1.tap(exitCode => {
    process.exit(exitCode);
})).subscribe();
