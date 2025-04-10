import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {createRequire} from 'module';
import {rspack} from '@rspack/core';
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
      port: 3002,
    },
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'polaris-app2',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
        {
          test: /\.[jt]sx?$/,
          resolve: {
            fullySpecified: false,
          },
          include:
            /node_modules\/(@react-navigation|react-native-screens|react-native-safe-area-context)/,
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view\/masked-view$/,
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'app2',
        dts: false,
        filename: 'app2.container.js.bundle',
        exposes: {
          './UpcomingAppointments': './src/components/UpcomingAppointments',
          './Claims': './src/navigation/navigation',
        },
        defaultRuntimePlugins: [
          '@callstack/repack/mf/resolver-plugin',
          '@callstack/repack/mf/core-plugin',
        ],
        shared: Object.fromEntries(
          Object.entries(pkg.dependencies).map(([dep, version]) => {
            return [
              dep,
              {
                singleton: true,
                eager: true,
                requiredVersion: version,
                version: false,
              },
            ];
          }),
        ),
      }),
    ],
  };
};
