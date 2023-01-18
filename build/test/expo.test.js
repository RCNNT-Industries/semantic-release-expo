var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const readFile = jest.fn();
const readJson = jest.fn();
const writeJson = jest.fn();
const detectIndent = jest.fn();
const detectNewline = jest.fn();
jest.doMock('fs-extra', () => ({ readFile, readJson, writeJson }));
jest.doMock('detect-indent', () => detectIndent);
jest.doMock('detect-newline', () => detectNewline);
import { DEFAULT_INDENT, DEFAULT_NEWLINE, getAndroidPlatform, getIosPlatform, getPlatforms, logManifestFromError, MANIFEST_FILE, readManifest, readManifests, writeManifest, } from '../src/expo';
import { createContext } from './factory';
describe('expo', () => {
    describe('constants', () => {
        it('has correct manifest file name', () => expect(MANIFEST_FILE).toBe('app.json'));
        it('has double spaces as default indent', () => expect(DEFAULT_INDENT).toBe('  '));
        it('has line feed as default new line', () => expect(DEFAULT_NEWLINE).toBe('\n'));
    });
    describe('#logManifestFromError', () => {
        it('does not log anything for normal errors', () => {
            const context = createContext();
            logManifestFromError(context, new Error());
            expect(context.logger.log.mock.calls).toHaveLength(0);
        });
        it('does log for errors related to manifest errors', () => {
            const context = createContext();
            const error = new Error();
            error.expo = 'app.production.json';
            logManifestFromError(context, error);
            expect(context.logger.log).toBeCalledWith('Error encountered for %s manifest %s', 'Expo', 'app.production.json');
        });
    });
    describe('#readManifest', () => {
        it('reads the manifest file', () => __awaiter(void 0, void 0, void 0, function* () {
            readFile.mockResolvedValue('{ "expo": { "name": "test" } }');
            const meta = yield readManifest(MANIFEST_FILE);
            expect(readFile).toBeCalledWith(MANIFEST_FILE, 'utf8');
            expect(meta.manifest).toMatchObject({ name: 'test' });
        }));
    });
    describe('#readManifests', () => {
        it('reads multiple manifest files', () => __awaiter(void 0, void 0, void 0, function* () {
            readFile
                .mockResolvedValueOnce('{ "expo": { "name": "first" } }')
                .mockResolvedValueOnce('{ "expo": { "name": "second" } }');
            const metas = yield readManifests([MANIFEST_FILE, MANIFEST_FILE]);
            expect(readFile).toHaveBeenNthCalledWith(1, MANIFEST_FILE, 'utf8');
            expect(readFile).toHaveBeenNthCalledWith(2, MANIFEST_FILE, 'utf8');
            expect(metas[0].manifest).toMatchObject({ name: 'first' });
            expect(metas[1].manifest).toMatchObject({ name: 'second' });
        }));
    });
    describe('#writeManifest', () => {
        it('writes the manifest file with indentation detection', () => __awaiter(void 0, void 0, void 0, function* () {
            const manifestData = { name: 'test' };
            const manifestString = `{
				"expo": {
					"name": "old"
				}
			}`;
            const manifestMeta = {
                content: manifestString,
                filename: MANIFEST_FILE,
                manifest: JSON.parse(manifestString).expo,
            };
            detectIndent.mockReturnValue({ indent: '\t' });
            detectNewline.mockReturnValue('\n');
            yield writeManifest(manifestMeta, manifestData);
            expect(detectIndent).toBeCalledWith(manifestString);
            expect(detectNewline).toBeCalledWith(manifestString);
            expect(writeJson).toBeCalledWith(MANIFEST_FILE, { expo: manifestData }, { spaces: '\t', EOL: '\n' });
        }));
        it('writes manifest file with fallback indentation', () => __awaiter(void 0, void 0, void 0, function* () {
            const manifestData = { name: 'test' };
            const manifestString = `{
				"expo": {
					"name": "old"
				}
			}`;
            const manifestMeta = {
                content: manifestString,
                filename: MANIFEST_FILE,
                manifest: JSON.parse(manifestString).expo,
            };
            const options = {
                EOL: DEFAULT_NEWLINE,
                spaces: DEFAULT_INDENT,
            };
            detectIndent.mockReturnValue(undefined);
            detectNewline.mockReturnValue(undefined);
            yield writeManifest(manifestMeta, manifestData);
            expect(detectIndent).toBeCalledWith(manifestString);
            expect(detectNewline).toBeCalledWith(manifestString);
            expect(writeJson).toBeCalledWith(MANIFEST_FILE, { expo: manifestData }, options);
        }));
    });
    describe('#getPlatforms', () => {
        it('returns default platforms', () => {
            const platforms = getPlatforms({ name: 'test' });
            expect(platforms).toContain('android');
            expect(platforms).toContain('ios');
        });
        it('returns defined platforms from manifest', () => {
            const platforms = ['android'];
            expect(getPlatforms({ name: 'test', platforms })).toBe(platforms);
        });
    });
    describe('#getAndroidPlatform', () => {
        it('returns default android settings', () => {
            expect(getAndroidPlatform({ name: 'test' })).toMatchObject({ versionCode: 0 });
        });
        it('returns defined android settings from manifest', () => {
            const android = { versionCode: 1337 };
            expect(getAndroidPlatform({ name: 'test', android })).toMatchObject(android);
        });
    });
    describe('#getIosPlatform', () => {
        it('returns default ios settings', () => {
            expect(getIosPlatform({ name: 'test' })).toMatchObject({ buildNumber: '' });
        });
        it('returns defined ios settings from manifest', () => {
            const ios = { buildNumber: '1.3.7' };
            expect(getIosPlatform({ name: 'test', ios })).toMatchObject(ios);
        });
    });
});
//# sourceMappingURL=expo.test.js.map