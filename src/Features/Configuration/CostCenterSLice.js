import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const GetCostcenterData = createAsyncThunk(
    "CostCenter/Configure",
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/listCostcenter", payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.error || "unknown error"
            );
        }
    }
);
const initialState = {
    costCenters: [],
    loading: false,
    error: null,
};
const CostCenterSlice = createSlice({
    name: "costCenter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCostcenterData.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetCostcenterData.fulfilled, (state, action) => {
                (state.loading = false), (state.costCenters = action.payload);
            })
            .addCase(GetCostcenterData.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            })
    }
});
export default CostCenterSlice.reducer;