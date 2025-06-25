import { Ionicons,FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dateCompare from "../../../src/utils/checkDonationAble";

export default function Profile() {
  const router = useRouter();

  // Demo user data
  const user = {
    name: 'আব্দুল্লাহ আল মামুন',
    bloodGroup: 'এ+',
    phone: '০১৭১২৩৪৫৬৭৮',
    phoneEng: '01712345678',
    email: 'rafiq@gmail.com',
    location: 'মিরপুর, ঢাকা',
    locationEng: 'Mirpur, Dhaka',
    lastDonation: '23/05/2025',
    memberSince: '25/5/2024',
    dob : '11/04/1996'
  };

  const menuItems = [
    {
      id: 1,
      title: 'প্রোফাইল সম্পাদনা',
      titleEng: 'Edit Profile',
      FontAwesome: 'person-circle-outline',
      screen: 'profile/1/update'
    },
    {
      id: 2,
      title: 'সর্বশেষ দান আপডেট',
      titleEng: 'Last Donation Update',
      FontAwesome: 'heart-half-outline',
      screen: 'profile/1/last_donate'
    },
    {
      id: 3,
      title: 'পাসওয়ার্ড পরিবর্তন',
      titleEng: 'Password Change',
      FontAwesome: 'finger-print-outline',
      screen: 'profile/1/password_change'
    },
    {
      id: 4,
      title: 'সাহায্য ও সমর্থন',
      titleEng: 'Help & Support',
      FontAwesome: 'help-circle-outline',
      screen: 'profile/1/helps'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../../../assets/images/user.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          
          <View style={styles.bloodGroupBadge}>
            <FontAwesome name="tint" size={18} color="#d32f2f" />
            <Text style={styles.bloodGroupText}>{user.bloodGroup}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{fontFamily : 'HindSiliguri_400Regular'}}>রক্তদানে সামর্থ্যঃ </Text>
            {
              dateCompare(user.lastDonation).able ? <Ionicons name="checkmark-circle" size={18} color="green" /> : <Ionicons name="close-circle" size={18} color="red" />
            }
          </View>
        </View>
      </View>

      {/* User Details */}
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <FontAwesome name="phone" size={18} color="#555" />
          <Text style={styles.detailText}>{user.phone}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <FontAwesome name="envelope" size={16} color="#555" />
          <Text style={styles.detailText}>{user.email}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <FontAwesome name="map-marker" size={18} color="#555" />
          <Text style={styles.detailText}>{user.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <FontAwesome name="tint" size={18} color="#555" />
          <Text style={styles.detailText}>সর্বশেষ দান করেছেনঃ {user.lastDonation} (২১ বছর)</Text>
        </View>

        <View style={styles.detailRow}>
          <FontAwesome name="calendar" size={16} color="#555" />
          <Text style={styles.detailText}>জন্মতারিখঃ {new Date(user.dob).toLocaleDateString('')} (২১ বছর)</Text>
        </View>

        <View style={styles.detailRow}>
          <FontAwesome name="calendar" size={16} color="#555" />
          <Text style={styles.detailText}>সদস্য হয়েছেনঃ {user.memberSince} (২ বছর আগে)</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => router.push(item.screen)}
          >
            <Ionicons name={item.FontAwesome} size={20} color="#555" />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>{item.title}</Text>
              <Text style={styles.menuTextEng}>{item.titleEng}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  profileInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'HindSiliguri_700Bold',
  },
  bloodGroupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeeee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  bloodGroupText: {
    fontSize: 16,
    color: '#d32f2f',
    marginLeft: 5,
    fontFamily : 'HindSiliguri_600SemiBold'
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    fontFamily : 'HindSiliguri_400Regular'
  },
  detailTextEng: {
    fontSize: 13,
    color: '#777',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    fontFamily : 'HindSiliguri_400Regular'
  },
  menuTextEng: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
});