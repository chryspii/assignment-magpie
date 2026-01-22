import { NextResponse } from 'next/server';
import {
  getTotalRevenue,
  getTotalOrders,
  getAvgOrderValue,
  getAvgProductRating,
  getOrdersByStatus,
  getProductsByCategory,
  getRecentOrders,
  getTopProducts,
  getRevenueByCategory
} from './queries';

export async function GET() {
  const [
    totalRevenueAgg,
    totalOrders,
    avgOrderAgg,
    avgRatingAgg,
    ordersByStatusRaw,
    productsByCategoryRaw,
    recentOrders,
    topProducts,
    revenueByCategory
  ] = await Promise.all([
    getTotalRevenue(),
    getTotalOrders(),
    getAvgOrderValue(),
    getAvgProductRating(),
    getOrdersByStatus(),
    getProductsByCategory(),
    getRecentOrders(),
    getTopProducts(),
    getRevenueByCategory()
  ]);

  const metrics = {
    totalRevenue: totalRevenueAgg._sum.totalPrice ?? 0,
    totalOrders,
    avgOrderValue: avgOrderAgg._avg.totalPrice ?? 0,
    avgRating: avgRatingAgg._avg.rating ?? 0,
  }

  const ordersByStatus = ordersByStatusRaw.map(order => {
    return {
      status: order.status,
      count: order._count.status
    }
  })

  const productsByCategory = productsByCategoryRaw.map(product => {
    return {
      category: product.category,
      count: product._count.category
    }
  })

  const insight = revenueByCategory.map(revenue => {
    return {
      category: revenue.category,
      revenue: Number(revenue.revenue)
    }
  })

  return NextResponse.json({
    metrics,
    ordersByStatus,
    productsByCategory,
    recentOrders,
    topProducts,
    insight
  });
}
