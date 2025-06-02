// export const loadCartFromLocalStorage = () => {
//     try {
//       const serializedState = localStorage.getItem('cart');
//       return serializedState ? JSON.parse(serializedState) : undefined;
//     } catch (e) {
//       console.warn("Could not load cart from localStorage", e);
//       return undefined;
//     }
//   };
  
  export const saveCartToLocalStorage = (cartState) => {
    try {
      const serializedState = JSON.stringify(cartState);
      localStorage.setItem('cart', serializedState);
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  };
  export function loadCartFromLocalStorage() {
    if (typeof window === 'undefined') {
      return { items: [], totalAmount: 0, isGuest: false };
    }
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : { items: [], totalAmount: 0, isGuest: false };
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return { items: [], totalAmount: 0, isGuest: false };
    }
  }
  