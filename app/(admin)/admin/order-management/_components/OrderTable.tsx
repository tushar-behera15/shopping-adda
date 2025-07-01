'use client';
import React, { useEffect, useState } from 'react';
import { SkeletonRow } from '@/components/ui/skeleton-row';
import Image from 'next/image';
import { toast } from 'sonner';

export default function OrderTable() {
    const [loading, setLoading] = useState(false);
    const [updateloading, setUpdateLoading] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [orderItems, setOrderItems] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [status, setStatus] = useState('');

    // Fetch all orders
    const fetchOrder = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/all-order');
            const data = await res.json();
            if (Array.isArray(data)) setOrders(data);
            if (!res.ok) alert(data.error || 'Something went wrong');
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // Fetch items for a selected order
    const fetchOrderItems = async (orderId: string) => {
        try {
            const res = await fetch(`/api/all-orderItem/${orderId}`
            );
            const data = await res.json();
            if (res.ok) {
                setOrderItems(data);
                setViewModal(true);
            } else {
                alert(data.error || 'Failed to fetch order items');
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-medium">Order Management</h1>
            </div>

            {/* Orders Table */}
            <div className="w-full px-4 py-8 flex justify-center">
                <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Sr. No.</th>
                                <th className="px-6 py-3 text-left">User Name</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Order Date</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading
                                ? Array(5)
                                    .fill(0)
                                    .map((_, idx) => <SkeletonRow key={idx} colCount={5} />)
                                : orders.map((order, index) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{order.user_name}</td>
                                        <td className="px-6 py-3">{order.status}</td>
                                        <td className="px-6 py-3">
                                            {new Date(order.order_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3 space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    fetchOrderItems(order.id);
                                                }}
                                                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setStatus(order.status);
                                                    setEditModal(true);
                                                }}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {viewModal && orderItems.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-2xl relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setViewModal(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black"
                        >
                            ❌
                        </button>

                        {/* Modal Header */}
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Order Summary</h2>

                        {/* User + Order Info */}
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg border">
                            <div>
                                <p className="text-gray-500">User Name</p>
                                <p className="font-semibold">{orderItems[0].user_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium">{orderItems[0].user_email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Order ID</p>
                                <p className="font-mono text-xs break-all">{selectedOrder?.id}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Status</p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
                                        ${selectedOrder?.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : selectedOrder?.status === 'processing'
                                                ? 'bg-blue-100 text-blue-800'
                                                : selectedOrder?.status === 'shipped'
                                                    ? 'bg-indigo-100 text-indigo-800'
                                                    : selectedOrder?.status === 'delivered'
                                                        ? 'bg-green-100 text-green-800'
                                                        : selectedOrder?.status === 'cancelled'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {selectedOrder?.status || 'N/A'}
                                </span>

                            </div>
                        </div>

                        {/* Item List */}
                        <div className="max-h-[55vh] overflow-y-auto pr-2 space-y-5">
                            {orderItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border">
                                        <Image
                                            src={item.image || '/placeholder.png'}
                                            alt={item.product_name}
                                            className="object-cover w-full h-full"
                                            width={100}
                                            height={100}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-base font-semibold text-gray-800">{item.product_name}</h3>
                                        <p className="text-gray-500 text-xs italic">Category: {item.category_name || 'N/A'}</p>
                                        <p className="text-gray-600 text-sm line-clamp-3">{item.description || 'No description provided.'}</p>

                                        <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-700">
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                            <p><strong>Price:</strong> ₹{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Price */}
                        <div className="mt-6 flex justify-end text-lg font-semibold text-gray-800 border-t pt-4">
                            Total: ₹{orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                        </div>
                    </div>
                </div>
            )}




            {/* Edit Modal */}
            {editModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setEditModal(false)}
                            className="absolute top-3 right-3 text-gray-600"
                        >
                            ❌
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Edit Order Status</h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();

                                try {
                                    setUpdateLoading(true);
                                    const res = await fetch(`/api/update-order`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: selectedOrder.id,
                                            status,
                                        }),
                                    });
                                    const data = await res.json();
                                    if (res.ok) {
                                        toast.success('Order status updated.');
                                        fetchOrder();
                                        setEditModal(false);
                                    } else {
                                        alert(data.error || 'Failed to update.');
                                    }
                                } catch (err) {
                                    console.error(err);
                                }
                                setUpdateLoading(false);
                            }}
                            className="space-y-4"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                className="w-full border px-3 py-2 rounded bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                                type="submit"
                                disabled={updateloading}
                                className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full ${updateloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
