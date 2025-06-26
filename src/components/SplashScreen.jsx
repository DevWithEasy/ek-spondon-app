import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height * 0.2)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 700,
      delay: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          { opacity: fadeAnim }
        ]}
      >
        <Image
          source={require('../../assets/images/android_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View 
        style={[
          styles.brandingContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <Image
          source={require('../../assets/images/android_branding.png')}
          style={styles.branding}
          resizeMode="contain"
        />
      </Animated.View>
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