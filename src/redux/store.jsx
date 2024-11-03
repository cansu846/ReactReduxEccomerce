import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../redux/slices/productSlice"
import basketReducer from "../redux/slices/basketSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    basket: basketReducer
  },
})