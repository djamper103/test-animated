import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface RenderItemComponentProps {
  data: any;
  addItem: () => void;
  deleteItem: (value: any) => void;
  containerStyle?: ViewStyle;
}

export const RenderItemComponent: FC<RenderItemComponentProps> = ({
  data,
  addItem,
  deleteItem,
  containerStyle,
}) => {
  const onAddItem = () => {
    addItem();
  };
  const onDeleteitem = () => {
    deleteItem(data);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onAddItem} style={styles.containerButton}>
        <Text style={[styles.text, styles.textButton]}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeleteitem} style={styles.containerButton}>
        <Text style={[styles.text, styles.textButton]}>X</Text>
      </TouchableOpacity>
      <Text style={styles.text}>id: {data.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#78CAD2',
    marginVertical: 20,
    borderRadius: 10,
  },
  containerButton: {},
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
  textButton: {
    fontSize: 16,
  },
});
