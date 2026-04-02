import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Khushi Joshi',
    role: 'ADMIN', // Possible roles: ADMIN, VIEWER
    initials: 'KJ',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleRole: (state) => {
      state.user.role = state.user.role === 'ADMIN' ? 'VIEWER' : 'ADMIN';
    },
  },
});

export const { toggleRole, updateRole } = authSlice.actions;
export default authSlice.reducer;
