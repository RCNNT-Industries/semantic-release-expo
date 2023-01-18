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
const writeManifest = jest.fn();
const bumpVersions = jest.fn();
jest.doMock('../../src/expo', () => ({ readManifests, writeManifest, MANIFEST_FILE: 'app.json' }));
jest.doMock('../../src/version-bumpers', () => bumpVersions);
import prepare from '../../src/scripts/prepare';
import { createConfig, createContext, createManifestMeta } from '../factory';
describe('scripts/prepare', () => {
    it('reads and writes manifests with new version bumped', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = createConfig();
        const context = createContext({
            last: {
                gitHead: 'abc123',
                gitTag: 'v0.2.0',
                version: '0.2.0',
            },
            next: {
                gitHead: 'abc234',
                gitTag: 'v0.2.1',
                notes: 'Testing a new version',
                version: '0.2.1',
            },
        });
        const oldMeta = createManifestMeta({ name: 'test', version: '0.2.0' });
        const newMeta = createManifestMeta({ name: 'test', version: '0.2.1' });
        readManifests.mockResolvedValue([oldMeta]);
        bumpVersions.mockReturnValue(newMeta.manifest);
        writeManifest.mockResolvedValue(undefined);
        yield prepare(config, context);
        expect(readManifests).toBeCalled();
        expect(bumpVersions).toBeCalledWith(oldMeta, config, context);
        expect(writeManifest).toBeCalledWith(oldMeta, newMeta.manifest);
        expect(context.logger.log).toBeCalledWith('New %s manifest written for %s to %s', 'Expo', 'test', 'app.json');
    }));
});
//# sourceMappingURL=prepare.test.js.map