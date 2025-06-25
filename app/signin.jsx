import { View, Text, Pressable, TextInput, Image, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import icon from "../assets/images/icon.png";

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    // Validate in real-time
    if (name === "email") {
      setErrors({
        ...errors,
        email: value && !validateEmail(value) ? "সঠিক ই-মেইল লিখুন" : "",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: value && !validatePassword(value) 
          ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে" 
          : "",
      });
    }
  };

  const handleLogin = async () => {
    // Final validation before submission
    const newErrors = {
      email: !formData.email ? "ই-মেইল অথবা ফোন নম্বর লিখুন" : "",
      password: !formData.password ? "পাসওয়ার্ড দিন" : "",
    };

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "সঠিক ই-মেইল লিখুন";
    }

    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অক্ষর ও সংখ্যা থাকতে হবে";
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      try {
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        router.replace("/(app)/(tabs)/home");
      } catch (e) {
        console.error("Error saving login:", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={styles.logo}
      />

      <Text style={styles.organizationText}>
        স্বেচ্ছায় রক্তদাতাদের একটি সংগঠন
      </Text>

      <Text style={styles.loginTitle}>
        লগ-ইন করুন
      </Text>

      <TextInput
        placeholder="ই-মেইল অথবা ফোন নম্বর"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[
          styles.input,
          errors.email ? styles.inputError : null
        ]}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        placeholder="পাসওয়ার্ড"
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
        style={[
          styles.input,
          errors.password ? styles.inputError : null
        ]}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <Pressable
        onPress={handleLogin}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>
          সাবমিট করুন
        </Text>
      </Pressable>

      <View style={styles.forgotPasswordContainer}>
        <Link
          href="/forget_password"
          style={styles.forgotPasswordText}
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </Link>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          আপনিও কি সদস্য হতে চান?{' '}
        </Text>
        
        <Pressable onPress={() => router.replace('/signup')}>
          <Text style={styles.signupLink}>
            একাউন্ট করুন
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    height: 70,
    width: 70,
    marginBottom: 5,
    borderRadius: 50
  },
  organizationText: {
    fontFamily: "HindSiliguri_400Regular",
    marginBottom: 20,
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  loginTitle: {
    fontFamily: "HindSiliguri_700Bold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'HindSiliguri_400Regular',
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
    width: "100%",
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButtonText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "white",
  },
  forgotPasswordContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordText: {
    fontFamily: "HindSiliguri_400Regular",
    color: "blue",
  },
  signupContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "center",
  },
  signupText: {
    fontFamily: "HindSiliguri_400Regular",
    color: 'black',
  },
  signupLink: {
    fontFamily: "HindSiliguri_400Regular",
    color: 'blue',
  },
});