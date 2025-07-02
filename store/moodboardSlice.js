import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const moodboardSlice = createSlice({
  name: 'moodboard',
  initialState,
  reducers: {
    addToMoodboard: (state, action) => {
      // Prevent duplicates by id
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromMoodboard: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearMoodboard: (state) => {
      state.items = [];
    },
  },
});

export const { addToMoodboard, removeFromMoodboard, clearMoodboard } = moodboardSlice.actions;
export default moodboardSlice.reducer;