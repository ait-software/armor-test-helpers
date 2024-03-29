/**
 * @template {Record<string,any>|{mocks: Record<string,any>}} Mocks
 * @param {Mocks} mockDefs
 * @param {(sandboxStore: SandboxStore<any>) => void} fn
 * @returns {() => void}
 */
export function withSandbox<Mocks extends Record<string, any> | {
    mocks: Record<string, any>;
}>(mockDefs: Mocks, fn: (sandboxStore: SandboxStore<any>) => void): () => void;
/**
 * Convenience function for calling {@linkcode SandboxStore.verify}.
 * @param {SandboxStore<any>|MockStore<any>} sbxOrMocks
 */
export function verifySandbox(sbxOrMocks: SandboxStore<any> | MockStore<any>): void;
/**
 * @template {Record<string,any>} Mocks
 */
export class SandboxStore<Mocks extends Record<string, any>> {
    /**
     * Uses a sandbox if one is provided
     * @param {SinonSandbox} [sandbox]
     */
    constructor(sandbox?: sinon.SinonSandbox | undefined);
    /** @type {MockStore<Record<string,any>>} */
    mocks: MockStore<Record<string, any>>;
    /** @type {SinonSandbox|undefined} */
    sandbox: SinonSandbox | undefined;
    /**
     * @param {Mocks} mocks
     */
    createSandbox(mocks?: Mocks): void;
    /**
     * Calls {@linkcode SinonSandbox.verify} on the `sandbox` prop, if it exists
     */
    verify(): void;
    reset(): void;
}
export type SinonSandbox = import('sinon').SinonSandbox;
import { MockStore } from './mock-utils';
import sinon from 'sinon';
//# sourceMappingURL=sandbox-utils.d.ts.map