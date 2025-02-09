import { calculateVersion } from '../version';
const bumpVersion = (meta, config, context) => {
    const newVersion = calculateVersion(meta, config, context);
    context.logger.log('%s manifest version changed (%s => %s) in %s', 'Expo', meta.manifest.version, newVersion, meta.filename);
    return { ...meta.manifest, version: newVersion };
};
export default bumpVersion;
//# sourceMappingURL=version.js.map