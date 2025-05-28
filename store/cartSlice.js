import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  isGuest: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.productType === newItem.productType
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart(state, action) {
      console.log("aion",action);
      state.items = state.items.filter(
        (item) => !(item.productId === action.payload.id)
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQuantity(state, action) {
      const { productId,flag } = action.payload;
      console.log(action,"Act")
      const item = state.items.find(
        (item) =>
          item.productId === productId
      );
      if (item) {
        if(flag){
          item.quantity=item.quantity+1;
        }else if(!flag&&item.quantity!=0){
          item.quantity=item.quantity-1;
        }
       
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    setIsGuest(state, action) {
      state.isGuest = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setIsGuest,
} = cartSlice.actions;
export default cartSlice.reducer;
