import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import districts from "../../../assets/json/districts.json";
import divisions from "../../../assets/json/divisions.json";
import upazilas from "../../../assets/json/upazilas.json";
import { MaterialIcons } from '@expo/vector-icons';

export default function UpdateProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    division: null,
    district: null,
    upazila: null,
  });
  const [errors, setErrors] = useState({});
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  // Filter districts based on selected division
  useEffect(() => {
    if (formData.division) {
      const filtered = districts.filter(
        (district) => district.division_id === formData.division.id
      );
      setFilteredDistricts(filtered);
      setFilteredUpazilas([]);
    } else {
      setFilteredDistricts([]);
      setFilteredUpazilas([]);
    }
  }, [formData.division]);

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
    if (name === "division") {
      setFormData({
        ...formData,
        division: value,
        district: null,
        upazila: null,
      });
    } else if (name === "district") {
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
    if (!formData.name) newErrors.name = "নাম লিখুন";
    if (!formData.bloodGroup) newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    if (!formData.division) newErrors.division = "বিভাগ নির্বাচন করুন";
    if (!formData.district) newErrors.district = "জেলা নির্বাচন করুন";
    if (!formData.upazila) newErrors.upazila = "উপজেলা নির্বাচন করুন";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
      router.replace("/");
    } catch (e) {
      console.error("Error saving profile:", e);
      Alert.alert("Error", "Profile update failed. Please try again.");
    }
  };

  const pickerSelectStyles = {
    inputIOS: {
      ...styles.input,
      paddingRight: 30, // to ensure the text is never behind the icon
      borderColor: errors.bloodGroup ? "#d32f2f" : "#ddd",
    },
    inputAndroid: {
      ...styles.input,
      paddingRight: 30, // to ensure the text is never behind the icon
      borderColor: errors.bloodGroup ? "#d32f2f" : "#ddd",
    },
    placeholder: {
      color: "#b3b6b7",
      fontFamily: "HindSiliguri_400Regular",
    },
    iconContainer: {
      top: 15,
      right: 12,
    },
  };

  const locationPickerStyles = (fieldName) => ({
    ...pickerSelectStyles,
    inputIOS: {
      ...pickerSelectStyles.inputIOS,
      borderColor: errors[fieldName] ? "#d32f2f" : "#ddd",
    },
    inputAndroid: {
      ...pickerSelectStyles.inputAndroid,
      borderColor: errors[fieldName] ? "#d32f2f" : "#ddd",
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../../assets/images/user.png")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>নাম</Text>
            <TextInput
              placeholder="আপনার নাম লিখুন"
              placeholderTextColor="#b3b6b7"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              style={[styles.input, errors.name && styles.inputError]}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>জন্ম তারিখ</Text>
            <Pressable 
              onPress={() => setShow(true)} 
              style={[styles.input, styles.dateInput]}
            >
              <Text style={styles.dateText}>
                {date.toLocaleDateString("bn-BD") === new Date().toLocaleDateString("bn-BD")
                  ? "জন্ম তারিখ নির্বাচন করুন"
                  : date.toLocaleDateString("bn-BD")}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color="#d32f2f" />
            </Pressable>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          {/* Blood Group */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>রক্তের গ্রুপ</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("bloodGroup", value)}
              value={formData.bloodGroup}
              placeholder={{
                label: "রক্তের গ্রুপ নির্বাচন করুন",
                value: null,
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
              Icon={() => (
                <MaterialIcons name="arrow-drop-down" size={24} color="#d32f2f" />
              )}
            />
            {errors.bloodGroup && (
              <Text style={styles.errorText}>{errors.bloodGroup}</Text>
            )}
          </View>

          {/* Location Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ঠিকানা</Text>
            
            {/* Division */}
            <Text style={styles.subLabel}>বিভাগ</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("division", value)}
              value={formData.division}
              placeholder={{
                label: "বিভাগ নির্বাচন করুন",
                value: null,
              }}
              items={divisions.map((division) => ({
                label: division.bn_name,
                value: division,
                key: division.id,
              }))}
              style={locationPickerStyles("division")}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <MaterialIcons name="arrow-drop-down" size={24} color="#d32f2f" />
              )}
            />
            {errors.division && (
              <Text style={styles.errorText}>{errors.division}</Text>
            )}

            {/* District */}
            <Text style={[styles.subLabel, { marginTop: 10 }]}>জেলা</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("district", value)}
              value={formData.district}
              placeholder={{
                label: "জেলা নির্বাচন করুন",
                value: null,
              }}
              items={filteredDistricts.map((district) => ({
                label: district.bn_name,
                value: district,
                key: district.id,
              }))}
              disabled={!formData.division}
              style={locationPickerStyles("district")}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <MaterialIcons name="arrow-drop-down" size={24} color="#d32f2f" />
              )}
            />
            {errors.district && (
              <Text style={styles.errorText}>{errors.district}</Text>
            )}

            {/* Upazila */}
            <Text style={[styles.subLabel, { marginTop: 10 }]}>উপজেলা</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("upazila", value)}
              value={formData.upazila}
              placeholder={{
                label: "উপজেলা নির্বাচন করুন",
                value: null,
              }}
              items={filteredUpazilas.map((upazila) => ({
                label: upazila.bn_name,
                value: upazila,
                key: upazila.id,
              }))}
              disabled={!formData.district}
              style={locationPickerStyles("upazila")}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <MaterialIcons name="arrow-drop-down" size={24} color="#d32f2f" />
              )}
            />
            {errors.upazila && (
              <Text style={styles.errorText}>{errors.upazila}</Text>
            )}
          </View>

          {/* Submit Button */}
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>আপডেট করুন</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  subLabel: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 15,
    color: '#333',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#333',
  },
  errorText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#d32f2f',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#fff',
  },
});