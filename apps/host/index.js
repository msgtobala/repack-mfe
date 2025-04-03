import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {init, preloadRemote} from '@module-federation/runtime';


const fetchRemotesConfig = async () => {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    console.log(response);
    // const remotes = await response.json();
    return remotes;
  } catch (error) {
    console.error(error);
    return [];
  }
};


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

  preloadRemote(preloadConfigs);
};

initializeApp().catch(console.error);

AppRegistry.registerComponent(appName, () => App);

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