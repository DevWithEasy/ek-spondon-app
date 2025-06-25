import { View, Text, ScrollView, StyleSheet, Linking, Image } from 'react-native';
import React from 'react';
import { FontAwesome} from "@expo/vector-icons";

export default function Developer() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:developer@example.com');
  };

  const handleDonatePress = () => {
    Linking.openURL('https://donate.bloodorganization.org');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Blood Drop Icon */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>এক স্পন্দন অ্যাপ</Text>
        <Text style={styles.subTitle}>A Gift to Humanity</Text>
      </View>

      {/* Developer Message */}
      <View style={styles.card}>
        <Text style={styles.messageTitle}>From the Developer&apos;s Heart</Text>
        <Text style={styles.messageText}>
          This application was developed and donated as a complete gift to 
          [এক স্পন্দন] to support their life-saving mission. 
          No profits were taken - just pure intention to help save lives 
          through technology.
        </Text>
        <Text style={styles.messageText}>
          &quot;Every line of code in this app was written with the hope that 
          it might help connect a donor to someone in need at the right moment.&quot;
        </Text>
        <Text style={styles.signature}>- The Developer</Text>
      </View>

      {/* Organization Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supported Organization</Text>
        <Text style={styles.orgName}>[এক স্পন্দন]</Text>
        <Text style={styles.orgDescription}>
          A non-profit dedicated to creating a sustainable blood donation 
          ecosystem and saving lives since 2010.
        </Text>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>Support Their Mission:</Text>
        <View style={styles.button} onPress={handleDonatePress}>
          <FontAwesome name="heart" size={18} color="white" />
          <Text style={styles.buttonText}> Donate to the Cause</Text>
        </View>
      </View>

      {/* Technical Credits */}
      <View style={styles.credits}>
        <Text style={styles.creditTitle}>Technical Information</Text>
        <Text style={styles.creditText}>App Version: 1.0.0</Text>
        <Text style={styles.creditText}>Built with React Native</Text>
        <Text style={styles.creditText}>© {new Date().getFullYear()} - Gifted to [এক স্পন্দন]</Text>
      </View>

      {/* Contact */}
      <View style={styles.contact}>
        <Text style={styles.contactText}>For technical inquiries:</Text>
        <Text style={[styles.contactText, styles.link]} onPress={handleEmailPress}>
          developer@example.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 24,
    color: 'red',
    marginTop: 10,
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_400Regular',
  },
  signature: {
    fontSize: 14,
    color: '#d32f2f',
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  orgName: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  orgDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'HindSiliguri_400Regular',
  },
  ctaContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontFamily: 'HindSiliguri_400Regular',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'HindSiliguri_600SemiBold',
  },
  credits: {
    marginTop: 20,
    alignItems: 'center',
  },
  creditTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
    fontFamily: 'HindSiliguri_400Regular',
  },
  creditText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
    fontFamily: 'HindSiliguri_400Regular',
  },
  contact: {
    marginTop: 30,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontFamily: 'HindSiliguri_400Regular',
  },
  link: {
    color: '#d32f2f',
    textDecorationLine: 'underline',
  },
});