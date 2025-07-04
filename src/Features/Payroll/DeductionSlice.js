import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";

export const DeductionData = createAsyncThunk('DeductionAdd/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/deductions',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});

export const FetchDeductionData = createAsyncThunk('Deduction/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/deductions/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});
const initialState = {
  deduction:{},
  loading:false,
  error:null,
  message:null
}
const DeductionSlice = createSlice({
 name:"deduction",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchDeductionData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchDeductionData.fulfilled,(state,action)=>{
    state.loading = false,
    state.deduction = action.payload
  })
  .addCase(FetchDeductionData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
  .addCase(DeductionData.pending,(state)=>{
    state.loading = true
  })
  .addCase(DeductionData.fulfilled,(state,action)=>{
    state.loading = false,
    state.deduction = action.payload
    state.message = action.payload.message
  })
  .addCase(DeductionData.rejected,(state,action)=>{
    state.loading=false,
    state.error = action.payload.error
  })

 }
})
export default DeductionSlice.reducer;