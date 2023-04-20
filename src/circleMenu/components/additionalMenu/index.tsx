import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {CircleMenuRenderItem} from '../renderItem';

interface CircleMenuAdditionalMenuProps {
  data: any;
  sizeContainer?: number;
  sizeImage?: number;
  rotateDeg?: number;
  rotateDegAbs?: number;
  progressStartX?: number;
  progressStartY?: number;
  opacityValueStart?: number;
  durationArrayRevers?: number[];
  sourceIcon?: any;
  isContainerCenter?: boolean;
  isMenuOpen?: boolean;
  iconStyle?: any;
  containerStyleCenterComponent?: any;
  additionalMenuArray?: any[];
  onPressMenuItem: (value: any) => void;
  onPressAdditionalMenu: (value: any) => void;
}

export const CircleMenuAdditionalMenu: FC<CircleMenuAdditionalMenuProps> = ({
  data,
  sizeImage = 60,
  rotateDegAbs = 120,
  progressStartX = 0,
  progressStartY = 0,
  opacityValueStart = 0,
  durationArrayRevers = [],
  sourceIcon,
  isMenuOpen = false,
  iconStyle,
  additionalMenuArray = [],
  onPressMenuItem,
  onPressAdditionalMenu,
}) => {
  const [isAdditional, setIsOdditional] = useState(false);
  const onPressMain = () => {
    onPressMenuItem(data);
    setIsOdditional(!isAdditional);
  };

  const onPressAdditional = () => {
    onPressAdditionalMenu(data);
    setIsOdditional(!isAdditional);
  };
  return (
    <View>
      <CircleMenuRenderItem
        data={data}
        sizeImage={sizeImage}
        rotateDeg={rotateDegAbs}
        progressStartX={progressStartX}
        progressStartY={progressStartY}
        opacityValueStart={opacityValueStart}
        durationArrayRevers={durationArrayRevers}
        sourceIcon={sourceIcon}
        isMenuOpen={isMenuOpen}
        iconStyle={iconStyle}
        onPress={onPressMain}
      />
      {additionalMenuArray.length > 0 &&
        additionalMenuArray[data.index].map((item: any) => {
          return (
            <CircleMenuRenderItem
              data={item}
              sizeImage={sizeImage}
              rotateDeg={rotateDegAbs}
              progressStartX={data.x}
              progressStartY={data.y}
              opacityValueStart={opacityValueStart}
              durationArrayRevers={durationArrayRevers}
              sourceIcon={sourceIcon}
              isMenuOpen={isAdditional}
              iconStyle={iconStyle}
              onPress={onPressAdditional}
              key={item.x}
            />
          );
        })}
    </View>
  );
};
