"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandboxStore = exports.verifySandbox = exports.withSandbox = void 0;
const sinon_1 = __importDefault(require("sinon"));
const lodash_1 = __importDefault(require("lodash"));
const bluebird_1 = __importDefault(require("bluebird"));
const mock_utils_1 = require("./mock-utils");
/**
 * @template {Record<string,any>|{mocks: Record<string,any>}} Mocks
 * @param {Mocks} mockDefs
 * @param {(sandboxStore: SandboxStore<any>) => void} fn
 * @returns {() => void}
 */
function withSandbox(mockDefs, fn) {
    // backwards-compat
    if (!lodash_1.default.isEmpty(mockDefs.mocks)) {
        mockDefs = mockDefs.mocks;
    }
    return () => {
        /** @type {SandboxStore<any>} */
        const sbx = new SandboxStore();
        beforeEach(function beforeEach() {
            sbx.createSandbox(mockDefs);
        });
        afterEach(function afterEach() {
            sbx.reset();
        });
        fn(sbx);
    };
}
exports.withSandbox = withSandbox;
/**
 * Convenience function for calling {@linkcode SandboxStore.verify}.
 * @param {SandboxStore<any>|MockStore<any>} sbxOrMocks
 */
function verifySandbox(sbxOrMocks) {
    sbxOrMocks.verify();
}
exports.verifySandbox = verifySandbox;
/**
 * @template {Record<string,any>} Mocks
 */
class SandboxStore {
    /**
     * Uses a sandbox if one is provided
     * @param {SinonSandbox} [sandbox]
     */
    constructor(sandbox) {
        this.sandbox = sandbox;
    }
    /**
     * @param {Mocks} mocks
     */
    createSandbox(mocks = /** @type {Mocks} */ ({})) {
        this.sandbox = this.sandbox ?? sinon_1.default.createSandbox().usingPromise(bluebird_1.default);
        this.mocks = new mock_utils_1.MockStore(this.sandbox).createMocks(mocks);
    }
    /**
     * Calls {@linkcode SinonSandbox.verify} on the `sandbox` prop, if it exists
     */
    verify() {
        if (!this.sandbox) {
            throw new ReferenceError('Cannot verify mocks before they are created; call `createMocks()` first');
        }
        this.sandbox.verify();
    }
    reset() {
        this.mocks?.reset();
        delete this.sandbox;
    }
}
exports.SandboxStore = SandboxStore;
/**
 * @typedef {import('sinon').SinonSandbox} SinonSandbox
 */
//# sourceMappingURL=sandbox-utils.js.map