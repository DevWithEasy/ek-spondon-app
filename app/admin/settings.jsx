import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { 
  MaterialIcons, 
  FontAwesome5, 
  Ionicons, 
  Feather 
} from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function AdminSettings() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricAuthEnabled, setBiometricAuthEnabled] = useState(false);

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  const settingsOptions = [
    {
      title: "প্রোফাইল সেটিংস",
      icon: <Ionicons name="person" size={22} color="#555" />,
      action: () => router.push('/admin/profile-settings')
    },
    {
      title: "ব্লাড ব্যাংক ম্যানেজমেন্ট",
      icon: <FontAwesome5 name="hospital" size={20} color="#555" />,
      action: () => router.push('/admin/blood-banks')
    },
    {
      title: "ব্যবহারকারী ম্যানেজমেন্ট",
      icon: <Feather name="users" size={22} color="#555" />,
      action: () => router.push('/admin/user-management')
    },
    {
      title: "এনালাইটিক্স ও রিপোর্ট",
      icon: <MaterialIcons name="analytics" size={22} color="#555" />,
      action: () => router.push('/admin/analytics')
    },
    {
      title: "নোটিফিকেশন সেটিংস",
      icon: <Ionicons name="notifications" size={22} color="#555" />,
      action: null,
      toggle: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#d32f2f" }}
          thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
        />
      )
    },
    {
      title: "ডার্ক মোড",
      icon: <MaterialIcons name="dark-mode" size={22} color="#555" />,
      action: null,
      toggle: (
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: "#767577", true: "#d32f2f" }}
          thumbColor={darkModeEnabled ? "#fff" : "#f4f3f4"}
        />
      )
    },
    {
      title: "বায়োমেট্রিক লগইন",
      icon: <MaterialIcons name="fingerprint" size={22} color="#555" />,
      action: null,
      toggle: (
        <Switch
          value={biometricAuthEnabled}
          onValueChange={setBiometricAuthEnabled}
          trackColor={{ false: "#767577", true: "#d32f2f" }}
          thumbColor={biometricAuthEnabled ? "#fff" : "#f4f3f4"}
        />
      )
    },
    {
      title: "অ্যাপ সম্পর্কে",
      icon: <MaterialIcons name="info" size={22} color="#555" />,
      action: () => router.push('/about')
    },
    {
      title: "সাহায্য ও সহায়তা",
      icon: <MaterialIcons name="help" size={22} color="#555" />,
      action: () => router.push('/help')
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      "লগআউট",
      "আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?",
      [
        {
          text: "বাতিল",
          style: "cancel"
        },
        { 
          text: "লগআউট", 
          onPress: () => {
            // Implement your logout logic here
            router.replace('/signin');
          } 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <MaterialIcons name="admin-panel-settings" size={40} color="#fff" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>অ্যাডমিন প্যানেল</Text>
          <Text style={styles.role}>সুপার অ্যাডমিন</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.settingItem}
            onPress={item.action || (() => {})}
          >
            <View style={styles.settingIcon}>
              {item.icon}
            </View>
            <Text style={styles.settingText}>{item.title}</Text>
            <View style={styles.settingAction}>
              {item.toggle || <MaterialIcons name="chevron-right" size={24} color="#999" />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>লগআউট করুন</Text>
        <MaterialIcons name="logout" size={20} color="#d32f2f" />
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>ভার্সন ১.০.০</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
  },
  settingsSection: {
    marginTop: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'HindSiliguri_500Medium',
    color: '#333',
  },
  settingAction: {
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#d32f2f',
    marginRight: 10,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#999',
  },
});