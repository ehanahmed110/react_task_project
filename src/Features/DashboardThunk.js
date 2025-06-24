import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";

export const DashboardData = createAsyncThunk('dashboard/data', async (_,thunkAPI) =>{
    try{
       const response = await axiosInstance.post()
    return response.data 
    }catch(error){
      thunkAPI.rejectWithValue('failed to load dashboard')
    } 
   
})