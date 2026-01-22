'use client';

import { Doughnut } from 'react-chartjs-2';
import { palette } from './chartColors';

export function OrdersByStatusChart({ data }: any) {
  return (
    <Doughnut
      data={{
        labels: data.map((d: any) => d.status),
        datasets: [
          {
            data: data.map((d: any) => d.count),
            backgroundColor: palette.slice(0, data.length),
            borderWidth: 20
          }
        ]
      }}
      options={{
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 16
            }
          }
        }
      }}
    />
  );
}
