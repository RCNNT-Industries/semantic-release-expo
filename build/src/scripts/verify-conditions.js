import { getManifestFiles, inheritPrepareConfig } from '../config';
import { logManifestFromError, readManifests } from '../expo';
const SemanticReleaseError = require('@semantic-release/error');
/**
 * Verify the configuration of this plugin.
 * This checks if all Expo manifests are readable.
 */
const verifyConditions = async (config, context) => {
    const verifyConfig = inheritPrepareConfig(config, context);
    try {
        (await readManifests(getManifestFiles(verifyConfig))).forEach((meta) => {
            context.logger.log('Found %s manifest for %s in %s', 'Expo', meta.manifest.name, meta.filename);
        });
    }
    catch (error) {
        logManifestFromError(context, error);
        throw new SemanticReleaseError('Could not load Expo manifest(s).', 'EINVALIDEXPOMANIFEST', error.message);
    }
};
export default verifyConditions;
//# sourceMappingURL=verify-conditions.js.map