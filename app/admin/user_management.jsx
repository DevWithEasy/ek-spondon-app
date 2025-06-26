import {
  Feather,
  FontAwesome,
  MaterialIcons
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import useAuth from '../../hooks/useAuth';

export default function Users() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data - replace with actual API call
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "আব্দুল্লাহ আল মামুন",
      email: "abdullah@example.com",
      phone: "01712345678",
      role: "Admin",
      status: "active",
      lastActive: "২ ঘন্টা আগে",
      avatar: require("../../assets/images/user.png")
    },
    {
      id: 2,
      name: "সুমাইয়া খাতুন",
      email: "sumaiya@example.com",
      phone: "01876543210",
      role: "Donor",
      status: "active",
      lastActive: "১ দিন আগে",
      avatar: require("../../assets/images/user.png")
    },
    {
      id: 3,
      name: "রফিকুল ইসলাম",
      email: "rafiq@example.com",
      phone: "01987654321",
      role: "Requester",
      status: "inactive",
      lastActive: "১ সপ্তাহ আগে",
      avatar: require("../../assets/images/user.png")
    },
    // Add more users as needed
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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <View style={styles.userMeta}>
            <Text style={[styles.userStatus, 
              item.status === 'active' ? styles.active : styles.inactive]}>
              {item.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
            </Text>
            <Text style={styles.userRole}>{item.role}</Text>
            <Text style={styles.userLastActive}>{item.lastActive}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit" size={18} color="#1565C0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={20} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </View>
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
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#666" style={styles.searchIcon} />
        <TextInput
          placeholder="ব্যবহারকারী খুঁজুন..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="clear" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* User Count */}
      <Text style={styles.userCount}>
        মোট ব্যবহারকারী: {filteredUsers.length} জন
      </Text>

      {/* User List */}
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Feather name="users" size={50} color="#d32f2f" />
          <Text style={styles.emptyText}>কোন ব্যবহারকারী পাওয়া যায়নি</Text>
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
  title: {
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
    marginLeft: 5,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
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
  userCount: {
    fontFamily: 'HindSiliguri_500Medium',
    color: '#666',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  userEmail: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStatus: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  active: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  inactive: {
    backgroundColor: '#FFEBEE',
    color: '#d32f2f',
  },
  userRole: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 12,
    color: '#1565C0',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  userLastActive: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editButton: {
    padding: 8,
    marginRight: 5,
  },
  deleteButton: {
    padding: 8,
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