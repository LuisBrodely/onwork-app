import { StyleSheet, View, Text } from "react-native";

export default function InProcessScreen() {
  return (
    <View style={styles.container}>
      <Text>Esta screen está en proceso.</Text>
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
