import React, {Suspense} from 'react';
import {StyleSheet, Text} from 'react-native';
import AppLayout from './layout/AppLayout';
import Section from './common/Section';

function AppLoading(): React.JSX.Element {
  return (
    <AppLayout>
      <Section title="App1">
        <Suspense fallback={<Text>Loading....</Text>}>
          <Text>App Loading....</Text>
        </Suspense>
      </Section>
    </AppLayout>
  );
}

const styles = StyleSheet.create({});

export default AppLoading;
