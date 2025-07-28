import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
//---FOR get employee------------------------
export const AllowanceEmployeeData = createAsyncThunk('AllowanceEmploy/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/getEmployees',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});
// -----------for create Allowance0-----------------------
export const CreateAllowanceData = createAsyncThunk('AllowanceCreate/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/allowances',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});
//--------------for fetch  allowance--------------
export const FetchAllowanceData = createAsyncThunk('Allowance/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/allowances/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});
const initialState = {  
  allowance:{},
  loading:false,
  error:null,
  employeeName : {},
  message:null
}
const allowanceSlice = createSlice({
 name:"allowance",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
//--------------for fetch  allowance--------------
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
  //---FOR get employee------------------------
    .addCase(AllowanceEmployeeData.pending,(state)=>{
    state.loading=true
  })
  .addCase(AllowanceEmployeeData.fulfilled,(state,action)=>{
    state.loading = false,
    state.employeeName = action.payload
  })
  .addCase(AllowanceEmployeeData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
  // -----------for create Allowance0-----------------------
      .addCase(CreateAllowanceData.pending,(state)=>{
    state.loading=true
  })
  .addCase(CreateAllowanceData.fulfilled,(state,action)=>{
    state.loading = false;
    state.allowance = action.payload,
    state.message = action.payload.message;
    // if(Array.isArray(state.allowance.data)) {
    // state.allowance.data = [action.payload.data, ...state.allowance.data];
    // state.allowance.total_record += 1;
  // }
  })
  .addCase(CreateAllowanceData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default allowanceSlice.reducer;