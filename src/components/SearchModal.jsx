import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import districts from "../../assets/json/districts.json";
import upazilas from "../../assets/json/upazilas.json";
import { Picker } from '@react-native-picker/picker';

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

  const handleSearch = async () => {
    if (!validateForm()) return;
    try {
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
      console.error("Error during search:", e);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      hardwareAccelerated={true}
      statusBarTranslucent={true}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>রক্তদাতা খুঁজুন</Text>

          <View style={styles.modalContent}>
            {/* Blood Group Picker */}
            <View style={[styles.pickerContainer, errors.bloodGroup && styles.inputError]}>
              <Picker
                selectedValue={formData.bloodGroup}
                onValueChange={(value) => handleInputChange("bloodGroup", value)}
                style={styles.picker}
                dropdownIconColor="#d32f2f"
              >
                <Picker.Item label="রক্তের গ্রুপ নির্বাচন করুন" value="" />
                {bloodGroups.map((group) => (
                  <Picker.Item 
                    key={group.value} 
                    label={group.label} 
                    value={group.value} 
                  />
                ))}
              </Picker>
              {errors.bloodGroup && (
                <Text style={styles.errorText}>{errors.bloodGroup}</Text>
              )}
            </View>

            {/* District Picker */}
            <View style={[styles.pickerContainer, errors.district && styles.inputError]}>
              <Picker
                selectedValue={formData.district ? formData.district.id : ""}
                onValueChange={(value) => {
                  const selected = districts.find(d => d.id === value);
                  handleInputChange("district", selected);
                }}
                style={styles.picker}
                dropdownIconColor="#d32f2f"
              >
                <Picker.Item label="জেলা নির্বাচন করুন" value="" />
                {districts.map((district) => (
                  <Picker.Item 
                    key={district.id} 
                    label={district.bn_name} 
                    value={district.id} 
                  />
                ))}
              </Picker>
              {errors.district && (
                <Text style={styles.errorText}>{errors.district}</Text>
              )}
            </View>

            {/* Upazila Picker */}
            <View style={[styles.pickerContainer, errors.upazila && styles.inputError]}>
              <Picker
                selectedValue={formData.upazila ? formData.upazila.id : ""}
                onValueChange={(value) => {
                  const selected = filteredUpazilas.find(u => u.id === value);
                  handleInputChange("upazila", selected);
                }}
                style={styles.picker}
                dropdownIconColor="#d32f2f"
                enabled={!!formData.district}
              >
                <Picker.Item label="উপজেলা নির্বাচন করুন" value="" />
                {filteredUpazilas.map((upazila) => (
                  <Picker.Item 
                    key={upazila.id} 
                    label={upazila.bn_name} 
                    value={upazila.id} 
                  />
                ))}
              </Picker>
              {errors.upazila && (
                <Text style={styles.errorText}>{errors.upazila}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>বন্ধ করুন</Text>
              </Pressable>
              <Pressable
                onPress={handleSearch}
                style={styles.searchButton}
              >
                <Text style={styles.searchButtonText}>অনুসন্ধান করুন</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  closeButton: {
    width: "49%",
    height: 50,
    backgroundColor: "#a2a3a3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  closeButtonText: {
    color: "#fff",
    fontFamily: "HindSiliguri_400Regular",
  },
  searchButton: {
    width: "49%",
    height: 50,
    backgroundColor: "#d32f2f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchButtonText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "HindSiliguri_400Regular",
  },
});