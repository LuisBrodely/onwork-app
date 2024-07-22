import { View, Text, StyleSheet, FlatList } from "react-native";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useRouter } from "expo-router";
import StarRating from "react-native-star-rating-widget";
import { FAB, Divider } from "react-native-paper";
import { Image } from "expo-image";

const ValorationsScreen = () => {
  const { myValorations } = useValorationStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        data={myValorations}
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
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                source={{ uri: item.uuid }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 50,
                  backgroundColor: "red",
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Brodely Tovar
                </Text>
                <View style={{
                  marginTop: 4,
                  backgroundColor: "#EF3166",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  padding: 3,
                  width: 80,
                }}>
                  <Text style={{
                    color: "#FFF",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}>{item.general_review}</Text>
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
              }}
            >
              {`"${item.comment}"`}
            </Text>
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
          router.push("profile/valorations/create");
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
