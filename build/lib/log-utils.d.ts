/**
 * Options for {@linkcode LogStub } constructor
 */
export type LogStubOptions = {
    /**
     * - If `true`, strip ANSI colors from output
     */
    stripColors?: boolean | undefined;
};
/**
 * Instantiates a {@linkcode LogStub} object
 * @param {import('sinon').SinonSandbox} sandbox
 * @param {import('armor-types').ArmorLogger} log
 * @param {LogStubOptions} [opts]
 * @returns {LogStub}
 */
export function stubLog(sandbox: import('sinon').SinonSandbox, log: import('armor-types').ArmorLogger, opts?: LogStubOptions | undefined): LogStub;
declare class LogStub {
    /**
     *
     * @param {LogStubOptions} [opts]
     */
    constructor(opts?: LogStubOptions | undefined);
    output: string;
    stripColors: boolean;
    /**
     *
     * @param {string} level
     * @param {any} message
     */
    log(level: string, message: any): void;
}
export {};
//# sourceMappingURL=log-utils.d.ts.map