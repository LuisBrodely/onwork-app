import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { FAB, Divider, Button } from "react-native-paper";
import { useServiceStore } from "@/features/services/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";

const ValorationsScreen = () => {
  const { user } = useSessionStore();
  const { myServices, deleteService, getServicesByProvider, setMyServices, isLoading } =
    useServiceStore();
  const router = useRouter();

  const handleDelete = async (uuid: string) => {
    const response = await deleteService({ uuid });

    if (response) {
      const services = await getServicesByProvider({ uuid: user?.uuid || "" });
      setMyServices(services);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fff' }}>
        <ActivityIndicator animating={true} color="#FF4081" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {myServices.length === 0 && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginTop: 24,
          }}
        >
          No tienes servicios...
        </Text>
      )}

      {myServices &&
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
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    fontWeight: "600",
                    marginBottom: 4,
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

              {/* <Button
                mode="contained"
                buttonColor="#EF3166"
                style={{
                  marginTop: 8,
                }}
                onPress={() => {
                  router.push(`/profile/services/${item.uuid}`);
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Pagar
                </Text>
              </Button> */}

              <Button
                mode="contained"
                buttonColor="#EF3166"
                style={{
                  marginTop: 8,
                }}
                onPress={() => handleDelete(item.uuid)}
              >
                Eliminar
              </Button>
            </View>
            <Divider
              style={{
                marginTop: 24,
              }}
            />
          </View>
        )}
      />}

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
    backgroundColor: "#EF3166",
  },
});
export default ValorationsScreen;
