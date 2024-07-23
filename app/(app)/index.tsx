import { Button, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";

export default function HomeScreen() {
  const { signOut, user } = useSessionStore();
  
  return (
    <View style={styles.container}>
      <Button
        title="Navigate to Sign In"
        onPress={() => router.replace("/login")}
      />

      <View style={{ marginVertical: 10 }} />

      <Button
        title="Cerrar sesión"
        onPress={() => signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
