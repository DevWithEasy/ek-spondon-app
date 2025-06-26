import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "../../hooks/useAuth";

export default function AdminDashboard() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalDonors: 1245,
    pendingRequests: 23,
    completedDonations: 456,
    upcomingCamps: 8,
  });
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      user: "আব্দুল্লাহ আল মামুন",
      action: "নতুন রক্তদাতা নিবন্ধন করেছেন",
      time: "১০ মিনিট আগে",
      icon: <FontAwesome5 name="user-plus" size={16} color="#2E7D32" />,
    },
    {
      id: 2,
      user: "ডাঃ সুমাইয়া খান",
      action: "একটি রক্তের অনুরোধ অনুমোদন করেছেন",
      time: "৩০ মিনিট আগে",
      icon: <MaterialIcons name="bloodtype" size={16} color="#d32f2f" />,
    },
    {
      id: 3,
      user: "রক্তদান শিবির",
      action: "নতুন রক্তদান ক্যাম্প যোগ করেছেন",
      time: "২ ঘন্টা আগে",
      icon: <Ionicons name="medkit" size={16} color="#1565C0" />,
    },
    {
      id: 4,
      user: "সিস্টেম অ্যাডমিন",
      action: "সিস্টেম আপডেট সম্পন্ন করেছেন",
      time: "১ দিন আগে",
      icon: <AntDesign name="sync" size={16} color="#FF8F00" />,
    },
  ]);

  const adminFeatures = [
    {
      id: 1,
      title: "রক্তের অনুরোধ ব্যবস্থাপনা",
      icon: <MaterialIcons name="bloodtype" size={24} color="#d32f2f" />,
      screen: "/admin/blood_requests",
    },
    {
      id: 2,
      title: "ব্যবহারকারী ব্যবস্থাপনা",
      icon: <FontAwesome5 name="users-cog" size={22} color="#2E7D32" />,
      screen: "/admin/user_management",
    },
    {
      id: 3,
      title: "রক্তদান শিবির ব্যবস্থাপনা",
      icon: <Ionicons name="medkit" size={24} color="#1565C0" />,
      screen: "/admin/camp_management",
    },
    {
      id: 4,
      title: "রিপোর্ট ও বিশ্লেষণ",
      icon: <Feather name="bar-chart-2" size={24} color="#7B1FA2" />,
      screen: "/admin/reports",
    },
    {
      id: 5,
      title: "সিস্টেম সেটিংস",
      icon: <Ionicons name="settings" size={24} color="#FF8F00" />,
      screen: "/admin/settings",
    },
    {
      id: 6,
      title: "জরুরী ঘোষণা",
      icon: <Ionicons name="megaphone" size={24} color="#d32f2f" />,
      screen: "/admin/announcements",
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/signin");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
      </View>
    );
  }

  const renderStatCard = (icon, value, label) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>{item.icon}</View>
      <View style={styles.activityText}>
        <Text style={styles.activityUser}>{item.user}</Text>
        <Text style={styles.activityAction}>{item.action}</Text>
      </View>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Stats Overview */}
      <Text style={styles.sectionTitle}>সারসংক্ষেপ</Text>
      <View style={styles.statsContainer}>
        {renderStatCard(
          <FontAwesome5 name="users" size={20} color="#d32f2f" />,
          stats.totalDonors,
          "মোট রক্তদাতা"
        )}
        {renderStatCard(
          <MaterialIcons name="pending-actions" size={24} color="#FF8F00" />,
          stats.pendingRequests,
          "বিচারাধীন অনুরোধ"
        )}
        {renderStatCard(
          <MaterialIcons name="done-all" size={24} color="#2E7D32" />,
          stats.completedDonations,
          "সম্পন্ন রক্তদান"
        )}
        {renderStatCard(
          <Ionicons name="medkit-outline" size={22} color="#1565C0" />,
          stats.upcomingCamps,
          "আসন্ন শিবির"
        )}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>দ্রুত অ্যাকশন</Text>

      <View style={styles.featuresContainer}>
        {adminFeatures.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.featureCardWrapper,
              index % 2 === 0 ? styles.leftCard : styles.rightCard,
            ]}
          >
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push(item.screen)}
            >
              <View style={styles.featureIcon}>{item.icon}</View>
              <Text style={styles.featureText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Recent Activities */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>সাম্প্রতিক কার্যক্রম</Text>
        <TouchableOpacity onPress={() => router.push("/admin/activities")}>
          <Text style={styles.seeAll}>সব দেখুন</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentActivities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.activitiesContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#333",
  },
  adminName: {
    fontSize: 16,
    fontFamily: "HindSiliguri_500Medium",
    color: "#666",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#d32f2f",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#333",
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  seeAll: {
    fontFamily: "HindSiliguri_500Medium",
    color: "#d32f2f",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48.5%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    backgroundColor: "#f5f5f5",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontFamily: "HindSiliguri_700Bold",
    color: "#333",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: "HindSiliguri_400Regular",
    color: "#666",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -5,
  },
  featureCardWrapper: {
    width: "50%",
    padding: 5,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 120,
    justifyContent: "center",
  },
  featureIcon: {
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    fontFamily: "HindSiliguri_500Medium",
    color: "#333",
    textAlign: "center",
  },
  activitiesContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityIcon: {
    marginRight: 15,
  },
  activityText: {
    flex: 1,
  },
  activityUser: {
    fontSize: 14,
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#333",
    marginBottom: 3,
  },
  activityAction: {
    fontSize: 13,
    fontFamily: "HindSiliguri_400Regular",
    color: "#666",
  },
  activityTime: {
    fontSize: 12,
    fontFamily: "HindSiliguri_400Regular",
    color: "#999",
  },
});
