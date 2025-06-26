import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import useAuth from '../../hooks/useAuth';

export default function CampaignsManagement() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);

  // Mock campaign data - replace with API calls
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "সামাজিক রক্তদান কর্মসূচি",
      date: "১৫ জুন ২০২৩",
      time: "সকাল ৯টা - বিকেল ৫টা",
      location: "সেন্ট্রাল পার্ক, ঢাকা",
      organizer: "রক্তদাতা ফাউন্ডেশন",
      donorsRegistered: 45,
      targetDonors: 100,
      status: "upcoming",
    },
    {
      id: 2,
      title: "বিশ্ববিদ্যালয় রক্তদান শিবির",
      date: "২০ জুন ২০২৩",
      time: "সকাল ১০টা - বিকেল ৪টা",
      location: "ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস",
      organizer: "ঢাকা বিশ্ববিদ্যালয়",
      donorsRegistered: 78,
      targetDonors: 120,
      status: "upcoming",
    },
    {
      id: 3,
      title: "করপোরেট রক্তদান ক্যাম্প",
      date: "১০ মে ২০২৩",
      time: "সকাল ৮টা - বিকেল ৩টা",
      location: "বাংলাদেশ সচিবালয়",
      organizer: "স্বাস্থ্য মন্ত্রণালয়",
      donorsRegistered: 92,
      targetDonors: 80,
      status: "completed",
    }
  ]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || filterDate;
    setShowDatePicker(false);
    setFilterDate(currentDate);
    setIsDateSelected(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !isDateSelected || campaign.date.includes(filterDate.toLocaleDateString('bn-BD').split('/')[0]);
    return matchesSearch && matchesDate;
  });

  const renderCampaignItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.campaignCard}
      onPress={() => router.push(`/admin/campaigns/${item.id}`)}
    >
      <View style={styles.campaignContent}>
        <View style={styles.campaignHeader}>
          <Text style={styles.campaignTitle}>{item.title}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'completed' ? styles.completedBadge : styles.upcomingBadge
          ]}>
            <Text style={styles.statusText}>
              {item.status === 'completed' ? 'সম্পন্ন' : 'আসছে'}
            </Text>
          </View>
        </View>
        
        <View style={styles.campaignDetail}>
          <MaterialIcons name="date-range" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}, {item.time}</Text>
        </View>
        
        <View style={styles.campaignDetail}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        
        <View style={styles.campaignDetail}>
          <FontAwesome5 name="user-tie" size={14} color="#666" />
          <Text style={styles.detailText}>{item.organizer}</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            রক্তদাতা: {item.donorsRegistered}/{item.targetDonors}
          </Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${Math.min(100, (item.donorsRegistered / item.targetDonors) * 100)}%` }
            ]} />
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={(e) => {
              e.stopPropagation();
              router.push(`/admin/campaigns/edit/${item.id}`);
            }}
          >
            <MaterialIcons name="edit" size={18} color="#1565C0" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={(e) => e.stopPropagation()}
          >
            <MaterialIcons name="delete-outline" size={20} color="#d32f2f" />
          </TouchableOpacity>
        </View>
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/campaigns/create')}
        >
          <AntDesign name="plus" size={18} color="#fff" />
          <Text style={styles.addButtonText}>নতুন শিবির যোগ করুন</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="শিবির খুঁজুন..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.dateFilterButton}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialIcons name="date-range" size={18} color="#666" />
          <Text style={styles.dateFilterText}>
            {isDateSelected ? filterDate.toLocaleDateString('bn-BD') : "তারিখ ফিল্টার"}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={filterDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Campaign List */}
      {filteredCampaigns.length > 0 ? (
        <FlatList
          data={filteredCampaigns}
          renderItem={renderCampaignItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="medkit-outline" size={50} color="#d32f2f" />
          <Text style={styles.emptyText}>কোন রক্তদান শিবির পাওয়া যায়নি</Text>
        </View>
      )}
    </ScrollView>
  );
}

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
    fontSize: 20,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontFamily: 'HindSiliguri_500Medium',
    marginLeft: 8,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#333',
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateFilterText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#333',
    marginLeft: 8,
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  campaignImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  campaignContent: {
    padding: 15,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  campaignTitle: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  upcomingBadge: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
  },
  campaignDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    marginLeft: 8,
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 15,
  },
  progressText: {
    fontFamily: 'HindSiliguri_500Medium',
    color: '#666',
    fontSize: 12,
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d32f2f',
    borderRadius: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
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