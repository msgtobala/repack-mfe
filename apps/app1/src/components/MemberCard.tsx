import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Chip} from 'react-native-paper';

const {width} = Dimensions.get('window');
const isMobile = width < 768;
const itemWidth = isMobile ? width * 0.8 : width / 3 - 20;
const itemMargin = isMobile ? 10 : 15;

const data = [
  {
    id: '1',
    title: 'Health Benefits',
    description: 'Access premium healthcare services.',
    image: 'https://via.placeholder.com/150',
    color: '#FFDDC1',
  },
  {
    id: '2',
    title: 'Insurance Plans',
    description: 'Choose the best plan for you.',
    image: 'https://via.placeholder.com/150',
    color: '#C1E1FF',
  },
  {
    id: '3',
    title: 'Doctor Network',
    description: 'Find doctors near you.',
    image: 'https://via.placeholder.com/150',
    color: '#D1FFC1',
  },
  {
    id: '4',
    title: 'Emergency Care',
    description: '24/7 support for emergencies.',
    image: 'https://via.placeholder.com/150',
    color: '#FFC1C1',
  },
  {
    id: '5',
    title: 'Wellness Programs',
    description: 'Stay fit with our wellness plans.',
    image: 'https://via.placeholder.com/150',
    color: '#E1C1FF',
  },
];

const MemberCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (itemWidth + itemMargin));
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* <CameraApp /> */}
      <View>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={itemWidth + itemMargin}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({item}) => (
            <View
              style={[
                styles.card,
                {
                  width: itemWidth,
                  marginHorizontal: itemMargin / 2,
                  backgroundColor: item.color,
                },
              ]}>
              <Image source={{uri: item.image}} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Chip icon="information" onPress={() => console.log('Pressed')}>
                {item.title}
              </Chip>
            </View>
          )}
        />
        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : {},
              ]}
            />
          ))}
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.name}>Kiran</Text>
              <View style={styles.memberIdContainer}>
                <Text style={styles.memberId}>Member ID: </Text>
                <Text style={styles.memberIdValue}>002</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoSection}>
            <View style={styles.row}>
              <Text style={styles.label}>Group No.</Text>
              <Text style={styles.value}>CDHTST0002</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Plan Code</Text>
              <Text style={styles.value}>040</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>RxBin/PCN</Text>
              <Text style={styles.value}>003858/A4</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>RxGroup</Text>
              <Text style={styles.value}>WLHA</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Preventive Care</Text>
              <Text style={styles.amount}>$0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Office Visit Copay</Text>
              <Text style={styles.amount}>$25</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Special Copay</Text>
              <Text style={styles.amount}>$40</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Emergency Room</Text>
              <Text style={styles.amount}>$100</Text>
            </View>
            <Text style={styles.additionalInfo}>
              Medial - Pharmacy Dental Complete Blue View Vision
            </Text>
          </View>
        </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    paddingTop: 15,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 100, height: 100, borderRadius: 10, marginBottom: 10},
  cardTitle: {fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5},
  cardDescription: {fontSize: 14, color: '#666', textAlign: 'center'},
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {width: 80, height: 80, borderRadius: 40, marginRight: 15},
  name: {fontSize: 18, fontWeight: 'bold'},
  memberIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  memberId: {color: '#FFF', fontWeight: 'bold'},
  memberIdValue: {color: '#FFF', fontWeight: 'bold'},
  infoSection: {marginTop: 10},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {fontWeight: 'bold', color: '#6B7280'},
  value: {fontWeight: 'bold', color: '#111827'},
  amount: {fontWeight: 'bold', color: '#4F46E5'},
  additionalInfo: {marginTop: 10, fontStyle: 'italic', color: '#6B7280'},
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  actionButton: {alignItems: 'center', paddingRight: 10},
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

export default MemberCard;
