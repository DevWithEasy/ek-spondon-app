import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import districts from "../../assets/json/districts.json";
import upazilas from "../../assets/json/upazilas.json";

export default function SearchModal({ visible, onClose, setDonars }) {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: null,
    upazila: null,
  });

  const [errors, setErrors] = useState({});
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Filter upazilas based on selected district
  useEffect(() => {
    if (formData.district) {
      const filtered = upazilas.filter(
        (upazila) => upazila.district_id === formData.district.id
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [formData.district]);

  const handleInputChange = (name, value) => {
    if (name === "district") {
      setFormData({
        ...formData,
        district: value,
        upazila: null,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bloodGroup)
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    if (!formData.district) newErrors.district = "জেলা নির্বাচন করুন";
    if (!formData.upazila) newErrors.upazila = "উপজেলা নির্বাচন করুন";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      // do something (API call or navigation)
      onClose();
      setDonars([
        {
          donorId: "DNR001",
          name: "আলমগীর হোসেন",
          bloodGroup: "A+",
          dateOfBirth: "1990-05-15",
          gender: "Male",
          lastDonate: "2023-06-20",
          email: "almgir.hossen@example.com",
          phone: "+8801712345678",
          upazila: "মিরপুর",
          district: "ঢাকা",
          division: "ঢাকা",
          availability: true,
          address: "১২৩ মিরপুর রোড, ঢাকা",
        },
        {
          donorId: "DNR002",
          name: "সুমাইয়া আক্তার",
          bloodGroup: "B+",
          dateOfBirth: "1995-08-22",
          gender: "Female",
          lastDonate: "2023-07-15",
          email: "sumaiya.akter@example.com",
          phone: "+8801812345679",
          upazila: "মতিঝিল",
          district: "ঢাকা",
          division: "ঢাকা",
          availability: true,
          address: "৪৫৬ মতিঝিল বাণিজ্যিক এলাকা",
        },
        {
          donorId: "DNR003",
          name: "রফিকুল ইসলাম",
          bloodGroup: "O+",
          dateOfBirth: "1988-11-10",
          gender: "Male",
          lastDonate: "2023-05-30",
          email: "rafiq.islam@example.com",
          phone: "+8801912345680",
          upazila: "চট্টগ্রাম সদর",
          district: "চট্টগ্রাম",
          division: "চট্টগ্রাম",
          availability: false,
          address: "৭৮৯ আগ্রাবাদ, চট্টগ্রাম",
        },
      ]);
    } catch (e) {
      console.error("Error during login:", e);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const pickerSelectStyles = {
    inputIOS: {
      fontFamily: "HindSiliguri_400Regular",
      height: 52,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      color: "black",
      backgroundColor: "#fff",
      borderRadius: 8,
    },
    inputAndroid: {
      fontFamily: "HindSiliguri_400Regular",
      height: 52,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      color: "black",
      backgroundColor: "#fff",
      borderRadius: 8,
    },
    placeholder: {
      color: "#b3b6b7",
    },
    iconContainer: {
      top: 15,
      right: 12,
    },
  };

  const locationPickerStyles = (fieldName) => ({
    inputIOS: {
      ...pickerSelectStyles.inputIOS,
      borderColor: errors[fieldName] ? "red" : "#ddd",
    },
    inputAndroid: {
      ...pickerSelectStyles.inputAndroid,
      borderColor: errors[fieldName] ? "red" : "#ddd",
    },
    placeholder: {
      color: "#b3b6b7",
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>রক্তদাতা খুঁজুন</Text>

          <View style={styles.modalContent}>
            {/* Blood Group Picker */}
            <View style={{ width: "100%", marginBottom: 10 }}>
              <RNPickerSelect
                onValueChange={(value) =>
                  handleInputChange("bloodGroup", value)
                }
                value={formData.bloodGroup}
                placeholder={{
                  label: "রক্তের গ্রুপ নির্বাচন করুন",
                  value: null,
                  color: "#b3b6b7",
                }}
                items={[
                  { label: "A+", value: "A+" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B-", value: "B-" },
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Text style={{ color: "#ddd" }}>▼</Text>}
              />
              {errors.bloodGroup && (
                <Text style={styles.errorText}>{errors.bloodGroup}</Text>
              )}
            </View>

            {/* District Picker */}
            <View style={{ width: "100%", marginBottom: 10 }}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("district", value)}
                value={formData.district}
                placeholder={{
                  label: "জেলা নির্বাচন করুন",
                  value: null,
                  color: "#b3b6b7",
                }}
                items={districts.map((district) => ({
                  label: district.bn_name,
                  value: district,
                  key: district.id,
                }))}
                style={locationPickerStyles("district")}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Text style={{ color: "#ddd" }}>▼</Text>}
              />
              {errors.district && (
                <Text style={styles.errorText}>{errors.district}</Text>
              )}
            </View>

            {/* Upazila Picker */}
            <View style={{ width: "100%", marginBottom: 10 }}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("upazila", value)}
                value={formData.upazila}
                placeholder={{
                  label: "উপজেলা নির্বাচন করুন",
                  value: null,
                  color: "#b3b6b7",
                }}
                items={filteredUpazilas.map((upazila) => ({
                  label: upazila.bn_name,
                  value: upazila,
                  key: upazila.id,
                }))}
                disabled={!formData.district}
                style={locationPickerStyles("upazila")}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Text style={{ color: "#ddd" }}>▼</Text>}
              />
              {errors.upazila && (
                <Text style={styles.errorText}>{errors.upazila}</Text>
              )}
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>বন্ধ করুন</Text>
              </Pressable>
              <Pressable
                onPress={handleLogin}
                style={{
                  width: "49%",
                  height: 50,
                  backgroundColor: "#007AFF",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HindSiliguri_400Regular",
                    color: "white",
                  }}
                >
                  অনুসন্ধান করুন
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "HindSiliguri_700Bold",
  },
  modalContent: {
    marginBottom: 20,
  },
  closeButton: {
    width: "49%",
    height: 50,
    backgroundColor: "#a2a3a3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  closeButtonText: {
    color: "#fff",
    fontFamily: "HindSiliguri_400Regular",
  },
});
