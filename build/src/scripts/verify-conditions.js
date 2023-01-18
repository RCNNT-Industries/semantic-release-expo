var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getManifestFiles, inheritPrepareConfig } from '../config';
import { logManifestFromError, readManifests } from '../expo';
const SemanticReleaseError = require('@semantic-release/error');
/**
 * Verify the configuration of this plugin.
 * This checks if all Expo manifests are readable.
 */
const verifyConditions = (config, context) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyConfig = inheritPrepareConfig(config, context);
    try {
        (yield readManifests(getManifestFiles(verifyConfig))).forEach((meta) => {
            context.logger.log('Found %s manifest for %s in %s', 'Expo', meta.manifest.name, meta.filename);
        });
    }
    catch (error) {
        logManifestFromError(context, error);
        throw new SemanticReleaseError('Could not load Expo manifest(s).', 'EINVALIDEXPOMANIFEST', error.message);
    }
});
export default verifyConditions;
//# sourceMappingURL=verify-conditions.js.map