import { getIosPlatform } from '../expo';
import { calculateIosVersion } from '../version';
const bumpPlatformIos = (meta, config, context) => {
    const ios = getIosPlatform(meta.manifest);
    const newVersion = calculateIosVersion(meta, config, context);
    context.logger.log('%s manifest ios version changed (%s => %s) in %s', 'Expo', ios.buildNumber, newVersion, meta.filename);
    return { ...meta.manifest, ios: { ...ios, buildNumber: newVersion } };
};
export default bumpPlatformIos;
//# sourceMappingURL=platform-ios.js.map