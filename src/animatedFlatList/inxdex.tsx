import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, ViewStyle} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {RenderContainer} from './components/renderContainer';
import {RenderItemComponent} from './components/renderItem';

interface AnimatedFlatListProps {
  viewAreaCoverage?: number;
  rStyleObject?: Object;
  containerStyle?: ViewStyle;
}

interface DataProps {
  index: number;
  item: {id: number};
}

export const AnimatedFlatList: FC<AnimatedFlatListProps> = ({
  rStyleObject,
  viewAreaCoverage = 8,
  containerStyle,
}) => {
  const [arrayItem, setArrayItem] = useState<any>(() =>
    new Array(50).fill(0).map((_, index) => ({id: index})),
  );
  const viewableItems = useSharedValue<any>([]);

  const onViewRef = React.useRef((item: any) => {
    viewableItems.value = item;
  });
  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: viewAreaCoverage,
  });

  const deleteItem = (value: any) => {
    setArrayItem([...arrayItem.filter((el: any) => el.id !== value.id)]);
  };

  const addItem = () => {
    setArrayItem([...arrayItem, {id: arrayItem[arrayItem.length - 1].id + 1}]);
  };

  const renderComponent = (data: DataProps) => (
    <RenderItemComponent
      data={data.item}
      deleteItem={deleteItem}
      addItem={addItem}
    />
  );

  const RenderItem: any = (data: DataProps) => {
    const component = renderComponent(data);
    return (
      <RenderContainer
        data={data.item}
        viewableItems={viewableItems && viewableItems}
        rStyleObject={rStyleObject}
        renderComponent={component}
      />
    );
  };

  return (
    <FlatList
      data={arrayItem}
      renderItem={RenderItem}
      keyExtractor={item => `${item.id}`}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      contentContainerStyle={[styles.container, containerStyle]}
      // numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
