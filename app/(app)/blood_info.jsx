import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

export default function BloodInfo() {
  const bloodCompatibility = [
    { type: 'A+', receive: 'A+, A-, O+, O-', donate: 'A+, AB+' },
    { type: 'A-', receive: 'A-, O-', donate: 'A+, A-, AB+, AB-' },
    { type: 'B+', receive: 'B+, B-, O+, O-', donate: 'B+, AB+' },
    { type: 'B-', receive: 'B-, O-', donate: 'B+, B-, AB+, AB-' },
    { type: 'AB+', receive: 'সমস্ত রক্তের ধরন (সর্বজনীন গ্রহীতা)', donate: 'AB+' },
    { type: 'AB-', receive: 'AB-, A-, B-, O-', donate: 'AB+, AB-' },
    { type: 'O+', receive: 'O+, O-', donate: 'O+, A+, B+, AB+' },
    { type: 'O-', receive: 'O-', donate: 'সমস্ত রক্তের ধরন (সর্বজনীন দাতা)' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        রক্ত আমাদের দেহের অত্যন্ত গুরুত্বপূর্ণ একটি তরল উপাদান, যা জীবন ধারণের জন্য অপরিহার্য। এটি পুষ্টি, অক্সিজেন, হরমোন পরিবহন করে এবং দেহের বর্জ্য পদার্থ নিষ্কাশনে সহায়তা করে। রক্তদান একটি মহৎ কাজ, যা একজন মানুষের জীবন বাঁচাতে পারে।
      </Text>

      {/* What is Blood? */}
      <Text style={styles.subHeading}>রক্ত কী?</Text>
      <Text style={styles.paragraph}>
        রক্ত হলো একটি বিশেষ ধরনের যোজক কলা যা তরল প্লাজমা এবং এতে ভাসমান বিভিন্ন রক্তকণিকা (লোহিত রক্তকণিকা, শ্বেত রক্তকণিকা এবং অণুচক্রিকা) দ্বারা গঠিত। এটি লাল বর্ণের হয়, কারণ লোহিত রক্তকণিকায় হিমোগ্লোবিন নামক একটি আয়রনযুক্ত প্রোটিন থাকে।
      </Text>

      {/* Functions of Blood */}
      <Text style={styles.subHeading}>রক্তের কাজ:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• অক্সিজেন পরিবহন: লোহিত রক্তকণিকা ফুসফুস থেকে অক্সিজেন সংগ্রহ করে দেহের প্রতিটি কোষে পৌঁছে দেয়।</Text>
        <Text style={styles.listItem}>• কার্বন ডাই-অক্সাইড অপসারণ: কোষ থেকে উৎপন্ন কার্বন ডাই-অক্সাইড ফুসফুসে বহন করে নিয়ে আসে, যাতে তা শরীর থেকে বের হয়ে যায়।</Text>
        <Text style={styles.listItem}>• পুষ্টি পরিবহন: হজম হওয়া খাদ্যসার দেহের বিভিন্ন অংশে পরিবহন করে।</Text>
        <Text style={styles.listItem}>• হরমোন পরিবহন: হরমোনকে তার উৎপাদন স্থল থেকে লক্ষ্য কোষে পরিবহন করে।</Text>
        <Text style={styles.listItem}>• তাপের সমতা রক্ষা: দেহের তাপমাত্রা নিয়ন্ত্রণে গুরুত্বপূর্ণ ভূমিকা পালন করে।</Text>
        <Text style={styles.listItem}>• বর্জ্য পদার্থ নিষ্কাশন: বিপাকক্রিয়ার ফলে উৎপন্ন বর্জ্য পদার্থ (যেমন ইউরিয়া, ইউরিক অ্যাসিড) কিডনি এবং অন্যান্য অঙ্গের মাধ্যমে শরীর থেকে বের করে দেয়।</Text>
        <Text style={styles.listItem}>• রোগ প্রতিরোধ: শ্বেত রক্তকণিকা এবং অ্যান্টিবডি দ্বারা দেহকে জীবাণু ও রোগের বিরুদ্ধে রক্ষা করে।</Text>
        <Text style={styles.listItem}>• রক্ত জমাট বাঁধা: অণুচক্রিকা রক্তপাত বন্ধ করতে সাহায্য করে।</Text>
      </View>

      {/* Blood Types */}
      <Text style={styles.subHeading}>রক্তের প্রকারভেদ (ব্লাড গ্রুপ):</Text>
      <Text style={styles.paragraph}>
        মানুষের রক্তের প্রধানত চারটি গ্রুপ আছে, যা লোহিত রক্তকণিকার পৃষ্ঠে বিদ্যমান অ্যান্টিজেন এবং রক্তরসে বিদ্যমান অ্যান্টিবডির উপর ভিত্তি করে নির্ধারিত হয়। এই গ্রুপগুলো হলো: A, B, AB, এবং O। প্রতিটি গ্রুপ আবার Rh ফ্যাক্টরের উপর ভিত্তি করে পজিটিভ (+) বা নেগেটিভ (-) হতে পারে। ফলে মোট ৮টি প্রধান রক্তের গ্রুপ পাওয়া যায়: A+, A-, B+, B-, AB+, AB-, O+, এবং O-।
      </Text>

      {/* Blood Donation */}
      <Text style={styles.heading}>রক্তদান</Text>
      <Text style={styles.paragraph}>
        রক্তদান হলো একজন সুস্থ প্রাপ্তবয়স্ক মানুষের স্বেচ্ছায় রক্ত ​​দেওয়ার প্রক্রিয়া। এই রক্ত রোগীর দেহে সরাসরি পরিসঞ্চালন করা হতে পারে অথবা বিভিন্ন উপাদানে বিভক্ত করে ঔষধ তৈরি করা হতে পারে।
      </Text>

      {/* Benefits of Blood Donation */}
      <Text style={styles.subHeading}>রক্তদানের উপকারিতা:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• সবচেয়ে গুরুত্বপূর্ণ হলো, একজন মানুষের জীবন বাঁচানো যায়।</Text>
        <Text style={styles.listItem}>• নিয়মিত রক্তদান রক্তদাতার স্বাস্থ্যের জন্যও উপকারী হতে পারে, যেমন আয়রনের ভারসাম্য বজায় রাখতে সাহায্য করে।</Text>
      </View>

      {/* Eligibility for Blood Donation */}
      <Text style={styles.subHeading}>রক্তদানের যোগ্যতা:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• সাধারণত ১৮ থেকে ৬০ বছর বয়সী সুস্থ ব্যক্তি রক্তদান করতে পারেন।</Text>
        <Text style={styles.listItem}>• পুরুষদের ক্ষেত্রে ওজন কমপক্ষে ৫০ কেজি এবং মহিলাদের ক্ষেত্রে ৪৫ কেজির বেশি হওয়া উচিত।</Text>
        <Text style={styles.listItem}>• রক্তে হিমোগ্লোবিনের মাত্রা নির্দিষ্ট পরিমাণের নিচে থাকলে রক্তদান করা যায় না।</Text>
        <Text style={styles.listItem}>• বিভিন্ন রোগ, যেমন হেপাটাইটিস, এইডস, ম্যালেরিয়া, উচ্চ রক্তচাপ, ডায়াবেটিস ইত্যাদি থাকলে রক্তদান করা যায় না।</Text>
        <Text style={styles.listItem}>• গর্ভবতী বা স্তন্যদানকারী মায়েরা রক্তদান করতে পারবেন না।</Text>
        <Text style={styles.listItem}>• একটি রক্তদানের পর সাধারণত ৩-৪ মাস বিরতি নিতে হয়।</Text>
      </View>

      {/* Blood Compatibility Table */}
      <Text style={styles.heading}>কে কাকে রক্ত দান করতে পারবে (রক্ত সঞ্চালনের সামঞ্জস্যতা):</Text>
      <Text style={styles.paragraph}>
        রক্তদান ও গ্রহণের ক্ষেত্রে রক্তের গ্রুপের সামঞ্জস্যতা অত্যন্ত গুরুত্বপূর্ণ। ভুল গ্রুপের রক্ত দিলে রোগীর দেহে মারাত্মক প্রতিক্রিয়া হতে পারে।
      </Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>রক্তের ধরন</Text>
        <Text style={styles.tableHeaderText}>গ্রহণ করতে পারেন</Text>
        <Text style={styles.tableHeaderText}>দান করতে পারেন</Text>
      </View>

      {/* Table Rows */}
      {bloodCompatibility.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.type}</Text>
          <Text style={styles.tableCell}>{item.receive}</Text>
          <Text style={styles.tableCell}>{item.donate}</Text>
        </View>
      ))}

      {/* Important Notes */}
      <Text style={styles.subHeading}>কিছু গুরুত্বপূর্ণ বিষয়:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• সর্বজনীন দাতা (Universal Donor): O- গ্রুপের রক্ত সব গ্রুপের ব্যক্তিকে দেওয়া যায়, তাই O- কে সর্বজনীন দাতা বলা হয়।</Text>
        <Text style={styles.listItem}>• সর্বজনীন গ্রহীতা (Universal Recipient): AB+ গ্রুপের ব্যক্তি সব গ্রুপের রক্ত গ্রহণ করতে পারে, তাই AB+ কে সর্বজনীন গ্রহীতা বলা হয়।</Text>
        <Text style={styles.listItem}>• যদিও O- কে সর্বজনীন দাতা বলা হয়, তবে এটি শুধুমাত্র জরুরি অবস্থার জন্য। সাধারণত, রক্তের গ্রুপ মিলিয়েই রক্ত দেওয়া হয়।</Text>
        <Text style={styles.listItem}>• রক্তদানের আগে অবশ্যই একজন বিশেষজ্ঞ চিকিৎসক দ্বারা স্বাস্থ্য পরীক্ষা করানো উচিত।</Text>
      </View>
      <Text style={styles.paragraph}>
        রক্তদান জীবন বাঁচানোর একটি অন্যতম সহজ ও কার্যকর উপায়। আপনার দেওয়া এক ব্যাগ রক্ত একজন মানুষের জীবন বাঁচাতে পারে।
      </Text>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'HindSiliguri_700Bold',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: '#555',
    fontFamily: 'HindSiliguri_700Bold',
  },
  paragraph: {
    lineHeight: 24,
    marginBottom: 10,
    color: '#444',
    fontFamily: 'HindSiliguri_400Regular',
  },
  list: {
    marginBottom: 10,
  },
  listItem: {
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 5,
    color: '#444',
    fontFamily: 'HindSiliguri_400Regular',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
    paddingHorizontal: 5,
    fontFamily: 'HindSiliguri_400Regular',
  },
});