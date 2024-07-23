import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { AnimatedRef, SharedValue } from 'react-native-reanimated';
import { OnBoardingData } from '@/shared/data/data';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  flatListRef: AnimatedRef<FlatList<OnBoardingData>>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  x: SharedValue<number>;
}

const CustomButton = ({ dataLength, flatListIndex, flatListRef, x }: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          console.log("Navegar a la siguiente pantalla");
        }
      }}
    >
      <View style={styles.container}>
        <Ionicons name='arrow-forward' size={24} color='white' styles={styles.arrow} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 60,
    height: 60,
  },
  arrow: {
    position: 'absolute',
    right: 30,
    bottom: 30
  }
})