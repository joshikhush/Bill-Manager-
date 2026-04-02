import { configureStore } from '@reduxjs/toolkit';
import billsReducer from '../features/bills/billsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    bills: billsReducer,
    auth: authReducer,
  },
});

