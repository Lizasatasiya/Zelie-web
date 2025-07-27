import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  totalPrice
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-lg overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900 tracking-wide">Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-6 font-light text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-[#503e28] font-light hover:underline tracking-wide"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start space-x-4 py-6 border-b border-gray-100 last:border-b-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-light text-gray-900 text-lg tracking-wide truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-[#503e28] font-light text-lg mt-1">
                        ₹{item.product.price.toLocaleString()}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-4">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:border-[#503e28] hover:text-[#503e28] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-light">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:border-[#503e28] hover:text-[#503e28] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <p className="font-light text-gray-900 text-lg">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-100 pt-8 space-y-6">
                <div className="space-y-1 text-right">
                  {totalPrice < 599 ? (
                    <>
                      <p className="text-gray-500 text-sm">Subtotal: ₹{totalPrice}</p>
                      <p className="text-gray-500 text-sm">Delivery: ₹50</p>
                      <p className="text-3xl font-light text-[#503e28] tracking-wide">
                        Total: ₹{totalPrice + 50}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm">Delivery: <span className="text-green-600">FREE</span></p>
                      <p className="text-3xl font-light text-[#503e28] tracking-wide">
                        Total: ₹{totalPrice}
                      </p>
                    </>
                  )}
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-[#503e28] text-white py-4 px-8 font-light tracking-wide hover:bg-[#3d2f1f] transition-all duration-300 hover:scale-105"
                >
                  Checkout
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-gray-500 py-3 px-6 font-light hover:text-gray-700 transition-colors tracking-wide"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
