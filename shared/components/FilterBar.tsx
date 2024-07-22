import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalLayout from './modalLayout';
import { CategoryList } from "@/shared/components/CategoryList";
import { DistanceList } from "@/shared/components/DistanceList";
import { PriceList } from "@/shared/components/PriceList";

export const FilterBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ModalLayout>
          <CategoryList />
        </ModalLayout>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Precios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Distancia</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE"
  },
  buttonIcon: {
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE"
  },
  buttonText: {
    color: '#9C9C9C',
  },
});
