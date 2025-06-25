import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function TermsCondition() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>১. রক্তদানের সক্ষমতা</Text>
        <Text style={styles.text}>
          • বয়স ১৮ থেকে ৬৫ বছরের মধ্যে হতে হবে 
          {'\n'}• ওজন কমপক্ষে ৪৫ কেজি হতে হবে 
          {'\n'}• হিমোগ্লোবিন স্তর ১২.৫ g/dL এর উপরে থাকতে হবে 
          {'\n'}• কোনো সংক্রামক রোগ, এইচআইভি, হেপাটাইটিস বি বা সি থাকলে রক্তদান করতে পারবেন না 
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>২. ব্যবহারকারীর দ্বায়ভার</Text>
        <Text style={styles.text}>
          • সঠিক তথ্য প্রদান করতে হবে 
          {'\n'}• রক্তের গ্রুপ সম্পর্কে নিশ্চিত হতে হবে 
          {'\n'}• রক্তদানের ২৪ ঘণ্টা আগে পর্যাপ্ত পানি পান করতে হবে 
          {'\n'}• রক্তদানের আগে ভারী খাবার খেতে হবে 
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. গোপনীয়তা নীতি</Text>
        <Text style={styles.text}>
          • আপনার ব্যক্তিগত তথ্য নিরাপদে সংরক্ষণ করা হবে
          {'\n'}• শুধুমাত্র প্রয়োজনীয় কর্মকর্তাদের সাথে তথ্য শেয়ার করা হবে 
          {'\n'}• কোনো তথ্য বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা হবে না 
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>৪. রক্তদানের পরে সচেতনতা</Text>
        <Text style={styles.text}>
          • রক্তদানের পর ১০-১৫ মিনিট বিশ্রাম নিন
          {'\n'}• পরবর্তী ২৪ ঘণ্টা ভারী কাজ করা থেকে বিরত থাকুন 
          {'\n'}• প্রচুর তরল ও স্বাস্থ্যকর খাবার গ্রহণ করুন 
          {'\n'}• কোনো সমস্যা দেখা দিলে সাথে সাথে চিকিৎসকের পরামর্শ নিন
        </Text>
      </View>

      <Text style={styles.footerText}>
        এই শর্তাবলী পরিবর্তনের অধিকার সংস্থার কাছে সংরক্ষিত (We reserve the right to modify these terms)
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
    fontFamily: 'HindSiliguri_600SemiBold'
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
    color: '#555',
    fontFamily: 'HindSiliguri_400Regular'
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    color: '#777',
    fontFamily: 'HindSiliguri_400Regular'
  }
})