import {loadRemote} from '@module-federation/runtime';
import React, {ComponentType, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export interface MicroAppContext {
  userData: any;
  environment: any;
  navigationHelper: any;
}

export const MicroAppComponent = ({module}: {module: any}) => {
  if (!module) {
    return null;
  }
  const Component = module;
  return <Component />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export const withRetry = (moduleName: string) => () => {
  return (props: {context: MicroAppContext}) => {
    const [module, setModule] = useState<ComponentType<{
      context: MicroAppContext;
    }> | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const loadModule = () => {
      setLoading(true);
      loadRemote<{default: ComponentType<{context: MicroAppContext}>}>(
        moduleName,
      )
        .then(m => {
          console.log('Loaded module:', m);
          if (m) {
            setModule(() => m.default);
            setLoading(false);
            setError(null);
          }
        })
        .catch(err => {
          // console.error(`Error loading ${moduleName}:`, err);
          setError(err);
          setLoading(false);
        });
    };

    useEffect(() => {
      loadModule();
    }, [retryCount]);

    const onRetry = () => {
      setRetryCount(retryCount + 1);
    };

    if (loading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={'black'} size="large" />
        </View>
      );
    }

    if (error || !module) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Error loading {moduleName}.</Text>
          <TouchableOpacity onPress={onRetry}>
            <Text>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <MicroAppComponent {...props} module={module} />;
  };
};
