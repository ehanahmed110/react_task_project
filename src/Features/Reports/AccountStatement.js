import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
export const AccountStatementData = createAsyncThunk('Account Statement/data',async(payload,thunkAPI)=>{
    try{
           const response = await axiosInstance.post('/reports/getAccountStatement',payload)
  return response.data
    }catch(error){
           return thunkAPI.rejectWithValue(error.response.data || "unknown error")
    }
})
const initialState = {
    accountStatement : {},
    loading : false,
    error:null,
}
const AccountStatementSlice = createSlice({
     name:"AccountStatement",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
      builder
      .addCase(AccountStatementData.pending,(state)=>{
        state.loading = true
      })
      .addCase(AccountStatementData.fulfilled,(state,action)=>{
        state.loading = false,
        state.accountStatement = action.payload
      })
      .addCase(AccountStatementData.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
     }
})
export default AccountStatementSlice.reducer;