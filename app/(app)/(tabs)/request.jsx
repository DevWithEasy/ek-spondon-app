import SimpleDateInput from "../../../src/components/SimpleDateInput";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function BloodRequestForm() {
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
  const [donateDate, setDonateDate] = useState(null);

  const bloodGroups = [
    { label: "এ+", value: "A+" },
    { label: "এ-", value: "A-" },
    { label: "বি+", value: "B+" },
    { label: "বি-", value: "B-" },
    { label: "ও+", value: "O+" },
    { label: "ও-", value: "O-" },
    { label: "এবি+", value: "AB+" },
    { label: "এবি-", value: "AB-" },
  ];

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "নাম লিখুন";
    if (!formData.problem.trim()) newErrors.problem = "সমস্যার বর্ণনা লিখুন";
    if (!formData.bloodGroup)
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    if (!formData.hemoglobin.trim())
      newErrors.hemoglobin = "হিমোগ্লোবিনের পরিমাণ লিখুন";
    if (!formData.request_bag.trim())
      newErrors.request_bag = "ব্যাগ সংখ্যা লিখুন";
    if (!formData.location.trim()) newErrors.location = "অবস্থান লিখুন";
    if (!formData.phone.trim()) newErrors.phone = "ফোন নম্বর লিখুন";
    else if (!/^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(formData.phone)) {
      newErrors.phone = "সঠিক ফোন নম্বর লিখুন";
    }
    if (!donateDate) {
      newErrors.donateDate = "জন্ম তারিখ প্রয়োজন";
    } else {
      const today = new Date();
      if (donateDate > today) {
        newErrors.donateDate = "ভবিষ্যতের তারিখ দিতে পারবেন না";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    Alert.alert(
      "সফল",
      "আপনার রক্তদানের অনুরোধ সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      [
        {
          text: "ঠিক আছে",
          onPress: () => {
            // Reset form
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
            setDonateDate(null);
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            নিচের ফর্মটি পূরণ করে রক্তদানের অনুরোধ করুন। আপনার তথ্য সঠিকভাবে
            প্রদান করুন যাতে আমরা দ্রুত আপনার সাহায্য করতে পারি।
          </Text>
          
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

          {/* Problem Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>সমস্যার বিবরণ</Text>
            <TextInput
              placeholder="রোগীর অবস্থা ও রক্তের প্রয়োজন সম্পর্কে বিস্তারিত লিখুন"
              placeholderTextColor="#b3b6b7"
              value={formData.problem}
              onChangeText={(text) => handleInputChange("problem", text)}
              style={[
                styles.input,
                styles.multilineInput,
                errors.problem && styles.inputError,
              ]}
              multiline
              numberOfLines={4}
            />
            {errors.problem && (
              <Text style={styles.errorText}>{errors.problem}</Text>
            )}
          </View>

          {/* Medical Information Row */}
          <View style={styles.row}>
            {/* Hemoglobin */}
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>হিমোগ্লোবিন</Text>
              <TextInput
                placeholder="g/dL"
                placeholderTextColor="#b3b6b7"
                keyboardType="numeric"
                value={formData.hemoglobin}
                onChangeText={(text) => handleInputChange("hemoglobin", text)}
                style={[styles.input, errors.hemoglobin && styles.inputError]}
              />
              {errors.hemoglobin && (
                <Text style={styles.errorText}>{errors.hemoglobin}</Text>
              )}
            </View>

            {/* Blood Bags */}
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>ব্যাগ সংখ্যা</Text>
              <TextInput
                placeholder="কত ব্যাগ প্রয়োজন"
                placeholderTextColor="#b3b6b7"
                keyboardType="numeric"
                value={formData.request_bag}
                onChangeText={(text) => handleInputChange("request_bag", text)}
                style={[styles.input, errors.request_bag && styles.inputError]}
              />
              {errors.request_bag && (
                <Text style={styles.errorText}>{errors.request_bag}</Text>
              )}
            </View>
          </View>

          {/* Blood Group */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>রক্তের গ্রুপ</Text>
            <View style={[styles.pickerContainer, errors.bloodGroup && styles.inputError]}>
              <Picker
                selectedValue={formData.bloodGroup}
                onValueChange={(value) => handleInputChange("bloodGroup", value)}
                style={styles.picker}
                dropdownIconColor="#666"
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

          {/* Date Picker */}
          <SimpleDateInput
            title="রক্তদানের তারিখ"
            value={donateDate}
            onChange={(date) => setDonateDate(date)}
            error={errors.donateDate}
          />

          {/* Location */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>হাসপাতাল/অবস্থান</Text>
            <TextInput
              placeholder="রক্তদানের স্থানের পূর্ণ ঠিকানা"
              placeholderTextColor="#b3b6b7"
              value={formData.location}
              onChangeText={(text) => handleInputChange("location", text)}
              style={[styles.input, errors.location && styles.inputError]}
            />
            {errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>যোগাযোগ নম্বর</Text>
            <TextInput
              placeholder="01XXXXXXXXX"
              placeholderTextColor="#b3b6b7"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              style={[styles.input, errors.phone && styles.inputError]}
              maxLength={11}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>অনুরোধ জমা দিন</Text>
          </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#d32f2f",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "HindSiliguri_400Regular",
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  pickerContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#333",
  },
  label: {
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
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
  inputError: {
    borderColor: "#d32f2f",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 15,
  },
  errorText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "#d32f2f",
    fontSize: 12,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  dateText: {
    flex: 1,
    fontFamily: "HindSiliguri_400Regular",
    color: "#333",
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#d32f2f",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontFamily: "HindSiliguri_600SemiBold",
    color: "#fff",
    fontSize: 16,
  },
});