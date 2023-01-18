/**
 * Create an empty object representing the config.
 * This is mostly for future configuration and not-having-to-rewrite the tests.
 */
export function createConfig() {
    return {};
}
/**
 * Create a context partial with a mocked logger.
 */
export function createContextLogger() {
    return {
        logger: {
            error: jest.fn(),
            log: jest.fn(),
        },
    };
}
/**
 * Create a context partial with some general repository options.
 */
export function createContextOptions() {
    return {
        options: {
            branch: 'master',
            repositoryUrl: 'https://github.com/bycedric/semantic-release-expo',
            tagFormat: '${version}',
        },
    };
}
/**
 * Create a context partial which defines the next release.
 */
export function createContextNextRelease(options) {
    return {
        nextRelease: {
            gitHead: options ? options.gitHead : 'abc234',
            gitTag: options ? options.version : 'v1.2.0',
            notes: options ? options.notes : 'Testing notes',
            version: options ? options.version : '1.2.0',
        },
    };
}
/**
 * Create a context partial which defines the last release.
 */
export function createContextLastRelease(options) {
    return {
        lastRelease: {
            gitHead: options ? options.gitHead : 'abc123',
            gitTag: options ? options.version : 'v1.1.3',
            version: options ? options.version : '1.1.3',
        },
    };
}
/**
 * Create a manifest meta object containing the manifest data.
 */
export function createManifestMeta(manifest) {
    return {
        content: JSON.stringify(manifest),
        filename: 'app.json',
        manifest,
    };
}
/**
 * Create a (full) context object with logger, options and last/next releases.
 */
export function createContext(options = {}) {
    return Object.assign(Object.assign(Object.assign(Object.assign({}, createContextLogger()), createContextOptions()), createContextNextRelease(options.next)), createContextLastRelease(options.last));
}
//# sourceMappingURL=factory.js.map