import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {BACK_GROUND_ICON} from '../constants/images';
import {height, width} from '../utils/dimensions';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const AnimatedSensorComponent = () => {
  const IMAGE_OFFSET = 100;
  // const PI = Math.PI;
  // const HALF_PI = PI / 2;
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION); // <- initialization
  const style = useAnimatedStyle(() => {
    // return {
    //   transform: [{translateX: 0}, {translateY: 0}],
    // };
    const yaw = Math.abs(animatedSensor.sensor.value.yaw);
    const pitch = Math.abs(animatedSensor.sensor.value.pitch);
    return {
      // height: withTiming(yaw * 200 + 20, {duration: 100}), // <- usage
      // width: withTiming(pitch * 200 + 20, {duration: 100}), // <- usage
      transform: [
        {translateX: animatedSensor.sensor.value.qy * 100},
        {translateY: animatedSensor.sensor.value.qx * 100},
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* <Animated.View> */}

      <AnimatedImage
        style={[
          {
            width: width + 2 * IMAGE_OFFSET,
            height: height + 2 * IMAGE_OFFSET,
            position: 'absolute',
            top: -100,
            left: -100,
          },
          style,
        ]}
        // style={[styles.image, style]}
        source={BACK_GROUND_ICON}
      />
      {/* <Animated.View
        style={[
          {backgroundColor: 'black', width: width / 2, height: height / 2},
          style,
        ]}
      /> */}

      {/* </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
  },
});
