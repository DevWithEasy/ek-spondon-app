import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import useAuth from '../../../hooks/useAuth';

export default function PasswordChange() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'বর্তমান পাসওয়ার্ড লিখুন';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'নতুন পাসওয়ার্ড লিখুন';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'সফল হয়েছে', 
        'আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে',
        [{ text: 'ঠিক আছে', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('ত্রুটি', 'পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: '#f8f8f8' }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Form */}
        <View style={styles.formContainer}>
          {/* Current Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>বর্তমান পাসওয়ার্ড</Text>
            <View style={[styles.passwordInput, errors.currentPassword && styles.inputError]}>
              <TextInput
                placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
                placeholderTextColor="#b3b6b7"
                secureTextEntry={!showCurrentPassword}
                value={formData.currentPassword}
                onChangeText={(text) => setFormData({...formData, currentPassword: text})}
                style={styles.inputField}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Ionicons 
                  name={showCurrentPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {errors.currentPassword && (
              <Text style={styles.errorText}>{errors.currentPassword}</Text>
            )}
          </View>

          {/* New Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>নতুন পাসওয়ার্ড</Text>
            <View style={[styles.passwordInput, errors.newPassword && styles.inputError]}>
              <TextInput
                placeholder="নতুন পাসওয়ার্ড লিখুন (ন্যূনতম ৬ অক্ষর)"
                placeholderTextColor="#b3b6b7"
                secureTextEntry={!showNewPassword}
                value={formData.newPassword}
                onChangeText={(text) => setFormData({...formData, newPassword: text})}
                style={styles.inputField}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons 
                  name={showNewPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <View style={[styles.passwordInput, errors.confirmPassword && styles.inputError]}>
              <TextInput
                placeholder="পাসওয়ার্ড আবার লিখুন"
                placeholderTextColor="#b3b6b7"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                style={styles.inputField}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            onPress={handleSubmit} 
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>পাসওয়ার্ড পরিবর্তন করুন</Text>
            )}
          </TouchableOpacity>

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>পাসওয়ার্ড প্রয়োজনীয়তা:</Text>
            <View style={styles.requirementItem}>
              <MaterialIcons 
                name={formData.newPassword.length >= 6 ? "check-circle" : "radio-button-unchecked"} 
                size={16} 
                color={formData.newPassword.length >= 6 ? "#2E7D32" : "#666"} 
              />
              <Text style={styles.requirementText}>ন্যূনতম ৬ অক্ষর</Text>
            </View>
            <View style={styles.requirementItem}>
              <MaterialIcons 
                name={formData.newPassword === formData.confirmPassword && formData.newPassword ? "check-circle" : "radio-button-unchecked"} 
                size={16} 
                color={formData.newPassword === formData.confirmPassword && formData.newPassword ? "#2E7D32" : "#666"} 
              />
              <Text style={styles.requirementText}>উভয় পাসওয়ার্ড মিলতে হবে</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 15,
    color: '#333',
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
    backgroundColor: '#d32f2f',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  requirementsContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  requirementsTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
  },
});