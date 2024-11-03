import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

//LocalStorage içinde saklanan öğeyi "basket" anahtarı ile çağırır.
const getBasketFromStorage=()=>{
    if(localStorage.getItem("basket")){
        //dizi  haline getirilir
        return JSON.parse(localStorage.getItem("basket"))
    }
    return [];
}

const writeFromBasketToStorage= (basket)=>{
localStorage.setItem("basket", JSON.stringify(basket))
}

const initialState = {
    // sayfa yenilendiginde urunler silinecegi için '[]' ile başlatmak yerine 'getBasketFromStorage' ile başlatılır.
  products: getBasketFromStorage(),
  isDrawerOpen: false,
  totalPrice: 0
}


export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {

       const findProduct = state.products.find((product)=>(product.id==action.payload.id))

       if(findProduct){
        const extractedProducts = state.products.filter((product)=>(product.id !== action.payload.id))
        console.log("find.product count before: "+findProduct.count)
        findProduct.count += action.payload.count;
        state.products = [...extractedProducts, findProduct]
        console.log("find.product count after: "+findProduct.count)

       }else{
        state.products=[...state.products,action.payload]
       }
       writeFromBasketToStorage(state.products)
       console.log("state.products: "+ state.products[0].count)
    },

    setIsDrawerOpen: (state)=>{
      state.isDrawerOpen= !(state.isDrawerOpen)
      console.log( state.isDrawerOpen)
    },
    calculateTotalPrice:(state)=>{
      state.totalPrice = 0
      state.products.map((product)=>{
        state.totalPrice += (product.count * product.price)
      })
      state.totalPrice = Number((state.totalPrice).toFixed(3))
    }

  },
  extraReducers: (builder) => {
    
  },

})

// Action creators are generated for each case reducer function
export const { addProductToBasket, setIsDrawerOpen, calculateTotalPrice} = basketSlice.actions

export default basketSlice.reducer