import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { extent, max, min } from 'd3-array';
import { Group } from '@visx/group';
import { DataSet } from '../../types/Types';

type MultiLineGraphProps = {
  datasets: DataSet[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const defaultMargin = { top: 20, right: 30, bottom: 40, left: 50 };

const MultiLineGraph: React.FC<MultiLineGraphProps> = ({
  datasets,
  width,
  height,
  margin = defaultMargin,
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute global x extent (assumes all datasets share x domain)
  const allX = datasets.flatMap((d) => d.data.map((p) => p.period));
  const xDomain = extent(allX) as [number, number];
  const [xMin, xMax] = xDomain;
  const xTicks = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i += 1) {
    xTicks.push(i);
}

  // Compute global y max
  const allY = datasets.flatMap((d) => d.data.map((p) => p.value));
  const yMaxValue = max(allY) || 1;
  const yMinValue = min(allY) || 1;

  const xScale = scaleLinear({
    domain: xDomain,
    range: [0, innerWidth],
  });

  const yScale = scaleLinear({
    domain: [yMinValue, yMaxValue],
    range: [innerHeight, 0],
  });

  const colorScale = scaleOrdinal({
  domain: datasets.map(d => d.label),
  range: datasets.map(d => d.color),
});


  return (
    <>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {datasets.map((dataset, i) => (
            <LinePath
              key={i}
              data={dataset.data}
              x={(d) => xScale(d.period)}
              y={(d) => yScale(d.value)}
              stroke={dataset.color}
              strokeWidth={2}
            />
          ))}
          <AxisBottom top={innerHeight} scale={xScale} tickValues={xTicks} />
          <AxisLeft scale={yScale} />
        </Group>

        {/* Legend centered at top */}
        <Group top={margin.top} left={width / 2 - 60}>
          <LegendOrdinal scale={colorScale} labelFormat={(label) => label}>
            {(labels) => (
              <Group>
                {labels.map((label, i) => (
                  <Group key={`legend-${i}`} left={i * 100}>
                    <rect width={12} height={12} fill={label.value} rx={2} />
                    <text x={16} y={10} fontSize={12} fill="#000">
                      {label.text}
                    </text>
                  </Group>
                ))}
              </Group>
            )}
          </LegendOrdinal>
        </Group>
      </svg>
    </>
  );
};

export default MultiLineGraph;
