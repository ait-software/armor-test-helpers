"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubLog = void 0;
require("@colors/colors");
class LogStub {
    /**
     *
     * @param {LogStubOptions} [opts]
     */
    constructor(opts = {}) {
        this.output = '';
        this.stripColors = Boolean(opts.stripColors);
    }
    /**
     *
     * @param {string} level
     * @param {any} message
     */
    log(level, message) {
        if (this.stripColors) {
            message = message.stripColors;
        }
        if (this.output.length > 0) {
            this.output += '\n';
        }
        this.output = `${this.output}${level}: ${message}`;
    }
}
/**
 * Instantiates a {@linkcode LogStub} object
 * @param {import('sinon').SinonSandbox} sandbox
 * @param {import('armor-types').ArmorLogger} log
 * @param {LogStubOptions} [opts]
 * @returns {LogStub}
 */
function stubLog(sandbox, log, opts = {}) {
    let logStub = new LogStub(opts);
    for (let l of log.levels) {
        sandbox.stub(log, l).callsFake(function doLogging(mess) {
            logStub.log(l, mess);
        });
    }
    return logStub;
}
exports.stubLog = stubLog;
/**
 * Options for {@linkcode LogStub} constructor
 * @typedef LogStubOptions
 * @property {boolean} [stripColors] - If `true`, strip ANSI colors from output
 */
//# sourceMappingURL=log-utils.js.map