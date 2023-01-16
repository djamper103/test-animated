import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {setPositionArrayFunc} from '../common/functions/positionArrayFunc';
import {randomArrayFunc} from '../common/functions/randomArray';
import {setArrayCurrentFunc} from '../common/functions/setPositionArrayFunc';
import {PositionType, PuzzleRenderArray} from '../types/puzzle';
import {ButtonContainer} from './components/button';
import {RenderComponent} from './components/renderComponent';

interface PuzzleGameProps {
  arrayLength?: number;
  imagePath?: string;
}

export const PuzzleGame: FC<PuzzleGameProps> = ({
  arrayLength = 4,
  imagePath = 'path',
}) => {
  const [arrayCurrent, setArrayCurrent] = useState<any>([]);

  const [originLine, setOriginLine] = useState<number[]>([]);

  const [nullItem, setNullItem] = useState<
    PuzzleRenderArray | PositionType | any
  >({});

  const [positionTarget, setPositionTarget] = useState<any>({});
  const [positionArray, setPositionArray] = useState<PositionType[]>([]);

  useEffect(() => {
    const line: any = [];
    const arrayGenerate = new Array(arrayLength * arrayLength)
      .fill(0)
      .map((_, index) => {
        line.push(index);
        return {id: index, url: `${imagePath}${index}`};
      });
    originLine.length === 0 && setOriginLine(line);
    setArrayCurrent(arrayGenerate);
    setNullItem(arrayGenerate[arrayGenerate.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRandomArray = () => {
    setPositionArray([]);
    setArrayCurrent(randomArrayFunc([...arrayCurrent]));
  };

  const positionArrayFunc = (value: any) => {
    positionArray.length < arrayCurrent.length &&
      setPositionArrayFunc(value, setPositionArray);
  };

  const setPositionTargetNull = () => {
    setPositionTarget({});
  };

  const arrayCurrentFunc = () => {
    setTimeout(() => {
      setArrayCurrent(positionArray);
    }, 600);
  };

  const onPress = (value: PuzzleRenderArray) => {
    setArrayCurrentFunc(
      value,
      nullItem,
      arrayLength,
      positionArray,
      setNullItem,
      setPositionArray,
      setPositionTarget,
    );
  };

  const RenderItem: any = (data: any) => {
    return (
      <RenderComponent
        data={data.item}
        isNullValue={data.item.id === arrayCurrent.length - 1}
        positionTarget={positionTarget}
        onPress={onPress}
        positionArrayFunc={positionArrayFunc}
        setPositionTargetNull={setPositionTargetNull}
        setArrayCurrentFunc={arrayCurrentFunc}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={arrayCurrent.length > 0 && arrayCurrent}
        renderItem={RenderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={arrayLength}
        contentContainerStyle={styles.container}
      />
      <ButtonContainer onPress={onRandomArray} text={'Random array'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    paddingVertical: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  text: {
    color: 'transparent',
  },
  image: {
    width: 70,
    height: 70,
  },
});
