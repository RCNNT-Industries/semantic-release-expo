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
export async function readManifest(filename) {
    try {
        const content = await readFile(filename, 'utf8');
        const manifest = JSON.parse(content).expo;
        return { filename, content, manifest };
    }
    catch (error) {
        error.expo = filename;
        throw error;
    }
}
/**
 * Read a list of Expo mannifest files and return the parsed JSON.
 */
export async function readManifests(filenames) {
    return await Promise.all(filenames.map(readManifest));
}
/**
 * Write new content to the Expo manifest file, keeping indentation intact.
 */
export async function writeManifest(meta, manifest) {
    let content = { expo: manifest };
    try {
        const original = await readFile(meta.filename, 'utf8');
        const manifest = JSON.parse(original);
        const { expo, ...rest } = manifest;
        content = { ...content, ...rest };
    }
    catch (error) {
        error.expo = meta.filename;
        throw error;
    }
    const { indent } = detectIndent(meta.content) || { indent: DEFAULT_INDENT };
    const newline = DEFAULT_NEWLINE;
    await writeJson(meta.filename, content, { spaces: indent, EOL: newline });
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