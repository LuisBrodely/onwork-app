import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useTagStore } from '@/features/tags/presentation/controllers/useTagsStore';

const iconDictionary: { [key: string]: string } = {
  'Carga Pesada': '📦',
  'Administración': '📊',
  'Reparaciones': '🔧',
  'Pintura y Decoración': '🎨',
  'Pintura': '🎨',
  'Cuidado de Mascotas': '🐾',
  'Asistencia en Eventos': '🎉',
  'Organización del Hogar': '🏠',
  'Fotografía': '📸',
  'Transporte': '🚗',
  'Electricidad': '⚡',
  'Limpieza': '🧼',
  'Mudanzas': '🚚',
  'Carpintería': '🪑',
  'Ensamblaje': '🧱',
  'Trabajo de Jardinería': '🌳',
  'Fontanería': '🚿',
  'Informática': '💻',
};

const CategoryItem = ({ name, icon }: { name: string, icon: string }) => (
  <TouchableOpacity style={styles.categoryContainer}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.categoryText}>{name}</Text>
  </TouchableOpacity>
);

const splitArrayIntoChunks = (array: any[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const CategoryList = () => {
  const { getTags, tags } = useTagStore();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const groupedTags = splitArrayIntoChunks(tags, 6);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <FlatList
        data={groupedTags}
        renderItem={({ item }) => (
          <FlatList
            data={item}
            horizontal
            renderItem={({ item }) => <CategoryItem name={item.title} icon={iconDictionary[item.title]} />}
            keyExtractor={item => item.uuid}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 24,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
