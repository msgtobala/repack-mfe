import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import pkj from './package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default env => {
  const {mode} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    devServer: {
      port: 3003,
    },
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'polaris-app3',
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
        name: 'app2',
        dts: false,
        filename: 'app2.container.js.bundle',
        exposes: {
          './UpcomingAppointments': './src/components/UpcomingAppointments',
        },
        defaultRuntimePlugins: [
          '@callstack/repack/mf/resolver-plugin',
          '@callstack/repack/mf/core-plugin',
        ],
        shared: Object.fromEntries(
          Object.entries(pkj.dependencies).map(([dep, version]) => {
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
