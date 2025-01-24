// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import batchSlice from './Batchslice'

const store = configureStore({
  reducer: {
    batches: batchSlice,
  },
});

export default store;
