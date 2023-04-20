import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CenterIcon} from '../centerIcon';

interface CircleMenuCenterComponentProps {
  text?: string;
  rotateDeg?: number;
  isMenuOpen?: boolean;
  isIconShow?: boolean;
  containerStyle?: any;
  textStyle?: any;
  centerIconStyle?: any;
  onPress?: () => void;
}

export const CircleMenuCenterComponent: FC<CircleMenuCenterComponentProps> = ({
  text = 'What are you doing?',
  rotateDeg = 0,
  isMenuOpen = false,
  isIconShow = true,
  containerStyle,
  textStyle,
  centerIconStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {isIconShow ? (
        <CenterIcon
          rotateDeg={rotateDeg}
          isMenuOpen={isMenuOpen}
          containerStyle={centerIconStyle}
          onPress={onPress}
        />
      ) : (
        <Text
          style={[
            styles.text,
            textStyle && textStyle,
            {
              transform: [{rotate: `${rotateDeg}deg`}],
            },
          ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
});
