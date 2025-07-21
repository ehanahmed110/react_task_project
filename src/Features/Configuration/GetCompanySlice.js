import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
export const GetCompaniesData = createAsyncThunk(
  "getCompanies/data",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.post("/getCompanies");
      return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data || "unknown error");
    }
  }
);
const initialState = {
  getCompany: {},
  loading: false,
  error: null,
};
const getComapnySlice = createSlice({
  name: "GetCompanies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCompaniesData.pending,(state)=>{
        state.loading = true
    })
    .addCase(GetCompaniesData.fulfilled,(state,action)=>{
        state.loading = false,
        state.getCompany = action.payload
    })
    .addCase(GetCompaniesData.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
    })
  },
});
export default getComapnySlice.reducer;
