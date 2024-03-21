import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        addWishlistitem:(state,action)=>{
            state.push(action.payload)
        },
        removeWishlistItem:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        }
    }
})

export const {addWishlistitem,removeWishlistItem}= wishlistSlice.actions
export default wishlistSlice.reducer