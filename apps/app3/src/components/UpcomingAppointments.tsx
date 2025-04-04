import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Card} from 'react-native-paper';

const {width} = Dimensions.get('window');
const isMobile = width < 768;
const itemWidth = isMobile ? width * 0.8 : width / 3 - 20;
const itemMargin = isMobile ? 10 : 15;

const appointments = [
  {
    id: '1',
    doctor: 'Dr. Sarah Thompsonkwejnln',
    specialty: 'Cardiologist',
    date: 'April 5, 2025',
    time: '10:30 AM',
    image: 'https://via.placeholder.com/150',
    location: 'HealthCare Clinic, NYC',
  },
  {
    id: '2',
    doctor: 'Dr. John Williams',
    specialty: 'Dentist',
    date: 'April 10, 2025',
    time: '2:00 PM',
    image: 'https://via.placeholder.com/150',
    location: 'Smile Dental Center, LA',
  },
  {
    id: '3',
    doctor: 'Dr. Emily Johnson',
    specialty: 'Orthopedic',
    date: 'April 15, 2025',
    time: '4:15 PM',
    image: 'https://via.placeholder.com/150',
    location: 'Wellness Hospital, SF',
  },
];

const UpcomingAppointments = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Upcoming Appointments App 3</Text>
      <FlatList
        data={appointments}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={itemWidth + itemMargin}
        renderItem={({item}) => (
          <Card style={[styles.card, {width: itemWidth}]}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Card.Content>
              <Text style={styles.cardTitle}>{item.doctor}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => console.log('View Details')}>
                View
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    paddingTop: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: itemMargin / 2,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {width: 100, height: 100, borderRadius: 10, alignSelf: 'center'},
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  specialty: {fontSize: 14, color: '#666', textAlign: 'center'},
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
  },
  time: {fontSize: 14, color: '#666', textAlign: 'center'},
  location: {fontSize: 12, color: '#888', textAlign: 'center'},
});

export default UpcomingAppointments;
