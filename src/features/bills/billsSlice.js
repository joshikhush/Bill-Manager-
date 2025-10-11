import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  monthlyBudget: 5000,
  bills: [
    {
      id: 1,
      description: 'Dominoes',
      category: 'FoodNDining',
      amount: 430,
      date: '2020-01-02',
    },
    {
      id: 2,
      description: 'Car wash',
      category: 'utility',
      amount: 500,
      date: '2020-01-06',
    },
    {
      id: 3,
      description: 'Amazon',
      category: 'shopping',
      amount: 2030,
      date: '2020-01-07',
    },
    {
      id: 4,
      description: 'House rent',
      category: 'Food & Dining',
      amount: 10000,
      date: '2020-01-01',
    },
    {
      id: 5,
      description: 'Tuition',
      category: 'Education',
      amount: 2200,
      date: '2020-01-12',
    },
    {
      id: 6,
      description: 'Laundry',
      category: 'Personal Care',
      amount: 320,
      date: '2020-01-14',
    },
    {
      id: 7,
      description: 'Vacation',
      category: 'Travel',
      amount: 3430,
      date: '2020-01-18',
    },
  ],
  filterCategory: 'all',
  highlightedBills: [],
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      // payload: {description, category, amount, date}
      const newId = Date.now();
      state.bills.push({ id: newId, ...action.payload });
    },
    editBill: (state, action) => {
      // payload: {id, description, category, amount, date}
      const { id, description, category, amount, date } = action.payload;
      const existingBill = state.bills.find((b) => b.id === id);
      if (existingBill) {
        existingBill.description = description;
        existingBill.category = category;
        existingBill.amount = amount;
        existingBill.date = date;
      }
    },
    removeBill: (state, action) => {
      // payload = id
      const idToRemove = action.payload;
      state.bills = state.bills.filter((b) => b.id !== idToRemove);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setHighlightedBills: (state, action) => {
      // payload = array of bill IDs
      state.highlightedBills = action.payload;
    },
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
  },
});

export const {
  addBill,
  editBill,
  removeBill,
  setFilterCategory,
  setHighlightedBills,
  setMonthlyBudget,
} = billsSlice.actions;

export default billsSlice.reducer;
