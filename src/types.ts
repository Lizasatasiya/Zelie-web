export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  bestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutForm {
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'googlepay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

// Example: types.ts or in the same file
export interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  wishlist: string[]; // ✅ Add this
  toggleWishlist: (productId: string) => void; // ✅ Add this
}
