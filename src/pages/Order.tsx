import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import BackButton from '../components/BackButton';
const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setOrders(snap.data().orders || []);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <p className="text-center text-gray-600 mt-24">Please log in to view orders.</p>;

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
              <p className="text-gray-800">Order #{i + 1}</p>
              <p>Total: ₹{order.total}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Items: {order.items.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
