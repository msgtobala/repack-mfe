import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default env => {
  const {mode} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    devServer: {
      port: 3001,
    },
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'polaris-app1',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'app1',
        dts: false,
        filename: 'app1.container.js.bundle',
        exposes: {
          './MemberCard': './src/components/MemberCard',
        },
        shared: Object.fromEntries(
          Object.entries(pkg.dependencies).map(([dep, version]) => {
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
