import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import AppLoading from './AppLoading';
import { name as appName } from './app.json';
import { init, preloadRemote } from '@module-federation/runtime';

const fetchRemotesConfig = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5501/index.json');
    const remotes = await response.json();
    console.log('Fetched remotes:', remotes);
    return remotes;
  } catch (error) {
    console.error('Error fetching remotes:', error);
    return [];
  }
};

const AppContainer = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      const remotes = await fetchRemotesConfig();

      init({
        name: 'host',
        remotes,
      });

      // Preload all remotes
      const preloadConfigs = remotes.map(remote => ({
        nameOrAlias: remote.name,
        resourceCategory: 'all',
      }));

      await preloadRemote(preloadConfigs);
      console.log(preloadConfigs);

      setIsInitialized(true); // Now switch from AppLoading to App
    };

    initializeApp().catch(console.error);
  }, []);

  return isInitialized ? <App /> : <AppLoading />;
};

AppRegistry.registerComponent(appName, () => AppContainer);


// Old code with working runtime and compile time

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import {init, preloadRemote} from '@module-federation/runtime';

// init({
//   name: 'host',
//   remotes: [
//     // {
//     //   name: 'app1',
//     //   alias: 'app1',
//     //   entry: 'http://localhost:3001/ios/mf-manifest.json',
//     // },
//     {
//       name: 'app2',
//       alias: 'app2',
//       entry: 'http://localhost:3002/ios/mf-manifest.json',
//     },
//   ],
// });

// // preloadRemote([
// //   {
// //     nameOrAlias: 'app1',
// //     resourceCategory: 'all',
// //   },
// // ]);

// preloadRemote([
//   {
//     nameOrAlias: 'app2',
//     resourceCategory: 'all',
//   },
// ]);

// AppRegistry.registerComponent(appName, () => App);
