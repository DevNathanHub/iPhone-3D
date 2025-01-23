'use client';

import { useEffect, useState } from 'react';
import Invoice from './Invoice';
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderDetails')) || [];
    setOrders(Array.isArray(storedOrders) ? storedOrders : [storedOrders]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Orders</h1>
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">${order.totalAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <PDFDownloadLink
                      document={<Invoice order={order} />}
                      fileName={`invoice-${order.id}.pdf`}
                      className="rounded bg-indigo-600 text-white px-3 py-1 text-sm font-medium hover:bg-indigo-700"
                    >
                      {({ loading }) => (loading ? 'Generating...' : 'Download Invoice')}
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
