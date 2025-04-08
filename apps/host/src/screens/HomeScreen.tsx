import {Suspense} from 'react';
import {StatusBar, Text, View} from 'react-native';
import Section from '../common/Section';

import loadRemoteComponent from '../utils/loadRemote';

const MemberCardComponent = loadRemoteComponent('app1/MemberCard');
const UpcomingAppointmentsComponent = loadRemoteComponent(
  'app2/UpcomingAppointments',
);

const HomeScreen = () => {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };
  return (
    <View style={backgroundStyle}>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />

      <View>
        <Section title="App1">Home Page</Section>
      </View>
    </View>
  );
};

export default HomeScreen;
