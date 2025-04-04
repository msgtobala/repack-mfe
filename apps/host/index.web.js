import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import AppLoading from './AppLoading';
import name from './app.json';
import App from './App';

import {init, preloadRemote} from '@module-federation/runtime';

const fetchRemotesConfig = async () => {
  try {
    const response = await fetch('https://polaris.wiremockapi.cloud/remotes');
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
        remotes: remotes.map(remote => ({
          ...remote,
          entry: 'http://localhost:3012/mf-manifest.json',
        })),
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

  return isInitialized ? App() : AppLoading();
};

AppRegistry.registerComponent(name, () => AppContainer);

// AppRegistry.registerComponent(name, () => App);
AppRegistry.runApplication(name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
