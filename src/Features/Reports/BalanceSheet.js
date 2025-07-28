import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/Axios"

export const FetchBalanceData = createAsyncThunk('balance/data',async(payload,thunkAPI)=>{
    try{
      const response = await axiosInstance.post('/reports/balance_sheet') 
      return response.data
    }catch(error){
       return thunkAPI.rejectWithValue(error.response?.data || "unknown error")
    }
 })

const initialState = {
    assets:[],
    equity:[],
    liabilities:[], 
    loading:false,
    error:null,
}
const BalanceSlice =  createSlice({
 name:"balance",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
 builder
 .addCase(FetchBalanceData.pending,(state)=>{
    state.loading = true
 })
 .addCase(FetchBalanceData.fulfilled,(state,action)=>{
    state.loading = false,
    state.assets = action.payload.assets || [],
    state.equity = action.payload.equity || [],
    state.liabilities = action.payload.liabilities || []
 })
 .addCase(FetchBalanceData.rejected,(state,action)=>{
    state.loading  = false,
    state.error = action.payload.message
 })
 }
})
export default BalanceSlice.reducer;