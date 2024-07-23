import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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

const CategoryItem = ({ name, icon, isSelected, onPress }: { name: string, icon: string, isSelected: boolean, onPress: () => void }) => (
  <TouchableOpacity style={[styles.categoryContainer, isSelected && styles.selectedCategoryContainer]} onPress={onPress}>
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

export const CategoryList = ({ onSelect }: { onSelect: (selectedCategories: string[]) => void }) => {
  const { getTags, tags } = useTagStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category]
    );
  };

  useEffect(() => {
    onSelect(selectedCategories);
  }, [selectedCategories, onSelect]);

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
            renderItem={({ item }) => (
              <CategoryItem
                name={item.title}
                icon={iconDictionary[item.title]}
                isSelected={selectedCategories.includes(item.title)}
                onPress={() => handleCategoryPress(item.title)}
              />
            )}
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
  selectedCategoryContainer: {
    backgroundColor: '#EF316675',
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
