import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchModal from "../../../src/components/SearchModal";

export default function Search() {
  const [donars, setDonars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <SearchModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            setDonars={setDonars}
          />

          {donars.length === 0 ? (
            <View style={{ marginTop: 60, alignItems: "center" }}>
              <Ionicons name="search-circle-outline" size={60} color="#bbb" />
              <Text
                style={{
                  marginTop: 15,
                  textAlign: "center",
                  fontFamily: "HindSiliguri_400Regular",
                  color: "#666",
                }}
              >
                রক্তদাতা খুঁজতে নিচের 🔍 বাটনে চাপ দিন।
              </Text>
            </View>
          ) : (
            <View style={{ width: "100%", marginTop: 10 }}>
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: "HindSiliguri_400Regular",
                }}
              >
                পাওয়া গেছে {donars.length} জন ডোনার
              </Text>
              {donars.map((donor) => (
                <View key={donor.donorId} style={styles.card}>
                  <Text style={styles.cardName}>{donor.name}</Text>
                  <Text style={styles.cardText}>
                    রক্তের গ্রুপ: {donor.bloodGroup}
                  </Text>
                  <Text style={styles.cardText}>ঠিকানা: {donor.address}</Text>
                  <Text style={styles.cardText}>ফোন: {donor.phone}</Text>
                  <Text
                    style={[
                      styles.cardAvailability,
                      { color: donor.availability ? "#4CAF50" : "#f44336" },
                    ]}
                  >
                    {donor.availability ? "উপলব্ধ" : "ব্যস্ত"}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Floating Action Button */}
        <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
          <Ionicons name="search-outline" size={20} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
  },
  cardName: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "HindSiliguri_600SemiBold",
  },
  cardText: {
    marginBottom: 3,
    fontFamily: "HindSiliguri_400Regular",
  },
  cardAvailability: {
    marginTop: 8,
    fontWeight: "bold",
    fontFamily: "HindSiliguri_500Medium",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
