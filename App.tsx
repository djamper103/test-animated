import React, {useEffect, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  withTiming,
  useAnimatedSensor,
  SensorType,
} from 'react-native-reanimated';
import {AnimatedCircleComponent} from './src/animatedCircle';
import {AnimatedFlatList} from './src/animatedFlatList/inxdex';
import {AnimatedSensorComponent} from './src/animatedSensor';

import {AnimatedView} from './src/animatedView';
import {Block} from './src/block';
import {CardView} from './src/cardView';
import {CircleMenuComponent} from './src/circleMenu';
import {CIRCLE_MENU_ICONS_BY_KEYS} from './src/consts/images';
import {GraphComponent} from './src/grahpComponent';
import {PanHandler} from './src/panGestureHandler';
import {PuzzleGame} from './src/puzzleGame';
import {ScrollExample} from './src/scrollExample';
import {ScrollPage} from './src/scrollPage';
import {SwitchComponent} from './src/switchComponent/index';
import {SwitchComponet1} from './src/switchComponet1';
import {UseAnimatedStyleComponent} from './src/useAnimatedStyle';

const App = () => {
  // useEffect(() => {
  // //   setTimeout(() => {
  // //     BackHandler.exitApp();
  // //  }, 2000);
  // }, []);
  const opacity = useSharedValue(1);

  const scale = useSharedValue(2);

  const bar = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, [opacity, scale]);

  const [isView, setIsView] = useState(false);

  //////////////////////

  const translateX = useSharedValue(0);

  const [progressValue, setProgressValue] = useState<number>(20);
  const [progressValue1, setProgressValue1] = useState<number>(25);
  // useEffect(() => {
  //   setInterval(() => setProgressValue(el => el + 1), 1000);
  // }, []);

  return (
    <View style={styles.container}>
      {/* <GraphComponent /> */}
      {/* <AnimatedSensorComponent /> */}
      {/* <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="opacity"
        onPress={() => {
          opacity.value = withRepeat(withSpring(0.5), 3, true);
        }}
      />
      <Button
        title="scale +"
        onPress={() => {
          scale.value = withSpring(1);
        }}
      />
      <Button
        title="scale -"
        onPress={() => {
          scale.value = withRepeat(withSpring(1.5), 4, true);
        }}
      />
      <Animated.View style={[styles.test, animatedStyle1]} />
      <Button
        title="bar +"
        onPress={() => {
          bar.value = bar.value <= 100 ? bar.value + 10 : bar.value;
        }}
      />
      <Button
        title="bar -"
        onPress={() => {
          bar.value = bar.value >= 10 ? bar.value - 10 : bar.value;
        }}
      />
      <Block delay={1000} />
      <Block delay={2000} />
      <Block delay={3000} /> */}
      {/* <Button title="Animated View" onPress={setModal} />
      {isView && <AnimatedView />} */}
      {/* <PanHandler /> */}
      {/* <Animated.ScrollView
        onScroll={scrollHandler}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        style={styles.container}>
        {ScrollPageArray.map((el, index) => {
          return (
            <ScrollPage
              title={el}
              index={index}
              key={el}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView> */}
      {/* <SwitchComponent /> */}
      {/* <SwitchComponet1 /> */}
      {/* <ScrollExample /> */}
      {/* <UseAnimatedStyleComponent /> */}
      {/* <CardView /> */}
      {/* <AnimatedFlatList /> */}
      {/* <PuzzleGame /> */}
      {/* <AnimatedCircleComponent
        progressValue={progressValue}
        progressValue1={progressValue1}
      /> */}
      <CircleMenuComponent />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 50,
    height: '100%',
    width: '100%',
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: 'blue',
  },
  test: {
    height: 20,
    width: 0,
    marginVertical: 50,
    borderRadius: 5,
  },
  imageStyleCircleMenu: {},
});
