'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { palette } from './chartColors';

export function RevenueByCategoryChart({
  data,
}: {
  data: { category: string; revenue: number }[];
}) {
  return (
    <ResponsiveContainer width='100%' height={400} className='chart-min-size'>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='category' />
        <YAxis
          tickFormatter={(v) => `$${v.toLocaleString()}`}
        />
        <Tooltip
          formatter={(value) => {
            if (typeof value !== "number") return value;
            return `$${value.toLocaleString()}`;
          }}
        />

        <Bar
          dataKey='revenue'
          shape={(props: any) => {
            const { x, y, width, height, index } = props;
            return (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={2}
                fill={palette[index % palette.length]}
              />
            );
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
