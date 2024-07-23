import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppTextInput } from "@/shared/components/custom/AppTextInput";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { usePublicationStore } from "@/features/publications/presentation/controllers/usePublicationStore";
import { Octicons } from "@expo/vector-icons";
import { Button, IconButton } from "react-native-paper";

export default function AddPostScreen() {
  const { user } = useSessionStore();
  const { createPublication, myPublications, setMyPublications, getPublicationsByUser } = usePublicationStore();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("user_uuid", user?.uuid ?? "");

    if (title === "" || description === "") {
      Alert.alert("Error", "Los campos título y descripción son obligatorios");
      return;
    }

    if (image) {
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("file", {
        uri: image,
        name: filename,
        type,
      } as any);
    } else {
      Alert.alert("Error", "Debes seleccionar una imagen para la publicación");
      return;
    }

    if (user) {
      const response = await createPublication({ formData, uuid: user.uuid });
      if (response) {
        Alert.alert(
          "Publicación creada",
          "Tu publicación ha sido creada exitosamente"
        );

        const response = await getPublicationsByUser({ uuid: user.uuid });
        setMyPublications(response);

        setTitle("");
        setDescription("");
        setImage(null);
      } else {
        Alert.alert("Error", "Ocurrió un error al crear la publicación");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Publicación</Text>
      <Text style={styles.subtitle}>Ingresa los datos de la publicación.</Text>
      <AppTextInput
        placeholder="Ingresa el título"
        value={title}
        onChangeText={setTitle}
      />
      <AppTextInput
        placeholder="Ingresa la descripción"
        value={description}
        onChangeText={setDescription}
      />
      {!image && (
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Octicons name="upload" size={24} color="#5EC3B2" />
          <Text style={styles.imagePickerButtonText}>
            Selecciona una imagen de la galería
          </Text>
        </TouchableOpacity>
      )}
      {image && (
        <View style={{ position: "relative" }}>
          <Image source={{ uri: image }} style={styles.image} />
          <IconButton
            icon="close"
            mode="contained"
            iconColor="#fafafa"
            containerColor="#EF3166"
            style={{
              position: "absolute",
              top: 4,
              right: 4,
            }}
            size={20}
            onPress={removeImage}
          />
        </View>
      )}
      <Button mode="contained" buttonColor="#5EC3B2" onPress={handleSubmit}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        >
          {" "}
          Crear Publicación
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "#666",
    fontWeight: "400",
  },
  imagePickerButton: {
    justifyContent: "center",
    height: 200,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    alignItems: "center",
  },
  imagePickerButtonText: {
    color: "#1a1a1a",
    width: 150,
    marginTop: 6,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 24,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
