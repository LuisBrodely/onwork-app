import { View, Text, Pressable, Button } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { BottomSheet, BottomSheetMethods } from '@/shared/components/BottomSheet'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryList } from "@/shared/components/(modals)/CategoryList";
import { DistanceList } from "@/shared/components/(modals)/DistanceList";
import { PriceList } from "@/shared/components/(modals)/PriceList";

export default function Search() {

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
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Button
          title='Categories'
          onPress={() => categoriesHandler()} />
        <Button
          title='Prices'
          onPress={() => pricesHandler()} />
        <Button
          title='Distances'
          onPress={() => distancesHandler()} />
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