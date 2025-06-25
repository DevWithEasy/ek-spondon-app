import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { FontAwesome} from "@expo/vector-icons";

export default function Developer() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:volunteers@roktobondhu.org');
  };

  const handleJoinPress = () => {
    Linking.openURL('https://join.roktobondhu.org');
  };

  // Demo volunteer data
  const volunteerTeam = [
    {
      name: 'আরিফুল ইসলাম',
      nameEng: 'Ariful Islam',
      role: 'টেক লিড',
      roleEng: 'Tech Lead',
      contribution: 'অ্যাপ ডেভেলপমেন্ট ও মেইনটেনেন্স',
      contributionEng: 'App development and maintenance',
      years: '৩ বছর',
      yearsEng: '3 years'
    },
    {
      name: 'তানজিমা আহমেদ',
      nameEng: 'Tanjima Ahmed',
      role: 'ডাটা ম্যানেজার',
      roleEng: 'Data Manager',
      contribution: 'রক্তদাতা ডাটাবেস ব্যবস্থাপনা',
      contributionEng: 'Blood donor database management',
      years: '২ বছর',
      yearsEng: '2 years'
    },
    {
      name: 'রাকিব হাসান',
      nameEng: 'Rakib Hasan',
      role: 'কমিউনিটি কোঅর্ডিনেটর',
      roleEng: 'Community Coordinator',
      contribution: 'রক্তদাতা নেটওয়ার্ক তৈরি',
      contributionEng: 'Building donor networks',
      years: '৪ বছর',
      yearsEng: '4 years'
    },
    {
      name: 'নুসরাত জাহান',
      nameEng: 'Nusrat Jahan',
      role: 'ক্যাম্পেইন ম্যানেজার',
      roleEng: 'Campaign Manager',
      contribution: 'রক্তদান ক্যাম্পেইন আয়োজন',
      contributionEng: 'Organizing blood donation campaigns',
      years: '১ বছর',
      yearsEng: '1 year'
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>রক্তবন্ধু ভলান্টিয়ার টিম</Text>
        <Text style={styles.subTitle}>স্বেচ্ছাসেবকদের দ্বারা পরিচালিত</Text>
      </View>

      {/* Volunteer Message */}
      <View style={styles.card}>
        <Text style={styles.messageTitle}>আমাদের গল্প</Text>
        
        <Text style={styles.messageText}>
          ২০১৮ সাল থেকে একদল স্বেচ্ছাসেবক প্রযুক্তি ব্যবহার করে রক্তদান প্রক্রিয়া সহজ করার লক্ষ্যে কাজ করছেন। 
          এই অ্যাপটি সম্পূর্ণভাবে স্বেচ্ছাসেবকদের সময় ও শ্রদ্বায় তৈরি এবং পরিচালিত।
        </Text>

        <Text style={styles.statsText}>
          <Text style={styles.highlight}>৫০০+</Text> স্বেচ্ছাসেবক 
          <Text style={styles.highlight}> ১০,০০০+</Text> জীবন বাঁচিয়েছে
        </Text>
      </View>

      {/* Volunteer Team */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>আমাদের মূল টিম</Text>
        
        {volunteerTeam.map((volunteer, index) => (
          <View key={index} style={styles.volunteerCard}>
            <View style={styles.volunteerHeader}>
              <FontAwesome name="user-circle" size={40} color="#d32f2f" />
              <View style={styles.volunteerInfo}>
                <Text style={styles.volunteerName}>{volunteer.name}</Text>
                <Text style={styles.volunteerNameEng}>{volunteer.nameEng}</Text>
                <Text style={styles.volunteerRole}>{volunteer.role} • {volunteer.years}</Text>
                <Text style={styles.volunteerRoleEng}>{volunteer.roleEng} • {volunteer.yearsEng}</Text>
              </View>
            </View>
            <Text style={styles.contributionText}>{volunteer.contribution}</Text>
            <Text style={styles.contributionTextEng}>{volunteer.contributionEng}</Text>
          </View>
        ))}
      </View>

      {/* How We Work */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>আমরা কিভাবে কাজ করি</Text>
        
        <View style={styles.processStep}>
          <FontAwesome name="bell" size={20} color="#d32f2f" />
          <Text style={styles.processText}>জরুরী রক্তের প্রয়োজন পেয়ে নোটিফিকেশন পাঠানো</Text>
          <Text style={styles.processTextEng}>Receive blood request and send notifications</Text>
        </View>
        
        <View style={styles.processStep}>
          <FontAwesome name="search" size={20} color="#d32f2f" />
          <Text style={styles.processText}>নিকটবর্তী উপযুক্ত রক্তদাতা খুঁজে বের করা</Text>
          <Text style={styles.processTextEng}>Find matching donors nearby</Text>
        </View>
        
        <View style={styles.processStep}>
          <FontAwesome name="users" size={20} color="#d32f2f" />
          <Text style={styles.processText}>দাতা ও গ্রহীতার মধ্যে সংযোগ স্থাপন</Text>
          <Text style={styles.processTextEng}>Connect donors with recipients</Text>
        </View>
        
        <View style={styles.processStep}>
          <FontAwesome name="heartbeat" size={20} color="#d32f2f" />
          <Text style={styles.processText}>সফল রক্তদানের নিশ্চিতকরণ</Text>
          <Text style={styles.processTextEng}>Confirm successful donation</Text>
        </View>
      </View>

      {/* Join Us */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>আমাদের সাথে যুক্ত হোন</Text>
        
        <Text style={styles.ctaText}>
          আপনার দক্ষতা ও সময় দিয়ে রক্তদান প্রক্রিয়ায় সাহায্য করুন
        </Text>
        
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinPress}>
          <FontAwesome name="handshake-o" size={18} color="white" />
          <Text style={styles.buttonText}> স্বেচ্ছাসেবক হোন</Text>
        </TouchableOpacity>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>যোগাযোগ</Text>
        
        <TouchableOpacity style={styles.contactMethod} onPress={handleEmailPress}>
          <FontAwesome name="envelope" size={20} color="#d32f2f" />
          <Text style={styles.contactText}>volunteers@roktobondhu.org</Text>
        </TouchableOpacity>
        
        <View style={styles.contactMethod}>
          <FontAwesome name="phone" size={20} color="#d32f2f" />
          <Text style={styles.contactText}>রক্তবন্ধু হেল্পলাইন: ০৯৬১২-১২১২১২</Text>
        </View>
        
        <View style={styles.contactMethod}>
          <FontAwesome name="map-marker" size={20} color="#d32f2f" />
          <Text style={styles.contactText}>মূল কার্যালয়: ১২/৩ পান্থপথ, ঢাকা</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 50,
  },
  appName: {
    fontSize: 22,
    color: 'red',
    textAlign: 'center',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'HindSiliguri_400Regular',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_400Regular',
  },
  statsText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'HindSiliguri_500Medium',
  },
  highlight: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  volunteerCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  volunteerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  volunteerInfo: {
    marginLeft: 15,
  },
  volunteerName: {
    fontSize: 16,
    color: '#444',
    fontFamily: 'HindSiliguri_500Medium',
  },
  volunteerRole: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'HindSiliguri_400Regular',
  },
  contributionText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'HindSiliguri_400Regular',
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  processText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 10,
    flex: 1,
    fontFamily: 'HindSiliguri_400Regular',
  },
  processTextEng: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    flex: 1,
    fontStyle: 'italic',
  },
  ctaContainer: {
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  ctaText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'HindSiliguri_400Regular',
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#d32f2f',
    fontFamily: 'HindSiliguri_500Medium',
  },
  contactSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  contactText: {
    color: '#555',
    marginLeft: 10,
    fontFamily: 'HindSiliguri_400Regular',
  }
});