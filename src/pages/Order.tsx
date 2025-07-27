import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import BackButton from '../components/BackButton';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const snap = await getDocs(ordersRef);
      const userOrders = snap.docs.map(doc => doc.data());
      setOrders(userOrders);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center text-gray-600 mt-24">
        Please log in to view your orders.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <BackButton />
      <h2 className="text-2xl font-light mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No past orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <div key={i} className="border p-4 rounded">
              <p className="text-gray-800 font-medium mb-2">Order #{i + 1}</p>
              <p className="text-sm text-gray-600">Date: {order.createdAt?.toDate?.().toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
              <p className="text-sm text-gray-600">Items: {order.items?.length}</p>
              <ul className="mt-2 text-sm list-disc list-inside text-gray-700">
                {order.items?.map((item: any, idx: number) => (
                  <li key={idx}>
                    {item.name} (x{item.quantity}) - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
