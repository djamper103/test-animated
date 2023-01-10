import {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const UseAnimatedStyleComponent: FC = () => {
  const width = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  // attach animated style to a View using style property
  return <Animated.View style={[styles.box, animatedStyle]} />;
};

const styles = StyleSheet.create({
  box: {
    height: 50,
    backgroundColor: 'blue',
  },
});
