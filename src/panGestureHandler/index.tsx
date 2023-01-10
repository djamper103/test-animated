import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {PanHandlerItem} from './panGestureHandlerItem';

const array = [{id: 1}, {id: 2}, {id: 3}];

export const PanHandler: FC = ({}) => {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {array.map((el: any) => {
          return <PanHandlerItem data={el} key={el.id} />;
        })}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  block: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});
