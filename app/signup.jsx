import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import icon from "../assets/images/icon.png";
import districts from "../assets/json/districts.json";
import divisions from "../assets/json/divisions.json";
import upazilas from "../assets/json/upazilas.json";
import DateTimePicker from "@react-native-community/datetimepicker";

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

    // Real-time validation
    if (name === "email" && value) {
      setErrors({
        ...errors,
        email: validateEmail(value) ? null : "সঠিক ই-মেইল লিখুন",
      });
    } else if (name === "password" && value) {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? null
          : "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে",
      });
    } else if (name === "confirmPassword" && value) {
      setErrors({
        ...errors,
        confirmPassword:
          value === formData.password ? null : "পাসওয়ার্ড মিলছে না",
      });
    } else {
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "নাম লিখুন";
    if (!formData.bloodGroup)
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    if (!formData.email) {
      newErrors.email = "ই-মেইল লিখুন";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "সঠিক ই-মেইল লিখুন";
    }
    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে";
    }
    if (!formData.confirmPassword) {
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

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
      router.replace("/");
    } catch (e) {
      console.error("Error saving login:", e);
      Alert.alert("Error", "Signup failed. Please try again.");
    }
  };

  // Custom styling for picker select with white background
  const pickerSelectStyles = {
    inputIOS: {
      fontFamily: "HindSiliguri_400Regular",
      height: 52,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: errors.bloodGroup ? "red" : "#ddd",
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
      borderColor: errors.bloodGroup ? "red" : "#ddd",
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 40,
          backgroundColor: "#f8f8f8",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Image
            source={icon}
            style={{ height: 70, width: 70, marginBottom: 5, borderRadius: 50 }}
          />

          <Text
            style={{
              fontFamily: "HindSiliguri_400Regular",
              marginBottom: 10,
              color: "red",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            স্বেচ্ছায় রক্তদাতাদের একটি সংগঠন
          </Text>

          <Text
            style={{
              fontFamily: "HindSiliguri_400Regular",
              marginBottom: 20,
              fontSize: 12,
              color: "#555",
            }}
          >
            আপনার এক বিন্দু রক্ত হতে পারে কারো জীবনের জন্য অমূল্য উপহার। আমাদের
            সাথে যুক্ত হয়ে এই মহৎ কাজে অংশগ্রহণ করুন।
          </Text>

          <TextInput
            placeholder="নাম লিখুন"
            placeholderTextColor="#b3b6b7"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            style={[styles.input, errors.name && { borderColor: "red" }]}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <Pressable onPress={() => setShow(true)} style={[styles.input]}>
            <Text
              style={{
                fontFamily: "HindSiliguri_400Regular",
                color: "#b3b6b7",
              }}
            >
              {date.toLocaleDateString("bn-BD") ===
              new Date().toLocaleDateString("bn-BD")
                ? "জন্ম তারিখ নির্বাচন করুন"
                : date.toLocaleDateString("bn-BD")}
            </Text>
          </Pressable>

          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <View style={{ width: "100%", marginBottom: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("bloodGroup", value)}
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
              Icon={() => (
                <View style={{}}>
                  <Text style={{ color: "#ddd" }}>▼</Text>
                </View>
              )}
            />
            {errors.bloodGroup && (
              <Text style={styles.errorText}>{errors.bloodGroup}</Text>
            )}
          </View>

                    {/* Division Picker */}
          <View style={{ width: "100%", marginBottom: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("division", value)}
              value={formData.division}
              placeholder={{
                label: "বিভাগ নির্বাচন করুন",
                value: null,
                color: "#b3b6b7",
              }}
              items={divisions.map((division) => ({
                label: division.bn_name,
                value: division,
                key: division.id,
              }))}
              style={locationPickerStyles("division")}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
                  <Text style={{ color: "#ddd" }}>▼</Text>
                </View>
              )}
            />
            {errors.division && (
              <Text style={styles.errorText}>{errors.division}</Text>
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
              items={filteredDistricts.map((district) => ({
                label: district.bn_name,
                value: district,
                key: district.id,
              }))}
              disabled={!formData.division}
              style={locationPickerStyles("district")}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
                  <Text style={{ color: "#ddd" }}>▼</Text>
                </View>
              )}
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
              Icon={() => (
                <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
                  <Text style={{ color: "#ddd" }}>▼</Text>
                </View>
              )}
            />
            {errors.upazila && (
              <Text style={styles.errorText}>{errors.upazila}</Text>
            )}
          </View>

          <TextInput
            placeholder="ই-মেইল লিখুন"
            placeholderTextColor="#b3b6b7"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, errors.email && { borderColor: "red" }]}
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

          <TextInput
            placeholder="পাসওয়ার্ড দিন"
            placeholderTextColor="#b3b6b7"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry
            style={[styles.input, errors.password && { borderColor: "red" }]}
            onBlur={() => {
              if (formData.password && !validatePassword(formData.password)) {
                setErrors({
                  ...errors,
                  password:
                    "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে",
                });
              }
            }}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            placeholder="পুনরায় পাসওয়ার্ড দিন"
            placeholderTextColor="#b3b6b7"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            secureTextEntry
            style={[
              styles.input,
              errors.confirmPassword && { borderColor: "red" },
            ]}
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

          <Pressable
            onPress={handleLogin}
            style={{
              width: "100%",
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
              style={{ fontFamily: "HindSiliguri_400Regular", color: "white" }}
            >
              সাবমিট করুন
            </Text>
          </Pressable>

          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontFamily: "HindSiliguri_400Regular", color: "black" }}
            >
              আপনার একাউন্ট আছে?{" "}
            </Text>

            <Pressable onPress={() => router.replace("/signin")}>
              <Text
                style={{ fontFamily: "HindSiliguri_400Regular", color: "blue" }}
              >
                লগ-ইন করুন
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontFamily: "HindSiliguri_400Regular",
    marginBottom: 10,
  },
  errorText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
});
