import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import useAuth from '../hooks/useAuth';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const isLoggedIn = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace('/(app)/(tabs)/home');
      } else {
        router.replace('/signin');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/android_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.brandingContainer}>
        <Image
          source={require('../assets/images/android_branding.png')}
          style={styles.branding}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.3,
  },
  brandingContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  branding: {
    width: width * 0.5,
    height: height * 0.1,
  },
});