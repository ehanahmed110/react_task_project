import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";



export const AttendenceData = createAsyncThunk('AttendenceCreate/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/attendances',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});

export const FetchAttendenceData = createAsyncThunk('Attendence/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/attendances/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
})
const initialState = {
  attendence:{},
  loading:false,
  error:null,
  message:null,
}
const AttendenceSlice = createSlice({
 name:"attandence",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchAttendenceData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchAttendenceData.fulfilled,(state,action)=>{
    state.loading = false,
    state.attendence = action.payload,
    state.message = action.payload.message
  })
  .addCase(FetchAttendenceData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
  .addCase(AttendenceData.pending,(state)=>{
    state.loading = true
  })
  .addCase(AttendenceData.fulfilled,(state,action)=>{
    state.loading = false,
    state.attendence = action.payload,
    state.message = action.payload.message
  })
  .addCase(AttendenceData.rejected,(state,action)=>{
    state.loading = false,
    state.error = action.payload.error
  })
 }
})
export default AttendenceSlice.reducer;