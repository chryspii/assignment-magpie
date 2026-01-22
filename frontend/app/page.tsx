import ChartSetup from './components/ChartSetup';
import ChartCard from './components/ChartCard';

import MetricCard from './components/MetricCard';
import { OrdersByStatusChart } from './components/OrdersByStatusChart';
import { ProductsByCategoryChart } from './components/ProductsByCategoryChart';
import { RecentOrdersTable } from './components/RecentOrdersTable';
import { TopProductsTable } from './components/TopProductsTable';
import { RevenueByCategoryChart } from './components/RevenueByCategoryChart';

async function getDashboardData() {
  const res = await fetch('http://localhost:3000/api/dashboard', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getDashboardData();

  const metrics = data.metrics
  const ordersByStatus = data.ordersByStatus
  const productsByCategory = data.productsByCategory
  const recentOrders = data.recentOrders
  const topProducts = data.topProducts
  const insight = data.insight

  return (
    <ChartSetup>
      <main className='p-6 space-y-6 bg-gray-50 min-h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <MetricCard title='Total Revenue' value={`$${metrics.totalRevenue}`} />
          <MetricCard title='Total Orders' value={metrics.totalOrders} />
          <MetricCard
            title='Avg Order Value'
            value={`$${metrics.avgOrderValue.toFixed(2)}`}
          />
          <MetricCard
            title='Avg Product Rating'
            value={metrics.avgRating.toFixed(1)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            <ChartCard title="Orders by Status">
              <div className="w-full h-full flex items-center justify-center">
                <div className="aspect-square h-full max-h-full w-auto">
                  <OrdersByStatusChart data={ordersByStatus} />
                </div>
              </div>
            </ChartCard>
          </div>

          <div className="h-80">
            <ChartCard title="Products by Category">
              <ProductsByCategoryChart data={productsByCategory} />
            </ChartCard>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white p-4 rounded-xl shadow'>
            <div className='mb-2 text-sm font-semibold text-gray-700'>
              Recent Orders
            </div>
            <RecentOrdersTable orders={recentOrders} />
          </div>

          <div className='bg-white p-4 rounded-xl shadow'>
            <div className='mb-2 text-sm font-semibold text-gray-700'>
              Top Products
            </div>
            <TopProductsTable products={topProducts} />
          </div>
        </div>

        <div className="h-80 bg-white p-4 rounded-xl shadow">
          <ChartCard title="Revenue by Category">
            <RevenueByCategoryChart data={insight} />
          </ChartCard>
        </div>
      </main>
    </ChartSetup>
  );
}
