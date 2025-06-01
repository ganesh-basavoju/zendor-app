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
  