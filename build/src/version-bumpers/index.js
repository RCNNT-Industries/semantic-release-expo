"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expo_1 = require("../expo");
const platform_android_1 = __importDefault(require("./platform-android"));
const platform_ios_1 = __importDefault(require("./platform-ios"));
const version_1 = __importDefault(require("./version"));
/**
 * Update all versions from the manifest and return an updated version.
 * This will check if the manifest supports android and/or ios before applying.
 */
const bumpVersions = (meta, config, context) => {
    const platforms = (0, expo_1.getPlatforms)(meta.manifest);
    let newManifest = (0, version_1.default)(meta, config, context);
    if (platforms.indexOf('android') >= 0) {
        newManifest = (0, platform_android_1.default)(Object.assign(Object.assign({}, meta), { manifest: newManifest }), config, context);
    }
    if (platforms.indexOf('ios') >= 0) {
        newManifest = (0, platform_ios_1.default)(Object.assign(Object.assign({}, meta), { manifest: newManifest }), config, context);
    }
    return newManifest;
};
exports.default = bumpVersions;
//# sourceMappingURL=index.js.map