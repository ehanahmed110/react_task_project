import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
export const TrialBalanceData = createAsyncThunk('RTrial balancec/data',async(payload,thunkAPI)=>{
    try{
           const response = await axiosInstance.post('/reports/getTrialBalanceReport',payload)
  return response.data
    }catch(error){
           return thunkAPI.rejectWithValue(error.response.data || "unknown error")
    }
})
const initialState = {
    trialBalance : {},
    loading : false,
    error:null,
}
const trialBalanceSlice = createSlice({
     name:"trialBalance",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
      builder
      .addCase(TrialBalanceData.pending,(state)=>{
        state.loading = true
      })
      .addCase(TrialBalanceData.fulfilled,(state,action)=>{
        state.loading = false,
        state.trialBalance = action.payload
      })
      .addCase(TrialBalanceData.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
     }
})
export default trialBalanceSlice.reducer;