import { createSlice } from '@reduxjs/toolkit';

const batchSlice = createSlice({
  name: 'batches',
  initialState: {
    list: [],
  },
  reducers: {
   setBatch: (state, action) => {
      state.list = [action.payload]; 
    },
    removeBatch: (state, action) => {
      state.list = state.list.filter((batch) => batch.id !== action.payload);
    },
  },
});

export const { setBatch, removeBatch } = batchSlice.actions;
export default batchSlice.reducer;
