import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

const ClaimsPaymentScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Icon name="arrow-back" size={24} color="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{width: 24}} />
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>$45.00</Text>
        </View>
        <View style={styles.row}>
          <Text>Delivery</Text>
          <Text>$5.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>$50.00</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity style={styles.paymentOption}>
          {/* <Icon name="card-outline" size={20} color="#000" /> */}
          <Text style={styles.paymentText}>Credit/Debit Card</Text>
          {/* <Icon name="chevron-forward" size={20} color="#888" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          {/* <Icon name="logo-paypal" size={20} color="#003087" /> */}
          <Text style={styles.paymentText}>PayPal</Text>
          {/* <Icon name="chevron-forward" size={20} color="#888" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          {/* <Icon name="wallet-outline" size={20} color="#000" /> */}
          <Text style={styles.paymentText}>Cash on Delivery</Text>
          {/* <Icon name="chevron-forward" size={20} color="#888" /> */}
        </TouchableOpacity>
      </View>

      {/* Promo Code */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promo Code</Text>
        <View style={styles.promoRow}>
          <TextInput placeholder="Enter promo code" style={styles.promoInput} />
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payBtn}>
        <Text style={styles.payBtnText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 15,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  applyBtn: {
    marginLeft: 8,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  payBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClaimsPaymentScreen;
