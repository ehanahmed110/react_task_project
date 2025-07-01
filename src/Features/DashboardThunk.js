import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";

export const DashboardData = createAsyncThunk('dashboard/data', async (payload,thunkAPI) =>{
    try{
       const response = await axiosInstance.post("/getStats",payload)
    return response.data 
    }catch(error){
      thunkAPI.rejectWithValue('failed to load dashboard')
    } 
   
})