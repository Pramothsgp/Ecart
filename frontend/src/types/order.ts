export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  shippingAddress: string;
  trackingNumber?: string;
}