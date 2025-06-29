
import React from 'react';

interface SimpleChartProps {
  data: number[];
  labels: string[];
  color?: string;
  height?: number;
}

const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  labels,
  color = '#8B5CF6',
  height = 200
}) => {
  const maxValue = Math.max(...data);
  const normalizedData = data.map(value => (value / maxValue) * (height - 40));

  return (
    <div className="w-full">
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percentage, index) => (
          <g key={index}>
            <line
              x1="40"
              y1={height - 20 - (percentage / 100) * (height - 40)}
              x2="100%"
              y2={height - 20 - (percentage / 100) * (height - 40)}
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <text
              x="35"
              y={height - 15 - (percentage / 100) * (height - 40)}
              fill="#9CA3AF"
              fontSize="10"
              textAnchor="end"
            >
              {percentage}%
            </text>
          </g>
        ))}

        {/* Bars */}
        {normalizedData.map((value, index) => {
          const barWidth = (100 - 50) / data.length;
          const x = 50 + index * barWidth + barWidth * 0.1;
          const barWidthActual = barWidth * 0.8;

          return (
            <g key={index}>
              <rect
                x={`${x}%`}
                y={height - 20 - value}
                width={`${barWidthActual}%`}
                height={value}
                fill={color}
                rx="4"
                className="transition-all duration-500 hover:opacity-80"
              >
                <animate
                  attributeName="height"
                  from="0"
                  to={value}
                  dur="1s"
                  begin={`${index * 0.1}s`}
                />
                <animate
                  attributeName="y"
                  from={height - 20}
                  to={height - 20 - value}
                  dur="1s"
                  begin={`${index * 0.1}s`}
                />
              </rect>
              
              {/* Label */}
              <text
                x={`${x + barWidthActual / 2}%`}
                y={height - 5}
                fill="#9CA3AF"
                fontSize="10"
                textAnchor="middle"
              >
                {labels[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SimpleChart;
