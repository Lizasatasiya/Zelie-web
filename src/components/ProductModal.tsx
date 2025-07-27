import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}



const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, wishlist,
  toggleWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-light text-gray-900 tracking-wide">{product.name}</h2>
              <p className="text-sm text-gray-500 font-light tracking-wide uppercase mt-1">{product.category}</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-square mb-6 bg-gray-50 rounded-2xl overflow-hidden group">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'ring-2 ring-[#503e28] scale-105'
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-[#503e28] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-light">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed font-light text-lg">{product.description}</p>

              {/* Price */}
              <div className="py-4">
  {product.originalPrice && product.originalPrice > product.price ? (
    <div className="flex items-center space-x-4">
      <span className="text-2xl text-gray-400 line-through">
        ₹{product.originalPrice.toLocaleString()}
      </span>
      <span className="text-4xl font-light text-[#503e28] tracking-wide">
        ₹{product.price.toLocaleString()}
      </span>
    </div>
  ) : (
    <span className="text-4xl font-light text-[#503e28] tracking-wide">
      ₹{product.price.toLocaleString()}
    </span>
  )}
</div>


              {/* Quantity Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-light text-gray-700 tracking-wide uppercase">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:border-[#503e28] hover:text-[#503e28] transition-colors font-light"
                  >
                    −
                  </button>
                  <span className="w-16 text-center font-light text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:border-[#503e28] hover:text-[#503e28] transition-colors font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 px-8 font-light tracking-wide transition-all duration-300 flex items-center justify-center space-x-3 ${
                    product.inStock
                      ? 'bg-[#503e28] text-white hover:bg-[#3d2f1f] hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
  onClick={() => toggleWishlist(String(product.id))}
  className={`p-4 border rounded-lg transition-colors ${
    wishlist.includes(String(product.id))
      ? 'border-red-500 text-red-500'
      : 'border-gray-200 hover:border-[#503e28] hover:text-[#503e28]'
  }`}
>
  <Heart
    className={`w-5 h-5 ${
      wishlist.includes(String(product.id)) ? 'fill-red-500 text-red-500' : ''
    }`}
  />
</button>

              </div>

              {/* Product Features */}
              <div className="border-t border-gray-100 pt-8">
                <h4 className="font-light text-gray-900 mb-4 tracking-wide uppercase text-sm">Product Features</h4>
                <ul className="space-y-3 text-sm text-gray-600 font-light">
                  <li className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-[#503e28] rounded-full"></div>
                    <span>Anti-tarnish coating to retain shine and prevent dullness</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-[#503e28] rounded-full"></div>
                    <span>Premium materials that are durable and skin-friendly</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-[#503e28] rounded-full"></div>
                    <span>Elegant reusable packaging for gifting or storage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;