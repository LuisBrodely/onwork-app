import { Provider } from "@/features/providers/data/interfaces/provider.interface";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ProviderCard } from "./custom/ProviderCard";

const Cards = () => {
  const { providers } = useProviderStore();

  return (
    <FlatList
      data={providers}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <ProviderCard provider={item} />}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxWidth: 280,
    marginLeft: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 65,
  },
  rating: {
    color: "#fff",
    fontWeight: "bold",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  jobs: {
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileButton: {
    borderWidth: 1,
    borderColor: "#DEDEDE",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileButtonText: {
    color: "#000",
    borderRadius: 8,
  },
  contactButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contactButtonText: {
    color: "#fff",
  },
});

export default Cards;
