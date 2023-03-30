import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CenterIcon} from '../centerIcon';

interface CircleMenuCenterComponentProps {
  text?: string;
  rotateDeg?: number;
  containerStyle?: any;
  textStyle?: any;
  onPress?: () => void;
}

export const CircleMenuCenterComponent: FC<CircleMenuCenterComponentProps> = ({
  text = 'What are you doing?',
  rotateDeg = 0,
  containerStyle,
  textStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {true ? (
        <CenterIcon rotateDeg={rotateDeg} onPress={onPress} />
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
