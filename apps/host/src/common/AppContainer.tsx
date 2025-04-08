import {useEffect, useState} from 'react';
import {init, preloadRemote} from '@module-federation/runtime';
import {PreloadRemoteArgs, Remote} from '@module-federation/runtime/types';
import {Platform} from 'react-native';
import App from '../App';
import AppLoading from '../AppLoading';

const remotesNative: Array<Remote> = [
  {
    name: 'app1',
    entry: 'http://localhost:3001/android/mf-manifest.json',
    alias: 'app1',
  },
  {
    name: 'app2',
    entry: 'http://localhost:3002/android/mf-manifest.json',
    alias: 'app2',
  },
];

const remotesWeb: Array<Remote> = [
  {
    name: 'app1',
    entry: 'http://localhost:3011/mf-manifest.json',
    alias: 'app1',
  },
  {
    name: 'app2',
    entry: 'http://localhost:3012/mf-manifest.json',
    alias: 'app2',
  },
];

const fetchRemotesConfig = async () => {
  try {
    // const response = await fetch('https://polaris.wiremockapi.cloud/remotes');
    // const remotes = await response.json();
    const remotes = Platform.OS === 'web' ? remotesWeb : remotesNative;
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
      const preloadConfigs: PreloadRemoteArgs[] = remotes.map(
        (remote: Remote) => ({
          nameOrAlias: remote.name,
          resourceCategory: 'all',
        }),
      );

      await preloadRemote(preloadConfigs);
      console.log(preloadConfigs);

      setIsInitialized(true);
    };

    initializeApp().catch(console.error);
  }, []);

  return isInitialized ? <App /> : <AppLoading />;
};

export default AppContainer;
