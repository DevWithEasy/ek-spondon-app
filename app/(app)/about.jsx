import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>আমাদের মিশন</Text>
        <Text style={styles.sectionText}>
          আমাদের মিশন হলো রক্তের প্রয়োজনীয়তা এবং রক্তদাতাদের মধ্যে একটি সেতুবন্ধন তৈরি করা। 
          আমরা চাই প্রতিটি জরুরি মুহূর্তে রক্তের চাহিদা পূরণ করতে সাহায্য করতে।
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>আমাদের কার্যক্রম</Text>
        <Text style={styles.sectionText}>
          আমরা একটি স্বেচ্ছাসেবী সংগঠন হিসেবে কাজ করছি যেখানে:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• রক্তদাতাদের ডাটাবেস তৈরি ও রক্ষণাবেক্ষণ</Text>
          <Text style={styles.listItem}>• জরুরি ভিত্তিতে রক্তের ব্যবস্থা করা</Text>
          <Text style={styles.listItem}>• রক্তদান সম্পর্কে সচেতনতা বৃদ্ধি</Text>
          <Text style={styles.listItem}>• নিয়মিত রক্তদান শিবিরের আয়োজন</Text>
        </View>
      </View>

      <View style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          আমাদের সম্পূর্ণ কার্যক্রম স্বেচ্ছাসেবী এবং বিনামূল্যে। আপনার রক্তদান আমাদের সমাজের জন্য অমূল্য। 
          দয়া করে আমাদের সাথে যোগ দিন এবং রক্তদানের এই মহৎকার্যে অংশগ্রহণ করুন। 
          আপনার রক্তদান জীবন বাঁচাতে পারে এবং আমাদের সমাজকে মানবিক মূল্যবোধে সমৃদ্ধ করতে সাহায্য করবে।
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>কেন আমাদের সাথে যুক্ত হবেন?</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• ১০০% স্বচ্ছ ও জবাবদিহিমূলক কার্যক্রম</Text>
          <Text style={styles.listItem}>• দ্রুততম সময়ে রক্তের ব্যবস্থা</Text>
          <Text style={styles.listItem}>• রক্তদাতাদের জন্য বিশেষ স্বীকৃতি</Text>
          <Text style={styles.listItem}>• সম্পূর্ণ বিনামূল্যে সেবা</Text>
        </View>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>যোগাযোগ</Text>
        <Text style={styles.contactText}>ইমেইল: contact@blooddonation.org</Text>
        <Text style={styles.contactText}>ফোন: +৮৮০ ১৭XX-XXXXXX</Text>
        <Text style={styles.contactText}>ঠিকানা: ১২৩/৪, মানবিক সড়ক, ঢাকা</Text>
      </View>

      <Text style={styles.footerText}>ধন্যবাদ! আপনার সহযোগিতা আমাদের অনুপ্রাণিত করে</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    paddingVertical: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'red',
    marginBottom: 10,
    fontFamily: 'HindSiliguri_700Bold',
  },
  sectionText: {
    lineHeight: 24,
    color: '#444',
    marginBottom: 10,
    fontFamily: 'HindSiliguri_400Regular',
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    lineHeight: 22,
    color: '#555',
    marginBottom: 8,
    fontFamily: 'HindSiliguri_400Regular',
  },
  highlightBox: {
    backgroundColor: '#ffebee',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#d32f2f',
  },
  highlightText: {
    lineHeight: 24,
    color: '#333',
    fontFamily: 'HindSiliguri_400Regular',
  },
  contactBox: {
    backgroundColor: '#d32f2f',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
  },
  contactTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  contactText: {
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'HindSiliguri_400Regular',
  },
  footerText: {
    textAlign: 'center',
    marginVertical: 25,
    color: '#666',
    fontFamily: 'HindSiliguri_400Regular',
  },
});