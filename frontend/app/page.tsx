import Navbar from './components/Navbar';
import ChartCard from './components/ChartCard';
import MetricCard from './components/MetricCard';

import { OrdersByStatusChart } from './components/OrdersByStatusChart';
import { ProductsByCategoryChart } from './components/ProductsByCategoryChart';
import { RevenueByCategoryChart } from './components/RevenueByCategoryChart';
import { RecentOrdersTable } from './components/RecentOrdersTable';
import { TopProductsTable } from './components/TopProductsTable';

async function getDashboardData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error('Backend not ready');
    }

    return await res.json();
  } catch (error) {
    console.error('Dashboard fetch failed:', error);

    return {
      metrics: {
        totalRevenue: 0,
        totalOrders: 0,
        avgOrderValue: 0,
        avgRating: 0
      },
      ordersByStatus: [],
      productsByCategory: [],
      recentOrders: [],
      topProducts: [],
      insight: []
    };
  }
}

export default async function DashboardPage() {
  const {
    metrics,
    ordersByStatus,
    productsByCategory,
    recentOrders,
    topProducts,
    insight,
  } = await getDashboardData();

  return (
    <>
      <Navbar />

      <main className='mx-auto max-w-7xl px-4 py-6 space-y-6 bg-gray-50'>
        {/* METRICS */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <MetricCard title='Total Revenue' value={`$${metrics.totalRevenue.toLocaleString()}`} />
          <MetricCard title='Total Orders' value={metrics.totalOrders} />
          <MetricCard title='Avg Order Value' value={`$${metrics.avgOrderValue.toFixed(2)}`} />
          <MetricCard title='Avg Rating' value={metrics.avgRating.toFixed(1)} />
        </div>

        {/* CHARTS */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <ChartCard title='Orders by Status'>
            <OrdersByStatusChart data={ordersByStatus} />
          </ChartCard>

          <ChartCard title='Products by Category'>
            <ProductsByCategoryChart data={productsByCategory} />
          </ChartCard>
        </div>

        {/* TABLES */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-xl shadow p-4 overflow-x-auto'>
            <div className='mb-3 text-center'>
              <h2 className='text-base md:text-lg font-semibold text-gray-800'>
                Recent Orders
              </h2>
            </div>
            <RecentOrdersTable orders={recentOrders} />
          </div>

          <div className='bg-white rounded-xl shadow p-4 overflow-x-auto'>
            <div className='mb-3 text-center'>
              <h2 className='text-base md:text-lg font-semibold text-gray-800'>
                Top Products
              </h2>
            </div>
            <TopProductsTable products={topProducts} />
          </div>
        </div>

        {/* INSIGHT */}
        <ChartCard title='Revenue by Category'>
          <RevenueByCategoryChart data={insight} />
        </ChartCard>
      </main>
    </>
  );
}
