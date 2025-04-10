import {Suspense} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Section from '../common/Section';

import loadRemoteComponent from '../utils/loadRemote';

const Claims = loadRemoteComponent('app2/Claims');

const ApptwoScreen = () => {
  return (
    <Suspense fallback={<Text>Loading....</Text>}>
      <Claims />
    </Suspense>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default ApptwoScreen;
