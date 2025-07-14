import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
// --------------Delete Data---------------
export const DeleteItemDate = createAsyncThunk(
  "delete/item",
  async (ID, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/deleteItem',{ID:ID});
      return { ID, message: response?.data?.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Delete failed"
      );
    }
  }
);
// --------------fetch Data--------------
export const FetchItemsData = createAsyncThunk(
  "configuration/item",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/listItems", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "unknown error");
    }
  }
);
// ------------------search term-------------------
export const SearchItemsData = createAsyncThunk(
  "search Configurationitem/item",
  async ({ page, per_page, search }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/searchItem",  { page, per_page, search });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "unknown error");
    }
  }
);
const initialState = {
  items: {},
  loading: false,
  error: null,
};
const ItemsSlice = createSlice({
  name: "Items Cofiguration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // --------------fetch data---------------
      .addCase(FetchItemsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchItemsData.fulfilled, (state, action) => {
        (state.loading = false), (state.items = action.payload);
      })
      .addCase(FetchItemsData.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.error);
      })
    //   -----------delete data-0-------------------
      .addCase(DeleteItemDate.pending,(state)=>{
        state.loading = true
      })
      .addCase(DeleteItemDate.fulfilled,(state,action)=>{
          state.loading = false,
        state.items.data = state.items.data.filter((item)=>item.id !== action.payload.ID)
      })
      .addCase(DeleteItemDate.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
    //   ----------------search Data------------------
        .addCase(SearchItemsData.pending,(state)=>{
        state.loading = true
      })
      .addCase(SearchItemsData.fulfilled,(state,action)=>{
          state.loading = false
          state.items = action.payload
      })
      .addCase(SearchItemsData.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload.error
      })
  },
});
export default ItemsSlice.reducer;
