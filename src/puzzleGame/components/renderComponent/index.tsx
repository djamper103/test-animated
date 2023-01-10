import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PuzzleRenderArray} from '../../../types/puzzle';

interface RenderComponentProps {
  data: PuzzleRenderArray;
  isNullValue: boolean;
  onPress: (value: PuzzleRenderArray, position: any) => void;
  positionTarget: any;
}

export const RenderComponent: FC<RenderComponentProps> = ({
  data,
  isNullValue,
  onPress,
  positionTarget,
}) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  // console.log(targetX);
  // useEffect(() => {
  //   if (targetX.valueTarget && targetX.valueTarget.id === data.id) {
  //     console.log(targetX);
  //     targetX.x !== 0 && (offsetX.value = offsetX.value + targetX.x);
  //     targetX.y !== 0 && (offsetY.value = offsetY.value + targetX.y);
  //   }
  // }, [data.id, offsetX, offsetY, targetX]);
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

  const [position, setPosition] = useState({});

  // useEffect(() => {
  //   if (aref && aref.current) {
  //     aref.current.measure(
  //       (
  //         x: number,
  //         y: number,
  //         width: number,
  //         height: number,
  //         pageX: number,
  //         pageY: number,
  //       ) => {
  //         setPosition({x: pageX, y: pageY});
  //       },
  //     );
  //   }
  // }, [aref]);

  const onPressItem = () => {
    onPress(data, position);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]} ref={aref}>
      <Pressable onPress={onPressItem}>
        <View />
        <Text style={[isNullValue && styles.text]}>{data.id}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // container: {
  //   width: 70,
  //   height: 70,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // position: 'absolute',
  // },
  text: {
    color: 'white',
  },
});
