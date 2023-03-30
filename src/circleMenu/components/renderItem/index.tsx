import React, {FC, useEffect} from 'react';
import {Image, Pressable, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

interface CircleMenuRenderItemProps {
  data: any;
  sizeContainer?: number;
  sizeImage?: number;
  rotateDeg?: number;
  progressStartX?: number;
  progressStartY?: number;
  opacityValueStart?: number;
  durationArrayRevers?: number[];
  sourceIcon?: any;
  isMenuOpen?: boolean;
  imageStyle?: any;
  isSvg?: boolean;
  onPress: (value: any) => void;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const CircleMenuRenderItem: FC<CircleMenuRenderItemProps> = ({
  data,
  sizeImage = 60,
  rotateDeg = 0,
  progressStartX = 0,
  progressStartY = 0,
  opacityValueStart = 0,
  durationArrayRevers = [],
  sourceIcon,
  isMenuOpen = false,
  isSvg = false,
  imageStyle,
  onPress,
}) => {
  const onPressItem = () => {
    onPress(data);
  };

  const progressX = useSharedValue(progressStartX);
  const progressY = useSharedValue(progressStartY);
  const opacityValue = useSharedValue(opacityValueStart);

  useEffect(() => {
    const duration = isMenuOpen
      ? (data.index + 1) * 600
      : (durationArrayRevers[data.index] + 1) * 600; // when the menu is open, change the order of closing to the opposite of opening
    if (isMenuOpen) {
      progressX.value = withTiming(data.x, {
        duration,
      });
      progressY.value = withTiming(data.y, {
        duration,
      });
      opacityValue.value = withTiming(1, {
        duration,
      });
    } else {
      progressX.value = withTiming(progressStartX, {
        duration,
      });
      progressY.value = withTiming(progressStartY, {
        duration,
      });
      opacityValue.value = withTiming(opacityValueStart, {
        duration,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  const style = useAnimatedStyle(() => {
    return {
      top: progressY.value,
      left: progressX.value,
      opacity: opacityValue.value,
      position: 'absolute',
      transform: [{rotate: `${rotateDeg}deg`}],
      width: sizeImage,
      height: sizeImage,
    };
  });
  return (
    <View>
      {isSvg ? (
        <Path d={data.d} fill={data.fill} key={data.key} />
      ) : (
        <Pressable onPress={onPressItem}>
          <AnimatedImage
            style={[imageStyle && imageStyle, style]}
            source={
              sourceIcon
                ? sourceIcon[data.index]
                : {
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }
            }
          />
        </Pressable>
      )}
      {/* <Path d={data.d} fill={data.fill} key={data.key} />
      <Pressable onPress={onPressItem}>
        <AnimatedImage
          style={[imageStyle && imageStyle, style]}
          source={
            sourceIcon
              ? sourceIcon[data.index]
              : {
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }
          }
        />
      </Pressable> */}
    </View>
  );
};
