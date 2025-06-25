import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RequestBlood() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Sample blood request data
  const bloodRequests = [
    {
      id: 1,
      bloodType: "এ+",
      patient: "আহমেদ রহিম (৪৫ বছর)",
      hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
      location: "ঢাকা",
      time: "২ ঘন্টা আগে",
      urgent: true,
      contact: "০১৭১২৩৪৫৬৭৮",
    },
    {
      id: 2,
      bloodType: "বি-",
      patient: "ফারহানা আক্তার (২৮ বছর)",
      hospital: "অ্যাপোলো হাসপাতাল",
      location: "ঢাকা",
      time: "৫ ঘন্টা আগে",
      urgent: false,
      contact: "০১৯৮৭৬৫৪৩২১",
    },
    {
      id: 3,
      bloodType: "ও+",
      patient: "রফিকুল ইসলাম (৩২ বছর)",
      hospital: "স্যার সলিমুল্লাহ মেডিকেল কলেজ",
      location: "ঢাকা",
      time: "১ দিন আগে",
      urgent: true,
      contact: "০১৮১২৩৪৫৬৭৮",
    },
    {
      id: 4,
      bloodType: "এবি+",
      patient: "সুমাইয়া খাতুন (৫ বছর)",
      hospital: "শিশু হাসপাতাল",
      location: "ঢাকা",
      time: "২ দিন আগে",
      urgent: true,
      contact: "০১৫১২৩৪৫৬৭৮",
    },
  ];

  // Filter requests based on search and selection
  const filteredRequests = bloodRequests.filter((request) => {
    const matchesSearch =
      request.hospital.toLowerCase().includes(searchText.toLowerCase()) ||
      request.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "urgent" && request.urgent);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="হাসপাতাল বা এলাকা খুঁজুন"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "all" && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === "all" && styles.activeFilterText,
              ]}
            >
              সব
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "urgent" && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter("urgent")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === "urgent" && styles.activeFilterText,
              ]}
            >
              জরুরী
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Blood Request List */}
      <ScrollView style={styles.requestList}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <TouchableOpacity
              key={request.id}
              style={[styles.requestCard, request.urgent && styles.urgentCard]}
              onPress={()=>router.push(`/blood_request/${request.id}`)}
            >
              <View style={styles.bloodTypeContainer}>
                <Text style={styles.bloodTypeText}>{request.bloodType}</Text>
              </View>

              <View style={styles.requestDetails}>
                <Text style={styles.patientText}>{request.patient}</Text>
                <View style={styles.hospitalContainer}>
                  <MaterialIcons name="local-hospital" size={16} color="#666" />
                  <Text style={styles.hospitalText}>{request.hospital}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="location-on" size={16} color="#666" />
                  <Text style={styles.locationText}>{request.location}</Text>
                </View>
                <View style={styles.contactContainer}>
                  <MaterialIcons name="phone" size={16} color="#666" />
                  <Text style={styles.contactText}>{request.contact}</Text>
                </View>
              </View>

              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{request.time}</Text>
                {request.urgent && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>জরুরী</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>কোন আবেদন পাওয়া যায়নি</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontFamily: "HindSiliguri_400Regular",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  activeFilter: {
    backgroundColor: "#d32f2f",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "HindSiliguri_500Medium",
  },
  activeFilterText: {
    color: "#fff",
  },
  requestList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  requestCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#d32f2f",
  },
  bloodTypeContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  bloodTypeText: {
    fontSize: 18,
    color: "#d32f2f",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  requestDetails: {
    flex: 1,
  },
  patientText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontFamily: "HindSiliguri_600SemiBold",
  },
  hospitalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  hospitalText: {
    color: "#555",
    marginLeft: 5,
    fontFamily: "HindSiliguri_500Medium",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  locationText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
    fontFamily: "HindSiliguri_400Regular",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    fontSize: 14,
    color: "#d32f2f",
    marginLeft: 5,
    fontFamily: "HindSiliguri_400Regular",
  },
  timeContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "HindSiliguri_400Regular",
  },
  urgentBadge: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 5,
  },
  urgentText: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "HindSiliguri_500Medium",
  },
});
