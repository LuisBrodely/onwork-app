import { View, Text, Alert, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";
import { useState } from "react";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import StarRating from "react-native-star-rating-widget";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";

const ServicesScreen = () => {
  const router = useRouter();
  const { createValoration } = useValorationStore();
  const { user } = useSessionStore();
  const { selectedUuidProvider } = useProviderStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (user) {
      if (!rating || !comment) {
        Alert.alert("Todos los campos son requeridos");
        return;
      }

      if (!selectedUuidProvider) {
        Alert.alert("Error", "No se ha seleccionado un proveedor");
        return;
      }

      const response = await createValoration({
        user_uuid: user.uuid,
        provider_uuid: selectedUuidProvider,
        rating,
        comment,
      });

      console.log("response", response);

      if (response) {
        Alert.alert("Success", "Valoración creada correctamente");
      } else {
        Alert.alert("Error", "Ocurrió un error al crear la valoración");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 24,
        }}
      >
        Valorar servicio
      </Text>
      <View style={{ marginTop: 18, gap: 10 }}>
        <StarRating
          emptyColor="#EF3166"
          color="#EF3166"
          rating={rating}
          onChange={setRating}
          maxStars={5}
        />

        <TextInput
          label="Comentario"
          value={comment}
          mode="outlined"
          onChangeText={setComment}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{
          marginTop: 24,
          backgroundColor: "#EF3166",
        }}
      >
        Guardar
      </Button>

      <FAB
        icon="arrow-left"
        style={styles.fab}
        mode="flat"
        size="small"
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
    paddingHorizontal: 24,
  },
  fab: {
    position: "absolute",
    marginHorizontal: 24,
    marginVertical: 20,
    right: 0,
    top: 0,
    borderRadius: 100,
    backgroundColor: "#EF3166",
  },
});

export default ServicesScreen;
