import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';
import {COLORS} from '../constants/colors';
import {height, width} from '../utils/dimensions';

interface AnimatedCircleComponentProps {
  circleLength?: number;
  radius?: number;
  strokeWidthView?: number;
  strokeWidthAnimatedView?: number;
  strokeViewColor?: any;
  strokeAnimatedViewColor?: any;
  cx?: number;
  cy?: number;
  progressValue?: number;
  progressValue1?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnimatedCircleComponent: FC<AnimatedCircleComponentProps> = ({
  circleLength = 600,
  radius = circleLength / (2 * Math.PI),
  strokeWidthView = 15,
  strokeWidthAnimatedView = 15,
  strokeViewColor = COLORS.OXFORD_BLUE,
  strokeAnimatedViewColor = COLORS.RED,
  cx = width / 2,
  cy = height / 2,
  progressValue = 0.5,
  progressValue1 = 0.5,
}) => {
  const progress = useSharedValue(0);
  const progress1 = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circleLength * (1 - progress.value),
  }));

  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: circleLength * (1 - progress1.value),
  }));

  useEffect(() => {
    progress.value = withTiming(progressValue === 60 ? 0 : progressValue / 59, {
      duration: progressValue === 60 ? 1000 : 2000,
    });

    progress1.value = withTiming(
      progressValue1 === 60 ? 0 : progressValue1 / 59,
      {
        duration: progressValue === 60 ? 1000 : 2000,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressValue]);

  const progressText = useDerivedValue(() => {
    return `${progressValue === 60 ? 0 : progressValue}`;
  });
  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={styles.containerSvg}>
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={strokeViewColor}
          strokeWidth={strokeWidthView}
          fill={COLORS.TRANSPARENT}
          // strokeDasharray={radius / 10}
        />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={strokeAnimatedViewColor}
          strokeWidth={strokeWidthAnimatedView}
          strokeDasharray={circleLength}
          animatedProps={animatedProps}
          strokeLinecap={'round'} //square
          fill={COLORS.TRANSPARENT}
        />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={'green'}
          strokeWidth={strokeWidthAnimatedView}
          strokeDasharray={circleLength}
          animatedProps={animatedProps1}
          strokeLinecap={'round'} //square
          fill={COLORS.TRANSPARENT}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.CLOUD_BURST,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSvg: {
    position: 'absolute',
  },
  progressText: {
    fontSize: 32,
    color: 'rgba(256,256,256,0.7)',
    textAlign: 'center',
    width: 100,
  },
});
