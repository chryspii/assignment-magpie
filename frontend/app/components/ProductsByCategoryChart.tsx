'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { palette } from './chartColors';

export function ProductsByCategoryChart({
  data,
}: {
  data: { category: string; count: number }[];
}) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='category' />
        <YAxis allowDecimals={false} />
        <Tooltip />

        <Bar
          dataKey='count'
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
