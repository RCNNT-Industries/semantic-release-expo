"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/config");
const expo_1 = require("../src/expo");
const factory_1 = require("./factory");
describe('config', () => {
    describe('#getManifestFiles', () => {
        it('returns default manifest name when no config is set', () => {
            expect((0, config_1.getManifestFiles)({})).toEqual(expect.arrayContaining([expo_1.MANIFEST_FILE]));
        });
        it('returns default manifest name when empty manifest config is set', () => {
            expect((0, config_1.getManifestFiles)({ manifests: [] })).toEqual(expect.arrayContaining([expo_1.MANIFEST_FILE]));
        });
        it('returns manifests configuration', () => {
            const manifests = ['app.staging.json', 'app.production.json'];
            expect((0, config_1.getManifestFiles)({ manifests })).toEqual(expect.arrayContaining(manifests));
        });
    });
    describe('#getVersionTemplates', () => {
        it('returns recommended templates by default', () => {
            expect((0, config_1.getVersionTemplates)()).toMatchObject({
                android: '${recommended}',
                ios: '${recommended}',
                version: '${recommended}',
            });
        });
        it('uses template string for all templates', () => {
            expect((0, config_1.getVersionTemplates)({ versions: '${code}' })).toMatchObject({
                android: '${code}',
                ios: '${code}',
                version: '${code}',
            });
        });
        it('uses independent strings for all templates', () => {
            const versions = {
                android: '${code}',
                ios: '${next.raw}',
                version: '${next.raw}',
            };
            expect((0, config_1.getVersionTemplates)({ versions })).toMatchObject(versions);
        });
    });
    const createContextWithPrepare = (prepare) => (Object.assign(Object.assign({}, (0, factory_1.createContextLogger)()), { options: Object.assign(Object.assign({}, (0, factory_1.createContextOptions)().options), { prepare }) }));
    describe('#getPrepareConfig', () => {
        it('returns nothing when prepare configuration is not defined', () => {
            const contextWithoutPrepare = createContextWithPrepare(undefined);
            const contextWithSinglePrepare = createContextWithPrepare({ path: '@semantic-release/npm' });
            const contextWithPrepare = createContextWithPrepare([
                { path: '@semantic-release/changelog' },
                { path: '@semantic-release/npm' },
            ]);
            expect((0, config_1.getPrepareConfig)(contextWithoutPrepare)).toBeUndefined();
            expect((0, config_1.getPrepareConfig)(contextWithSinglePrepare)).toBeUndefined();
            expect((0, config_1.getPrepareConfig)(contextWithPrepare)).toBeUndefined();
        });
        it('returns prepare configuration from context if defined', () => {
            const manifests = ['app.production.json', 'app.staging.json'];
            const context = createContextWithPrepare([
                { path: '@semantic-release/changelog' },
                { path: '@semantic-release/npm' },
                { path: 'semantic-release-expo', manifests },
            ]);
            expect((0, config_1.getPrepareConfig)(context)).toMatchObject({ manifests });
        });
    });
    describe('#inheritPrepareConfig', () => {
        it('returns verify conditions configuration if defined', () => {
            const config = { manifests: ['app.json'] };
            const context = createContextWithPrepare([
                { path: '@semantic-release/changelog' },
                { path: '@semantic-release/npm' },
                {
                    manifests: ['app.production.json', 'app.staging.json'],
                    path: 'semantic-release-expo',
                },
            ]);
            expect((0, config_1.inheritPrepareConfig)(config, context)).toMatchObject(config);
        });
        it('returns new configuration when prepare is defined and verify conditions is not', () => {
            const config = {};
            const manifests = ['app.production.json', 'app.staging.json'];
            const context = createContextWithPrepare([
                { path: '@semantic-release/changelog' },
                { path: '@semantic-release/npm' },
                { path: 'semantic-release-expo', manifests },
            ]);
            expect((0, config_1.inheritPrepareConfig)(config, context)).toMatchObject({ manifests });
        });
        it('returns empty configuration when both prepare and verify conditions are not defined', () => {
            const config = {};
            const context = createContextWithPrepare([
                { path: '@semantic-release/changelog' },
                { path: '@semantic-release/npm' },
            ]);
            expect((0, config_1.inheritPrepareConfig)(config, context)).toMatchObject({});
        });
    });
});
//# sourceMappingURL=config.test.js.map