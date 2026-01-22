'use client';

import { Bar } from 'react-chartjs-2';
import { palette, gridColor } from './chartColors';

export function RevenueByCategoryChart({ data }: {
  data: { category: string; revenue: number }[]
}) {
  return (
    <Bar
      data={{
        labels: data.map((d) => d.category),
        datasets: [
          {
            label: 'Revenue',
            data: data.map((d) => d.revenue),
            backgroundColor: palette.slice(0, data.length),
            borderRadius: 8,
            maxBarThickness: 48
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `$${ctx.raw?.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: gridColor },
            ticks: { callback: (value) => `$${Number(value).toLocaleString()}`}
          }
        }
      }}
    />
  );
}
