"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MockStore_mocks;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockStore = exports.verifyMocks = exports.withMocks = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const sinon_1 = __importDefault(require("sinon"));
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
function withMocks(mockDefs, fn) {
    return () => {
        const mocks = new MockStore();
        beforeEach(function withMocksBeforeEach() {
            mocks.createMocks(mockDefs);
        });
        afterEach(function withMocksAfterEach() {
            mocks.reset();
        });
        fn(mocks);
    };
}
exports.withMocks = withMocks;
/**
 * Convenience function for calling `mocks.verify()`.
 * @param {MockStore<any>} mocks - Returned by callback from {@linkcode withMocks}
 */
function verifyMocks(mocks) {
    mocks.verify();
}
exports.verifyMocks = verifyMocks;
/**
 * @template {Record<string,any>} Mocks
 * @extends {Mocks}
 */
class MockStore {
    /**
     * Uses a sandbox if one is provided
     * @param {SinonSandbox} [sandbox]
     */
    constructor(sandbox) {
        /**
         * Original k/v pair provided to `createMocks`
         * @type {Mocks|undefined}
         */
        _MockStore_mocks.set(this, void 0);
        this.sandbox = sandbox;
    }
    /**
     * @param {Mocks} mockDefs
     */
    createMocks(mockDefs) {
        if (__classPrivateFieldGet(this, _MockStore_mocks, "f")) {
            throw new ReferenceError('Cannot create mocks twice; call `reset()` first.');
        }
        this.sandbox = this.sandbox ?? sinon_1.default.createSandbox().usingPromise(bluebird_1.default);
        for (const [key, value] of Object.entries(mockDefs)) {
            // @ts-ignore
            this[key] = this.sandbox.mock(value);
        }
        __classPrivateFieldSet(this, _MockStore_mocks, mockDefs, "f");
        return this;
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
        // @ts-ignore
        for (const key of Object.keys(__classPrivateFieldGet(this, _MockStore_mocks, "f") ?? {})) {
            // @ts-ignore
            delete this[key];
        }
        this.sandbox?.restore();
        __classPrivateFieldSet(this, _MockStore_mocks, undefined, "f");
    }
}
exports.MockStore = MockStore;
_MockStore_mocks = new WeakMap();
/**
 * @typedef {import('sinon').SinonSandbox} SinonSandbox
 */
//# sourceMappingURL=mock-utils.js.map