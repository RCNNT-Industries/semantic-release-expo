"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateIosVersion = exports.calculateAndroidVersion = exports.calculateVersion = exports.getDefaultVariables = exports.getVersionCode = void 0;
const lodash_1 = require("lodash");
const semver_1 = require("semver");
const config_1 = require("./config");
const expo_1 = require("./expo");
/**
 * Calculate a numeric version code based on the next release and used expo version.
 * This uses the versioning specifically designed for Android version codes.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
const getVersionCode = (next, expo) => (expo.major * 10000000 + next.major * 10000 + next.minor * 100 + next.patch);
exports.getVersionCode = getVersionCode;
/**
 * Get the default (template) variables for all platforms.
 * This includes the recommended next release string and numeric version code.
 */
const getDefaultVariables = (meta, context) => {
    const expo = (0, semver_1.coerce)(meta.manifest.sdkVersion);
    const last = (0, semver_1.coerce)(context.lastRelease.version);
    const next = (0, semver_1.coerce)(context.nextRelease.version);
    return {
        code: (next && expo) ? (0, exports.getVersionCode)(next, expo) : '000000000',
        expo, last, next,
        recommended: context.nextRelease.version,
    };
};
exports.getDefaultVariables = getDefaultVariables;
/**
 * Calculate the (next) version for the "root" expo manifest version.
 * It's recommended to use the next release version string.
 */
const calculateVersion = (meta, config, context) => {
    const { version } = (0, config_1.getVersionTemplates)(config);
    return (0, lodash_1.template)(version)(Object.assign(Object.assign({}, (0, exports.getDefaultVariables)(meta, context)), { increment: (Number(meta.manifest.version) || 0) + 1 }));
};
exports.calculateVersion = calculateVersion;
/**
 * Calculate the (next) version for the android platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its highly recommended to use the (calculatable) version code.
 */
const calculateAndroidVersion = (meta, config, context) => {
    const { android } = (0, config_1.getVersionTemplates)(config);
    const androidConfig = (0, expo_1.getAndroidPlatform)(meta.manifest);
    const variables = (0, exports.getDefaultVariables)(meta, context);
    return (0, lodash_1.template)(android)(Object.assign(Object.assign({}, variables), { increment: (Number(androidConfig.versionCode) || 0) + 1, recommended: variables.code }));
};
exports.calculateAndroidVersion = calculateAndroidVersion;
/**
 * Calculate the (next) version for the ios platform.
 * Although incremental numbers are supported, they are discouraged because of non-deterministic behaviour.
 * Its recommended to use the next release version string.
 */
const calculateIosVersion = (meta, config, context) => {
    const { ios } = (0, config_1.getVersionTemplates)(config);
    const iosConfig = (0, expo_1.getIosPlatform)(meta.manifest);
    return (0, lodash_1.template)(ios)(Object.assign(Object.assign({}, (0, exports.getDefaultVariables)(meta, context)), { increment: (Number(iosConfig.buildNumber) || 0) + 1 }));
};
exports.calculateIosVersion = calculateIosVersion;
//# sourceMappingURL=version.js.map