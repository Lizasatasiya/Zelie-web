import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface WishlistProps {
  wishlist: string[];
  products: Product[];
  onProductClick: (product: Product) => void;
  toggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({
  wishlist,
  products,
  onProductClick,
  toggleWishlist,
  onAddToCart
}) => {
  const navigate = useNavigate();

  const wishlistProducts = products.filter(product =>
    wishlist.includes(product.id.toString())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 text-sm font-medium bg-[#503e28] text-white rounded hover:bg-[#3c2d1e] transition"
      >
        ← Back to Shop
      </button>

      <h2 className="text-2xl font-light text-gray-800 mb-8">
        Your Wishlist ({wishlistProducts.length})
      </h2>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500">You have no items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4 text-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-56 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-2">₹{product.price}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => toggleWishlist(product.id.toString())}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="text-[#503e28] hover:underline"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
