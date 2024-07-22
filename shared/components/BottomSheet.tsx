import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { BackDrop } from './(modals)/BackDrop';

type Props = {
  snapTo: string;
  backgroundColor: string;
  backDropColor: string;
  children?: React.ReactNode;
};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

export const BottomSheet = forwardRef<BottomSheetMethods, Props>(({ snapTo, backgroundColor, backDropColor, children }: Props, ref) => {

  const { height } = Dimensions.get('screen');
  const closeHeight = height;
  const percentage = parseFloat(snapTo.replace('%', '')) / 100;
  const openHeight = height - height * percentage;
  const topAnimation = useSharedValue(closeHeight);
  const context = useSharedValue(0);

  const expand = useCallback(() => {
    'worklet'
    topAnimation.value = withTiming(openHeight)
  }, [openHeight, topAnimation]);

  const close = useCallback(() => {
    'worklet'
    topAnimation.value = withTiming(closeHeight)
  }, [closeHeight, topAnimation]);


  useImperativeHandle(ref, () => ({
    expand,
    close
  }), [expand, close]);


  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;
    return {
      top,
    }
  })

  const pan = Gesture.Pan().onBegin(() => {
    context.value = topAnimation.value;
  }).onUpdate((event) => {
    if (event.translationY < 0) {
      topAnimation.value = withSpring(openHeight, {
        damping: 100,
        stiffness: 400,
      })
    } else {
      topAnimation.value = withSpring(context.value + event.translationY, {
        damping: 100,
        stiffness: 400,
      });
    }
  }).onEnd(() => {
    if (topAnimation.value > openHeight + 50) {
      topAnimation.value = withSpring(closeHeight, {
        damping: 100,
        stiffness: 400,
      })
    } else {
      topAnimation.value = withSpring(openHeight, {
        damping: 100,
        stiffness: 400,
      })
    }
  })


  return (
    <>
      <BackDrop
        topAnimation={topAnimation}
        closeHeight={closeHeight}
        openHeight={openHeight}
        close={close}
        backDropColor={backDropColor}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, animationStyle, {
          backgroundColor: backgroundColor,
        }]}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          {
            children
          }
        </Animated.View>
      </GestureDetector>
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: '#C7C7CC',
    borderRadius: 20,
  },
})