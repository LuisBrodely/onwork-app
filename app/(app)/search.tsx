import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheet, BottomSheetMethods } from "@/shared/components/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryList } from "@/shared/components/(modals)/CategoryList";
import { DistanceList } from "@/shared/components/(modals)/DistanceList";
import { PriceList } from "@/shared/components/(modals)/PriceList";
import { Searchbar, Button } from "react-native-paper";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";
import { ProviderCard } from "@/shared/components/custom/ProviderCard";

export default function Search() {
  const { providers, getProviders } = useProviderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const bottomSheetCategoriesRef = useRef<BottomSheetMethods>(null);
  const bottomSheetPricesRef = useRef<BottomSheetMethods>(null);
  const bottomSheetDistancesRef = useRef<BottomSheetMethods>(null);

  const categoriesHandler = useCallback(() => {
    bottomSheetCategoriesRef.current?.expand();
  }, []);

  const pricesHandler = useCallback(() => {
    bottomSheetPricesRef.current?.expand();
  }, []);

  const distancesHandler = useCallback(() => {
    bottomSheetDistancesRef.current?.expand();
  }, []);

  useEffect(() => {
    getProviders();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = providers.filter(provider =>
        provider.tags.some(tag => tag.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProviders(filtered);
    } else {
      setFilteredProviders(providers);
    }
  }, [searchQuery, providers]);

  const groupProvidersByCategory = (providers) => {
    const groupedProviders = {};

    providers.forEach(provider => {
      provider.tags.forEach(tag => {
        if (!groupedProviders[tag.title]) {
          groupedProviders[tag.title] = [];
        }
        groupedProviders[tag.title].push(provider);
      });
    });

    return groupedProviders;
  };

  const groupedProviders = groupProvidersByCategory(filteredProviders);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>
        <Searchbar
          placeholder="Buscar personal"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchInput}
          placeholderTextColor={"#9C9C9C"}
        />
        <View style={{ marginTop: 12 }}>
          <ScrollView
            style={{
              marginHorizontal: -24,
              paddingBottom: 20,
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Button
              icon="chevron-down"
              mode="outlined"
              style={[styles.button, { marginLeft: 24 }]}
              buttonColor="#FFF"
              textColor="#9C9C9C"
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={() => categoriesHandler()}
            >
              <Text>Categorías</Text>
            </Button>
            <Button
              icon="chevron-down"
              mode="outlined"
              style={styles.button}
              buttonColor="#FFF"
              textColor="#9C9C9C"
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={() => pricesHandler()}
            >
              <Text>Precios</Text>
            </Button>
            <Button
              icon="chevron-down"
              mode="outlined"
              style={styles.button}
              buttonColor="#FFF"
              textColor="#9C9C9C"
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={() => distancesHandler()}
            >
              <Text style={styles.buttonText}>Distancia</Text>
            </Button>
          </ScrollView>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: -24 }}>
          {Object.keys(groupedProviders).map((category, index) => (
            <View key={index}>
              <Text
                style={{
                  paddingTop: 24,
                  paddingHorizontal: 24,
                  fontWeight: "700",
                  fontSize: 22,
                }}
              >
                {category}
              </Text>
              <FlatList
                data={groupedProviders[category]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ProviderCard provider={item} />}
                keyExtractor={(item) => item.uuid}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          ))}
        </ScrollView>
        <BottomSheet
          snapTo={"50%"}
          ref={bottomSheetCategoriesRef}
          backgroundColor="white"
          backDropColor="black"
        >
          <CategoryList />
        </BottomSheet>
        <BottomSheet
          snapTo={"40%"}
          ref={bottomSheetPricesRef}
          backgroundColor="white"
          backDropColor="black"
        >
          <PriceList />
        </BottomSheet>
        <BottomSheet
          snapTo={"40%"}
          ref={bottomSheetDistancesRef}
          backgroundColor="white"
          backDropColor="black"
        >
          <DistanceList />
        </BottomSheet>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFF",
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFF",
    color: "#9C9C9C",
  },
  buttonText: {
    color: "#9C9C9C",
  },
  listContainer: {
    marginTop: 20,
  },
});
