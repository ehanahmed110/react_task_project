import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";

export const GetPayrunsData = createAsyncThunk('PayrunsGEt/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('getCashBankAccounts',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});

export const CreatePayrunsData = createAsyncThunk('PayrunsCreate/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/payrolls',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});

export const FetchPayrunsData = createAsyncThunk('Payruns/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/listPayrolls',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});
const initialState = {
  payruns:{},
  loading:false,
  error:null,
  message:"",
  getcashbank:{}
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
// ---------------------------
  .addCase(CreatePayrunsData.pending,(state)=>{
    state.loading=true
  })
  .addCase(CreatePayrunsData.fulfilled,(state,action)=>{
    state.loading = false,
    state.payruns = action.payload,
    state.message = action.payload.message
  })
  .addCase(CreatePayrunsData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
  // -------------------------
    .addCase(GetPayrunsData.pending,(state)=>{
    state.loading=true
  })
  .addCase(GetPayrunsData.fulfilled,(state,action)=>{
    state.loading = false,
    state.getcashbank = action.payload
  })
  .addCase(GetPayrunsData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default PayrunsSlice.reducer;