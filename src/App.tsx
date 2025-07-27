import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { Product, CartItem } from './types';
import { getProductImages } from './utils/getProductImages';
import Wishlist from './components/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Order';
import { AuthProvider } from './contexts/AuthContext';


// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Ishq Mini",
    price: 1,
    images: getProductImages("IshqMini"),
    description: "💖 IshqMini – Where Love Lives in the Little Things",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 24,
    bestseller: true
  },
  {
    id: 2,
    name: "Dill Blink ",
    price: 279,
    images: getProductImages("DilBlink"),
    description: "✨ Dil Blink – When the Heart Sparkles.",
    category: "Necklaces",
    inStock: true,
    rating: 4.9,
    reviews: 18,
    bestseller: true
  },
  {
    id: 3,
    name: "Noor e Gulab",
    price: 199,
    images: getProductImages("Gulab"),
    description: "🌹 Noor-e-Gulab – The Light of Love, Petal by Petal",
    category: "Necklaces",
    inStock: true,
    rating: 4.7,
    reviews: 32,
    bestseller: true
  },
  {
    id: 4,
    name: "Pyaar Envelope",
    price: 499,
    images: getProductImages("envelope"),
    description: "💌 Pyaar Envelope – Love, Sealed Just for You",
    category: "Necklaces",
    inStock: true,
    rating: 5.0,
    reviews: 15
  },
  {
    id: 5,
    name: "11:11 Necklace",
    price: 249,
    images: getProductImages("1111"),
    description: "🌟 11:11 Necklace – A Moment Aligned with the Heart.",
    category: "Necklaces",
    inStock: true,
    rating: 4.6,
    reviews: 28
  },
  {
    id: 6,
    name: "Tiny Kont",
    price: 249,
    images: getProductImages("knot"),
    description: "🎀 Tiny Knot – Where Small Things Hold Big Meaning.",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);


  const toggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setShowAddToCartMessage(true);
    setTimeout(() => setShowAddToCartMessage(false), 2000);
  };
  

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setShowCheckout(false);
    alert('Order placed successfully! Thank you for shopping with Zelie.');
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All'];

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <div className="bg-[#503e28] text-white text-center text-sm font-semibold py-2">
            Order above ₹599 for FREE delivery
          </div>

          <Header
            cartItemCount={getTotalItems()}
            onCartClick={() => setShowCart(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ProductGrid
                    products={filteredProducts}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onProductClick={setSelectedProduct}
                    onAddToCart={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                </>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  products={sampleProducts}
                  onProductClick={setSelectedProduct}
                  toggleWishlist={toggleWishlist}
                  onAddToCart={addToCart}
                />
              }
            />
            <Route path="/login" element={<div className="mt-32"><Login /></div>} />
<Route path="/register" element={<div className="mt-32"><Register /></div>} />
<Route path="/orders" element={<div className="mt-32"><Orders /></div>} />

          </Routes>

          <Footer />
          {showAddToCartMessage && (
  <div className="fixed bottom-6 right-6 bg-[#503e28] text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
    ✅ Added to cart!
  </div>
)}

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          )}

          {showCart && (
            <Cart
              items={cartItems}
              onClose={() => setShowCart(false)}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
              totalPrice={getTotalPrice()}
            />
          )}

          {showCheckout && (
            <Checkout
              items={cartItems}
              totalPrice={getTotalPrice()}
              onClose={() => setShowCheckout(false)}
              onOrderComplete={handleOrderComplete}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;