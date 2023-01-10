import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type ContextType = {
  translateX: number;
  translateY: number;
};

interface PanHandlerItem {
  data: {id: number};
}

export const PanHandlerItem: FC<PanHandlerItem> = ({data}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {},
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: Math.abs(translateX.value),
      height: Math.abs(translateY.value),
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[animatedStyle, styles.block]}>
          <Text>{data.id}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  block: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});
