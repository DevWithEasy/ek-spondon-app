import { 
  View, 
  Text, 
  Alert, 
  TextInput, 
  Image, 
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import icon from "../assets/images/icon.png";
import { MaterialIcons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const handleLogin = async () => {
    // Final validation before submission
    const newErrors = {
      email: !formData.email ? "ই-মেইল লিখুন" : "",
      password: !formData.password ? "পাসওয়ার্ড দিন" : "",
    };

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "সঠিক ই-মেইল লিখুন";
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        router.replace("/(app)/(tabs)/home");
      } catch (e) {
        console.error("Login error:", e);
        Alert.alert("ত্রুটি", "লগইন করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: '#f8f8f8' }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo and Header */}
        <View style={styles.header}>
          <Image source={icon} style={styles.logo} />
          <Text style={styles.organizationText}>
            স্বেচ্ছায় রক্তদাতাদের একটি সংগঠন
          </Text>
          <Text style={styles.loginTitle}>লগইন করুন</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ইমেইল</Text>
            <TextInput
              placeholder="আপনার ইমেইল লিখুন"
              placeholderTextColor="#b3b6b7"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                errors.email && styles.inputError
              ]}
              onBlur={() => {
                if (formData.email && !validateEmail(formData.email)) {
                  setErrors({
                    ...errors,
                    email: "সঠিক ই-মেইল লিখুন",
                  });
                }
              }}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>পাসওয়ার্ড</Text>
            <View style={[
              styles.passwordContainer,
              errors.password && styles.inputError
            ]}>
              <TextInput
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                placeholderTextColor="#b3b6b7"
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons 
                  name={showPassword ? "visibility-off" : "visibility"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>লগইন করুন</Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password Link */}
          <View style={styles.forgotPasswordContainer}>
            <Link href="/forget_password" style={styles.forgotPasswordText}>
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </View>

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              নতুন ব্যবহারকারী?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/signup')}>
              <Text style={styles.signupLink}>
                রেজিস্ট্রেশন করুন
              </Text>
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
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  organizationText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 5,
    textAlign: 'center',
  },
  loginTitle: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 22,
    color: '#333',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 15,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 8,
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
  forgotPasswordContainer: {
    width: '100%',
    marginTop: 15,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: 'HindSiliguri_500Medium',
    color: '#1565C0',
    fontSize: 14,
  },
  signupContainer: {
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#d32f2f',
    fontSize: 14,
    marginLeft: 5,
  },
});