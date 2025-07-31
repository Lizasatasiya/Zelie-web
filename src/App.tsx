import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Order';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PopupProvider, usePopup } from './contexts/PopupContext';
import { Product, CartItem } from './types';
import { getProductImages } from './utils/getProductImages';
import PopupMessage from './components/PopupMessage'; // Optional if you modularized it

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Ishq Mini",
    price: 299,
    originalPrice: 349,
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
    name: "Noor e Gulab",
    price: 329,
    originalPrice: 379,
    images: getProductImages("Gulab"),
    description: "🌹 Noor-e-Gulab – The Light of Love, Petal by Petal",
    category: "Necklaces",
    inStock: true,
    rating: 4.7,
    reviews: 32,
    bestseller: true
  }, 
  {
    id: 3,
    name: "Olive Shine",
    price: 319,
    originalPrice: 349,
    images: getProductImages("OliveShine"),
    description: "✨ A piece for the ones who glow without trying.",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12,
    bestseller: true
  },
 
  {
    id: 4,
    name: "Dill Blink ",
    price: 299,
    originalPrice: 399,
    images: getProductImages("DilBlink"),
    description: "✨ Dil Blink – When the Heart Sparkles.",
    category: "Necklaces",
    inStock: true,
    rating: 4.9,
    reviews: 18,
    
  },
  {
    id: 5,
    name: "11:11 Necklace",
    price: 279,
    originalPrice: 399,
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
    price: 269,
    originalPrice: 399,
    images: getProductImages("knot"),
    description: "🎀 Tiny Knot – Where Small Things Hold Big Meaning.",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 7,
    name: "Sea Spark",
    price: 499,
    originalPrice: 649,
    images: getProductImages("SeaSpark"),
    description: "🌊✨ Sea Spark – A Whisper from the Ocean, A Wink from the Stars",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
 
  {
    id: 8,
    name: "Florenza",
    price: 249,
    originalPrice: 299,
    images: getProductImages("Vancleef1white"),
    description: "A touch of timeless luck 🍀 wrapped in golden elegance ✨",
    category: "Necklaces",
    inStock: false,
    rating: 4.8,
    reviews: 12,
    
  },
  {
    id: 9,
    name: "Pearl Pendant",
    price: 319,
    originalPrice: 349,
    images: getProductImages("pearl"),
    description: "✨ For the one who shines gently… and deeply.",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 10,
    name: "Mini White Heart",
    price: 299,
    originalPrice: 349,
    images: getProductImages("miniwhiteheart"),
    description: "✨ Because sometimes, the smallest hearts hold the biggest feelings.",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 11,
    name: "Mini Black Heart",
    price: 299,
    originalPrice: 349,
    images: getProductImages("miniblackheart"),
    description: "✨ For the one whose heart doesn’t shine — it glows in the dark.",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 12,
    name: "Pyaar Envelope",
    price: 449,
    originalPrice: 599,
    images: getProductImages("envelope"),
    description: "💌 Pyaar Envelope – Love, Sealed Just for You",
    category: "Necklaces",
    inStock: false,
    rating: 5.0,
    reviews: 15
  },
  {
    id: 13,
    name: "Pearl Petals",
    price: 499,
    originalPrice: 599,
    images: getProductImages("PearlPetals"),
    description: "🌼 Where Petals Bloom in Golden Whispers",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 14,
    name: "Hearty Knot",
    price: 299,
    originalPrice: 349,
    images: getProductImages("HeartyKnot"),
    description: "💛 Where love ties itself in golden threads",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 15,
    name: "Cherry Pop",
    price: 349,
    originalPrice: 449,
    images: getProductImages("CherryPop"),
    description: "🍒 Where Sweet Meets Sassy in Every Sparkle",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 16,
    name: "Heart Let",
    price: 329,
    originalPrice: 349,
    images: getProductImages("Heartlet"),
    description: "💛 A Tiny Heart with a Big Story",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 17,
    name: "Twin Shine",
    price: 549,
    originalPrice: 649,
    images: getProductImages("Twinshine"),
    description: "✨ Double the shine, deeper the love",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 18,
    name: "Petal Glow",
    price: 299,
    originalPrice: 349,
    images: getProductImages("PetalGlow"),
    description: "🌸 Blooms with Grace, Glows with You",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 19,
    name: "IvoryHeart",
    price: 349,
    originalPrice: 399,
    images: getProductImages("IvoryHeart"),
    description: "✨ A pure heart, gently golden",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 20,
    name: "Lime Drop",
    price: 299,
    originalPrice: 349,
    images: getProductImages("LimeDrop"),
    description: "🍈Zesty Charm in Every Curve",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 21,
    name: "Sun Stone",
    price: 349,
    originalPrice: 389,
    images: getProductImages("Sunstone"),
    description: "🌞 Let your light shine, even on the darkest days",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 22,
    name: "Flora White",
    price: 349,
    originalPrice: 399,
    images: getProductImages("FloraWhite"),
    description: "🌸 Bloom where you are planted",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 23,
    name: "Flora Black",
    price: 349,
    originalPrice: 399,
    images: getProductImages("FloraBlack"),
    description: "🌸 In the darkness, beauty finds its way",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 24,
    name: "Flora Golden",
    price: 399,
    originalPrice: 449,
    images: getProductImages("FloraGolden"),
    description: "🌼 Where golden petals bloom, elegance follows",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 25,
    name: "Glow Mini",
    price: 299,
    originalPrice: 349,
    images: getProductImages("GlowMini"),
    description: "✨ Where Tiny Twinkles Speak Loud Style",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 26,
    name: "Kiranika",
    price: 329,
    originalPrice: 369, 
    images: getProductImages("Kiranika"),
    description: "☀️ Where Every Ray Finds Its Shine",
    category: "Necklaces",
    inStock: true,
    rating: 4.8,
    reviews: 12
  }
];

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const { showPopup } = usePopup();

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
    if (!user) {
      showPopup("Please register or log in to proceed to checkout.");
      navigate('/login');
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setShowCheckout(false);
    showPopup("✅ Order placed successfully! Thank you for shopping with Zelie.");
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
        <Route path="/" element={
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
        } />
        <Route path="/wishlist" element={
          <Wishlist
            wishlist={wishlist}
            products={sampleProducts}
            onProductClick={setSelectedProduct}
            toggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        } />
        <Route path="/login" element={<div className="mt-32"><Login /></div>} />
        <Route path="/register" element={<div className="mt-32"><Register /></div>} />
        <Route path="/orders" element={<div className="mt-32"><Orders /></div>} />
      </Routes>

      <Footer />

      {showAddToCartMessage && (
        <div className="fixed bottom-6 right-6 bg-[#503e28] text-white px-4 py-2 rounded shadow-lg z-50">
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

      {/* Global Popup message from context */}
      <PopupMessage />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PopupProvider>
        <Router>
          <AppContent />
        </Router>
      </PopupProvider>
    </AuthProvider>
  );
}
