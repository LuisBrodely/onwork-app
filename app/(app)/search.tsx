import { View, Text, Pressable, Button, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { BottomSheet, BottomSheetMethods } from '@/shared/components/BottomSheet'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryList } from "@/shared/components/(modals)/CategoryList";
import { DistanceList } from "@/shared/components/(modals)/DistanceList";
import { PriceList } from "@/shared/components/(modals)/PriceList";
import { Searchbar } from 'react-native-paper';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetCategoriesRef = useRef<BottomSheetMethods>(null);
  const bottomSheetPricesRef = useRef<BottomSheetMethods>(null);
  const bottomSheetDistancesRef = useRef<BottomSheetMethods>(null);

  const categoriesHandler = useCallback(() => {
    bottomSheetCategoriesRef.current?.expand();
  }, []);

  const pricesHandler = useCallback(() => {
    bottomSheetPricesRef.current?.expand();
  }, []);

  const distancesHandler = useCallback(() => {
    bottomSheetDistancesRef.current?.expand();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 24 }}>
        <Searchbar
          placeholder="Buscar personal"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchInput}
          placeholderTextColor={"#9C9C9C"}
        />
        <View style={{ marginTop: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={styles.button} onPress={() => categoriesHandler()} >
              <Text style={styles.buttonText}>Categorías</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => pricesHandler()}>
              <Text style={styles.buttonText}>Precios</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => distancesHandler()}>
              <Text style={styles.buttonText}>Distancia</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => distancesHandler()}>
              <Text style={styles.buttonText}>Distancia</Text>
            </Pressable>
          </ScrollView>
        </View>
        <BottomSheet
          snapTo={'40%'}
          ref={bottomSheetCategoriesRef}
          backgroundColor='white'
          backDropColor='black'
        >
          <CategoryList />
        </BottomSheet>
        <BottomSheet
          snapTo={'40%'}
          ref={bottomSheetPricesRef}
          backgroundColor='white'
          backDropColor='black'
        >
          <PriceList />
        </BottomSheet>
        <BottomSheet
          snapTo={'40%'}
          ref={bottomSheetDistancesRef}
          backgroundColor='white'
          backDropColor='black'
        >
          <DistanceList />
        </BottomSheet>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    backgroundColor: '#FFF',
  },
  button: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE"
  },
  buttonText: {
    color: '#9C9C9C',
  },
})