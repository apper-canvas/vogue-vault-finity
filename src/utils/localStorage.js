const CART_KEY = "vogue_vault_cart";
const WISHLIST_KEY = "vogue_vault_wishlist";

export const cartStorage = {
  get: () => {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  },

  set: (cart) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  }
};

export const wishlistStorage = {
  get: () => {
    try {
      const wishlist = localStorage.getItem(WISHLIST_KEY);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error("Error reading wishlist from localStorage:", error);
      return [];
    }
  },

  set: (wishlist) => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(WISHLIST_KEY);
    } catch (error) {
      console.error("Error clearing wishlist from localStorage:", error);
    }
  }
};