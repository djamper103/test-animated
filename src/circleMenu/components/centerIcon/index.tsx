import React, {FC, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {MENU_ICON} from '../../../consts/images';

interface CenterIconProps {
  rotateDeg?: number;
  isMenuOpen?: boolean;
  withSequenceDuration?: number;
  withSequenceRotateDeg?: number;
  imageStyle?: any;
  containerStyle?: any;
  onPress?: () => void;
}

export const CenterIcon: FC<CenterIconProps> = ({
  rotateDeg,
  isMenuOpen,
  withSequenceDuration = 200,
  withSequenceRotateDeg = 10,
  imageStyle,
  containerStyle,
  onPress,
}) => {
  const [startCount, setStartCount] = useState(0);
  const progress = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${progress.value}deg`,
        },
      ],
    };
  });
  useEffect(() => {
    startCount === 0
      ? setStartCount(1)
      : (progress.value = withSequence(
          withTiming(-withSequenceRotateDeg, {duration: withSequenceDuration}),
          withTiming(withSequenceRotateDeg, {duration: withSequenceDuration}),
          withTiming(-withSequenceRotateDeg, {duration: withSequenceDuration}),
          withTiming(withSequenceRotateDeg, {duration: withSequenceDuration}),
          withTiming(-withSequenceRotateDeg, {duration: withSequenceDuration}),
          withTiming(withSequenceRotateDeg, {duration: withSequenceDuration}),
          withTiming(0, {duration: withSequenceDuration}),
        ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);
  return (
    <Animated.View style={[style, containerStyle && containerStyle]}>
      <Pressable onPress={onPress}>
        <Image
          source={MENU_ICON}
          style={[
            styles.image,
            imageStyle,
            {
              transform: [{rotate: `${rotateDeg}deg`}],
            },
          ]}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
});
