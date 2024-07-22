import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const categories = () => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  return (
    <View style={style.container}>
      <BottomSheet 
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      >
        <View style={{ backgroundColor: 'white', padding: 16 }}>
          <Text>Categorías</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default categories;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: 'black',
    opacity: 0.5
  }
})