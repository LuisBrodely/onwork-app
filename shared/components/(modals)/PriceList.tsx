import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export const PriceList = () => {
  const [price, setPrice] = useState([10, 9999]);

  const handleValuesChange = (values: any) => {
    setPrice(values);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={styles.title}>Price</Text>
          <Text style={styles.value}>${price[0]} to ${price[1]}</Text>
        </View>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[price[0], price[1]]}
            min={10}
            max={9999}
            step={1}
            onValuesChange={handleValuesChange}
            selectedStyle={styles.selectedTrack}
            unselectedStyle={styles.unselectedTrack}
            markerStyle={styles.marker}
            containerStyle={styles.slider}
            trackStyle={styles.track}
          />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <Pressable
            style={{ backgroundColor: '#EF3166', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 32 }}
            onPress={() => console.log('View Results pressed range: ' + price)}
          >
            <Text style={{ color: '#fff' }}>
              View Results
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slider: {
    height: 20,
  },
  track: {
    height: 10,
    borderRadius: 10,
  },
  selectedTrack: {
    backgroundColor: '#EF3166',
  },
  unselectedTrack: {
    backgroundColor: '#C7C7CC',
  },
  marker: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#EF3166',
  },
});