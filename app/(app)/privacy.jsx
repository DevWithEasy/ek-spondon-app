import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native'
import React from 'react'

export default function PrivacyPolicy() {
  const handleContactPress = () => {
    Linking.openURL('mailto:support@blooddonationapp.com')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>১. যে সকল তথ্য সংগ্রহ হতে পারে</Text>
        <Text style={styles.text}>
          • ব্যক্তিগত তথ্য (নাম, ফোন নম্বর, ইমেইল)
          {'\n\n'}• স্বাস্থ্য সংক্রান্ত তথ্য (রক্তের গ্রুপ, হিমোগ্লোবিন মাত্রা)
          {'\n\n'}• অবস্থান ডেটা (রক্তদানের স্থান)
          {'\n\n'}• ডিভাইস তথ্য (আইপি ঠিকানা, ডিভাইস টাইপ)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>২. আপনার তথ্য ব্যবহার হতে পারে</Text>
        <Text style={styles.text}>
          • রক্তদাতা ও গ্রহীতাদের মধ্যে সংযোগ স্থাপন 
          {'\n\n'}• অ্যাপের কার্যকারিতা উন্নত করা
          {'\n\n'}• ব্যবহারকারীদের গুরুত্বপূর্ণ নোটিফিকেশন পাঠানো
          {'\n\n'}• নিরাপদ রক্তদান নিশ্চিত করতে
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>৩. তথ্য নিরাপত্তা</Text>
        <Text style={styles.text}>
          • এনক্রিপ্টেড ডেটা স্টোরেজ
          {'\n\n'}• কঠোর অ্যাক্সেস কন্ট্রোল 
          {'\n\n'}• নিয়মিত সিকিউরিটি অডিট 
          {'\n\n'}• তৃতীয় পক্ষের সাথে ডেটা শেয়ার না করা 
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>৪. ব্যবহারকারীর অধিকার</Text>
        <Text style={styles.text}>
          • আপনার ডেটা এক্সেস করার অধিকার
          {'\n\n'}• তথ্য সংশোধন করার অধিকার 
          {'\n\n'}• অ্যাকাউন্ট ডিলিট করার অপশন
          {'\n\n'}• ডেটা ব্যবহারে আপত্তি করার অধিকার
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>৫. যোগাযোগ</Text>
        <Text style={[styles.text, styles.link]} onPress={handleContactPress}>
          support@blooddonationapp.com
          {'\n\n'}০১৭১১-XXXXXX (Helpline)
        </Text>
      </View>

      <Text style={styles.updateText}>
        Last Updated: January 2024
        {'\n'}
        সর্বশেষ আপডেট: জানুয়ারী ২০২৪
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#d32f2f'
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    color: '#d32f2f'
  },
  section: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
    fontFamily: 'HindSiliguri_600SemiBold'
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    fontFamily: 'HindSiliguri_400Regular',
  },
  link: {
    color: '#d32f2f',
    textDecorationLine: 'underline'
  },
  updateText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    color: '#777',
    fontStyle: 'italic'
  }
})