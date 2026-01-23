import { schedules } from '@trigger.dev/sdk/v3';
import { prisma } from '@/lib/prisma';
import * as R from 'ramda'

const PRODUCTS_URL = 'https://fake-store-api.mock.beeceptor.com/api/products';
const ORDERS_URL = 'https://fake-store-api.mock.beeceptor.com/api/orders';

// original price +- 0 -> 20
function randomPrice (base: number) {
  const randomValue = Math.floor(Math.random() * 21);
  const sign = Math.random() < 0.5 ? -1 : 1;

  return base + (sign * randomValue);
}

// original qty + 0 -> 3
function randomQty (base: number) {
  const randomValue = Math.floor(Math.random() * 4);

  return base + randomValue
}

async function fetchProducts() {
  const res = await fetch(PRODUCTS_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

async function fetchOrders() {
  const res = await fetch(ORDERS_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }

  return res.json();
}

async function _syncStoreData () {
  console.log('Starting store data sync...');

  const now = new Date();

  try {
    const [products, orders] = await Promise.all([
      fetchProducts(),
      fetchOrders()
    ]);

    const productIdMap: Record<number, number> = {};

    for (const product of products) {
      const adjustedPrice = randomPrice(product.price);

      const upsertedProduct = await prisma.product.upsert({
        where: { externalId: product.product_id },
        create: {
          externalId: product.product_id,
          name: product.name,
          description: product.description,
          price: adjustedPrice,
          unit: product.unit,
          image: product.image,
          discount: product.discount,
          availability: product.availability,
          brand: product.brand,
          category: product.category,
          rating: product.rating,
          updatedAt: new Date(),
          syncedAt: new Date()
        },
        update: {
          name: product.name,
          description: product.description,
          price: adjustedPrice,
          unit: product.unit,
          image: product.image,
          discount: product.discount,
          availability: product.availability,
          brand: product.brand,
          category: product.category,
          rating: product.rating,
          updatedAt: new Date()
        }
      });

      productIdMap[product.product_id] = upsertedProduct.id;
    }

    for (const order of orders) {
      let orderTotalPrice = 0;

      const orderItemsData: any = R.pipe(
        R.map((item: any) => {
          const productId = productIdMap[item.product_id];

          if (!productId) {
            return
          }

          const productPrice = products.find(
            (p: any) => p.product_id === item.product_id
          )?.price ?? 0;

          const qty = randomQty(item.quantity);
          const price = randomPrice(productPrice);
          const totalPrice = Number(price * qty);

          orderTotalPrice += totalPrice;

          return {
            productId,
            quantity: qty,
            syncedAt: new Date(),
            updatedAt: new Date()
          }
        }),
        R.reject(R.isNil)
      )(order.items)

      orderTotalPrice = parseFloat(orderTotalPrice.toFixed(2))

      await prisma.order.upsert({
        where: { externalId: order.order_id },
        create: {
          externalId: order.order_id,
          userId: order.user_id,
          status: order.status,
          totalPrice: orderTotalPrice,
          syncedAt: new Date(),
          updatedAt: new Date(),
          items: {
            create: orderItemsData,
          }
        },
        update: {
          status: order.status,
          totalPrice: orderTotalPrice,
          updatedAt: new Date()
        }
      });
    }

    console.log('Store data sync completed');

    return {
      syncedAt: now,
      productsSynced: products.length,
      ordersSynced: orders.length
    }
  } catch (err) {
    console.log('Trigger Error: ', err);
  }
}

export const syncStoreData = schedules.task({
  id: 'sync-store-data',
  cron: '0 * * * *', // 1 hour
  // cron: '* * * * *', // 1 minute - for test
  maxDuration: 300,
  run: async () => {
    await _syncStoreData();
  }
});

// for dev only
export async function runOnceForDev() {
  await _syncStoreData();
}
