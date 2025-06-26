import {
  FontAwesome5,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

export default function Requests() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'urgent'
  const [loading, setLoading] = useState(true);

  // Mock request data - replace with API calls
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: "আব্দুল্লাহ আল মামুন",
      bloodGroup: "A+",
      hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
      location: "ঢাকা",
      bagsRequired: 2,
      bagsDonated: 1,
      contact: "01712345678",
      status: "pending",
      urgency: "urgent",
      date: "১৫ জুন ২০২৩",
      caseDetails: "জরুরী অপারেশনের প্রয়োজন"
    },
    {
      id: 2,
      patientName: "সুমাইয়া খাতুন",
      bloodGroup: "B-",
      hospital: "অ্যাপোলো হাসপাতাল",
      location: "ঢাকা",
      bagsRequired: 3,
      bagsDonated: 3,
      contact: "01876543210",
      status: "completed",
      urgency: "normal",
      date: "১০ জুন ২০২৩",
      caseDetails: "ক্যান্সার চিকিৎসার জন্য প্রয়োজন"
    },
    {
      id: 3,
      patientName: "রফিকুল ইসলাম",
      bloodGroup: "O+",
      hospital: "সিএমএইচ",
      location: "ঢাকা",
      bagsRequired: 4,
      bagsDonated: 2,
      contact: "01987654321",
      status: "pending",
      urgency: "normal",
      date: "২০ জুন ২০২৩",
      caseDetails: "হৃদরোগের অপারেশন"
    }
  ]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         request.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'pending' && request.status === 'pending') ||
      (filter === 'completed' && request.status === 'completed') ||
      (filter === 'urgent' && request.urgency === 'urgent');
    return matchesSearch && matchesFilter;
  });

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.requestCard,
        item.urgency === 'urgent' && styles.urgentCard
      ]}
      onPress={() => router.push(`/admin/requests/${item.id}`)}
    >
      <View style={styles.bloodGroupBadge}>
        <Text style={styles.bloodGroupText}>{item.bloodGroup}</Text>
      </View>
      
      <View style={styles.requestDetails}>
        <View style={styles.requestHeader}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'completed' ? styles.completedStatus : styles.pendingStatus
          ]}>
            <Text style={styles.statusText}>
              {item.status === 'completed' ? 'সম্পন্ন' : 'বিচারাধীন'}
            </Text>
          </View>
        </View>
        
        <View style={styles.requestDetail}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.detailText}>{item.hospital}, {item.location}</Text>
        </View>
        
        <View style={styles.requestDetail}>
          <MaterialIcons name="date-range" size={14} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        
        <View style={styles.requestDetail}>
          <FontAwesome5 name="phone-alt" size={12} color="#666" />
          <Text style={styles.detailText}>{item.contact}</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            রক্তের ব্যাগ: {item.bagsDonated}/{item.bagsRequired}
          </Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${(item.bagsDonated / item.bagsRequired) * 100}%` }
            ]} />
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          {item.status === 'pending' && (
            <TouchableOpacity 
              style={styles.approveButton}
              onPress={(e) => {
                e.stopPropagation();
                // Handle approve
              }}
            >
              <MaterialIcons name="check-circle" size={18} color="#2E7D32" />
              <Text style={styles.approveButtonText}>অনুমোদন করুন</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={(e) => e.stopPropagation()}
          >
            <MaterialIcons name="delete-outline" size={18} color="#d32f2f" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={16} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="অনুরোধ খুঁজুন..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>সকল</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.activeFilterText]}>বিচারাধীন</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>সম্পন্ন</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'urgent' && styles.activeFilter]}
          onPress={() => setFilter('urgent')}
        >
          <Text style={[styles.filterText, filter === 'urgent' && styles.activeFilterText]}>জরুরী</Text>
        </TouchableOpacity>
      </View>

      {/* Request List */}
      {filteredRequests.length > 0 ? (
        <FlatList
          data={filteredRequests}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="bloodtype" size={50} color="#d32f2f" />
          <Text style={styles.emptyText}>কোন অনুরোধ পাওয়া যায়নি</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#d32f2f',
  },
  filterText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
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
  bloodGroupBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bloodGroupText: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 18,
    color: '#d32f2f',
  },
  requestDetails: {
    flex: 1,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  patientName: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pendingStatus: {
    backgroundColor: '#E3F2FD',
  },
  completedStatus: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
  },
  requestDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
    color: '#666',
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
    marginTop: 10,
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  approveButtonText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
    color: '#2E7D32',
    marginLeft: 5,
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