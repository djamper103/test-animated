import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {withDelay, withTiming} from 'react-native-reanimated';

export const CardView: FC = () => {
  const entering = (targetValues: any) => {
    'worklet';
    const animations = {
      originX: withTiming(targetValues.originX, {duration: 3000}),
      opacity: withTiming(1, {duration: 2000}),
      borderRadius: withDelay(4000, withTiming(30, {duration: 3000})),
      transform: [
        {rotate: withTiming('0deg', {duration: 4000})},
        {scale: withTiming(1, {duration: 3500})},
      ],
    };
    const initialValues = {
      originX: -50,
      opacity: 0,
      borderRadius: 10,
      transform: [{rotate: '90deg'}, {scale: 0.5}],
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <Animated.View style={[styles.animatedView]} entering={entering}>
      <Text> Card Example </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});
