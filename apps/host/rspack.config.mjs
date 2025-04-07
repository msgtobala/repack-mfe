import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diabledPackages = ['@module-federation/runtime'];

export default env => {
  const {mode, platform = 'android'} = env;

  return {
    mode: 'development',
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    // output: {
    //   uniqueName: 'polaris-host',
    // },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        dts: false,
        filename: 'host.container.js.bundle',
        remotes: {
          app1: `app1@http://localhost:3001/${platform}/mf-manifest.json`,
        },
        shared: Object.fromEntries(
          Object.entries(pkg.dependencies)
            .filter(([dep]) => !diabledPackages.includes(dep))
            .map(([dep, version]) => {
              console.log(dep, version);
              return [
                dep,
                {singleton: true, eager: true, requiredVersion: version},
              ];
            }),
        ),
      }),
    ],
  };
};
