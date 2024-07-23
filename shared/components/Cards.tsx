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
});

export default Cards;
