import {PuzzleRenderArray} from '../../types/puzzle';

export const newArrayFunc = (
  arrCurrent: any,
  value1: PuzzleRenderArray,
  value2: PuzzleRenderArray,
) => {
  return arrCurrent.map((el: any) => {
    if (el.id === value1.id) {
      return (el = value2);
    } else if (el.id === value2.id) {
      return (el = value1);
    } else {
      return el;
    }
  });
};
