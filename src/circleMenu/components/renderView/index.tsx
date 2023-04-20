import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {CircleMenuAdditionalMenu} from '../additionalMenu';
import {CircleMenuCenterComponent} from '../centerComponent';
import {CircleMenuSvgPath} from '../svgPath';

interface CircleMenuRenderViewProps {
  data: any[];
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
  isIconShow?: boolean;
  additionalMenuArray?: any[];
  iconStyle?: any;
  containerCenterStyle?: any;
  conatainerMainStyle?: any;
  containerCenterTextStyle?: any;
  centerIconStyle?: any;
  onPressMenuItem: (value: any) => void;
  onPressAdditionalMenu: (value: any) => void;
  onPressCenterMenu: () => void;
}

export const CircleMenuRenderView: FC<CircleMenuRenderViewProps> = ({
  data,
  sizeContainer = 400,
  sizeImage = 60,
  rotateDeg = -120,
  rotateDegAbs = 120,
  progressStartX = 0,
  progressStartY = 0,
  opacityValueStart = 0,
  durationArrayRevers = [],
  sourceIcon,
  isContainerCenter = true,
  isMenuOpen = false,
  isIconShow = true,
  additionalMenuArray = [],
  iconStyle,
  containerCenterStyle,
  conatainerMainStyle,
  containerCenterTextStyle,
  centerIconStyle,
  onPressCenterMenu,
  onPressMenuItem,
  onPressAdditionalMenu,
}) => {
  return (
    <View
      style={[
        styles.container,
        conatainerMainStyle,
        {transform: [{rotate: `${rotateDeg}deg`}]},
      ]}>
      <CircleMenuSvgPath
        data={data}
        rotateDeg={rotateDeg}
        sizeContainer={sizeContainer}
      />

      <View style={[styles.containerIcons, {transform: [{rotate: `${0}deg`}]}]}>
        {data.length > 0 &&
          data.map(item => {
            return (
              <CircleMenuAdditionalMenu
                data={item}
                sizeImage={sizeImage}
                rotateDeg={rotateDegAbs}
                progressStartX={progressStartX}
                progressStartY={progressStartY}
                opacityValueStart={opacityValueStart}
                durationArrayRevers={durationArrayRevers}
                sourceIcon={sourceIcon}
                isMenuOpen={isMenuOpen}
                iconStyle={iconStyle}
                additionalMenuArray={additionalMenuArray}
                onPressMenuItem={onPressMenuItem}
                onPressAdditionalMenu={onPressAdditionalMenu}
                key={item.index}
              />
            );
          })}
      </View>

      {isContainerCenter && (
        <CircleMenuCenterComponent
          text="What are you doing?"
          rotateDeg={rotateDegAbs}
          isMenuOpen={isMenuOpen}
          isIconShow={isIconShow}
          containerStyle={containerCenterStyle}
          textStyle={containerCenterTextStyle}
          centerIconStyle={centerIconStyle}
          onPress={onPressCenterMenu}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  containerIcons: {
    position: 'absolute',
  },
});
