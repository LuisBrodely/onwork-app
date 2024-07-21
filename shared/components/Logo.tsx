import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.onwork}>OnWork</Text>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onwork: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 22,
    height: 22,
    marginBottom: 18,
  },
});

export default Logo;
