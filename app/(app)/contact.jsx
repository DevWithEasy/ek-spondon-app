import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>আপনার নাম</Text>
        <TextInput
          style={styles.input}
          placeholder="পূর্ণ নাম লিখুন"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ইমেইল ঠিকানা</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ফোন নম্বর</Text>
        <TextInput
          style={styles.input}
          placeholder="01XXXXXXXXX"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>আপনার বার্তা</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="আপনার বার্তা লিখুন..."
          multiline
          numberOfLines={4}
          value={formData.message}
          onChangeText={(text) => setFormData({...formData, message: text})}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>বার্তা পাঠান</Text>
      </TouchableOpacity>

      <View style={styles.contactInfo}>
        <Text style={styles.infoHeader}>সরাসরি যোগাযোগ</Text>
        <Text style={styles.infoText}>ইমেইল: contact@blooddonation.org</Text>
        <Text style={styles.infoText}>ফোন: +৮৮০ ১৭XX-XXXXXX</Text>
        <Text style={styles.infoText}>ঠিকানা: ১২৩/৪, মানবিক সড়ক, ঢাকা</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#555',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'HindSiliguri_400Regular',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'HindSiliguri_400Regular',
  },
  contactInfo: {
    marginVertical: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoHeader: {
    fontSize: 18,
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_700Bold',
  },
  infoText: {
    marginBottom: 10,
    color: '#555',
    fontFamily: 'HindSiliguri_400Regular',
  },
});