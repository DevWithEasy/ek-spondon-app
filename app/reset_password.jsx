import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    // At least 8 characters with at least one number
    const re = /^(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = { newPassword: '', confirmPassword: '' };

    if (!newPassword) {
      newErrors.newPassword = 'পাসওয়ার্ড লিখুন';
      valid = false;
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের এবং অন্তত একটি সংখ্যা থাকতে হবে';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ড নিশ্চিত করুন';
      valid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Here you would typically call your API to reset password
      console.log('Password reset successful');
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        <Text style={styles.successTitle}>সফল!</Text>
        <Text style={styles.successText}>আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে</Text>
        <Pressable 
          style={styles.successButton}
          onPress={() => {
            // Navigate to login or home screen
          }}
        >
          <Text style={styles.successButtonText}>লগইন পেজে যান</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="lock-open" size={80} color="#d32f2f" style={styles.icon} />
        
        <Text style={styles.title}>নতুন পাসওয়ার্ড সেট করুন</Text>
        
        <Text style={styles.subtitle}>
          একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন যাতে কমপক্ষে ৮টি অক্ষর এবং অন্তত একটি সংখ্যা থাকে
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>নতুন পাসওয়ার্ড</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="নতুন পাসওয়ার্ড লিখুন"
              placeholderTextColor="#b3b6b7"
              value={newPassword}
              onChangeText={setNewPassword}
              style={[styles.input, errors.newPassword ? styles.inputError : null]}
              secureTextEntry={!showPassword}
            />
            <Pressable 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#777" 
              />
            </Pressable>
          </View>
          {errors.newPassword ? (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          ) : (
            <Text style={styles.hintText}>
              {newPassword.length > 0 && !validatePassword(newPassword) && 
                'পাসওয়ার্ডে কমপক্ষে ৮ অক্ষর এবং একটি সংখ্যা থাকতে হবে'}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
          <TextInput
            placeholder="পাসওয়ার্ড আবার লিখুন"
            placeholderTextColor="#b3b6b7"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
            secureTextEntry={!showPassword}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        <Pressable 
          onPress={handleSubmit} 
          style={[
            styles.button,
            (!newPassword || !confirmPassword) && styles.buttonDisabled
          ]}
          disabled={!newPassword || !confirmPassword}
        >
          <Text style={styles.buttonText}>পাসওয়ার্ড পরিবর্তন করুন</Text>
        </Pressable>

        <Text style={styles.footerText}>
          শক্তিশালী পাসওয়ার্ডের জন্য বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ চিহ্ন ব্যবহার করুন
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 15,
  },
  successText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    color: '#555',
    fontFamily: 'HindSiliguri_400Regular',
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'HindSiliguri_400Regular',
  },
  inputError: {
    borderColor: 'red',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
  },
  hintText: {
    color: '#FF9800',
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'HindSiliguri_400Regular',
  },
  button: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'HindSiliguri_400Regular',
  },
  footerText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'HindSiliguri_400Regular',
  },
});