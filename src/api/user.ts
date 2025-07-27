import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchWishlist = async (userId: string): Promise<string[]> => {
  const snap = await getDoc(doc(db, 'users', userId));
  return snap.exists() ? snap.data().wishlist || [] : [];
};

export const toggleWishlistItem = async (userId: string, productId: string) => {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const wishlist: string[] = snap.data().wishlist || [];
  const updated = wishlist.includes(productId)
    ? wishlist.filter(id => id !== productId)
    : [...wishlist, productId];
  await updateDoc(ref, { wishlist: updated });
};

export const saveOrder = async (userId: string, order: any) => {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { orders: arrayUnion(order) });
};