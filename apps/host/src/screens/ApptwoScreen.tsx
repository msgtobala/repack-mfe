import {Suspense} from 'react';
import {StatusBar, Text, View} from 'react-native';
import Section from '../common/Section';

import loadRemoteComponent from '../utils/loadRemote';

const UpcomingAppointmentsComponent = loadRemoteComponent(
  'app2/UpcomingAppointments',
);

const ApptwoScreen = () => {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };
  return (
    <View style={backgroundStyle}>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <View>
        <Section title="App2">
          <Suspense fallback={<Text>Loading....</Text>}>
            <UpcomingAppointmentsComponent />
          </Suspense>
        </Section>
      </View>
    </View>
  );
};

export default ApptwoScreen;
