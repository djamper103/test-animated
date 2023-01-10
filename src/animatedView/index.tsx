import React from 'react';
import {Text} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

export const AnimatedView = () => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        width: '90%',
        backgroundColor: '#c41c1ccc',
        position: 'absolute',
        padding: 20,
        alignItems: 'center',
        top: 600,
        left: 20,
        right: 20,
        borderRadius: 8,
      }}>
      <Text style={{color: 'white', fontSize: 24}}>{'I am a 🍞er'}</Text>
    </Animated.View>
  );
};
