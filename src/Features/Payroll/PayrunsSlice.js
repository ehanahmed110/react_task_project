import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";


export const FetchPayrunsData = createAsyncThunk('Payruns/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/listPayrolls',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
})
const initialState = {
  payruns:{},
  loading:false,
  error:null
}
const PayrunsSlice = createSlice({
 name:"payruns",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchPayrunsData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchPayrunsData.fulfilled,(state,action)=>{
    state.loading = false,
    state.payruns = action.payload
  })
  .addCase(FetchPayrunsData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default PayrunsSlice.reducer;