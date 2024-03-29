/**
 * Creates a function which creates Mocha "before each" and "after each" hooks to
 * automatically mock (and un-mock) the mocks provided by `libs`.
 *
 * The values of `libs` are provided directly to {@linkcode SinonSandbox.mock}.
 *
 * _Synchronously_ calls `fn` with the {@linkcode MockStore} after hooks have been created, but not before they have been run.
 *
 * @param {Record<string|symbol,any>} mockDefs
 * @param {(mocks: MockStore<any>) => void} fn
 * @returns {() => void}
 */
export function withMocks(mockDefs: Record<string | symbol, any>, fn: (mocks: MockStore<any>) => void): () => void;
/**
 * Convenience function for calling `mocks.verify()`.
 * @param {MockStore<any>} mocks - Returned by callback from {@linkcode withMocks}
 */
export function verifyMocks(mocks: MockStore<any>): void;
/**
 * @template {Record<string,any>} Mocks
 * @extends {Mocks}
 */
export class MockStore<Mocks extends Record<string, any>> {
    /**
     * Uses a sandbox if one is provided
     * @param {SinonSandbox} [sandbox]
     */
    constructor(sandbox?: sinon.SinonSandbox | undefined);
    /**
     * Temporary sandbox; will be `undefined` until `beforeEach` is called
     * @type {SinonSandbox|undefined}
     */
    sandbox: SinonSandbox | undefined;
    /**
     * @param {Mocks} mockDefs
     */
    createMocks(mockDefs: Mocks): this;
    /**
     * Calls {@linkcode SinonSandbox.verify} on the `sandbox` prop, if it exists
     */
    verify(): void;
    reset(): void;
    #private;
}
export type SinonSandbox = import('sinon').SinonSandbox;
import sinon from 'sinon';
//# sourceMappingURL=mock-utils.d.ts.map