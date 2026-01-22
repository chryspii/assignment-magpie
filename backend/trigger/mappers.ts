import * as R from 'ramda';

export const mapProduct = (product: any) => ({
  externalId: product.product_id,
  name: product.name,
  description: product.description,
  price: product.price,
  unit: product.unit,
  image: product.image,
  discount: product.discount,
  availability: product.availability,
  brand: product.brand,
  category: product.category,
  rating: product.rating,
});

export const mapReviews = R.map((review: any) => ({
  userId: review.user_id,
  rating: review.rating,
  comment: review.comment,
}));

export const mapOrder = (order: any) => ({
  externalId: order.order_id,
  userId: order.user_id,
  totalPrice: order.total_price,
  status: order.status,
});

export const mapOrderItems = R.map((item: any) => ({
  externalProductId: item.product_id,
  quantity: item.quantity,
}));
