import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import cartReducer from "./cartSlice";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/utils/localStorage-util";

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};
const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});

export default store;
