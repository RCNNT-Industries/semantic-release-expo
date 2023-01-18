var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import detectIndent from 'detect-indent';
import { readFile, writeJson } from 'fs-extra';
/**
 * The name of the default Expo manifest file.
 */
export const MANIFEST_FILE = 'app.json';
/**
 * The default indentation to use when no indentation is found.
 */
export const DEFAULT_INDENT = '  ';
/**
 * The default newline character to use when no existing was detected.
 */
export const DEFAULT_NEWLINE = '\n';
/**
 * Log information about the manifest which is related to the error.
 */
export function logManifestFromError(context, error) {
    if (error && error.expo) {
        context.logger.log('Error encountered for %s manifest %s', 'Expo', error.expo);
    }
}
/**
 * Read the Expo manifest content and return the parsed JSON.
 */
export function readManifest(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield readFile(filename, 'utf8');
            const manifest = JSON.parse(content).expo;
            return { filename, content, manifest };
        }
        catch (error) {
            error.expo = filename;
            throw error;
        }
    });
}
/**
 * Read a list of Expo mannifest files and return the parsed JSON.
 */
export function readManifests(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.all(filenames.map(readManifest));
    });
}
/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
export function writeManifest(meta, manifest) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = { expo: manifest };
        try {
            const original = yield readFile(meta.filename, 'utf8');
            const manifest = JSON.parse(original);
            const { expo } = manifest, rest = __rest(manifest, ["expo"]);
            content = Object.assign(Object.assign({}, content), rest);
        }
        catch (error) {
            error.expo = meta.filename;
            throw error;
        }
        const { indent } = detectIndent(meta.content) || { indent: DEFAULT_INDENT };
        const newline = DEFAULT_NEWLINE;
        yield writeJson(meta.filename, content, { spaces: indent, EOL: newline });
    });
}
/**
 * Get the platforms from a loaded manifest.
 * This will fallback to the default from Expo itself.
 */
export function getPlatforms(manifest) {
    return manifest.platforms || ['android', 'ios'];
}
/**
 * Get the platform settings for Android, if available.
 */
export function getAndroidPlatform(manifest) {
    return manifest.android || { versionCode: 0 };
}
/**
 * Get the platform settings for iOS, if available.
 */
export function getIosPlatform(manifest) {
    return manifest.ios || { buildNumber: '' };
}
//# sourceMappingURL=expo.js.map