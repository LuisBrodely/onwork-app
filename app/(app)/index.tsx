import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, Image } from "react-native";
import { Button, IconButton, Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useRef, useState, useCallback } from "react";
import Constants from "expo-constants";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";
import { ProviderCard } from "@/shared/components/custom/ProviderCard";
import { BottomSheet, BottomSheetMethods } from "@/shared/components/BottomSheet";
import { CategoryList } from "@/shared/components/(modals)/CategoryList";
import { DistanceList } from "@/shared/components/(modals)/DistanceList";
import { PriceList } from "@/shared/components/(modals)/PriceList";
import { Provider, Tag } from "@/features/providers/data/interfaces/provider.interface";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut, user } = useSessionStore();
  const { providers, getProviders } = useProviderStore();
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

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Encuentra Talento Cerca</Text>
          <Searchbar
            placeholder="Buscar servicios"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchInput}
          />
        </View>
        <View>
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
        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>Cerca de ti</Text>
          <TouchableOpacity>
            <Text style={styles.sectionSubtitle}>Ver todas</Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: -24 }}>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 36,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 1,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingBottom: 12,
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
  listContainer: {
    marginTop: 20,
    marginHorizontal: -24,
  },
  noDataText: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontSize: 16,
    color: "#9C9C9C",
  },
});
