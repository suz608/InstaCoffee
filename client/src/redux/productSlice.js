// src/redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import menu from '../data/menu';  // Assuming your menu.js is inside the data folder

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Create slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Actions
export const { setProducts, setLoading, setError } = productSlice.actions;

// Thunk for fetching products (this can be extended for an API fetch)
export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Replace this with an actual API call if necessary
    const data = menu; // Import products from menu.js
    dispatch(setProducts(data));  // Set products in Redux store
  } catch (error) {
    dispatch(setError('Failed to load products'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Reducer
export default productSlice.reducer;
