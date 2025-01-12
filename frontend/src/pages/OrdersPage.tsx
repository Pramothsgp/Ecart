import { useState } from 'react';
import orderDetails from '../data/sampleData';
import { Order } from '../types/order';
import OrderList from '../components/OrderList';
import { OrderDetails } from '../components/OrderDetails';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(orderDetails);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setSelectedOrder(updatedOrder);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow flex h-[calc(100vh-10rem)] min-h-[400px] flex-col md:flex-row">
        <OrderList
          orders={orders}
          onSelectOrder={setSelectedOrder}
          selectedOrderId={selectedOrder?.id}
        />

        {selectedOrder ? (
          <OrderDetails
            order={selectedOrder}
            onUpdateOrder={handleUpdateOrder}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Order Selected</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select an order from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
