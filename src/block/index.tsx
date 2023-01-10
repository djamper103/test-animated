import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface BlockProps {
  delay: number;
}

export const Block: FC<BlockProps> = ({delay = 1000}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      // random offset to make it prettier
      delay,
      withRepeat(
        withSequence(
          withTiming(0.4, {duration: 1000}),
          withTiming(1, {duration: 1000}),
        ),
        // "-1" => the loop is infinite
        -1,
        // "true" => when the animation has ended, it is triggered backwards
        true,
      ),
    ),
  }));

  return <Animated.View style={[animatedStyle, styles.block]} />;
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});
