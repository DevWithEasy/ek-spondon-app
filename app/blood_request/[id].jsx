import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function SingleRequest() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Sample request data - in a real app you would fetch this using the ID
  const request = {
    id: 1,
    bloodType: 'এ+',
    patientName: 'আহমেদ রহিম',
    patientAge: '৪৫ বছর',
    hospital: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
    location: 'ঢাকা',
    whenNeeded: 'আজ রাত ১০টার মধ্যে',
    unitsRequired: '২ ব্যাগ',
    contactNumber: '০১৭১২ ৩৪৫ ৬৭৮',
    caseDetails: 'হার্ট সার্জারির জন্য জরুরী রক্ত প্রয়োজন। রোগী ক্রিটিকাল কন্ডিশনে আছেন।',
    postedTime: '২ ঘন্টা আগে',
    urgent: true
  };

  const handleCall = () => {
    const phoneNumber = request.contactNumber.replace(/[^\d]/g, ''); // Remove non-digit characters
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleShare = () => {
    // Implement share functionality
    alert('শেয়ার ফিচারটি শীঘ্রই আসছে!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Blood Type Badge */}
      <View style={styles.bloodTypeContainer}>
        <Text style={styles.bloodTypeText}>{request.bloodType}</Text>
        {request.urgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>জরুরী</Text>
          </View>
        )}
      </View>

      {/* Patient Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="person" size={20} color="#d32f2f" />
          <Text style={styles.sectionTitle}>রোগীর তথ্য</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>নাম:</Text>
          <Text style={styles.detailValue}>{request.patientName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>বয়স:</Text>
          <Text style={styles.detailValue}>{request.patientAge}</Text>
        </View>
      </View>

      {/* Hospital Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="local-hospital" size={20} color="#d32f2f" />
          <Text style={styles.sectionTitle}>হাসপাতালের তথ্য</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>হাসপাতাল:</Text>
          <Text style={styles.detailValue}>{request.hospital}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>অবস্থান:</Text>
          <Text style={styles.detailValue}>{request.location}</Text>
        </View>
      </View>

      {/* Request Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="info-circle" size={20} color="#d32f2f" />
          <Text style={styles.sectionTitle}>আবেদনের বিবরণ</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>প্রয়োজন:</Text>
          <Text style={styles.detailValue}>{request.whenNeeded}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>রক্তের পরিমাণ:</Text>
          <Text style={styles.detailValue}>{request.unitsRequired}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>কেস বিবরণ:</Text>
          <Text style={styles.detailValue}>{request.caseDetails}</Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="phone" size={20} color="#d32f2f" />
          <Text style={styles.sectionTitle}>যোগাযোগ</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>ফোন নম্বর:</Text>
          <Text style={[styles.detailValue, styles.contactNumber]}>{request.contactNumber}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <MaterialIcons name="call" size={20} color="white" />
          <Text style={styles.buttonText}>কল করুন</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social" size={20} color="#d32f2f" />
          <Text style={[styles.buttonText, styles.shareButtonText]}>শেয়ার করুন</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>আবেদনটি পোস্ট করা হয়েছে {request.postedTime}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  bloodTypeContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bloodTypeText: {
    fontSize: 28,
    color: '#d32f2f',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  urgentBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#d32f2f',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  urgentText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
    fontFamily: 'HindSiliguri_500Medium',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'HindSiliguri_400Regular',
  },
  contactNumber: {
    color: '#d32f2f',
    fontFamily: 'HindSiliguri_600SemiBold',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 2,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d32f2f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 8,
    fontFamily: 'HindSiliguri_600SemiBold',
    color : '#fff'
  },
  shareButtonText: {
    color: '#d32f2f',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'HindSiliguri_400Regular',
  },
});