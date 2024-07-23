import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

export const DistanceList = () => {
  const [price, setPrice] = useState([10, 9999]);
  const [distance, setDistance] = useState(100);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={styles.title}>Distance</Text>
          <Text style={styles.value}>{distance}km</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#EF3166"
            maximumTrackTintColor="#C7C7CC"
            thumbTintColor="#EF3166"
            step={1}
            value={distance}
            onValueChange={value => setDistance(value)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#EF3166',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
});
