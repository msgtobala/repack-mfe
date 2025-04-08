import {loadRemote} from '@module-federation/runtime';

type LoadRmoteComponent = (
  uri: string,
) => React.LazyExoticComponent<React.ComponentType<any>>;
import React from 'react';

const loadRemoteComponent: LoadRmoteComponent = uri => {
  return React.lazy(async () => {
    let remoteModule = await loadRemote<{default: React.ComponentType<any>}>(
      uri,
    );

    if (!remoteModule) {
      throw new Error(`Failed to load ${uri}`);
    }

    return remoteModule;
  });
};

export default loadRemoteComponent;
