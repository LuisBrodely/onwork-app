import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  index: number;
  x: SharedValue<number>;
}

const Dot = ({ index, x }: Props) => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [15, 25, 15],
      Extrapolation.CLAMP
    );
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation
    }
  })

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#FF6A5C', '#EF3166', '#5DC3B2'],
    );
    return {
      backgroundColor: backgroundColor
    }
  });

  return (
    <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />
  )
}

export default Dot

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10
  }
})