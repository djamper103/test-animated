import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PuzzleRenderArray} from '../../../types/puzzle';

interface RenderComponentProps {
  data: PuzzleRenderArray;
  isNullValue: boolean;
  positionTarget: any;
  onPress: (value: PuzzleRenderArray) => void;
  positionArrayFunc: (value: any) => void;
  setPositionTargetNull: () => void;
  setArrayCurrentFunc: () => void;
}

export const RenderComponent: FC<RenderComponentProps> = ({
  data,
  isNullValue,
  positionTarget,
  onPress,
  positionArrayFunc,
  setPositionTargetNull,
  setArrayCurrentFunc,
}) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (positionTarget.id === data.id) {
      positionTarget.positionType === 'x'
        ? (offsetX.value = positionTarget.x)
        : (offsetY.value = positionTarget.y);
      setPositionTargetNull();
      setArrayCurrentFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionTarget]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isNullValue ? 'transparent' : 'red',
      transform: [
        {translateY: withSpring(offsetY.value)},
        {translateX: withSpring(offsetX.value)},
      ],
    };
  });

  const aref = useAnimatedRef<any>();

  useEffect(() => {
    if (aref && aref.current) {
      aref.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setCount(1);
          positionArrayFunc({x: pageX, y: pageY, id: data.id, url: data.url});
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aref.current]);

  const onPressItem = () => {
    onPress(data);
  };

  return (
    <Pressable onPress={onPressItem}>
      <Animated.View style={[animatedStyle, styles.container]} ref={aref}>
        <Text style={[isNullValue && styles.text]}>{data.url}</Text>
        {/* <Image
          style={styles.image}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        /> */}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'transparent',
  },
  image: {
    width: 70,
    height: 70,
  },
});
