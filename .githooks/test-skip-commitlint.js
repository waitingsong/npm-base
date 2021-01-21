"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSkipCommitlint = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const init_utils_1 = require("./init-utils");
/** Return Observable<number> to check whether skip commitlint */
function isSkipCommitlint(options) {
    const { baseDir, COMMIT_EDITMSG, branchName, protectBranch, skipMsg } = options;
    const commitFile = init_utils_1.join(baseDir, COMMIT_EDITMSG);
    if (!COMMIT_EDITMSG) {
        console.info('COMMIT_EDITMSG value blank');
        return rxjs_1.of(1);
    }
    const protectRule$ = rxjs_1.from(protectBranch).pipe(operators_1.defaultIfEmpty());
    const skipRule$ = rxjs_1.from(skipMsg).pipe(operators_1.defaultIfEmpty());
    const content$ = init_utils_1.pathAccessible(commitFile).pipe(operators_1.tap(path => {
        if (!path) {
            console.info(`COMMIT_EDITMSG file not exists: "${commitFile}"`);
            process.exit(1);
        }
    }), operators_1.mergeMap(path => init_utils_1.readFileAsync(path, { encoding: 'utf8' })), operators_1.map(msg => {
        const head = msg.split(/\n|\r\n/)[0];
        return { head, msg };
    }), operators_1.share());
    const protectTest$ = rxjs_1.combineLatest(rxjs_1.of(branchName), protectRule$).pipe(operators_1.map(([branch, regex]) => regex && regex.test(branch) ? true : false), operators_1.filter(matched => matched), operators_1.mapTo(0), // process.exit(0)
    operators_1.defaultIfEmpty(1));
    const skipTest$ = rxjs_1.combineLatest(content$, skipRule$).pipe(operators_1.map(([{ head }, regex]) => regex && regex.test(head) ? true : false), operators_1.filter(matched => matched), operators_1.mapTo(1), // process.exit(1)
    operators_1.defaultIfEmpty(0));
    const exitCode$ = rxjs_1.forkJoin(protectTest$, skipTest$).pipe(operators_1.map(([pro, skip]) => {
        // console.info('pro:skip', pro, skip)
        // tslint:disable-next-line:no-bitwise
        return pro & skip;
    }), operators_1.defaultIfEmpty(0), // not skip commitlint
    operators_1.take(1));
    return exitCode$;
}
exports.isSkipCommitlint = isSkipCommitlint;
