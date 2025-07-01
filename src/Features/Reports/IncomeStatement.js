import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
export const IncomeData = createAsyncThunk('Income/data',async(payload,thunkAPI)=>{
    try{
           const response = await axiosInstance.post('/reports/income_statement',payload)
  return response.data
    }catch(error){
           return thunkAPI.rejectWithValue(error.response.data || "unknown error")
    }
})
const initialState = {
    income : {},
    loading : false,
    error:null,
}
const IncomeSlice = createSlice({
     name:"income",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
      builder
      .addCase(IncomeData.pending,(state)=>{
        state.loading = true
      })
      .addCase(IncomeData.fulfilled,(state,action)=>{
        state.loading = false,
        state.income = action.payload
      })
      .addCase(IncomeData.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
     }
})
export default IncomeSlice.reducer;