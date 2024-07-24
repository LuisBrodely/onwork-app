import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const Graphs = () => {
  return (
    <View>
      <Image
        style={{ width: 400, height: 400, resizeMode: "contain" }}
        source={{ uri: "https://onwork.s3.amazonaws.com/publication/daily_average_valoration_with_forecast_1d7c8d0a-6ec5-4d71-9f11-c5f9eb56cec8.png" }}
      />
    </View>
  )
}

export default Graphs

const styles = StyleSheet.create({})