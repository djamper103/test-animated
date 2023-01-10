import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ScrollPageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {width, height} = Dimensions.get('window');

const Size = width * 0.7;

export const ScrollPage: FC<ScrollPageProps> = ({title, index, translateX}) => {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, Size / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{scale}],
      width: Size,
      height: Size,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{translateY: translateY}],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256, 0.${index + 1})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.textContainer, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: Size,
    height: Size,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  textContainer: {position: 'absolute'},
});
