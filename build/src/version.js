import { template as _template } from 'lodash';
import { coerce } from 'semver';
import { getVersionTemplates } from './config';
import { getAndroidPlatform, getIosPlatform } from './expo';
/**
 * Calculate a numeric version code based on the next release and used expo version.
 * This uses the versioning specifically designed for Android version codes.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
export const getVersionCode = (next, expo) => (expo.major * 10000000 + next.major * 10000 + next.minor * 100 + next.patch);
/**
 * Get the default (template) variables for all platforms.
 * This includes the recommended next release string and numeric version code.
 */
export const getDefaultVariables = (meta, context) => {
    const expo = coerce(meta.manifest.sdkVersion);
    const last = coerce(context.lastRelease.version);
    const next = coerce(context.nextRelease.version);
    return {
        code: (next && expo) ? getVersionCode(next, expo) : '000000000',
        expo, last, next,
        recommended: context.nextRelease.version,
    };
};
/**
 * Calculate the (next) version for the "root" expo manifest version.
 * It's recommended to use the next release version string.
 */
export const calculateVersion = (meta, config, context) => {
    const { version } = getVersionTemplates(config);
    return _template(version)({
        ...getDefaultVariables(meta, context),
        increment: (Number(meta.manifest.version) || 0) + 1,
    });
};
/**
 * Calculate the (next) version for the android platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its highly recommended to use the (calculatable) version code.
 */
export const calculateAndroidVersion = (meta, config, context) => {
    const { android } = getVersionTemplates(config);
    const androidConfig = getAndroidPlatform(meta.manifest);
    const variables = getDefaultVariables(meta, context);
    return _template(android)({
        ...variables,
        increment: (Number(androidConfig.versionCode) || 0) + 1,
        recommended: variables.code,
    });
};
/**
 * Calculate the (next) version for the ios platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its recommended to use the next release version string.
 */
export const calculateIosVersion = (meta, config, context) => {
    const { ios } = getVersionTemplates(config);
    const iosConfig = getIosPlatform(meta.manifest);
    return _template(ios)({
        ...getDefaultVariables(meta, context),
        increment: (Number(iosConfig.buildNumber) || 0) + 1,
    });
};
//# sourceMappingURL=version.js.map