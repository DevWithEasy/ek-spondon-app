import { Drawer } from 'expo-router/drawer';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom drawer content component
function CustomDrawerContent(props) {
  const router = useRouter();
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    router.replace("/signin");
  };

  return (
    <View style={styles.mainContainer}>
      {/* Scrollable content */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.drawerHeader}>
          <Text style={styles.headerTitle}>এক স্পন্দন</Text>
          <Text style={styles.headerSubtitle}>স্বেচ্ছায় রক্তদাতাদের একটি সংগঠন</Text>
        </View>
        
        {/* Navigation items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Fixed bottom section with logout button */}
      <View style={styles.bottomSection}>
        <Pressable 
          onPress={handleLogout} 
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutText}>লগ আউট</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'HindSiliguri_600SemiBold',
          color: 'red',
        },
        drawerLabelStyle: {
          fontFamily: 'HindSiliguri_400Regular',
          // fontSize: 16,
        },
        headerTintColor: 'red',
        drawerActiveTintColor: 'red',
        drawerInactiveTintColor: '#333',
        drawerItemStyle: {
          // marginHorizontal: 0,
          // borderRadius: 0,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'এক স্পন্দন',
          headerShown: false,
          drawerLabel: 'হোম',
          drawerIcon: ({ color }) => (
            <FontAwesome name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="admin"
        options={{
          title: 'অ্যাডমিন ড্যাশবোর্ড',
          drawerLabel: 'অ্যাডমিন ড্যাশবোর্ড',
          drawerIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="blood_info"
        options={{
          title: 'রক্ত বিষয়ক তথ্য',
          drawerLabel: 'রক্ত তথ্য (জানা জরুরি)',
          drawerIcon: ({ color }) => (
            <Ionicons name="pulse-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'এক স্পন্দন সম্পর্কে',
          drawerLabel: 'আমাদের সম্পর্কে',
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          title: 'যোগাযোগ',
          drawerLabel: 'যোগাযোগ',
          drawerIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="volunteers"
        options={{
          title: 'ভলান্টিয়ার্স',
          drawerLabel: 'ভলান্টিয়ার্স',
          drawerIcon: ({ color }) => (
            <Ionicons name="people-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacy"
        options={{
          title: 'গোপনীয়তা নীতি',
          drawerLabel: 'গোপনীয়তা নীতি',
          drawerIcon: ({ color }) => (
            <Ionicons name="shield-half-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="terms"
        options={{
          title: 'পরিষেবার শর্তাবলি',
          drawerLabel: 'পরিষেবার শর্তাবলি',
          drawerIcon: ({ color }) => (
            <Ionicons name="reader-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="developer"
        options={{
          title: 'ডেভেলপার',
          drawerLabel: 'ডেভেলপার',
          drawerIcon: ({ color }) => (
            <Ionicons name="terminal-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 22,
    color: 'red',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#555',
  },
  bottomSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutButtonPressed: {
    opacity: 0.8,
  },
  logoutText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    color: 'white',
    fontSize: 14,
  },
});