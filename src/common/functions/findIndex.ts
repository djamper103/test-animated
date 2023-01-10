import {PuzzleRenderArray} from '../../types/puzzle';

export const findIndexFunc = (
  array: any[],
  value: PuzzleRenderArray,
  valueLine: number,
) => {
  return array[valueLine].findIndex(
    (el: PuzzleRenderArray) => value.id === el.id,
  );
};
