import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  TextInput,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  MaterialIcons, 
  Ionicons, 
  Feather,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons';
import useAuth from '../../../hooks/useAuth';

export default function HelpsAndSupports() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportChannels = [
    {
      id: 1,
      title: "সাপোর্ট টিমকে ইমেইল করুন",
      description: "সরাসরি আমাদের টেকনিক্যাল টিমের সাথে যোগাযোগ করুন",
      icon: <MaterialIcons name="email" size={24} color="#d32f2f" />,
      action: () => Linking.openURL('mailto:support@roktodata.com?subject=App Support Request')
    },
    {
      id: 2,
      title: "লাইভ চ্যাট সাপোর্ট",
      description: "আমাদের অনলাইন সাপোর্ট এজেন্টের সাথে চ্যাট করুন",
      icon: <Ionicons name="chatbubbles" size={24} color="#1565C0" />,
      action: () => router.push('/help/live-chat')
    },
    {
      id: 3,
      title: "ফোন কল করুন",
      description: "সাপোর্ট টিমের সাথে সরাসরি কথা বলুন",
      icon: <FontAwesome name="phone" size={24} color="#2E7D32" />,
      action: () => Linking.openURL('tel:+8801234567890')
    },
    {
      id: 4,
      title: "সাম্প্রতিক সমস্যা",
      description: "বর্তমানে পরিচালিত সমস্যা ও সমাধানসমূহ",
      icon: <AntDesign name="warning" size={24} color="#FF8F00" />,
      action: () => router.push('/help/known-issues')
    }
  ];

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert('ত্রুটি', 'আপনার সমস্যার বিবরণ লিখুন');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'সফল হয়েছে', 
        'আপনার সমস্যার রিপোর্ট সফলভাবে জমা হয়েছে। আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে।'
      );
      setMessage('');
    } catch (error) {
      console.log(error)
      Alert.alert('ত্রুটি', 'আপনার রিপোর্ট জমা দিতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Support Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>আপনার সমস্যা জানান</Text>
        <Text style={styles.sectionSubtitle}>
          অ্যাপ সম্পর্কিত কোন সমস্যা বা জিজ্ঞাসা থাকলে নিচের ফর্মটি পূরণ করুন
        </Text>

        <TextInput
          style={styles.messageInput}
          multiline
          numberOfLines={6}
          placeholder="আপনার সমস্যার বিস্তারিত বিবরণ লিখুন..."
          placeholderTextColor="#b3b6b7"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : 'রিপোর্ট জমা দিন'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Support Channels */}
      <View style={styles.channelsContainer}>
        <Text style={styles.sectionTitle}>দ্রুত সহায়তা পান</Text>
        
        {supportChannels.map((channel) => (
          <TouchableOpacity 
            key={channel.id} 
            style={styles.channelCard}
            onPress={channel.action}
          >
            <View style={styles.channelIcon}>
              {channel.icon}
            </View>
            <View style={styles.channelText}>
              <Text style={styles.channelTitle}>{channel.title}</Text>
              <Text style={styles.channelDescription}>{channel.description}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#b3b6b7" />
          </TouchableOpacity>
        ))}
      </View>

      {/* App Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>অ্যাপ তথ্য</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>সংস্করণ:</Text>
          <Text style={styles.infoValue}>1.2.3</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>শেষ আপডেট:</Text>
          <Text style={styles.infoValue}>২৫ জুন, ২০২৩</Text>
        </View>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    marginBottom: 15,
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 15,
    color: '#333',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  channelsContainer: {
    margin: 15,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  channelIcon: {
    marginRight: 15,
  },
  channelText: {
    flex: 1,
  },
  channelTitle: {
    fontSize: 15,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginBottom: 3,
  },
  channelDescription: {
    fontSize: 13,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_500Medium',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#333',
  },
});