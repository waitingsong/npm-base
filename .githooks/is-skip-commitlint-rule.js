"use strict";
/**
 * Rules for skipping commintlint or not
 * when some test passed
 * protect has high priority than skip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipMsg = exports.protectBranch = void 0;
exports.protectBranch = [
    /^(master|release)$/,
    /^develop$/,
    /^v.+/,
    /^release-.+/,
];
exports.skipMsg = [
    /^Merge remote-tracking branch/,
    /test foo/,
];
