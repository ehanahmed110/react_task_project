import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";
const FetchData = createAsyncThunk('chart/account',async(payload,thunkAPI)=>{
    try{
    const response = await axiosInstance.post('/listAccounts')
    return response.data
    }catch(error){
      return thunkAPI.rejectWithValue("error ehile fetching data",error)
    }
})
const initialState = {
     loading:false,
     data:null,
     error:null
}
const ChartAccountSlice = createSlice({
  name:"account",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
   builder
   .addCase(FetchData.pending,(state)=>{
    state.loading = true
   })
   .addCase(FetchData.fulfilled,(state,action)=>{
    state.loading = false,
    state.data = action.payload,
    state.error = null
   })
   .addCase(FetchData.rejected,(state,action)=>{
    state.loading = false,
    state.error  = action.payload
   })
  }
})
export default ChartAccountSlice.reducer