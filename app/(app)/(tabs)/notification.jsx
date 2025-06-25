import { FontAwesome } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Notification() {
  // const router = useRouter();

  // Demo notification data
  const notifications = [
    {
      id: 1,
      title: "জরুরী রক্তের প্রয়োজন!",
      message: "এ+ ব্লাড গ্রুপের প্রয়োজন, ঢাকা মেডিকেল কলেজ হাসপাতালে",
      time: "১০ মিনিট আগে",
      read: false,
      icon: "tint",
      iconColor: "#d32f2f",
    },
    {
      id: 2,
      title: "আপনার রক্তদান অনুমোদিত হয়েছে",
      message: "আপনার আগামীকালের রক্তদানের সময়সূচী নিশ্চিত করা হয়েছে",
      time: "১ ঘন্টা আগে",
      read: true,
      icon: "check-circle",
      iconColor: "#4CAF50",
    },
    {
      id: 3,
      type: "campaign",
      title: "রক্তদান ক্যাম্পেইন স্মরণীয়",
      message: "আগামী শুক্রবার সকাল ৯টা থেকে বিকাল ৪টা পর্যন্ত রক্তদান ক্যাম্প",
      time: "২ দিন আগে",
      read: true,
      icon: "bullhorn",
      iconColor: "#FF9800",
    },
    {
      id: 4,
      title: "ধন্যবাদ! আপনি একটি জীবন বাঁচিয়েছেন",
      message: "আপনার দান করা রক্ত একটি শিশুর জীবন বাঁচিয়েছে",
      time: "১ সপ্তাহ আগে",
      read: true,
      icon: "heart",
      iconColor: "#E91E63",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={[
            styles.notificationCard,
            !notification.read && styles.unreadNotification,
          ]}
        >
          <View style={styles.notificationIcon}>
            <FontAwesome
              name={notification.icon}
              size={24}
              color={notification.iconColor}
            />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>
              {notification.message}
            </Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  notificationCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: "#d32f2f",
  },
  notificationIcon: {
    marginRight: 15,
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    fontFamily: "HindSiliguri_600SemiBold",
  },
  notificationMessage: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
    fontFamily: "HindSiliguri_400Regular",
  },
  notificationTime: {
    fontSize: 12,
    color: "#888",
    fontFamily: "HindSiliguri_400Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  }
});
