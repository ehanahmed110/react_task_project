import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";


export const FetchLeaveData = createAsyncThunk('Leave/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/leaves/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
})
const initialState = {
  leave:{},
  loading:false,
  error:null
}
const LeaveSlice = createSlice({
 name:"deduction",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchLeaveData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchLeaveData.fulfilled,(state,action)=>{
    state.loading = false,
    state.leave = action.payload
  })
  .addCase(FetchLeaveData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default LeaveSlice.reducer;