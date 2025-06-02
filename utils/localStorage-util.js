<<<<<<< HEAD

export const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};
export function loadCartFromLocalStorage() {
  if (typeof window === "undefined") {
    return { items: [], totalAmount: 0, isGuest: false };
  }
  try {
    const cart = localStorage.getItem("cart");
    return cart
      ? JSON.parse(cart)
      : { items: [], totalAmount: 0, isGuest: false };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { items: [], totalAmount: 0, isGuest: false };
  }
}
=======
export const loadCartFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    // Running on server, return empty cart
    return { items: [] };
  }
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return { items: [] };
  }
};
  
  export const saveCartToLocalStorage = (cartState) => {
    try {
      const serializedState = JSON.stringify(cartState);
      localStorage.setItem('cart', serializedState);
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  };
  
>>>>>>> aa1b56f678b0f3b1dd4ea8213eac21d1eac77328
