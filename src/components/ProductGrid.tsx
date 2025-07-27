import React, { useState } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}


const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories,
  selectedCategory,
  onCategoryChange,
  onProductClick,
  onAddToCart,
  wishlist,
  toggleWishlist
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  // Best sellers (first 3 products)
  const bestSellers = products.slice(0, 3);
  const regularProducts = products.slice(3);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            Our Collection
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Each piece is carefully crafted to perfection, combining traditional techniques with contemporary design.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative text-lg font-light tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-[#503e28]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {category}
              {selectedCategory === category && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#503e28] transition-all duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
              {bestSellers.map((product, index) => (
                <div
                  key={product.id}
                  className="group text-center"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Organic Shape Container */}
                  <div className="relative mx-auto mb-8 w-64 h-64 md:w-72 md:h-72">
                    <div
                      className={`absolute inset-0 overflow-hidden transition-all duration-700 ease-in-out transform ${
                        hoveredProduct === product.id
                          ? index === 0
                            ? 'rounded-[40px] scale-105'
                            : index === 1
                            ? 'rounded-full scale-105'
                            : 'rounded-[60px_20px_60px_20px] scale-105'
                          : index === 0
                          ? 'rounded-full'
                          : index === 1
                          ? 'rounded-[50px_20px_50px_20px]'
                          : 'rounded-[40px]'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                      }}
                    >
                      <img
                        src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                        onClick={() => onProductClick(product)}
                      />
                      
                      {/* Floating Action Buttons */}
                      <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
                        hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}>
                        <button
  onClick={() => toggleWishlist(String(product.id))}
  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
>
  <Heart
    className={`w-4 h-4 transition-colors ${
      wishlist.includes(String(product.id)) ? 'text-red-500 fill-red-500' : 'text-gray-600'
    }`}
  />
</button>

                        <button
                          onClick={() => onAddToCart(product)}
                          disabled={!product.inStock}
                          className="p-3 bg-[#503e28]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#503e28] transition-all duration-200 hover:scale-110 disabled:opacity-50"
                        >
                          <ShoppingBag className="w-4 h-4 text-white" />
                        </button>
                      </div>

                       {/* ✅ Bestseller Label */}
  {product.bestseller && (
    <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold text-white px-2 py-1 rounded shadow">
      Bestseller
    </div>
  )}

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="bg-white/95 text-gray-900 px-6 py-2 rounded-full font-light text-sm tracking-wide">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-[#503e28] fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    
                    <h3
                      className="text-lg font-light text-gray-900 cursor-pointer hover:text-[#503e28] transition-colors duration-300 tracking-wide"
                      onClick={() => onProductClick(product)}
                    >
                      {product.name}
                    </h3>
                    
                    <div className="text-xl font-light text-[#503e28] tracking-wide">
  {product.originalPrice && product.originalPrice > product.price ? (
    <div className="flex justify-center items-center space-x-2">
      <span className="text-sm text-gray-400 line-through">
        ₹{product.originalPrice.toLocaleString()}
      </span>
      <span className="text-[#503e28] text-lg font-semibold">
        ₹{product.price.toLocaleString()}
      </span>
    </div>
  ) : (
    <span>₹{product.price.toLocaleString()}</span>
  )}
</div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Products Grid */}
        {regularProducts.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
              {regularProducts.map((product) => (
                <div
                  key={product.id}
                  className="group text-center"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div className="relative mb-6 overflow-hidden">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 cursor-pointer group-hover:scale-105"
                        onClick={() => onProductClick(product)}
                      />
                    </div>
                    
                    {/* Floating Actions */}
                    <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}>
                      <button
  onClick={() => toggleWishlist(String(product.id))}
  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
>
  <Heart
    className={`w-4 h-4 transition-colors ${
      wishlist.includes(String(product.id)) ? 'text-red-500 fill-red-500' : 'text-gray-600'
    }`}
  />
</button>

                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                        className="p-2.5 bg-[#503e28]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#503e28] transition-all duration-200 hover:scale-110 disabled:opacity-50"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </button>
                    </div>
                     
                      {/* ✅ Bestseller Label */}
  {product.bestseller && (
    <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold text-white px-2 py-1 rounded shadow">
      Bestseller
    </div>
  )}

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
                        <span className="bg-white/95 text-gray-900 px-4 py-2 rounded-full font-light text-sm tracking-wide">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-[#503e28] fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    
                    <h3
                      className="text-base font-light text-gray-900 cursor-pointer hover:text-[#503e28] transition-colors duration-300 tracking-wide"
                      onClick={() => onProductClick(product)}
                    >
                      {product.name}
                    </h3>
                    
                    <div className="text-xl font-light text-[#503e28] tracking-wide">
  {product.originalPrice && product.originalPrice > product.price ? (
    <div className="flex justify-center items-center space-x-2">
      <span className="text-sm text-gray-400 line-through">
        ₹{product.originalPrice.toLocaleString()}
      </span>
      <span className="text-[#503e28] text-lg font-semibold">
        ₹{product.price.toLocaleString()}
      </span>
    </div>
  ) : (
    <span>₹{product.price.toLocaleString()}</span>
  )}
</div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-light tracking-wide">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;