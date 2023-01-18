"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIosPlatform = exports.getAndroidPlatform = exports.getPlatforms = exports.writeManifest = exports.readManifests = exports.readManifest = exports.logManifestFromError = exports.DEFAULT_NEWLINE = exports.DEFAULT_INDENT = exports.MANIFEST_FILE = void 0;
const detect_indent_1 = __importDefault(require("detect-indent"));
const fs_extra_1 = require("fs-extra");
/**
 * The name of the default Expo manifest file.
 */
exports.MANIFEST_FILE = 'app.json';
/**
 * The default indentation to use when no indentation is found.
 */
exports.DEFAULT_INDENT = '  ';
/**
 * The default newline character to use when no existing was detected.
 */
exports.DEFAULT_NEWLINE = '\n';
/**
 * Log information about the manifest which is related to the error.
 */
function logManifestFromError(context, error) {
    if (error && error.expo) {
        context.logger.log('Error encountered for %s manifest %s', 'Expo', error.expo);
    }
}
exports.logManifestFromError = logManifestFromError;
/**
 * Read the Expo manifest content and return the parsed JSON.
 */
function readManifest(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield (0, fs_extra_1.readFile)(filename, 'utf8');
            const manifest = JSON.parse(content).expo;
            return { filename, content, manifest };
        }
        catch (error) {
            error.expo = filename;
            throw error;
        }
    });
}
exports.readManifest = readManifest;
/**
 * Read a list of Expo mannifest files and return the parsed JSON.
 */
function readManifests(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.all(filenames.map(readManifest));
    });
}
exports.readManifests = readManifests;
/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
function writeManifest(meta, manifest) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = { expo: manifest };
        try {
            const original = yield (0, fs_extra_1.readFile)(meta.filename, 'utf8');
            const manifest = JSON.parse(original);
            const { expo } = manifest, rest = __rest(manifest, ["expo"]);
            content = Object.assign(Object.assign({}, content), rest);
        }
        catch (error) {
            error.expo = meta.filename;
            throw error;
        }
        const { indent } = (0, detect_indent_1.default)(meta.content) || { indent: exports.DEFAULT_INDENT };
        const newline = exports.DEFAULT_NEWLINE;
        yield (0, fs_extra_1.writeJson)(meta.filename, content, { spaces: indent, EOL: newline });
    });
}
exports.writeManifest = writeManifest;
/**
 * Get the platforms from a loaded manifest.
 * This will fallback to the default from Expo itself.
 */
function getPlatforms(manifest) {
    return manifest.platforms || ['android', 'ios'];
}
exports.getPlatforms = getPlatforms;
/**
 * Get the platform settings for Android, if available.
 */
function getAndroidPlatform(manifest) {
    return manifest.android || { versionCode: 0 };
}
exports.getAndroidPlatform = getAndroidPlatform;
/**
 * Get the platform settings for iOS, if available.
 */
function getIosPlatform(manifest) {
    return manifest.ios || { buildNumber: '' };
}
exports.getIosPlatform = getIosPlatform;
//# sourceMappingURL=expo.js.map