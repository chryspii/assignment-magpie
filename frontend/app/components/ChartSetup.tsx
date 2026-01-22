'use client';

import * as chart from 'chart.js';

chart.Chart.register(
  chart.ArcElement,
  chart.BarElement,
  chart.CategoryScale,
  chart.LinearScale,
  chart.PointElement,
  chart.LineElement,
  chart.Tooltip,
  chart.Legend
);

export default function ChartSetup({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
