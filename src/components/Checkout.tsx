import React, { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';
import { CartItem, CheckoutForm } from '../types';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com';

interface CheckoutProps {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, totalPrice, onClose, onOrderComplete }) => {
  const [form, setForm] = useState<Omit<CheckoutForm, 'paymentMethod'>>({
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const shipping = totalPrice >= 599 ? 0 : 50;
  const finalTotal = totalPrice + shipping;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRazorpayPayment = async () => {
    const { mobile, firstName, lastName, address, city, state, postalCode, country, email } = form;

    if (!/^\d{10}$/.test(mobile) || !firstName || !lastName || !address || !city || !state || !postalCode || !country) {
      alert('Please fill all fields correctly.');
      return;
    }

    setIsProcessing(true);

    const options = {
      key: 'rzp_live_Oc8CdvKp6codkl',
      amount: finalTotal * 100,
      currency: 'INR',
      name: 'ZeLie',
      description: 'Order Payment',
      handler: async function (response: any) {
        if (!user) return alert('User not logged in.');

        const productDetails = items.map((item) =>
          `• ${item.product.name} (ID: ${item.product.id}) — ₹${item.product.price} × ${item.quantity}`
        ).join('\n');

        try {
          // 1. Store order in Firestore
          const orderRef = collection(db, 'users', user.uid, 'orders');
          await addDoc(orderRef, {
            items: items.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
            })),
            total: finalTotal,
            createdAt: serverTimestamp(),
            shippingAddress: { ...form },
            paymentId: response.razorpay_payment_id,
          });

          // 2. Send Email using EmailJS
          await emailjs.send(
            'service_g2k5w9s',        // ✅ Your EmailJS Service ID
            'template_azqrd6r',        // ✅ Your EmailJS Template ID
            {
              customer_name: `${firstName} ${lastName}`,
              email: email,
              payment_id: response.razorpay_payment_id,
              order_summary: productDetails,
              total: `₹${finalTotal.toLocaleString()}`,
              shipping_address: `${address}, ${city}, ${state}, ${postalCode}, ${country}`,
            },
            'D0X0CFJnVlt3w3spQ'           // ✅ Your EmailJS Public Key (User ID)
          );

          alert('Payment successful and confirmation email sent!');
          onOrderComplete();
        } catch (error) {
          console.error('Error saving order or sending email:', error);
          alert('Payment succeeded but failed to save order or send email.');
        }
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        contact: mobile,
        email: form.email,
      },
      notes: {
        address,
        city,
        state,
        pincode: postalCode,
        country,
      },
      theme: { color: '#503e28' },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    setIsProcessing(false);
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Login Required</h2>
          <p className="text-gray-700 mb-6">Please log in to complete your purchase.</p>
          <a href="/login" className="text-white bg-[#503e28] hover:bg-[#3d2f1f] px-6 py-3 rounded-md transition">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <form className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <input name="mobile" type="tel" placeholder="Mobile number" value={form.mobile} onChange={handleInputChange} required maxLength={10} className="w-full mb-4 px-4 py-3 border rounded-lg" />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-lg" />
              </div>

              <div>
                <h3 className="font-semibold mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleInputChange} required className="px-4 py-3 border rounded-lg" />
                  <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleInputChange} required className="px-4 py-3 border rounded-lg" />
                  <input name="address" placeholder="Address" value={form.address} onChange={handleInputChange} required className="md:col-span-2 px-4 py-3 border rounded-lg" />
                  <input name="city" placeholder="City" value={form.city} onChange={handleInputChange} required className="px-4 py-3 border rounded-lg" />
                  <input name="state" placeholder="State" value={form.state} onChange={handleInputChange} required className="px-4 py-3 border rounded-lg" />
                  <input name="postalCode" placeholder="Postal code" value={form.postalCode} onChange={handleInputChange} required className="px-4 py-3 border rounded-lg" />
                  <select name="country" value={form.country} onChange={handleInputChange} required className="md:col-span-2 px-4 py-3 border rounded-lg">
                    <option value="">Select country</option>
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Payment</h3>
                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                  className="w-full bg-[#503e28] text-white py-4 px-6 rounded-lg hover:bg-[#3d2f1f] disabled:opacity-50"
                >
                  <Lock className="w-5 h-5 inline-block mr-2" />
                  {isProcessing ? 'Processing...' : `Pay Now - ₹${finalTotal.toLocaleString()}`}
                </button>
              </div>
            </form>

            {/* Right: Order Summary */}
            <div>
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                  <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{finalTotal.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
