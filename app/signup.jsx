import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import districts from "../assets/json/districts.json";
import divisions from "../assets/json/divisions.json";
import upazilas from "../assets/json/upazilas.json";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    email: "",
    password: "",
    confirmPassword: "",
    division: null,
    district: null,
    upazila: null,
  });
  const [errors, setErrors] = useState({});
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setIsDateSelected(true);
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleInputChange = (name, value) => {
    // Reset dependent fields when division or district changes
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "নাম লিখুন";
    if (!isDateSelected) newErrors.date = "জন্ম তারিখ নির্বাচন করুন";
    if (!formData.bloodGroup) newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    
    if (!formData.email.trim()) {
      newErrors.email = "ই-মেইল লিখুন";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "সঠিক ই-মেইল লিখুন";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে";
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }
    
    if (!formData.division) newErrors.division = "বিভাগ নির্বাচন করুন";
    if (!formData.district) newErrors.district = "জেলা নির্বাচন করুন";
    if (!formData.upazila) newErrors.upazila = "উপজেলা নির্বাচন করুন";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
      Alert.alert("সফল!", "আপনার একাউন্ট সফলভাবে তৈরি হয়েছে");
      router.replace("/");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("ত্রুটি", "রেজিস্ট্রেশন ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pickerSelectStyles = {
    inputIOS: {
      ...styles.input,
      paddingRight: 30,
      borderColor: errors.bloodGroup ? "#d32f2f" : "#ddd",
    },
    inputAndroid: {
      ...styles.input,
      paddingRight: 30,
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
        <Text style={styles.subtitle}>
            আপনার এক বিন্দু রক্ত হতে পারে কারো জীবনের জন্য অমূল্য উপহার। সঠিক তথ্য দিয়ে একাউন্ট করে আপনিও হতে পারেন একজন গর্বিত ডোনার এবং আপনি খুঁজে নিন অমুল্য রক্ত ডোনারদের কাছ থেকে। 
          </Text>
        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>পূর্ণ নাম</Text>
            <TextInput
              placeholder="আপনার পূর্ণ নাম লিখুন"
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
            <TouchableOpacity 
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="calendar-today" size={20} color="#d32f2f" />
              <Text style={styles.dateText}>
                {isDateSelected ? date.toLocaleDateString("bn-BD") : "তারিখ নির্বাচন করুন"}
              </Text>
            </TouchableOpacity>
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
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
                label: "রক্তের গ্রুপ নির্বাচন করুন...",
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
                label: "বিভাগ নির্বাচন করুন...",
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
                label: "জেলা নির্বাচন করুন...",
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
                label: "উপজেলা নির্বাচন করুন...",
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

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ইমেইল</Text>
            <TextInput
              placeholder="আপনার ইমেইল ঠিকানা লিখুন"
              placeholderTextColor="#b3b6b7"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, errors.email && styles.inputError]}
              onBlur={() => {
                if (formData.email && !validateEmail(formData.email)) {
                  setErrors({
                    ...errors,
                    email: "সঠিক ই-মেইল লিখুন",
                  });
                }
              }}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>পাসওয়ার্ড</Text>
            <TextInput
              placeholder="পাসওয়ার্ড লিখুন (ন্যূনতম ৮ অক্ষর)"
              placeholderTextColor="#b3b6b7"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
              style={[styles.input, errors.password && styles.inputError]}
              onBlur={() => {
                if (formData.password && !validatePassword(formData.password)) {
                  setErrors({
                    ...errors,
                    password: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে",
                  });
                }
              }}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <TextInput
              placeholder="পাসওয়ার্ড আবার লিখুন"
              placeholderTextColor="#b3b6b7"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange("confirmPassword", text)}
              secureTextEntry
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              onBlur={() => {
                if (
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                ) {
                  setErrors({
                    ...errors,
                    confirmPassword: "পাসওয়ার্ড মিলছে না",
                  });
                }
              }}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSignup}
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>রেজিস্ট্রেশন করুন</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>ইতিমধ্যে একাউন্ট আছে?</Text>
            <TouchableOpacity onPress={() => router.replace("/signin")}>
              <Text style={styles.loginLink}>লগইন করুন</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  tagline: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#666',
    paddingHorizontal : 20
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 15,
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
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dateText: {
    flex: 1,
    fontFamily: 'HindSiliguri_400Regular',
    color: '#333',
    marginLeft: 10,
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
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    marginRight: 5,
  },
  loginLink: {
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#d32f2f',
  },
});