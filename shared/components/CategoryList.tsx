import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const categories = [
  { key: '1', name: 'Admin', icon: '💼' },
  { key: '2', name: 'Assembly', icon: '🛠️' },
  { key: '3', name: 'Computer/IT', icon: '💻' },
  { key: '4', name: 'Cleaning', icon: '🧹' },
  { key: '5', name: 'Custom', icon: '💡' },
  { key: '6', name: 'Heavy Lifting', icon: '🏋️' },
];

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
        data={categories}
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