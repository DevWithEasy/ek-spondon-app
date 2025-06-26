import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from '../../../hooks/useAuth';

export default function LastDonate() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [lastDonationDate, setLastDonationDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setLastDonationDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!lastDonationDate) {
      Alert.alert('ত্রুটি', 'আপনার শেষ রক্তদানের তারিখ নির্বাচন করুন');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'সফল হয়েছে', 
        'আপনার শেষ রক্তদানের তথ্য সংরক্ষণ করা হয়েছে',
        [{ text: 'ঠিক আছে', onPress: () => router.back() }]
      );
    } catch (error) {
      console.log(error)
      Alert.alert('ত্রুটি', 'তথ্য সংরক্ষণ করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Illustration */}
       <Image
        source={require('../../../assets/images/transfering.png')}
        style={styles.illustration}
        resizeMode="center"
      />

      {/* Information Text */}
      <Text style={styles.infoText}>
        রক্তদানের পরবর্তী ৩ মাস পুনরায় রক্তদান করা যায় না। আপনার শেষ রক্তদানের তারিখ সংরক্ষণ করুন যাতে আমরা আপনাকে উপযুক্ত সময়ে রক্তদানের জন্য আমন্ত্রণ জানাতে পারি।
      </Text>

      {/* Date Selection */}
      <View style={styles.dateContainer}>
        <Text style={styles.label}>শেষ রক্তদানের তারিখ</Text>
        
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialIcons name="calendar-today" size={24} color="#d32f2f" />
          <Text style={styles.dateText}>
            {lastDonationDate 
              ? lastDonationDate.toLocaleDateString('bn-BD') 
              : 'তারিখ নির্বাচন করুন'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={lastDonationDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      {/* Next Eligible Date */}
      {lastDonationDate && (
        <View style={styles.eligibleContainer}>
          <Text style={styles.eligibleTitle}>পরবর্তী রক্তদানের তারিখ:</Text>
          <Text style={styles.eligibleDate}>
            {new Date(lastDonationDate.setMonth(lastDonationDate.getMonth() + 3))
              .toLocaleDateString('bn-BD', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
          </Text>
          <Text style={styles.eligibleNote}>
            (আপনি এই তারিখের পর পুনরায় রক্তদান করতে পারবেন)
          </Text>
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  illustration: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  infoText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  dateContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  label: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  eligibleContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  eligibleTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 5,
  },
  eligibleDate: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 18,
    color: '#2e7d32',
    marginBottom: 5,
  },
  eligibleNote: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});