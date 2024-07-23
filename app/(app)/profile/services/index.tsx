import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { FAB, Divider, Button } from "react-native-paper";
import { useServiceStore } from "@/features/services/presentation/controllers/useValorationStore";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ValorationsScreen = () => {
  const { myServices } = useServiceStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        data={myServices}
        keyExtractor={(item) => item.uuid}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingTop: 24,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center'
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#666',
                    fontWeight: "600",
                    marginBottom: 4
                  }}
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 24,
                    }}
                  >
                    {"$" + item.cost_total.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      marginBottom: 2,
                    }}
                  >
                    {item.currency}
                  </Text>
                </View>
              </View>
              <Button
                mode="contained"
                buttonColor="#EF3166"
                style={{
                  marginTop: 8
                }}
                onPress={() => {
                  console.log("Pagar");
                }}
              >
                <Text style={{
                  color: '#fff',
                  fontWeight: '600'
                }}>Pagar</Text>
              </Button>
            </View>
            <Divider
              style={{
                marginTop: 24,
              }}
            />
          </View>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        mode="flat"
        color="#FFF"
        onPress={() => {
          router.push("profile/services/create");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF5C69",
  },
});
export default ValorationsScreen;
