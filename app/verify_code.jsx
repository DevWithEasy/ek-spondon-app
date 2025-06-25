import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function VerifyCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputs = useRef([]);

  // Focus management for OTP inputs
  const focusNextField = (index, value) => {
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle code change
  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    focusNextField(index, text);

    // Auto-submit when all digits are entered
    if (index === 5 && text) {
      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        handleVerify();
      }
    }
  };

  // Handle backspace
  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0 && !code[index]) {
      inputs.current[index - 1].focus();
    }
  };

  // Verify code
  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      Alert.alert("সফল", `কোড ভেরিফাই করা হয়েছে: ${verificationCode}`);
      // Here you would typically verify with your backend
      router.push("/reset_password");
    } else {
      Alert.alert("ত্রুটি", "দয়া করে ৬ ডিজিটের কোড লিখুন");
    }
  };

  // Resend code functionality
  const handleResend = () => {
    setTimer(60);
    setIsResendDisabled(true);
    Alert.alert(
      "কোড পুনরায় পাঠানো হয়েছে",
      "আপনার নতুন ভেরিফিকেশন কোড ইমেইলে পাঠানো হয়েছে"
    );
  };

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons
          name="shield-checkmark"
          size={80}
          color="#d32f2f"
          style={styles.icon}
        />

        <Text style={styles.title}>ভেরিফিকেশন কোড</Text>

        <Text style={styles.subtitle}>
          আমরা আপনার ইমেইলে ৬ ডিজিটের একটি কোড পাঠিয়েছি। দয়া করে নিচে কোডটি
          লিখুন
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.codeInput, digit ? styles.codeInputFilled : null]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({ nativeEvent: { key } }) =>
                handleKeyPress(index, key)
              }
              keyboardType="number-pad"
              maxLength={1}
              textContentType="oneTimeCode"
              selectTextOnFocus
            />
          ))}
        </View>

        <Pressable
          onPress={handleVerify}
          style={styles.button}
          disabled={code.join("").length !== 6}
        >
          <Text style={styles.buttonText}>ভেরিফাই করুন</Text>
        </Pressable>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            কোড পাননি? {isResendDisabled && `পুনরায় পাঠান ${timer} সেকেন্ড পরে`}
          </Text>
          <Pressable onPress={handleResend} disabled={isResendDisabled}>
            <Text
              style={[
                styles.resendButton,
                isResendDisabled && styles.resendDisabled,
              ]}
            >
              কোড পুনরায় পাঠান
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "HindSiliguri_600SemiBold",
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    fontFamily: "HindSiliguri_400Regular",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "HindSiliguri_400Regular",
  },
  codeInputFilled: {
    borderColor: "#d32f2f",
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "HindSiliguri_400Regular",
  },
  resendContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  resendText: {
    color: "#777",
    marginBottom: 10,
    fontFamily: "HindSiliguri_400Regular",
  },
  resendButton: {
    color: "#d32f2f",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  resendDisabled: {
    color: "#aaa",
  },
});
