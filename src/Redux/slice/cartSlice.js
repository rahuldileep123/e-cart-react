import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name:"cart",
  initialState:[],
  reducers:{
    addToCart: (state,action)=>{
        const existingProduct= state.find(item=>item.id==action.payload.id)
        if(existingProduct){
            const remainingProducts=state.filter(item=>item.id!=existingProduct.id)
            existingProduct.quantity++
            existingProduct.totalPrice=existingProduct.quantity*existingProduct.totalPrice
            state =[...remainingProducts,existingProduct]
        }else{
            state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
        }

    },
    removeCartItem:(state,action)=>{
      return state.filter(item=>item.id!=action.payload)
    },
    incrementQuantitiy:(state,action)=>{
     const incrementedProduct=state.find(item=>item.id==action.payload)
     incrementedProduct.quantity++
     incrementedProduct.totalPrice=incrementedProduct.quantity*incrementedProduct.price
     const remainingProducts=state.filter(item=>item!=action.payload)
      state =[...remainingProducts,incrementedProduct]
    },
    decrementQuantity:(state,action)=>{
      const decrementedProduct=state.find(item=>item.id==action.payload)
      decrementedProduct.quantity--
      decrementedProduct.totalPrice=decrementedProduct.quantity*decrementedProduct.price
      const remainingProducts=state.filter(item=>item.id!=action.payload)
      state=[...remainingProducts,decrementedProduct]
    },
    emptyCart:(state)=>{
      return state=[]
    }
  }  
})
export const {addToCart,removeCartItem,incrementQuantitiy,decrementQuantity,emptyCart}=cartSlice.actions
export default cartSlice.reducer