import {PositionType, PuzzleRenderArray} from '../../types/puzzle';
import {findLineRowFunc} from './findLineRowFunc';
import {newArrayFunc} from './newArrayFunc';

export const setArrayCurrentFunc = (
  value: PuzzleRenderArray,
  nullItem: PuzzleRenderArray | PositionType | any,
  arrayLength: number,
  positionArray: PositionType[],
  setNullItem: (value: any) => void,
  setPositionArray: (value: any) => void,
  setPositionTarget: (value: any) => void,
) => {
  let valueTarget: PositionType = Object.assign(value);
  let valueNull: any = Object.assign(nullItem);
  const array = [...positionArray];

  const {countLineTarget, countLineNull, rowTarget, rowNull} = findLineRowFunc(
    valueTarget,
    valueNull,
    arrayLength,
    positionArray,
  );

  const setPositionFunc = () => {
    setNullItem({
      id: valueNull.id,
      x: valueTarget.x,
      y: valueTarget.y,
      url: valueNull.url,
    });
    setPositionArray(newArrayFunc(array, valueTarget, valueNull));
  };

  if (countLineTarget === countLineNull) {
    if (rowNull + 1 === rowTarget || rowNull - 1 === rowTarget) {
      const positionType = 'x';
      setPositionTarget({
        id: valueTarget.id,
        x: valueNull.x - valueTarget.x,
        y: valueNull.y,
        positionType,
      });
      setPositionFunc();
    }
  } else if (rowNull === rowTarget) {
    if (
      countLineNull + 1 === countLineTarget ||
      countLineNull - 1 === countLineTarget
    ) {
      const positionType = 'y';
      setPositionTarget({
        id: valueTarget.id,
        x: valueNull.x,
        y: valueNull.y - valueTarget.y,
        positionType,
      });
      setPositionFunc();
    }
  }
};
