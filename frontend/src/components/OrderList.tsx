import { Order } from "../types/order";
import { Package, Search } from "lucide-react";

interface orderListProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  selectedOrderId?: string;
}

const OrderList = ({
  orders,
  onSelectOrder,
  selectedOrderId,
}: orderListProps) => {
  return (
    <div className="w-full max-w-screen md:max-w-md border-r border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders ...."
            className="w-full pl-10 pr-4 py-2 border border-rounded-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => onSelectOrder(order)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 ${
              selectedOrderId === order.id ? 'bg-blue-50 dark:bg-blue-900' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
                </div>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
