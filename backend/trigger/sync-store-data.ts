import { schedules } from '@trigger.dev/sdk/v3';
import { prisma } from '@/lib/prisma';
import * as R from 'ramda';
import { mapProduct, mapReviews, mapOrder, mapOrderItems } from './mappers';

const PRODUCTS_URL = 'https://fake-store-api.mock.beeceptor.com/api/products';
const ORDERS_URL = 'https://fake-store-api.mock.beeceptor.com/api/orders';

export const syncStoreData = schedules.task({
  id: 'sync-store-data',
  cron: '0 * * * *',
  maxDuration: 300,
  run: async () => {
    const resProduct = await fetch(PRODUCTS_URL);
    const products = await resProduct.json();

    for (const product of products) {
      const productData = mapProduct(product);

      const savedProduct = await prisma.product.upsert({
        where: {
          externalId: productData.externalId
        },
        update: productData,
        create: productData
      });

      await prisma.review.deleteMany({
        where: {
          productId: savedProduct.id
        }
      });

      await prisma.review.createMany({
        data: R.pipe(
          R.propOr([], 'reviews'),
          mapReviews,
          R.map((r) => ({ ...r, productId: savedProduct.id }))
        )(product)
      });
    }

    const resOrder = await fetch(ORDERS_URL);
    const orders = await resOrder.json();

    for (const order of orders) {
      const orderData = mapOrder(order);

      const savedOrder = await prisma.order.upsert({
        where: {
          externalId: orderData.externalId
        },
        update: orderData,
        create: orderData
      });

      await prisma.orderItem.deleteMany({
        where: {
          orderId: savedOrder.id
        }
      });

      const items = R.pipe(
        R.propOr([], 'items'),
        mapOrderItems
      )(order);

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: {
            externalId: item.externalProductId
          }
        });

        if (!product) {
          continue;
        }

        await prisma.orderItem.create({
          data: {
            orderId: savedOrder.id,
            productId: product.id,
            quantity: item.quantity
          }
        });
      }
    }

    return {
      productsSynced: products.length,
      ordersSynced: orders.length
    }
  }
});
