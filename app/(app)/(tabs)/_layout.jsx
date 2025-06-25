import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerTitleStyle: {
          fontFamily: "HindSiliguri_600SemiBold",
          color: "red",
        },
        headerLeft: () => <DrawerToggleButton tintColor="red" />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "এক স্পন্দন",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "রক্ত খুঁজুন",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          title: "রক্তদানের অনুরোধ ফর্ম",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "paper-plane" : "paper-plane-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "বার্তা",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "প্রোফাইল",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
