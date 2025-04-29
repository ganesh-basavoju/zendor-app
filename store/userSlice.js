import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name:null,
    email:null,
    phone:null,
    isAuthenticated: false,
    role:null,
    profile:{}
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role=action.payload.role;
    },
    logout: (state) => {
      state.name=null;
      state.email=null;
      state.token = null;
      state.isAuthenticated = false;
      state.role=null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;