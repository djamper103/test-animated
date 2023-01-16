import {PositionType} from '../../types/puzzle';

export const newArrayFunc = (
  arrCurrent: any,
  value1: PositionType,
  value2: PositionType,
) => {
  return arrCurrent.map((el: any) => {
    if (el.id === value1.id) {
      return {
        id: value2.id,
        x: el.x,
        y: el.y,
        url: value2.url,
      };
    } else if (el.id === value2.id) {
      return {
        id: value1.id,
        x: el.x,
        y: el.y,
        url: value1.url,
      };
    } else {
      return el;
    }
  });
};
