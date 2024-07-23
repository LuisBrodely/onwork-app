import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useRouter } from "expo-router";
import { FAB, Divider } from "react-native-paper";
import { Image } from "expo-image";
import { useUserStore } from "@/features/users/presentation/controllers/useUserStore";
import { User } from "@/features/session/data/interfaces/session.interface";
import { Valoration } from "@/features/valorations/data/interfaces/valoration.interface";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";

const ValorationsScreen = () => {
  const [valorations, setValorations] = useState<Valoration[]>([]);
  const { getValorationsByProvider } = useValorationStore();
  const { selectedUuidProvider } = useProviderStore()
  const { getUsers } = useUserStore();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchValorations = async () => {
      if (selectedUuidProvider) {
        const response = await getValorationsByProvider({
          uuid: selectedUuidProvider,
        });
        setValorations(response);
      }
    };

    fetchValorations();
  }, [selectedUuidProvider]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  const getUserByUuid = (uuid: string) => {
    return users.find((user) => user.uuid === uuid);
  };

  return (
    <View style={styles.container}>
      {valorations.length === 0 && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginTop: 24,
          }}
        >
          No tienes opiniones...
        </Text>
      )}

      {valorations && 
        <FlatList
        horizontal={false}
        data={valorations}
        keyExtractor={(item) => item.uuid}
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 24 }}
        renderItem={({ item }) => {
          const user = getUserByUuid(item.user_uuid);

          return (
            <View style={{ marginBottom: 20 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{ uri: user?.image_url }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 50,
                      backgroundColor: "gray",
                    }}
                  />
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      {user?.name || "Nombre del usuario"}
                    </Text>
                    <View
                      style={{
                        marginTop: 4,
                        backgroundColor: "#EF3166",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        padding: 3,
                        width: 80,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {item.general_review}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#666",
                  marginTop: 10,
                  fontStyle: "italic",
                  marginRight: 14,
                }}
              >
                {`"${item.comment}"`}
              </Text>
              <Divider style={{ marginTop: 24 }} />
            </View>
          );
        }}
      />}

      <FAB
        icon="plus"
        style={styles.fab}
        mode="flat"
        color="#FFF"
        onPress={() => {
          router.push("/provider/valorations/create");
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
    margin: 36,
    right: 0,
    bottom: 0,
    backgroundColor: "#EF3166",
  },
});

export default ValorationsScreen;
