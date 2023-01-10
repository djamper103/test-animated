import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface RenderContainerProps {
  data: any;
  viewableItems: any;
  rStyleObject?: Object;
  renderComponent: any;
  containerStyle?: ViewStyle;
}

export const RenderContainer: FC<RenderContainerProps> = ({
  data,
  viewableItems,
  rStyleObject,
  renderComponent,
  containerStyle,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      Object.keys(viewableItems.value).length > 0 &&
        viewableItems.value.viewableItems.find(
          (viewableItem: {item: any}) => viewableItem.item.id === data.id,
        ),
    );
    return rStyleObject
      ? rStyleObject
      : {
          opacity: withTiming(isVisible ? 1 : 0),
          transform: [
            {
              scale: withTiming(isVisible ? 1 : 0.6),
            },
          ],
        };
  }, []);

  return (
    <Animated.View style={[styles.container, rStyle, containerStyle]}>
      {renderComponent}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#78CAD2',
    width: '90%',
    height: 80,
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  containerMain: {},
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
});
