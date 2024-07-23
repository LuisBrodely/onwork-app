import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePublicationStore } from "@/features/publications/presentation/controllers/usePublicationStore";
import { useEffect, useState } from "react";
import { Publication } from "@/features/publications/data/interfaces/publication.interface";
import { Image } from "expo-image";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { formatDate } from "@/shared/utils/util";
import { FAB } from "react-native-paper";
import { useRouter } from "expo-router";

const PublicationScreen = () => {
  const { id } = useLocalSearchParams();
  const { user } = useSessionStore();
  const router = useRouter();
  const [publication, setPublication] = useState<Publication | null>();

  const { getPublicationByUuid, isLoading } = usePublicationStore();

  const fetchPublication = async () => {
    if (id) {
      const response = await getPublicationByUuid({ uuid: id as string });
      setPublication(response);
    }
  };

  useEffect(() => {
    fetchPublication();
  }, [id]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color="#FF4081" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {publication && (
            <>
              <Image
                style={{ width: "100%", height: 300 }}
                source={{ uri: publication.url_image }}
              />
              <View style={styles.box}>
                <View style={styles.profile}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: user?.image_url,
                    }}
                  />
                  <View>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.lastName}>
                      {formatDate(publication?.createdAt)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.post}>
                <Text style={styles.title}>{publication.title}</Text>
                <Text style={styles.subtitle}>{publication.description}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <FAB
        icon="arrow-left"
        size="small"
        style={styles.fab}
        mode="flat"
        color="#FFF"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    margin: 24,
    left: 0,
    top: 0,
    borderRadius: 100,
    backgroundColor: "#FF5C69",
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: -30,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#fff",
  },
  box: {
    paddingHorizontal: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  lastName: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    color: "#FF4081",
    fontSize: 14,
  },
  post: {
    paddingHorizontal: 26,
    marginTop: 14,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
});

export default PublicationScreen;
