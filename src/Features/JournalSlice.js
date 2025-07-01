import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";
export const DeleteJournalEntry = createAsyncThunk('journal/deleteEntry',async(id,thunkAPI)=>{
  try{
     const response = await axiosInstance.post('/deleteEntry',{transection_id:id})
     return{id,message:response.data?.message || "Delete Successfully"}
  }catch(error){
 return thunkAPI.rejectWithValue(error.response?.data?.error || "Delete failed");
  }
});
export const FetchJournalData = createAsyncThunk('journal/enteries',async(payload,thunkAPI)=>{
  try{
  const response = await axiosInstance.post('/listTransactions',payload)
  return response.data
  }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Unknown error")
  }
});
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
  .addCase(DeleteJournalEntry.pending,(state)=>{
    state.loading = true
  })
   .addCase(DeleteJournalEntry.fulfilled,(state,action)=>{
    state.loading = false,
    state.journaldata.data = state.journaldata.data.filter(
      (entry)=>entry.id !== action.payload.id
    )
   })
   .addCase(DeleteJournalEntry.rejected,(state,action)=>{
    state.loading = false,
    state.error = action.payload
   })
  }
})
export default JournalSlice.reducer;