import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const categories = [
  { key: "1", name: 'Cerrajero', icon: '🔑' },
  { key: "2", name: 'Albañil', icon: '🧱' },
  { key: "3", name: 'Mecánico', icon: '🚗' },
  { key: "4", name: 'Pelquero', icon: '💇‍♂️' },
  { key: "5", name: 'Conductor', icon: '🚚' },
  { key: "6", name: 'Niñera', icon: '👶' },
];

const secondCategories = [
  { key: "1", name: 'Fontanero', icon: '🚿' },
  { key: "2", name: 'Electricista', icon: '⚡' },
  { key: "3", name: 'Carpintero', icon: '🔨' },
  { key: "4", name: 'Pintor', icon: '🎨' },
  { key: "5", name: 'Jardinero', icon: '🌳' },
  { key: "6", name: 'Limpieza', icon: '🧼' },
]

const thirdCategories = [
  { key: "1", name: 'Cocinero', icon: '🍳' },
  { key: "2", name: 'Veterinario', icon: '🐾' },
  { key: "3", name: 'Músico', icon: '🎵' },
  { key: "4", name: 'Fotógrafo', icon: '📸' },
  { key: "5", name: 'Sastre', icon: '🧵' },
  { key: "6", name: 'Reparador de Electrodomésticos', icon: '🔌' },
]

const CategoryItem = ({ name, icon }: any) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.categoryText}>{name}</Text>
  </View>
);

export const CategoryList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <FlatList
        data={categories}
        horizontal
        renderItem={({ item }) => <CategoryItem name={item.name} icon={item.icon} />}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        style={{ marginTop: 20 }}
        data={secondCategories}
        horizontal
        renderItem={({ item }) => <CategoryItem name={item.name} icon={item.icon} />}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        style={{ marginTop: 20 }}
        data={thirdCategories}
        horizontal
        renderItem={({ item }) => <CategoryItem name={item.name} icon={item.icon} />}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
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