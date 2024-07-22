import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppTextInput } from '@/shared/components/custom/AppTextInput';
import Constants from 'expo-constants';
import { useSessionStore } from '@/features/session/presentation/controllers/useSessionStore';
import { usePublicationStore } from '@/features/publications/presentation/controllers/usePublicationStore';

export default function AddPostScreen() {
  const { user } = useSessionStore();
  const { createPublication } = usePublicationStore();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('Caja 2');
  const [description, setDescription] = useState<string>('Caja 3');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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
    formData.append('title', title);
    formData.append('description', description);
    formData.append('user_uuid', user?.uuid ?? '');

    if (title === '' || description === '') {
      Alert.alert('Error', 'Los campos título y descripción son obligatorios');
      return;
    }

    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('file', {
        uri: image,
        name: filename,
        type,
      } as any);
    }

    console.log('formData:', formData);

    if (user) {
      const response = await createPublication({ formData, uuid: user.uuid });
      if (response) {
        Alert.alert('Publicación creada', 'Tu publicación ha sido creada exitosamente');

        setTitle('');
        setDescription('');
        setImage(null);
      } else {
        Alert.alert('Error', 'Ocurrió un error al crear la publicación');

        setTitle('');
        setDescription('');
        setImage(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nueva Publicación
      </Text>
      <Text style={styles.subtitle}>
        Ingresa los datos de la publicación
      </Text>
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
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Text style={styles.removeButtonText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      )}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#1e90ff' : '#1e90ff',
          },
          {
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          },
        ]}
        onPress={handleSubmit}
      >
        <Text>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Constants.statusBarHeight + 30,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  imagePickerButton: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  removeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
