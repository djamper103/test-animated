import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg from 'react-native-svg';
import {CircleMenuCenterComponent} from './components/centerComponent';
import {CircleMenuRenderItem} from './components/renderItem';

interface CircleMenuComponentProps {
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
  isSvg?: boolean;
  imageStyle?: any;
  containerStyleCenterComponent?: any;
  onPress: (value: any) => void;
  onPressCenterMenu: () => void;
}

export const CircleMenuComponent: FC<CircleMenuComponentProps> = ({
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
  isSvg = false,
  imageStyle,
  containerStyleCenterComponent,
  onPress,
  onPressCenterMenu,
}) => {
  return (
    <View style={{transform: [{rotate: `${rotateDeg}deg`}]}}>
      {isSvg && (
        <Svg
          height={sizeContainer}
          width={sizeContainer}
          viewBox="-1 -1 2 2"
          // style={{transform: [{rotate: `${0}deg`}]}}
        >
          {data.length > 0 &&
            data.map(item => {
              return (
                <CircleMenuRenderItem
                  data={item}
                  sizeImage={sizeImage}
                  rotateDeg={rotateDegAbs}
                  progressStartX={progressStartX}
                  progressStartY={progressStartY}
                  opacityValueStart={opacityValueStart}
                  durationArrayRevers={durationArrayRevers}
                  sourceIcon={sourceIcon}
                  isMenuOpen={isMenuOpen}
                  imageStyle={imageStyle}
                  onPress={onPress}
                  isSvg={isSvg}
                  key={item.d}
                />
              );
            })}
        </Svg>
      )}
      <View style={styles.containerIcons}>
        {data.length > 0 &&
          data.map(item => {
            return (
              <CircleMenuRenderItem
                data={item}
                sizeImage={sizeImage}
                rotateDeg={rotateDegAbs}
                progressStartX={progressStartX}
                progressStartY={progressStartY}
                opacityValueStart={opacityValueStart}
                durationArrayRevers={durationArrayRevers}
                sourceIcon={sourceIcon}
                isMenuOpen={isMenuOpen}
                imageStyle={imageStyle}
                onPress={onPress}
                key={item.index}
              />
            );
          })}
      </View>

      {isContainerCenter && (
        <CircleMenuCenterComponent
          text="What are you doing?"
          rotateDeg={rotateDegAbs}
          containerStyle={containerStyleCenterComponent}
          onPress={onPressCenterMenu}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containerIcons: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
