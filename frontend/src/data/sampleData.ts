import { Order } from '../types/order';
import { Product } from '../types/product';

const orderDetails: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    email: "john@example.com",
    items: [
      {
        id: "ITEM-1",
        productName: "Wireless Headphones",
        quantity: 1,
        price: 99.99
      },
      {
        id: "ITEM-2",
        productName: "Phone Case",
        quantity: 2,
        price: 19.99
      }
    ],
    status: "processing",
    total: 139.97,
    createdAt: "2024-03-15T10:30:00Z",
    shippingAddress: "123 Main St, City, Country",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    email: "jane@example.com",
    items: [
      {
        id: "ITEM-3",
        productName: "Smart Watch",
        quantity: 1,
        price: 199.99
      }
    ],
    status: "shipped",
    total: 199.99,
    createdAt: "2024-03-14T15:45:00Z",
    shippingAddress: "456 Oak Ave, Town, Country",
    trackingNumber: "TRK987654321"
  }
];


export const products: Product[] = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    price: 199.99,
    rating: 4.5,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 89.99,
    rating: 4.8,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 120.00,
    rating: 4.3,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1574158622681-111e3aef7206?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEyfHxmb290d2VhfGVufDB8fHx8fDE%3D&ixlib=rb-1.2.1&q=80&w=1080"
  }
];

export const categories = ["All", "Clothing", "Electronics", "Footwear"];

export default orderDetails;