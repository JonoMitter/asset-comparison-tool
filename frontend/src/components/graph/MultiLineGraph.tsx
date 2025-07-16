import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { extent, max, min, bisector } from 'd3-array';
import { Group } from '@visx/group';
import { LegendOrdinal } from '@visx/legend';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { GraphDataSet } from '../../models/datasets/GraphDataSet';
import { GraphDataPoint } from '../../models/datasets/GraphDataPoint';

type MultiLineGraphProps = {
  datasets: GraphDataSet[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

type NearestPoint = {
  dataset: string;
  period: number;
  value: number;
  color: string;
  scaledX: number;
  scaledY: number;
  distance: number;
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

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<NearestPoint[]>();

  // Prepare data domains
  const allX = datasets.flatMap((d) => d.data.map((p) => p.period));
  const xDomain = extent(allX) as [number, number];
  const [xMin, xMax] = xDomain;
  const xTicks = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i += 12) {
    xTicks.push(i);
  }

  const allY = datasets.flatMap((d) => d.data.map((p) => p.value));
  const yMaxValue = max(allY) ?? 1;
  const yMinValue = min(allY) ?? 0;

  const xScale = scaleLinear({
    domain: xDomain,
    range: [0, innerWidth],
  });

  const yScale = scaleLinear({
    domain: [yMinValue, yMaxValue],
    range: [innerHeight, 0],
  });

  const colorScale = scaleOrdinal({
    domain: datasets.map((d) => d.label),
    range: datasets.map((d) => d.color),
  });

  const bisectPeriod = bisector<GraphDataPoint, number>((d) => d.period).left;

  const handleMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
    const point = localPoint(event.currentTarget, event);
    if (!point) return;

    const x0 = xScale.invert(point.x - margin.left);
    const nearestPoints: NearestPoint[] = [];

    for (const dataset of datasets) {
      const idx = bisectPeriod(dataset.data, x0);
      const d0 = dataset.data[idx - 1];
      const d1 = dataset.data[idx];

      const d =
        !d0 || !d1
          ? d0 || d1
          : x0 - d0.period > d1.period - x0
          ? d1
          : d0;

      if (!d) continue;

      const dx = xScale(d.period);
      const dy = yScale(d.value);

      nearestPoints.push({
        dataset: dataset.label,
        value: d.value,
        period: d.period,
        color: dataset.color,
        scaledX: dx,
        scaledY: dy,
        distance: Math.abs(point.x - (dx + margin.left)),
      });
    }

    if (nearestPoints.length > 0) {
      // Position tooltip horizontally near cursor, vertically fixed a bit above top margin
      showTooltip({
        tooltipLeft: point.x,
        tooltipTop: point.y + margin.top,
        tooltipData: nearestPoints,
      });
    } else {
      hideTooltip();
    }
  };

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

        {/* Transparent overlay for mouse tracking */}
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onMouseMove={handleMouseMove}
          onMouseLeave={hideTooltip}
        />

        {/* Circles for all hovered points */}
        {tooltipData?.map((point, i) => (
          <circle
            key={`hover-circle-${i}`}
            cx={point.scaledX + margin.left}
            cy={point.scaledY + margin.top}
            r={5}
            fill={point.color}
            stroke="#fff"
            strokeWidth={2}
            pointerEvents="none"
          />
        ))}

        {/* Legend in top center */}
        <Group top={margin.top} left={width / 2 - (datasets.length * 100) / 2}>
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

      {/* Tooltip UI */}
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{ ...defaultStyles, backgroundColor: 'white', color: 'black' }}
        >
          {tooltipData.map((point, i) => (
            <div key={`tooltip-point-${i}`} style={{ marginBottom: 4 }}>
              <strong style={{ color: point.color }}>{point.dataset}</strong><br />
              Period: {point.period}<br />
              Value: {point.value.toFixed(2)}
            </div>
          ))}
        </TooltipWithBounds>
      )}
    </>
  );
};

export default MultiLineGraph;
