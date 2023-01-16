export const setPositionArrayFunc = (
  value: any,
  func: (value: any) => void,
) => {
  if (value.x !== undefined || value.y !== undefined) {
    func((el: any) => [...el, value]);
  }
};
