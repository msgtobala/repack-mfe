// @ts-ignore:
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const isMobile = width < 768;
const itemWidth = isMobile ? width * 0.8 : width / 3 - 20;
const itemMargin = isMobile ? 10 : 15;

const ClaimsDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.infoBox}>
          <View>
            <Text style={styles.infoTitle}>Digital ID</Text>
            <Text style={styles.infoText}>
              Use your member ID card when visiting the doctor's office or
              accessing care.
            </Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View>
            <Text style={styles.infoTitle}>Download ID</Text>
            <Text style={styles.infoText}>
              Select an ID card to download, print, or send to a healthcare
              professional.
            </Text>
          </View>
        </View>
      </View>
      <Button
        title="Payment Screen"
        onPress={() => navigation.navigate('ClaimsPayment')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fff',
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoTitle: {fontWeight: 'bold', fontSize: 16},
  infoText: {color: '#6B7280', marginTop: 5},
});

export default ClaimsDetailsScreen;
