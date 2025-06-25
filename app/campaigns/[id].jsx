import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import useAuth from '../../hooks/useAuth'

export default function SingleCampaign() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const isLoggedIn = useAuth()
  const campaignId = params.id

  // Mock data - replace with actual data fetching
  const campaign = {
    id: campaignId,
    title: "সামাজিক রক্তদান কর্মসূচি",
    date: "১৫ জুন ২০২৩",
    time: "সকাল ৯টা থেকে বিকেল ৫টা",
    location: "সেন্ট্রাল পার্ক, ঢাকা",
    address: "মিরপুর রোড, ঢাকা-১২১৬",
    description: "সামাজিক দায়বদ্ধতা থেকে রক্তদান করুন এবং জীবন বাঁচান। এই কর্মসূচিতে অংশগ্রহণ করে আপনি তিনটি জীবন বাঁচাতে পারেন। সকল সুস্থ ব্যক্তিদের রক্তদানে আমন্ত্রণ জানানো হচ্ছে।",
    organizer: "রক্তদাতা ফাউন্ডেশন",
    contact: "০১৭১২৩৪৫৬৭৮",
    totalDonors: 124,
    targetDonors: 200,
    requirements: [
      "বয়স ১৮-৬০ বছর",
      "ওজন ৪৫ কেজির উপর",
      "সুস্থ শরীর",
      "রক্তদানের পূর্বে হালকা নাস্তা করুন"
    ]
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${campaign.title}\nতারিখ: ${campaign.date}\nস্থান: ${campaign.location}\n${campaign.description}\n\nরক্তদান করুন, জীবন বাঁচান!`,
        url: 'https://yourbloodapp.com',
        title: campaign.title
      })
    } catch (error) {
      console.error('Error sharing:', error.message)
    }
  }

  const handleCall = () => {
    Linking.openURL(`tel:${campaign.contact}`)
  }

  const handleMap = () => {
    const address = encodeURIComponent(campaign.address)
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`)
  }

  if (isLoggedIn === false) {
    router.replace("/signin")
    return null
  }

  return (
    <ScrollView style={styles.container}>
      {/* Campaign Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{campaign.title}</Text>
        
        {/* Organizer */}
        <View style={styles.detailRow}>
          <Ionicons name="people" size={20} color="#d32f2f" />
          <Text style={styles.detailText}>{campaign.organizer}</Text>
        </View>

        {/* Date & Time */}
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={20} color="#d32f2f" />
          <Text style={styles.detailText}>{campaign.date}, {campaign.time}</Text>
        </View>

        {/* Location */}
        <View style={styles.detailRow}>
          <Ionicons name="location" size={20} color="#d32f2f" />
          <View>
            <Text style={styles.detailText}>{campaign.location}</Text>
            <Text style={styles.addressText}>{campaign.address}</Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.detailRow}>
          <Ionicons name="call" size={20} color="#d32f2f" />
          <Text style={styles.detailText}>{campaign.contact}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            রক্তদাতা: {campaign.totalDonors}/{campaign.targetDonors}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${(campaign.totalDonors / campaign.targetDonors) * 100}%` 
            }]} />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>বিবরণ</Text>
        <Text style={styles.description}>{campaign.description}</Text>

        {/* Requirements */}
        <Text style={styles.sectionTitle}>যোগ্যতা</Text>
        <View style={styles.requirementsContainer}>
          {campaign.requirements.map((item, index) => (
            <View key={index} style={styles.requirementItem}>
              <MaterialIcons name="check-circle" size={16} color="#2E7D32" />
              <Text style={styles.requirementText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.mapButton} onPress={handleMap}>
            <FontAwesome5 name="map-marker-alt" size={16} color="white" />
            <Text style={styles.buttonText}>মানচিত্রে দেখুন</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call" size={16} color="white" />
            <Text style={styles.buttonText}>কল করুন</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  campaignImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  detailText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    marginLeft: 10,
    marginTop: 3,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_500Medium',
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d32f2f',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#444',
    lineHeight: 22,
  },
  requirementsContainer: {
    marginTop: 5,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#444',
    marginLeft: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  mapButton: {
    flex: 1,
    backgroundColor: '#1565C0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'HindSiliguri_600SemiBold',
    marginLeft: 8,
  },
})