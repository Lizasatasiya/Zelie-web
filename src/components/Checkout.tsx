import React, { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';
import { CartItem, CheckoutForm } from '../types';

interface CheckoutProps {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, totalPrice, onClose, onOrderComplete }) => {
  const [form, setForm] = useState<Omit<CheckoutForm, 'paymentMethod' | 'cardNumber' | 'expiryDate' | 'cvv'>>({
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const shipping = totalPrice >= 599 ? 0 : 50;
  const finalTotal = totalPrice + shipping;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleRazorpayPayment = async () => {
    const { mobile, firstName, lastName, address, city, postalCode, country } = form;
    
    // ✅ Manual check before Razorpay opens
    if (
      !/^\d{10}$/.test(mobile) ||
      !firstName.trim() || !lastName.trim() ||
      !address.trim() || !city.trim() ||
      !postalCode.trim() || !country
    ) {
      alert('Please fill all fields correctly.');
      return;
    }

    setIsProcessing(true);

    const options = {
      key: "rzp_test_HkBH08HUJzewxO", // ✅ Your test key
      amount: finalTotal * 100, // in paise
      currency: 'INR',
      name: 'ZeLie',
      description: 'Order Payment',
      handler: function (response: any) {
        console.log('Razorpay Payment ID:', response.razorpay_payment_id);
        alert('Payment successful!');
        onOrderComplete();
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        contact: mobile,
      },
      theme: {
        color: '#503e28',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <form className="space-y-6">
              <div>
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

  <div className="mb-4">
    <input
      type="tel"
      name="mobile"
      placeholder="Mobile number"
      value={form.mobile}
      onChange={handleInputChange}
      required
      pattern="[0-9]{10}"
      inputMode="numeric"
      maxLength={10}
      title="Enter a valid 10-digit mobile number"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
    />
  </div>

  <div>
  <input
  type="email"
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={handleInputChange}
  required
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
  title="Enter a valid email address (e.g., example@email.com)"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
/>

  </div>
</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28]"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28]"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={form.address}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28]"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28]"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={form.postalCode}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28]"
                    />
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28]"
                    >
                      <option value="">Select country</option>
                      <option value="IN">India</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment</h3>
                  <button
                    type="button"
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="w-full bg-[#503e28] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#3d2f1f] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" />
                    <span>{isProcessing ? 'Processing...' : `Pay Now - ₹${finalTotal.toLocaleString()}`}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">
                    Your payment is secure and encrypted
                  </span>
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
