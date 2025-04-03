import React, {Suspense} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {loadRemote} from '@module-federation/runtime';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const MemberCardComponent = React.lazy(() => import('app1/MemberCard'));
const UpcomingAppointmentsComponent = React.lazy(() => loadRemote('app2/UpcomingAppointments'));
function App(): React.JSX.Element {
  console.log('App');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  type SectionProps = PropsWithChildren<{
    title: string;
  }>;

  function Section({children, title}: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <Section title="App1">
          <MemberCardComponent />
          {/* <Suspense fallback={<Text>Loading....</Text>}>
            <MemberCardComponent />
          </Suspense> */}
        </Section>
        <Section title="App2">
          {/* <UpcomingAppointmentsComponent /> */}
          <Suspense fallback={<Text>Loading....</Text>}>
            <UpcomingAppointmentsComponent />
          </Suspense>
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 100,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
