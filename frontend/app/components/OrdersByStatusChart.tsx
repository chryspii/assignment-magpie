'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { palette } from './chartColors';

export function OrdersByStatusChart({ data }: {
  data: { status: string; count: number }[];
}) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey='count'
          nameKey='status'
          innerRadius='40%'
          outerRadius='80%'
        >
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign='bottom' />
      </PieChart>
    </ResponsiveContainer>
  );
}
