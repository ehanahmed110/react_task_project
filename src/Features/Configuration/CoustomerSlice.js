import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";
// -------------crearte Coustomers----------------
export const CreateCoustomerData = createAsyncThunk(
    "create/coustomer",
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/customer", payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.error || "unknown error"
            );
        }
    }
);
// ------------------Update Data--------------------
export const UpdateCoustomer = createAsyncThunk(
    "update/coustomer",
    async ({ id: id, payload: payload }, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/updateCustomers/${id}`,
                payload
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.error || "unknown error"
            );
        }
    }
);
// --------------delete function------------------
export const deleteCoustomerData = createAsyncThunk('delete/coustomer', async (id, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/delCustomers/${id}`)
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.error || "unknown error"
        );
    }
})
// --------------get Data -------------------
export const GetCoustomerData = createAsyncThunk(
    "Coustomer/Configure",
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/listCustomers", payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.error || "unknown error"
            );
        }
    }
);
// ---------------For Searching Data-------------------------
export const SearchCoustomerData = createAsyncThunk('search/coustomer', async ({page,per_page,query},thunkAPI) => {
    try {
        const response = await axiosInstance.post('/searchCustomer',{page,per_page,query})
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.error || "unknown error"
        );
    }
})

const initialState = {
    coustomer: {},
    loading: false,
    error: null,
    message: "",
};
const CoustomerSlice = createSlice({
    name: "Coustomer/Configuration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCoustomerData.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetCoustomerData.fulfilled, (state, action) => {
                (state.loading = false), (state.coustomer = action.payload);
            })
            .addCase(GetCoustomerData.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            })
            .addCase(SearchCoustomerData.pending,(state)=>{
                state.loading = true
            })
            .addCase(SearchCoustomerData.fulfilled,(state,action)=>{
                state.loading = false,
                state.coustomer = action.payload
            })
            .addCase(SearchCoustomerData.rejected,(state,action)=>{
                state.loading = false,
                state.error = action.payload
            })
    },
});
export default CoustomerSlice.reducer;
