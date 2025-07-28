import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "./AuthThunk";

const initialState = {
    user : null,
    loading:false,
    error : false,
    token : null,
    message:null
} 
const authSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    LogOut:(state)=>{
      state.user = null,
      state.token = null
    }
  },
  extraReducers:(builder)=>{
  builder
  .addCase(LoginUser.pending,(state)=>{
    state.loading = true,
    state.token = null,
    state.error = false,
    state.message = null
  })
  .addCase(LoginUser.fulfilled,(state,action)=>{
      state.loading = false,
      state.error =    false,
      state.token = action.payload.token,
      state.user = action.payload.user,
      state.message = action.payload.message
  })
  .addCase(LoginUser.rejected,(state,action)=>{
    state.loading = false,
    state.error = action.payload.message,
    state.message = action.payload.message
  })

  }
}) 
export const {LogOut} = authSlice.actions;
export default authSlice.reducer