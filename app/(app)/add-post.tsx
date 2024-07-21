import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppTextInput } from '@/shared/components/custom/AppTextInput';
import Constants from 'expo-constants';
import axios from 'axios';
import { useSessionStore } from '@/features/session/presentation/controllers/useSessionStore';

export default function AddPostScreen() {
  const { user } = useSessionStore();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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

    try {
      const response = await axios.post('https://onwork-publication.integrador.xyz/publications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Post created successfully');
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
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