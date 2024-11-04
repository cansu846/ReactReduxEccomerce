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
  selectedProduct: {},
  backupProducts: []
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    listProductsByTitle: (state, action) => {
      if (action.payload.trim() === "") {
        state.products = state.backupProducts; // Restore full list if query is empty
      } else {
        state.products = state.backupProducts.filter((product) =>
          product.title.toLowerCase().includes(action.payload.toLowerCase()))
      }
      //console.log("state.productsByTitle: "+state.productsByTitle)
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.backupProducts = action.payload;
    })
  },

})

// Action creators are generated for each case reducer function
export const { setSelectedProduct, listProductsByTitle } = productSlice.actions

export default productSlice.reducer