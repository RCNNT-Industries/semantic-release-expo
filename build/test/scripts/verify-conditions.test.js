var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const readManifests = jest.fn();
jest.doMock('../../src/expo', () => ({ readManifests, MANIFEST_FILE: 'app.json' }));
import verifyConditions from '../../src/scripts/verify-conditions';
import { createContext } from '../factory';
describe('scripts/verify-conditions', () => {
    it('reads manifest and logs name', () => __awaiter(void 0, void 0, void 0, function* () {
        const context = createContext();
        const config = {
            manifests: [
                'app.json',
                'app.staging.json',
            ],
        };
        const firstMeta = {
            content: '{ "name": "test" }',
            filename: 'app.json',
            manifest: { name: 'test' },
        };
        const secondMeta = {
            content: '{ "name": "test-staging" }',
            filename: 'app.staging.json',
            manifest: { name: 'test-staging' },
        };
        readManifests.mockResolvedValue([firstMeta, secondMeta]);
        yield verifyConditions(config, context);
        expect(readManifests).toBeCalled();
        expect(context.logger.log).toHaveBeenNthCalledWith(1, 'Found %s manifest for %s in %s', 'Expo', 'test', 'app.json');
        expect(context.logger.log).toHaveBeenNthCalledWith(2, 'Found %s manifest for %s in %s', 'Expo', 'test-staging', 'app.staging.json');
    }));
    it('throws when read manifest failed', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {};
        const context = createContext();
        readManifests.mockRejectedValue(new Error());
        expect(verifyConditions(config, context)).rejects.toThrowError();
    }));
    it('inherits prepare configration without verify conditions configuration', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {};
        const manifests = ['app.production.json', 'app.staging.json'];
        const context = createContext();
        context.options.prepare = [
            { path: '@semantic-release/changelog' },
            { path: '@semantic-release/npm' },
            { path: 'semantic-release-expo', manifests },
        ];
        const firstMeta = {
            content: '{ "name": "test" }',
            filename: 'app.production.json',
            manifest: { name: 'test' },
        };
        const secondMeta = {
            content: '{ "name": "test-staging" }',
            filename: 'app.staging.json',
            manifest: { name: 'test-staging' },
        };
        readManifests.mockResolvedValue([firstMeta, secondMeta]);
        yield verifyConditions(config, context);
        expect(readManifests).toBeCalled();
        expect(context.logger.log).toHaveBeenNthCalledWith(1, 'Found %s manifest for %s in %s', 'Expo', 'test', 'app.production.json');
        expect(context.logger.log).toHaveBeenNthCalledWith(2, 'Found %s manifest for %s in %s', 'Expo', 'test-staging', 'app.staging.json');
    }));
});
//# sourceMappingURL=verify-conditions.test.js.map