import React, {FC} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {MENU_ICON} from '../../../consts/images';

interface CenterIconProps {
  imageStyle?: any;
  rotateDeg?: number;
  onPress?: () => void;
}

export const CenterIcon: FC<CenterIconProps> = ({
  rotateDeg,
  imageStyle,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={MENU_ICON}
        style={[
          styles.image,
          imageStyle,
          {
            transform: [{rotate: `${rotateDeg}deg`}],
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
});
