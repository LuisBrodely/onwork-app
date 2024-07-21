import { StyleSheet, View, Text } from "react-native";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";

export default function ProfileScreen() {
  const { signOut, user } = useSessionStore();

  return (
    <View style={styles.container}>
      <Text>
        {user?.email}
      </Text>
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
