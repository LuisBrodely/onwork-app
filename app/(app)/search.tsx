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
import { Provider, Tag } from "@/features/providers/data/interfaces/provider.interface";

export default function Search() {
  const { providers, getProviders } = useProviderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

  const groupProvidersByCategory = (providers: Provider[]) => {
    const groupedProviders: { [key: string]: Provider[] } = {};

    providers.forEach((provider: Provider) => {
      provider.tags.forEach((tag: Tag) => {
        if (!groupedProviders[tag.title]) {
          groupedProviders[tag.title] = [];
        }
        groupedProviders[tag.title].push(provider);
      });
    });

    return groupedProviders;
  };

  const groupedProviders = groupProvidersByCategory(filteredProviders);

  const handleCategorySelect = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };

  const categoriesToShow = selectedCategories.length > 0 ? selectedCategories : Object.keys(groupedProviders);

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
          {categoriesToShow.map((category, index) => (
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
              {groupedProviders[category] && groupedProviders[category].length > 0 ? (
                <FlatList
                  data={groupedProviders[category]}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <ProviderCard provider={item} />}
                  keyExtractor={(item) => item.uuid}
                  contentContainerStyle={styles.listContainer}
                />
              ) : (
                <Text style={styles.noDataText}>Lo sentimos, no hay trabajadores para esta área</Text>
              )}
            </View>
          ))}
        </ScrollView>
        <BottomSheet
          snapTo={"50%"}
          ref={bottomSheetCategoriesRef}
          backgroundColor="white"
          backDropColor="black"
        >
          <CategoryList onSelect={handleCategorySelect} />
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
    marginTop: 26,
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
  noDataText: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontSize: 16,
    color: "#9C9C9C",
  },
});
