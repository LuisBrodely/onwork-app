import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePublicationStore } from "@/features/publications/presentation/controllers/usePublicationStore";
import { useEffect, useState } from "react";
import { Publication } from "@/features/publications/data/interfaces/publication.interface";
import { Image } from "expo-image";

const PublicationScreen = () => {
  const { id } = useLocalSearchParams();
  const [publication, setPublication] = useState<Publication | null>();

  const { getPublicationByUuid, isLoading } = usePublicationStore();

  const fetchPublication = async () => {
    if (id) {
      const response = await getPublicationByUuid({ uuid: id as string });
      console.log('publication', response);
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
    <View>
      <Text>PublicationScreen {id}</Text>

      {publication && (
        <View>
          <Text>{publication.title}</Text>
          <Text>{publication.description}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: publication.url_image }}
          />
        </View>
      )}
    </View>
  );
};

export default PublicationScreen;
