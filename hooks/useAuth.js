import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null while loading

  const checkAuth = async () => {
    try {
      const logged = await AsyncStorage.getItem("isLoggedIn");
      const parsedLogged = JSON.parse(logged);
      setIsLoggedIn(parsedLogged === true);
    } catch (e) {
      console.error("Error reading from AsyncStorage:", e);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return isLoggedIn;
}
