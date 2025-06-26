import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import useAuth from '../../hooks/useAuth';

const Announcements = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "জরুরী রক্তদান ক্যাম্পেইন",
      content: "আগামী শুক্রবার শহীদ সোহরাওয়ার্দী হাসপাতালে একটি জরুরী রক্তদান ক্যাম্পেইনের আয়োজন করা হয়েছে। সকল সুস্থ্য মানুষকে রক্তদানে অংশগ্রহণের অনুরোধ জানানো হচ্ছে।",
      date: "১৫ জুন ২০২৩",
      urgent: true
    },
    {
      id: 2,
      title: "নতুন ফিচার আপডেট",
      content: "আমাদের অ্যাপ্লিকেশনে এখন থেকে আপনি সরাসরি রক্তদাতাদের সাথে যোগাযোগ করতে পারবেন। নতুন আপডেটটি ইন্সটল করে নিন।",
      date: "১০ জুন ২০২৩",
      urgent: false
    },
    {
      id: 3,
      title: "রক্তের গ্রুপ ভিত্তিক সতর্কতা",
      content: "বর্তমানে O- নেগেটিভ রক্তের চাহিদা বেশি থাকায় সংশ্লিষ্ট রক্তদাতাদের বিশেষভাবে অনুরোধ করা হচ্ছে।",
      date: "৫ জুন ২০২৩",
      urgent: true
    }
  ]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Normally you would fetch data here
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const renderAnnouncement = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.announcementCard,
        item.urgent && styles.urgentCard
      ]}
      onPress={() => router.push(`/announcements/${item.id}`)}
    >
      {item.urgent && (
        <View style={styles.urgentBadge}>
          <Text style={styles.urgentBadgeText}>জরুরী</Text>
        </View>
      )}
      
      <View style={styles.announcementContent}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDate}>
          <MaterialIcons name="date-range" size={14} color="#666" /> {item.date}
        </Text>
        <Text style={styles.announcementText} numberOfLines={2}>
          {item.content}
        </Text>
        
        <TouchableOpacity 
          style={styles.readMoreButton}
          onPress={() => router.push(`/announcements/${item.id}`)}
        >
          <Text style={styles.readMoreText}>বিস্তারিত পড়ুন</Text>
          <Ionicons name="arrow-forward" size={14} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#d32f2f" />
        </TouchableOpacity>
      </View>

      {announcements.length > 0 ? (
        <FlatList
          data={announcements}
          renderItem={renderAnnouncement}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="announcement" size={50} color="#d32f2f" />
          <Text style={styles.emptyText}>কোন ঘোষণা পাওয়া যায়নি</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  urgentBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d32f2f',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 1,
  },
  urgentBadgeText: {
    color: '#fff',
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
  },
  announcementImage: {
    width: '100%',
    height: 150,
  },
  announcementContent: {
    padding: 15,
  },
  announcementTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  announcementDate: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  announcementText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 15,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  readMoreText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 14,
    color: '#d32f2f',
    marginRight: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
});

export default Announcements;