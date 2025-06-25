import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('ইমেইল ঠিকানা লিখুন');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('সঠিক ইমেইল ঠিকানা লিখুন');
      return;
    }

    // Here you would typically send a password reset link to the email
    router.push('/verify_code');
    console.log('Password reset requested for:', email);
    setError('');
    setIsSubmitted(true);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="lock-closed" size={80} color="#d32f2f" style={styles.icon} />
        
        <Text style={styles.title}>পাসওয়ার্ড ভুলে গেছেন?</Text>
        
        <Text style={styles.subtitle}>
          আপনার ইমেইল ঠিকানা লিখুন। আমরা আপনাকে পাসওয়ার্ড রিসেট করার লিংক পাঠাবো।
        </Text>

        {isSubmitted ? (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            <Text style={styles.successText}>
              পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে!
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="ইমেইল ঠিকানা"
                placeholderTextColor="#b3b6b7"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError('');
                }}
                style={[styles.input, error ? styles.inputError : null]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>পাসওয়ার্ড রিসেট লিংক পাঠান</Text>
            </Pressable>
          </>
        )}

        <Text style={styles.footerText}>
          যদি ইমেইল না পান, অনুগ্রহ করে স্প্যাম ফোল্ডার চেক করুন
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  subtitle: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    fontFamily: 'HindSiliguri_400Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontFamily: 'HindSiliguri_400Regular',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontFamily: 'HindSiliguri_400Regular',
  },
  button: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'HindSiliguri_400Regular',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successText: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 26,
    fontFamily: 'HindSiliguri_400Regular',
  },
  footerText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'HindSiliguri_400Regular',
  },
});