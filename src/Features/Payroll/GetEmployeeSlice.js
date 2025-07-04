import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";

export const getEmployee = createAsyncThunk('Get/Employess',async(payload,thunkAPI)=>{
    try{
    const response = await axiosInstance.post('/getEmployees',payload)
    return response.data
    }
  catch(error){
    return thunkAPI.rejectWithValue(error.response?.data?.error || "unknown error")
  }
});
const initialState = {
    employee:{},
    loading:false,
    error:null
}
const getEmployeeSlice = createSlice({
name:"getEmployee",
initialState,
reducers:{},
extraReducers:(builder)=>{
builder
.addCase(getEmployee.pending,(state)=>{
    state.loading = true
})
.addCase(getEmployee.fulfilled,(state,action)=>{
    state.loading = false,
    state.employee = action.payload
})
.addCase(getEmployee.rejected,(state,action)=>{
     state.loading = false,
     state.error = action.payload.error
})
}
});
export default getEmployeeSlice.reducer