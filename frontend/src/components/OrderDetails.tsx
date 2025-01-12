import { useState } from 'react';
import { Order, OrderStatus } from '../types/order';
import { Package, Truck, MapPin, Mail, Edit2, Save, X } from 'lucide-react';

interface OrderDetailsProps {
  order: Order;
  onUpdateOrder: (updatedOrder: Order) => void;
}

export function OrderDetails({ order, onUpdateOrder }: OrderDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);

  const handleStatusChange = (status: OrderStatus) => {
    setEditedOrder({ ...editedOrder, status });
  };

  const handleSave = () => {
    onUpdateOrder(editedOrder);
    setIsEditing(false);
  };

  const statusOptions: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="flex-1 p-6 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Order
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedOrder(order);
              }}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            <div className="flex items-center mb-4">
              <Package className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order Information</h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: <span className="text-gray-900 dark:text-white">{order.id}</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: <span className="text-gray-900 dark:text-white">
                {new Date(order.createdAt).toLocaleDateString()}
              </span></p>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2 dark:text-gray-400">Status:</span>
                {isEditing ? (
                  <select
                    value={editedOrder.status}
                    onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                    className="border border-gray-300 rounded-md text-sm p-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            <div className="flex items-center mb-4">
              <Mail className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customer Details</h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Name: <span className="text-gray-900 dark:text-white">{order.customerName}</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email: <span className="text-gray-900 dark:text-white">{order.email}</span></p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shipping Address</h3>
            </div>
            <p className="text-sm text-gray-900 dark:text-white">{order.shippingAddress}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            <div className="flex items-center mb-4">
              <Truck className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tracking Information</h3>
            </div>
            {order.trackingNumber ? (
              <p className="text-sm text-gray-900 dark:text-white">Tracking Number: {order.trackingNumber}</p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No tracking information available</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Items</h3>
        <div className="bg-gray-50 rounded-lg overflow-hidden dark:bg-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.productName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right dark:text-white">Total</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
