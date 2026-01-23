import { prisma } from '@/lib/prisma';

export function getTotalRevenue() {
  return prisma.order.aggregate({
    _sum: {
      totalPrice: true
    }
  });
}

export function getTotalOrders() {
  return prisma.order.count();
}

export function getAvgOrderValue() {
  return prisma.order.aggregate({
    _avg: {
      totalPrice: true
    }
  });
}

export function getAvgProductRating() {
  return prisma.product.aggregate({
    _avg: {
      rating: true
    }
  });
}

export function getOrdersByStatus() {
  return prisma.order.groupBy({
    by: ['status'],
    _count: {
      status: true
    }
  });
}

export function getProductsByCategory() {
  return prisma.product.groupBy({
    by: ['category'],
    _count: {
      category: true
    }
  });
}

export function getRecentOrders() {
  return prisma.order.findMany({
    orderBy: {
      externalId: 'desc'
    },
    take: 5,
    select: {
      externalId: true,
      status: true,
      totalPrice: true
    }
  });
}

export function getTopProducts() {
  return prisma.product.findMany({
    orderBy: {
      price: 'desc'
    },
    take: 5,
    select: {
      id: true,
      name: true,
      price: true
    }
  });
}

export function getRevenueByCategory() {
  return prisma.$queryRaw<
    { category: string; revenue: number }[]
  >`
    SELECT
      p.category AS category,
      SUM(oi.quantity * p.price) AS revenue
    FROM
      "OrderItem" oi
    JOIN
      "Product" p ON p.id = oi."productId"
    GROUP BY p.category
    ORDER BY revenue DESC
  `;
}
