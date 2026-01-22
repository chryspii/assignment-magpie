'use client';

import { Bar } from 'react-chartjs-2';
import { gridColor, palette } from './chartColors';

export function ProductsByCategoryChart({ data }: any) {
  return (
    <Bar
      data={{
        labels: data.map((d: any) => d.category),
        datasets: [
          {
            label: 'Products',
            data: data.map((d: any) => d.count),
            backgroundColor: palette[0],
            borderRadius: 6,
            maxBarThickness: 48
          }
        ]
      }}
      options={{
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: {
            grid: { display: true }
          },
          y: {
            grid: { color: gridColor },
            ticks: { precision: 0 }
          }
        }
      }}
    />
  );
}
