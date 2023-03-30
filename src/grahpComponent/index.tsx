import React, {FC} from 'react';
import {Svg, Path, Defs, Stop, LinearGradient} from 'react-native-svg';
import {Dimensions, StyleSheet} from 'react-native';
import {scaleLinear, scaleTime} from 'd3';
import * as shape from 'd3-shape';

interface DataPoint {
  date: number;
  value: number;
}

const data = [
  {date: 1, value: 0},
  {date: 2, value: 100},
  {date: 3, value: 100},
  {date: 4, value: 200},
  {date: 5, value: 100},
  {date: 6, value: 200},
];

const φ = (1 + Math.sqrt(5)) / 2;
const {width, height: wHeight} = Dimensions.get('window');
const height = (1 - 1 / φ) * wHeight;
const strokeWidth = 4;
const padding = strokeWidth / 2;
const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain),
];

export const GraphComponent: FC = () => {
  const scaleX = scaleTime()
    .domain(getDomain(data.map((d: {date: any}) => d.date)))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d.value)))
    .range([height - padding, padding]);
  const d = shape
    .line<DataPoint>()
    .x(p => scaleX(p.date))
    .y(p => scaleY(p.value))
    .curve(shape.curveBasis)(data) as string;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      {/* <Defs>
        <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <Stop offset="0%" stopColor="#cee3f9" />
          <Stop offset="80%" stopColor="#ddedfa" />
          <Stop offset="100%" stopColor="#feffff" />
        </LinearGradient>
      </Defs> */}
      {/* <Path
        d={`${d}L ${width} ${height} L 0 ${height}`}
        fill="url(#gradient)"
      /> */}
      <Path fill="transparent" stroke="#3977e3" {...{d, strokeWidth}} />
    </Svg>
  );
};

// import React, {FC} from 'react';
// import {Svg, G, Rect, Line, Text} from 'react-native-svg';
// import * as d3 from 'd3';

// const GRAPH_MARGIN = 20;
// const GRAPH_BAR_WIDTH = 5;
// const colors = {
//   axis: '#E4E4E4',
//   bars: '#15AD13',
// };

// export const GraphComponent: FC = () => {
//   const data = [
//     {label: 'Jan', value: 500},
//     {label: 'Feb', value: 312},
//     {label: 'Mar', value: 424},
//     {label: 'Apr', value: 745},
//     {label: 'May', value: 89},
//     {label: 'Jun', value: 434},
//     {label: 'Jul', value: 650},
//     {label: 'Aug', value: 980},
//     {label: 'Sep', value: 123},
//     {label: 'Oct', value: 186},
//     {label: 'Nov', value: 689},
//     {label: 'Dec', value: 643},
//   ];
//   const SVGHeight = 150;
//   const SVGWidth = 300;
//   const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
//   const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
//   const round = 10;
//   const unit = 'USD';
//   // X scale point
//   const xDomain = data.map(item => item.label);
//   const xRange = [0, graphWidth];
//   const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

//   // Y scale linear
//   const maxValue = d3.max(data, d => d.value);
//   const topValue = Math.ceil(maxValue / round) * round;
//   const yDomain = [0, topValue];
//   const yRange = [0, graphHeight];
//   const y = d3.scaleLinear().domain(yDomain).range(yRange);

//   // top axis and middle axis
//   const middleValue = topValue / 2;

//   return (
//     <Svg width={SVGWidth} height={SVGHeight}>
//       <G y={graphHeight + GRAPH_MARGIN}>
//         {/* Top value label */}
//         <Text
//           x={graphWidth}
//           textAnchor="end"
//           y={y(topValue) * -1 - 5}
//           fontSize={12}
//           fill="black"
//           fillOpacity={0.4}>
//           {topValue + ' ' + unit}
//         </Text>

//         {/* top axis */}
//         <Line
//           x1="0"
//           y1={y(topValue) * -1}
//           x2={graphWidth}
//           y2={y(topValue) * -1}
//           stroke={colors.axis}
//           strokeDasharray={[3, 3]}
//           strokeWidth="0.5"
//         />

//         {/* middle axis */}
//         <Line
//           x1="0"
//           y1={y(middleValue) * -1}
//           x2={graphWidth}
//           y2={y(middleValue) * -1}
//           stroke={colors.axis}
//           strokeDasharray={[3, 3]}
//           strokeWidth="0.5"
//         />

//         {/* bottom axis */}
//         <Line
//           x1="0"
//           y1="2"
//           x2={graphWidth}
//           y2="2"
//           stroke={colors.axis}
//           strokeWidth="0.5"
//         />

//         {/* bars */}
//         {data.map(item => (
//           <Rect
//             key={'bar' + item.label}
//             x={x(item.label) - GRAPH_BAR_WIDTH / 2}
//             y={y(item.value) * -1}
//             rx={2.5}
//             width={GRAPH_BAR_WIDTH}
//             height={y(item.value)}
//             fill={colors.bars}
//           />
//         ))}

//         {/* labels */}
//         {data.map(item => (
//           <Text
//             key={'label' + item.label}
//             fontSize="8"
//             x={x(item.label)}
//             y="10"
//             textAnchor="middle">
//             {item.label}
//           </Text>
//         ))}
//       </G>
//     </Svg>
//   );
// };
