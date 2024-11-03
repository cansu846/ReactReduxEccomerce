import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const BASE_URL = " https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`)
    console.log(response.data)
    return response.data
  },
)

const initialState = {
  products: [],
  loading: false,
  selectedProduct: {}
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
  },

})

// Action creators are generated for each case reducer function
export const { setSelectedProduct } = productSlice.actions

export default productSlice.reducer