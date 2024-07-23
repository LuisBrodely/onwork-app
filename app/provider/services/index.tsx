import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FAB, Divider, Button } from "react-native-paper";
import { useServiceStore } from "@/features/services/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { Role } from "@/features/users/domain/models/user.model";
import { RoleInvalid } from "@/shared/components/role/RoleInvalid";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";
import { Service } from "@/features/services/data/interfaces/service.interface";
import { useEffect, useState } from "react";

const ValorationsScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { selectedUuidProvider } = useProviderStore();
  const {
    getServicesByProvider,
    isLoading,
  } = useServiceStore();
  const router = useRouter();

  const fetchServices = async () => {
    if (selectedUuidProvider) {
      const response = await getServicesByProvider({
        uuid: selectedUuidProvider,
      });
      setServices(response);
    }
  };

  useEffect(() => {
    fetchServices();
  }
  , [selectedUuidProvider]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator animating={true} color="#FF4081" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {services.length === 0 && (
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

      {services &&  (
        <FlatList
          horizontal={false}
          data={services}
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

                <Button
                mode="contained"
                buttonColor="#EF3166"
                style={{
                  marginTop: 8,
                }}
                onPress={() => {
                  router.push(`/provider/services/${item.uuid}`);
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
      )}
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
