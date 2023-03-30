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

  ///Circle Menu
  const [circleMenuData, setCircleMenuData] = useState<any[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // const [durationArrayRevers, setDurationArrayRevers] = useState<
  //   {id: number; duration: number}[]
  // >([]);

  const [durationArrayRevers, setDurationArrayRevers] = useState<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSliceColor, setIsSliceColor] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSvg, setIsSvg] = useState<boolean>(true); // show svg or not

  ///
  const sizeContainer = 400; //container size
  const sizeImage = sizeContainer / 6.5; //image size

  const distanceToCenter = 1.2;
  /*the distance to the center of the container
   *is selected depending on the size of the container and task, more = further
   */
  ///

  const rotateDeg = -120; // container rotate deg
  const rotateDegAbs = Math.abs(rotateDeg); // center container,text,icon rotate deg

  const progressStartX = sizeContainer / 2 - sizeImage / 2; //start icon positin, left
  const progressStartY = sizeContainer / 2 - sizeImage / 2; //start icon positin, top

  const opacityIconStartCircleMenu = 0; //start  opacity icon value 0 or 1

  const sourceIconCircleMenu = CIRCLE_MENU_ICONS_BY_KEYS; //array of icons

  //centerContainer
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isContainerCenter, setIsContainerCenter] = useState<boolean>(true);

  const centerContainerSize = sizeContainer / 2.5; // center container size
  const centerContainerPosition = sizeContainer / 2 - centerContainerSize / 2; // center container center position

  const containerStyleCenterComponent = {
    width: centerContainerSize,
    height: centerContainerSize,
    borderRadius: sizeContainer / 2,
    // backgroundColor: 'white',
    top: centerContainerPosition,
    left: centerContainerPosition,
  };

  //
  const onPressCenterMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onPressCircleMenuItem = (value: any) => {
    console.log(value);
  };

  const slice = () => {
    const colorArr = [
      '#52ece9',
      '#30a6a3',
      '#aee7e5',
      '#52ece9',
      '#30a6a3',
      '#aee7e5',
    ]; //color the slice
    const numberOfSlice = 6; //number for slice

    const slices = new Array(numberOfSlice).fill(0).map((_, index) => {
      return {
        percent: 1 / numberOfSlice,
        color: isSliceColor ? colorArr[index] || 'gray' : 'transparent',
      };
    });

    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent: number) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    return slices.map((item, index: number) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += item.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = item.percent > 0.5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');

      // setDurationArrayRevers(el => [...el, {id: index, duration: index}]);
      setDurationArrayRevers(el => [index, ...el]);
      return {
        d: pathData,
        fill: item.color,
        key: pathData,
        x:
          sizeContainer / 2 -
          sizeImage / 2 +
          (startX / distanceToCenter + endX / distanceToCenter) * 100,
        /*icon position, left
         *sizeContainer / 2 - sizeImage / 2 - calculate center positin, startY, endY - container position calculated as a 0.1222.
         */
        y:
          sizeContainer / 2 -
          sizeImage / 2 +
          (startY / distanceToCenter + endY / distanceToCenter) * 100,
        /*icon position, top
         *sizeContainer / 2 - sizeImage / 2 - calculate center positin, startY, endY - container position calculated as a 0.1222.
         */
        index,
      };
    });
  };

  useEffect(() => {
    setCircleMenuData(slice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <CircleMenuComponent
        data={circleMenuData}
        sizeContainer={sizeContainer}
        sizeImage={sizeImage}
        rotateDeg={rotateDeg}
        rotateDegAbs={rotateDegAbs}
        progressStartX={progressStartX}
        progressStartY={progressStartY}
        opacityValueStart={opacityIconStartCircleMenu}
        durationArrayRevers={durationArrayRevers}
        sourceIcon={sourceIconCircleMenu}
        isContainerCenter={isContainerCenter}
        isMenuOpen={isMenuOpen}
        isSvg={isSvg}
        imageStyle={styles.imageStyleCircleMenu}
        containerStyleCenterComponent={containerStyleCenterComponent}
        onPress={onPressCircleMenuItem}
        onPressCenterMenu={onPressCenterMenu}
      />
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
