import { Button, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/onwork-icon.png")}
        transition={1000}
        style={{ width: 200, height: 200 }}
      />

      <Button
        title="Navigate to Sign In"
        onPress={() => router.replace("/login")}
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
