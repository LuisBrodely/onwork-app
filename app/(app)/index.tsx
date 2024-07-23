import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import Constants from "expo-constants";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { Image } from "expo-image";
import { IconButton, Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut, user } = useSessionStore();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Image
            source={{ uri: user?.image_url }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.region}>{user?.region}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            mode="contained"
            icon="forum"
            iconColor="#fafafa"
            containerColor="#EF3166"
          />
          <IconButton
            mode="contained"
            icon="bell"
            iconColor="#fafafa"
            containerColor="#5DC3B2"
          />
        </View>
      </View>

      <Text style={styles.title}>Encuentra Talento Cerca</Text>

      <Searchbar
        placeholder="Buscar servicios"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchInput}
      />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <TouchableOpacity>
          <Text style={styles.sectionSubtitle}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 14,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          height: 164,
        }}
      >
        <View
          style={{
            width: "72%",
            height: 164,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "46%",
              flexDirection: "row",
              marginBottom: "4%",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#5DC3B2",
                width: "38%",
                height: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Fontaneria
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#EF3166",
                width: "58%",
                height: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Electricidad
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#222227",
              width: "100%",
              height: "48%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Reparaciones
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            width: "25%",
            backgroundColor: "#FF6A5C",
            height: 164,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Pintura
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 40,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  region: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    marginTop: 28,
    fontSize: 42,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 24,
    width: "80%",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFF",
    marginBottom: 24,
  },
});
