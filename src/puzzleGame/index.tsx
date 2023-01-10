import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {findIndexFunc} from '../common/functions/findIndex';
import {newArrayFunc} from '../common/functions/newArrayFunc';
import {randomArrayFunc} from '../common/functions/randomArray';
import {PositionType, PuzzleRenderArray} from '../types/puzzle';
import {ButtonContainer} from './components/button';
import {RenderComponent} from './components/renderComponent';

interface PuzzleGameProps {
  arrayLength?: number;
  imagePath?: string;
}

export const PuzzleGame: FC<PuzzleGameProps> = ({
  arrayLength = 3,
  imagePath = 'path',
}) => {
  const [arrayCurrent, setArrayCurrent] = useState<any>([]);
  const [arrayOrigin, setArrayOrigin] = useState<any>([]);

  const [nullItem, setNullItem] = useState<PuzzleRenderArray>({
    id: 0,
    url: '0',
  });

  const [positionTarget, setPositionTarget] = useState<any>({});
  const [positionArray, setPositionArray] = useState<PositionType[]>([]);

  useEffect(() => {
    const arrayGenerate = new Array(arrayLength * arrayLength)
      .fill(0)
      .map((_, index) => ({id: index, url: `${imagePath}${index}`}));
    setArrayOrigin(arrayGenerate);
    setArrayCurrent(arrayGenerate);
    setNullItem(arrayGenerate[arrayGenerate.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRandomArray = () => {
    setArrayCurrent(randomArrayFunc([...arrayOrigin]));
  };

  const onPress = (
    value: PuzzleRenderArray,
    positions: {x: number; y: number},
  ) => {
    let valueTarget: PuzzleRenderArray = Object.assign(value);
    let valueNull: any = Object.assign(nullItem);
    const array = [...arrayCurrent];

    const c: any = [];
    let d: any = [];

    let count: number = 0;
    let countLineTarget: number = 0;
    let countLineNull: number = 0;

    let currentArrayLength = arrayLength;

    array.forEach((el, index) => {
      if (index < currentArrayLength) {
        d.push(el);
      } else {
        currentArrayLength = currentArrayLength + arrayLength;
        c.push(d);
        count = count + 1;
        d = [];
        d.push(el);
      }
      index === array.length - 1 && c.push(d);
      valueTarget.id === el.id && (countLineTarget = count);
      valueNull.id === el.id && (countLineNull = count);
    });

    const rowTarget = findIndexFunc(c, valueTarget, countLineTarget);
    const rowNull = findIndexFunc(c, valueNull, countLineNull);

    if (countLineTarget === countLineNull) {
      if (rowNull + 1 === rowTarget || rowNull - 1 === rowTarget) {
        setPositionTarget({x: positions.x, y: 0, valueTarget});
        setArrayCurrent(newArrayFunc(array, valueTarget, valueNull));
      }
    } else if (rowNull === rowTarget) {
      if (
        countLineNull + 1 === countLineTarget ||
        countLineNull - 1 === countLineTarget
      ) {
        setPositionTarget({x: 0, y: positions.y, valueTarget});
        setArrayCurrent(newArrayFunc(array, valueTarget, valueNull));
      }
    }
  };

  return (
    <View style={styles.container}>
      {arrayCurrent.length > 0 &&
        arrayCurrent.map((el: PuzzleRenderArray) => {
          return (
            <RenderComponent
              data={el}
              key={el.id}
              isNullValue={nullItem.id === el.id}
              onPress={onPress}
              positionTarget={positionTarget}
            />
          );
        })}
      <ButtonContainer onPress={onRandomArray} text={'Random array'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
