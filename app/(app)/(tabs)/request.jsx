import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
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
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    problem: "",
    bloodGroup: "",
    hemoglobin: "",
    request_bag: "",
    date: new Date(),
    location: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [isDateSelect, setIsDateSelect] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (currentDate < today) {
      Alert.alert(
        "ব্যর্থ হয়েছে",
        "অনুগ্রহ করে আজকের বা আজকের পরের তারিখ নির্বাচন করুন।"
      );
      setShow(false);
      return;
    }

    setShow(false);
    setFormData({ ...formData, date: currentDate });
    setIsDateSelect(true);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "নাম লিখুন";
    if (!formData.problem) newErrors.problem = "সমস্যার বর্ণনা লিখুন";
    if (!formData.bloodGroup)
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    if (!formData.hemoglobin)
      newErrors.hemoglobin = "হিমোগ্লোবিনের পরিমাণ লিখুন";
    if (!formData.request_bag) newErrors.request_bag = "ব্যাগ সংখ্যা লিখুন";
    if (!formData.date) newErrors.date = "তারিখ নির্বাচন করুন";
    if (!formData.location) newErrors.location = "অবস্থান লিখুন";
    if (!formData.phone) newErrors.phone = "ফোন নম্বর লিখুন";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      Alert.alert(
        "সফল",
        "আপনার রক্তদানের অনুরোধ সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
      );
      setFormData({
        name: "",
        problem: "",
        bloodGroup: "",
        hemoglobin: "",
        request_bag: "",
        date: new Date(),
        location: "",
        phone: "",
      });
    } catch (e) {
      console.error("Error saving login:", e);
      Alert.alert("Error", "Signup failed. Please try again.");
    }
  };

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{ fontFamily: "HindSiliguri_400Regular", marginBottom: 10 }}
        >
          নিচের ফর্মটি পূরণ করে রক্তদানের অনুরোধ করুন। আপনার তথ্য সঠিকভাবে
          প্রদান করুন যাতে আমরা দ্রুত আপনার সাহায্য করতে পারি।
        </Text>
        <View style={{ flex: 1 }}>
          {/* Name */}
          <TextInput
            placeholder="নাম লিখুন"
            placeholderTextColor="#b3b6b7"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            style={[styles.input, errors.name && { borderColor: "red" }]}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          {/* Problem */}
          <TextInput
            placeholder="সমস্যার বর্ণনা"
            placeholderTextColor="#b3b6b7"
            value={formData.problem}
            onChangeText={(text) => handleInputChange("problem", text)}
            style={[styles.input, errors.problem && { borderColor: "red" }]}
          />
          {errors.problem && (
            <Text style={styles.errorText}>{errors.problem}</Text>
          )}

          {/* Hemoglobin */}
          <TextInput
            placeholder="হিমোগ্লোবিন (g/dL)"
            placeholderTextColor="#b3b6b7"
            keyboardType="numeric"
            value={formData.hemoglobin}
            onChangeText={(text) => handleInputChange("hemoglobin", text)}
            style={[styles.input, errors.hemoglobin && { borderColor: "red" }]}
          />
          {errors.hemoglobin && (
            <Text style={styles.errorText}>{errors.hemoglobin}</Text>
          )}

          {/* Request Bag */}
          <TextInput
            placeholder="রক্তের ব্যাগ সংখ্যা"
            placeholderTextColor="#b3b6b7"
            keyboardType="numeric"
            value={formData.request_bag}
            onChangeText={(text) => handleInputChange("request_bag", text)}
            style={[styles.input, errors.request_bag && { borderColor: "red" }]}
          />
          {errors.request_bag && (
            <Text style={styles.errorText}>{errors.request_bag}</Text>
          )}

          {/* Date */}
          <Pressable onPress={() => setShow(true)} style={[styles.input]}>
            <Text
              style={{
                fontFamily: "HindSiliguri_400Regular",
                color: isDateSelect ? "#333" : "#b3b6b7",
              }}
            >
              {isDateSelect
                ? `${formData.date.toLocaleDateString("bn-BD")}`
                : "রক্তদানের তারিখ নির্বাচন করুন"}
            </Text>
          </Pressable>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          {show && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          {/* Blood Group Picker */}
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
              Icon={() => <Text style={{ color: "#ddd" }}>▼</Text>}
            />
            {errors.bloodGroup && (
              <Text style={styles.errorText}>{errors.bloodGroup}</Text>
            )}
          </View>

          {/* Location */}
          <TextInput
            placeholder="অবস্থান লিখুন"
            placeholderTextColor="#b3b6b7"
            value={formData.location}
            onChangeText={(text) => handleInputChange("location", text)}
            style={[styles.input, errors.location && { borderColor: "red" }]}
          />
          {errors.location && (
            <Text style={styles.errorText}>{errors.location}</Text>
          )}

          {/* Phone */}
          <TextInput
            placeholder="ফোন নম্বর লিখুন"
            placeholderTextColor="#b3b6b7"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            style={[styles.input, errors.phone && { borderColor: "red" }]}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          {/* Submit */}
          <Pressable
            onPress={handleSubmit}
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
