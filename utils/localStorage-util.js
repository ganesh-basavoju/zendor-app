
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


export function loadMoodboardFromLocalStorage() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const data = localStorage.getItem("moodboard");
    return data ? JSON.parse(data) : { items: [] };
  } catch {
    return { items: [] };
  }
}
