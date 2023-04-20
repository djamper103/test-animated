import React, {FC, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CIRCLE_MENU_ICONS_BY_KEYS} from '../consts/images';
import {CircleMenuRenderView} from './components/renderView';

interface CircleMenuComponentProps {}

export const CircleMenuComponent: FC<CircleMenuComponentProps> = ({}) => {
  ///Circle Menu
  const [circleMenuData, setCircleMenuData] = useState<any[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isIconShow, setIsIconShow] = useState<boolean>(false);

  const [durationArrayRevers, setDurationArrayRevers] = useState<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSliceColor, setIsSliceColor] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  ///
  const sizeContainer = 400; //container size
  const sizeImage = sizeContainer / 6.5; //image size

  const distanceToCenter = 1.2;
  /*the distance to the center of the container
   *is selected depending on the size of the container and task, more = further
   */

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

  //function start values

  //creacte render array
  const colorArr = [
    '#52ece9',
    '#30a6a3',
    '#aee7e5',
    '#52ece9',
    '#30a6a3',
    '#aee7e5',
  ]; //color the slice
  const numberOfSlice = 6; //number for slice

  //create start array with colors and persent of circle
  const slices = new Array(numberOfSlice).fill(0).map((_, index) => {
    return {
      percent: 1 / numberOfSlice, //the percentage of the circle that the element occupies
      color: isSliceColor ? colorArr[index] || 'gray' : 'transparent',
      isVisable: index > 2 ? false : true, //visible or not menu item
    };
  });

  //function calculate array items with their position in circle

  const slice = () => {
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
      setDurationArrayRevers((el: any) => [index, ...el]);

      const x =
        sizeContainer / 2 -
        sizeImage / 2 +
        (startX / distanceToCenter + endX / distanceToCenter) * 100;
      /*icon position, left
       *sizeContainer / 2 - sizeImage / 2 - calculate center positin, startY, endY - container position calculated as a 0.1222.
       */
      const y =
        sizeContainer / 2 -
        sizeImage / 2 +
        (startY / distanceToCenter + endY / distanceToCenter) * 100;
      /*icon position, top
       *sizeContainer / 2 - sizeImage / 2 - calculate center positin, startY, endY - container position calculated as a 0.1222.
       */
      return {
        d: pathData,
        fill: item.color,
        key: pathData,
        endX,
        endY,
        x,
        y,
        isVisible: item.isVisable,
        index,
      };
    });
  };

  useEffect(() => {
    setCircleMenuData(slice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //additional menu
  const onPressAdditionalMenu = (value: any) => {
    console.log(value);
  };

  const distanceToCenterAdditional = 1; //the distance to the center of the container for additional menu

  const [additionalMenuArray, setAdditionalMenuArray] = useState([]);

  const additionalMenuArrayFunc = () => {
    const result: any = [];
    [...circleMenuData].forEach((item: any) => {
      const resultIntermediate: any = [];
      [...circleMenuData].forEach((item1: any, index: number) => {
        resultIntermediate.push({
          x: (item.x / 100 + item1.endX * distanceToCenterAdditional) * 100,
          y: (item.y / 100 + item1.endY * distanceToCenterAdditional) * 100,
          isVisible: true,
          index,
        });
      });
      result.push(resultIntermediate);
    });
    setAdditionalMenuArray(result);
  };

  useEffect(() => {
    circleMenuData.length > 0 && additionalMenuArrayFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleMenuData]);
  //
  return (
    <CircleMenuRenderView
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
      isIconShow={isIconShow}
      additionalMenuArray={additionalMenuArray}
      iconStyle={styles.iconStyle}
      containerCenterStyle={containerStyleCenterComponent}
      conatainerMainStyle={styles.conatainerMainStyle}
      centerIconStyle={styles.centerIconStyle}
      onPressCenterMenu={onPressCenterMenu}
      onPressMenuItem={onPressCircleMenuItem}
      onPressAdditionalMenu={onPressAdditionalMenu}
    />
  );
};
const styles = StyleSheet.create({
  imageStyleCircleMenu: {},
  conatainerMainStyle: {},
  iconStyle: {},
  centerIconStyle: {},
});
