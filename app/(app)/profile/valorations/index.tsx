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
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{ uri: 'https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/352336737_3576726865896497_1627286230545824668_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEWI_RFKKzgZ5la2qfbKmLNGT8QTm_0jA4ZPxBOb_SMDv3aa3xvAuRgV_CdLPlkB38jQKWR3L-c2IVGlha_caVT&_nc_ohc=a7YB9B4-idsQ7kNvgHxuYNg&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYA_QUifObtguqpfewT6Ve7OiJ9ZnKUyFnbwdkICB1e8Mw&oe=66A4D70E' }}
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
