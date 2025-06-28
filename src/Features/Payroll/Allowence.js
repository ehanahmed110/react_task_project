import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";


export const FetchAllowanceData = createAsyncThunk('Allowance/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/allowances/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
})
const initialState = {
  allowance:{},
  loading:false,
  error:null
}
const allowanceSlice = createSlice({
 name:"allowance",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchAllowanceData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchAllowanceData.fulfilled,(state,action)=>{
    state.loading = false,
    state.allowance = action.payload
  })
  .addCase(FetchAllowanceData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default allowanceSlice.reducer;