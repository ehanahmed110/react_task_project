import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";
export const LoginUser = createAsyncThunk('auth/login',async (payload,thunkAPI)=>{
    try{
      const response = await axiosInstance.post(`/login`,payload)
      return response.data
    }catch(error){
      return thunkAPI.rejectWithValue(error.response.message)
    }
})