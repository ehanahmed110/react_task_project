import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";


export const FetchEmployeData = createAsyncThunk('Employee/data',async(payload,thunkAPI)=>{
  try{
    const response = await axiosInstance.post('/employees/list',payload)
    return response.data
  }catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
})
const initialState = {
  employee:{},
  loading:false,
  error:null
}
const EmployeesSlice = createSlice({
 name:"payroll",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
  builder
  .addCase(FetchEmployeData.pending,(state)=>{
    state.loading=true
  })
  .addCase(FetchEmployeData.fulfilled,(state,action)=>{
    state.loading = false,
    state.employee = action.payload
  })
  .addCase(FetchEmployeData.rejected,(state,action)=>{
    state.error = action.payload.error
  })
 }
})
export default EmployeesSlice.reducer;