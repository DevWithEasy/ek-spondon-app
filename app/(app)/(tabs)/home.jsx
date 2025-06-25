import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import useAuth from "../../../hooks/useAuth";

export default function Index() {
  const router = useRouter();
  const isLoggedIn = useAuth();

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

  // Bangla data
  const bloodRequests = [
    {
      id: 1,
      bloodType: "এ+",
      location: "ঢাকা মেডিকেল কলেজ",
      time: "২ ঘন্টা আগে",
      urgent: true,
    },
    {
      id: 2,
      bloodType: "বি-",
      location: "অ্যাপোলো হাসপাতাল",
      time: "৫ ঘন্টা আগে",
      urgent: false,
    },
  ];

  const upcomingCampaigns = [
    {
      id: 1,
      title: "সামাজিক রক্তদান কর্মসূচি",
      date: "১৫ জুন ২০২৩",
      location: "সেন্ট্রাল পার্ক",
    },
    {
      id: 2,
      title: "বিশ্ববিদ্যালয় রক্তদান শিবির",
      date: "২০ জুন ২০২৩",
      location: "ঢাবি ক্যাম্পাস",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>স্বাগতম,</Text>
            <Text style={styles.userName}>আব্দুল্লাহ আল মামুন</Text>
            <View style={styles.donorBadge}>
              <Text style={styles.donorBadgeText}>নিয়মিত রক্তদাতা</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={require("../../../assets/images/user.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>দ্রুত অ্যাকশন</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(app)/(tabs)/request")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#FFEBEE" }]}>
                <MaterialIcons name="bloodtype" size={24} color="#d32f2f" />
              </View>
              <Text style={styles.actionText}>রক্তের আবেদন</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/blood_request")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
                <FontAwesome5
                  name="hand-holding-heart"
                  size={20}
                  color="#2E7D32"
                />
              </View>
              <Text style={styles.actionText}>রক্ত দিন</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/campaigns")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
                <Ionicons name="location" size={20} color="#1565C0" />
              </View>
              <Text style={styles.actionText}>ক্যাম্পেইন</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Urgent Blood Requests */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>জরুরী রক্তের প্রয়োজন</Text>
            <TouchableOpacity onPress={() => router.push("/blood_request")}>
              <Text style={styles.seeAll}>সব দেখুন</Text>
            </TouchableOpacity>
          </View>

          {bloodRequests.map((request) => (
            <TouchableOpacity
              key={request.id}
              style={[styles.requestCard, request.urgent && styles.urgentCard]}
              onPress={() => router.push(`/blood_request/${request.id}`)}
            >
              <View style={styles.bloodTypeBadge}>
                <Text style={styles.bloodTypeText}>{request.bloodType}</Text>
              </View>
              <View style={styles.requestDetails}>
                <Text style={styles.requestLocation}>{request.location}</Text>
                <Text style={styles.requestTime}>{request.time}</Text>
              </View>
              {request.urgent && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>জরুরী</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Campaigns */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>আসন্ন রক্তদান কর্মসূচি</Text>
            <TouchableOpacity onPress={() => router.push("/campaigns")}>
              <Text style={styles.seeAll}>সব দেখুন</Text>
            </TouchableOpacity>
          </View>

          {upcomingCampaigns.map((campaign) => (
            <TouchableOpacity
              key={campaign.id}
              style={styles.campaignCard}
              onPress={() => router.push(`/campaigns/${campaign.id}`)}
            >
              <View style={styles.campaignDate}>
                <Text style={styles.campaignDateDay}>
                  {campaign.date.split(" ")[0]}
                </Text>
                <Text style={styles.campaignDateMonth}>
                  {campaign.date.split(" ")[1]}
                </Text>
              </View>
              <View style={styles.campaignDetails}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <View style={styles.campaignLocation}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.campaignLocationText}>
                    {campaign.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Blood Donation Facts */}
        <View style={styles.factsContainer}>
          <Text style={styles.sectionTitle}>আপনি কি জানেন?</Text>
          <View style={styles.factCard}>
            <Text style={styles.factText}>
              এক ব্যাগ রক্ত তিনটি জীবন বাঁচাতে পারে। আপনার অবদান অনেক মূল্যবান!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "#666",
    fontFamily: "HindSiliguri_400Regular",
  },
  userName: {
    fontSize: 22,
    color: "#333",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  donorBadge: {
    backgroundColor: "#d32f2f20",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  donorBadgeText: {
    color: "#d32f2f",
    fontSize: 12,
    fontFamily: "HindSiliguri_500Medium",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#d32f2f",
  },
  quickActionsContainer: {
    marginBottom: 25,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: "30%",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "HindSiliguri_500Medium",
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  seeAll: {
    color: "#d32f2f",
    fontSize: 14,
    fontFamily: "HindSiliguri_500Medium",
  },
  requestCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#d32f2f",
  },
  bloodTypeBadge: {
    backgroundColor: "#FFEBEE",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  bloodTypeText: {
    color: "red",
    fontSize: 18,
    fontFamily: "HindSiliguri_600SemiBold",
  },
  requestDetails: {
    flex: 1,
  },
  requestLocation: {
    fontSize: 15,
    marginBottom: 3,
    fontFamily: "HindSiliguri_500Medium",
  },
  requestTime: {
    fontSize: 13,
    color: "#666",
    fontFamily: "HindSiliguri_400Regular",
  },
  urgentBadge: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  urgentText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "HindSiliguri_600SemiBold",
  },
  campaignCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  campaignDate: {
    backgroundColor: "#F5F5F5",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  campaignDateDay: {
    fontSize: 18,
    color: "red",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  campaignDateMonth: {
    fontSize: 12,
    color: "#666",
    marginTop: -3,
    fontFamily: "HindSiliguri_500Medium",
  },
  campaignDetails: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: "HindSiliguri_500Medium",
  },
  campaignLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  campaignLocationText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
    fontFamily: "HindSiliguri_400Regular",
  },
  factsContainer: {
    marginBottom: 20,
  },
  factCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#d32f2f",
  },
  factText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    fontFamily: "HindSiliguri_400Regular",
  },
});
