import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";
export const FetchJournalData = createAsyncThunk('journal/enteries',async(payload,thunkAPI)=>{
  try{
  const response = await axiosInstance.post('/listTransactions',payload)
  return response.data
  }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Unknown error")
  }
})
const initialState={
    journaldata:{},
    loading:false,
    error:null
}
const JournalSlice = createSlice({
  name:"journal",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
  builder
  .addCase(FetchJournalData.pending,(state)=>{
    state.loading = true
  })
  .addCase(FetchJournalData.fulfilled,(state,action)=>{
    state.loading = false,
    state.journaldata = action.payload
  })
  .addCase(FetchJournalData.rejected,(state,action)=>{
    state.loading = false,
    state.error = action.payload
  })
  }
})
export default JournalSlice.reducer;