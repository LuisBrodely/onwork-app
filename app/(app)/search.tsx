import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { BottomSheet, BottomSheetMethods } from '@/shared/components/BottomSheet'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryList } from "@/shared/components/(modals)/CategoryList";
import { DistanceList } from "@/shared/components/(modals)/DistanceList";
import { PriceList } from "@/shared/components/(modals)/PriceList";
import { Searchbar, Button } from 'react-native-paper';
import Cards from '@/shared/components/Cards';

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
          <ScrollView
            style={{ marginHorizontal: -24, paddingBottom: 20, borderBottomColor: '#DEDEDE', borderBottomWidth: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Button
              icon="chevron-down"
              mode="outlined"
              style={[styles.button, { marginLeft: 24 }]}
              buttonColor="#FFF"
              textColor="#9C9C9C"
              contentStyle={{ flexDirection: 'row-reverse' }}
              onPress={() => categoriesHandler()}
            >
              <Text>Categorías</Text>
            </Button>
            <Button
              icon="chevron-down"
              mode="outlined"
              style={styles.button}
              buttonColor="#FFF"
              textColor="#9C9C9C"
              contentStyle={{ flexDirection: 'row-reverse' }}
              onPress={() => pricesHandler()}
            >
              <Text>Precios</Text>
            </Button>
            <Button
              icon="chevron-down"
              mode="outlined"
              style={styles.button}
              buttonColor="#FFF"
              textColor="#9C9C9C"
              contentStyle={{ flexDirection: 'row-reverse' }}
              onPress={() => distancesHandler()}
            >
              <Text style={styles.buttonText}>Distancia</Text>
            </Button>
          </ScrollView>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: -24 }}>
          <View>
            <Text style={{ paddingTop: 24, paddingHorizontal: 24, fontWeight: '700', fontSize: 22 }}>
              Reparación
            </Text>
            <Cards />
          </View>
          <View>
            <Text style={{ paddingTop: 24, paddingHorizontal: 24, fontWeight: '700', fontSize: 22 }}>
              Hogar
            </Text>
            <Cards />
          </View>
        </ScrollView>
        <BottomSheet
          snapTo={'50%'}
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
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE",
    backgroundColor: '#FFF',
    color: '#9C9C9C',
  },
  buttonText: {
    color: '#9C9C9C',
  },
})