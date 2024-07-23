import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { OnBoardingData } from '../../data/data';
import LottieView from 'lottie-react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Image } from 'expo-image';

type Props = {
  item: OnBoardingData;
  index: number;
  x: SharedValue<number>;
}

const RenderItem = ({ item, index, x }: Props) => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [200, 0, -200],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ translateY: translateYAnimation }]
    }
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ scale: scale }]
    }
  })

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            backgroundColor: item.backgroundColor,
            borderRadius: SCREEN_WIDTH / 2,
          }, circleAnimation]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <Image
          source={item.animation}
          style={[{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }, { resizeMode: 'contain' }]}
        />
        <Text style={[styles.itemText, { color: item.textColor }]}>{item.text}</Text>
        <Text style={[styles.subitemText, { color: item.subcolor }]}>{item.subtitle}</Text>
      </Animated.View>
    </View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120,
  },
  itemText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  subitemText: {
    fontSize: 18,
    marginHorizontal: 20,
    fontWeight: '600',
    marginTop: 15,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})