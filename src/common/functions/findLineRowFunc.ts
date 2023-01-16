import {PositionType} from '../../types/puzzle';

export const findLineRowFunc = (
  valueTarget: PositionType,
  valueNull: any,
  arrayLength: number,
  positionArray: PositionType[],
) => {
  let countCurrentLine: number = 0;
  let countLineTarget: number = 0;
  let countLineNull: number = 0;

  let countCorrentRow: number = 0;
  let rowTarget: number = 0;
  let rowNull: number = 0;

  let currentArrayLength = arrayLength;

  positionArray.forEach((el, index) => {
    if (index < currentArrayLength) {
      countCorrentRow = countCorrentRow + 1;
    } else {
      currentArrayLength = currentArrayLength + arrayLength;
      countCurrentLine = countCurrentLine + 1;
      countCorrentRow = 0;
    }
    valueTarget.id === el.id &&
      ((countLineTarget = countCurrentLine),
      (valueTarget.x = el.x),
      (valueTarget.y = el.y),
      (rowTarget =
        countCurrentLine === 0 ? countCorrentRow - 1 : countCorrentRow));
    valueNull.id === el.id &&
      ((countLineNull = countCurrentLine),
      (valueNull.x = el.x),
      (valueNull.y = el.y),
      (rowNull =
        countCurrentLine === 0 ? countCorrentRow - 1 : countCorrentRow));
  });

  return {countLineTarget, countLineNull, rowTarget, rowNull};
};
