import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
export const FetchCashFlow = createAsyncThunk('cashFlow/data',async(payload,thunkAPI)=>{
    try{
           const response = await axiosInstance.post('/reports/getCashBankFlow',payload)
  return response.data
    }catch(error){
           return thunkAPI.rejectWithValue(error.response.data || "unknown error")
    }
})
const initialState = {
    cashFlow : {},
    loading : false,
    error:null,
}
const CashFlowSlice = createSlice({
     name:"cashFlow",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
      builder
      .addCase(FetchCashFlow.pending,(state)=>{
        state.loading = true
      })
      .addCase(FetchCashFlow.fulfilled,(state,action)=>{
        state.loading = false,
        state.cashFlow = action.payload
      })
      .addCase(FetchCashFlow.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
     }
})
export default CashFlowSlice.reducer;