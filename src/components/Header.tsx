import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, X, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  userEmail?: string;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  wishlist,
  toggleWishlist,
  userEmail,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setShowUserMenu(false);
    navigate('/');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#503e28] text-white text-center text-xs font-semibold py-2">
        Order above ₹599 for FREE delivery
      </div>

      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-extralight text-[#503e28] tracking-[0.2em] hover:underline"
              >
                ZELIE
              </Link>
            </div>

            <div className="hidden lg:flex flex-1 max-w-sm mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    navigate('/');
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#503e28]/20 focus:bg-white transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#503e28] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Icon Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                    } else {
                      setShowUserMenu((prev) => !prev);
                    }
                  }}
                  className="p-2 text-gray-700 hover:text-[#503e28] transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>

                {user && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10">
                    <button
                      onClick={() => {
                        navigate('/orders');
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => {
                        navigate('/account');
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={handleWishlistClick}
                className="p-2 text-gray-700 hover:text-[#503e28] transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-[#503e28] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#503e28] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-light">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="lg:hidden pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    navigate('/');
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#503e28]/20 focus:bg-white transition-all duration-300 text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
