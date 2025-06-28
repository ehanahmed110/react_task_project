import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";


export const FetchPayslipData = createAsyncThunk('PaySlip/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/payslips/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
})
const initialState = {
  payslip:{},
  loading:false,
  error:null
}
const payslipSlice = createSlice({
 name:"allowance",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchPayslipData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchPayslipData.fulfilled,(state,action)=>{
    state.loading = false,
    state.payslip = action.payload
  })
  .addCase(FetchPayslipData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default payslipSlice.reducer;