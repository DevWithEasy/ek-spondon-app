import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import useAuth from '../../hooks/useAuth'

export default function Campaigns() {
  const router = useRouter()
  const isLoggedIn = useAuth()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/signin")
    }
  }, [isLoggedIn, router])

  // Simulate API fetch
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockCampaigns = [
          {
            id: 1,
            title: "সামাজিক রক্তদান কর্মসূচি",
            date: "১৫ জুন ২০২৩",
            location: "সেন্ট্রাল পার্ক, ঢাকা",
            description: "সামাজিক দায়বদ্ধতা থেকে রক্তদান করুন এবং জীবন বাঁচান",
            organizer: "রক্তদাতা ফাউন্ডেশন"
          },
          {
            id: 2,
            title: "বিশ্ববিদ্যালয় রক্তদান শিবির",
            date: "২০ জুন ২০২৩",
            location: "ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস",
            description: "ছাত্র-ছাত্রীদের জন্য বিশেষ রক্তদান কর্মসূচি",
            organizer: "ঢাকা বিশ্ববিদ্যালয়"
          },
          {
            id: 3,
            title: "করপোরেট রক্তদান ক্যাম্প",
            date: "২৫ জুন ২০২৩",
            location: "বাংলাদেশ সচিবালয়",
            description: "সরকারি কর্মকর্তাদের জন্য রক্তদান কর্মসূচি",
            organizer: "স্বাস্থ্য মন্ত্রণালয়"
          }
        ]
        setCampaigns(mockCampaigns)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  if (isLoggedIn === null || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
      </View>
    )
  }

  const renderCampaignItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.campaignCard}
      onPress={() => router.push(`/campaigns/${item.id}`)}
    >
      <View style={styles.campaignContent}>
        <Text style={styles.campaignTitle}>{item.title}</Text>
        <View style={styles.campaignMeta}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.campaignText}>{item.date}</Text>
        </View>
        <View style={styles.campaignMeta}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.campaignText}>{item.location}</Text>
        </View>
        <View style={styles.campaignMeta}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.campaignText}>{item.organizer}</Text>
        </View>
        <Text style={styles.campaignDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container}>

      {campaigns.length > 0 ? (
        <FlatList
          data={campaigns}
          renderItem={renderCampaignItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={48} color="#d32f2f" />
          <Text style={styles.emptyText}>কোনো কর্মসূচি পাওয়া যায়নি</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  campaignContent: {
    padding: 16,
  },
  campaignTitle: {
    fontSize: 16,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  campaignMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  campaignText: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    marginLeft: 8,
  },
  campaignDescription: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'HindSiliguri_500Medium',
    color: '#666',
    marginTop: 16,
  }
})