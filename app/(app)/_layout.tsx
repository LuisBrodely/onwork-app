import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Octicons, Entypo } from "@expo/vector-icons";
import {
  SessionStatus,
  useSessionStore,
} from "@/features/session/presentation/controllers/useSessionStore";
import { Redirect, Tabs } from "expo-router";

export default function AppLayout() {
  const { status } = useSessionStore();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (status === SessionStatus.CHECKING) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color="#FF4081" size="large" />
      </View>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (status === SessionStatus.UNAUTHENTICATED) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFF', borderTopWidth: 0 },
        tabBarActiveTintColor: '#FF3040',
        tabBarInactiveTintColor: '#4D4D4D',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Octicons name="home" size={24} color="#4D4D4D" />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Octicons name="search" size={24} color="#4D4D4D" />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Octicons name="diff-added" size={24} color="#4D4D4D" />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Entypo name="map" size={24} color="#4D4D4D" />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Octicons name="person" size={24} color="#4D4D4D" />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FF3040',
    position: 'absolute',
    bottom: -12,
  },
});
