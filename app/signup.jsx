import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
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
  View,
} from "react-native";
import districts from "../assets/json/districts.json";
import divisions from "../assets/json/divisions.json";
import upazilas from "../assets/json/upazilas.json";
import SimpleDateInput from "../src/components/SimpleDateInput";

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
  const [birthDate, setBirthDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "নাম লিখুন";
    if (!formData.bloodGroup)
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";

    if (!formData.email.trim()) {
      newErrors.email = "ই-মেইল লিখুন";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "সঠিক ই-মেইল লিখুন";
    }

    if (!formData.password.trim()) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }

    if (!formData.division) newErrors.division = "বিভাগ নির্বাচন করুন";
    if (!formData.district) newErrors.district = "জেলা নির্বাচন করুন";
    if (!formData.upazila) newErrors.upazila = "উপজেলা নির্বাচন করুন";

    if (!birthDate) {
      newErrors.birthDate = "জন্ম তারিখ প্রয়োজন";
    } else {
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthDate = "ভবিষ্যতের তারিখ দিতে পারবেন না";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.subtitle}>
          আপনার এক বিন্দু রক্ত হতে পারে কারো জীবনের জন্য অমূল্য উপহার। সঠিক তথ্য
          দিয়ে একাউন্ট করে আপনিও হতে পারেন একজন গর্বিত ডোনার এবং আপনি খুঁজে নিন
          অমুল্য রক্ত ডোনারদের কাছ থেকে।
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

          <SimpleDateInput
            title="জন্মতারিখ"
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
            error={errors.birthDate}
          />

          {/* Blood Group */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>রক্তের গ্রুপ</Text>
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
            </View>
            {errors.bloodGroup && (
              <Text style={styles.errorText}>{errors.bloodGroup}</Text>
            )}
          </View>

          {/* Location Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ঠিকানা</Text>

            {/* Division */}
            <Text style={styles.subLabel}>বিভাগ</Text>
            <View style={[styles.pickerContainer, errors.division && styles.inputError]}>
              <Picker
                selectedValue={formData.division ? formData.division.id : ""}
                onValueChange={(value) => {
                  const selected = divisions.find(d => d.id === value);
                  handleInputChange("division", selected);
                }}
                style={styles.picker}
                dropdownIconColor="#d32f2f"
              >
                <Picker.Item label="বিভাগ নির্বাচন করুন" value="" />
                {divisions.map((division) => (
                  <Picker.Item 
                    key={division.id} 
                    label={division.bn_name} 
                    value={division.id} 
                  />
                ))}
              </Picker>
            </View>
            {errors.division && (
              <Text style={styles.errorText}>{errors.division}</Text>
            )}

            {/* District */}
            <Text style={[styles.subLabel, { marginTop: 10 }]}>জেলা</Text>
            <View style={[styles.pickerContainer, errors.district && styles.inputError]}>
              <Picker
                selectedValue={formData.district ? formData.district.id : ""}
                onValueChange={(value) => {
                  const selected = filteredDistricts.find(d => d.id === value);
                  handleInputChange("district", selected);
                }}
                style={styles.picker}
                dropdownIconColor="#d32f2f"
                enabled={!!formData.division}
              >
                <Picker.Item label="জেলা নির্বাচন করুন" value="" />
                {filteredDistricts.map((district) => (
                  <Picker.Item 
                    key={district.id} 
                    label={district.bn_name} 
                    value={district.id} 
                  />
                ))}
              </Picker>
            </View>
            {errors.district && (
              <Text style={styles.errorText}>{errors.district}</Text>
            )}

            {/* Upazila */}
            <Text style={[styles.subLabel, { marginTop: 10 }]}>উপজেলা</Text>
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
            </View>
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
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
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
  subtitle: {
    fontFamily: "HindSiliguri_400Regular",
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 20,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
  },
  subLabel: {
    fontFamily: "HindSiliguri_500Medium",
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontFamily: "HindSiliguri_400Regular",
    fontSize: 15,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "#d32f2f",
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#d32f2f",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  submitButtonText: {
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#fff",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "#666",
    marginRight: 5,
  },
  loginLink: {
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#d32f2f",
  },
});