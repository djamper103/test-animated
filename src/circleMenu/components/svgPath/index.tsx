import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface CircleMenuCenterComponentProps {
  data?: any[];
  rotateDeg?: number;
  sizeContainer?: number;
}

export const CircleMenuSvgPath: FC<CircleMenuCenterComponentProps> = ({
  data = [],
  sizeContainer = 200,
  rotateDeg = 0,
}) => {
  return (
    <Svg
      height={sizeContainer}
      width={sizeContainer}
      viewBox="-1 -1 2 2"
      style={{transform: [{rotate: `${rotateDeg}deg`}]}}>
      {data.length > 0 &&
        data.map(item => {
          return <Path d={item.d} fill={item.fill} key={item.key} />;
        })}
    </Svg>
  );
};
