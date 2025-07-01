//    vait  patient  repoert -----------------
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
export const VatReportData = createAsyncThunk('Vat Report/data',async(payload,thunkAPI)=>{
    try{
           const response = await axiosInstance.post('/reports/patient_vat_report',payload)
  return response.data
    }catch(error){
           return thunkAPI.rejectWithValue(error.response.data || "unknown error")
    }
})
const initialState = {
    vatReport : {},
    loading : false,
    error:null,
}
const VatReportSlice = createSlice({
     name:"AccountStatement",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
      builder
      .addCase(VatReportData.pending,(state)=>{
        state.loading = true
      })
      .addCase(VatReportData.fulfilled,(state,action)=>{
        state.loading = false,
        state.vatReport = action.payload
      })
      .addCase(VatReportData.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
     }
})
export default VatReportSlice.reducer;