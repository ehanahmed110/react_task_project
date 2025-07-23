import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";

export const GetPaymentVoture = createAsyncThunk('payment/voture', async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/paymentVouchers', payload)
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.error || "unknown error"
        );
    }
});
// ---------------Cost Center NAme----------------------
export const GetCostCenter = createAsyncThunk('payment/costCenter',async(_, thunkAPI)=>{
      try {
        const response = await axiosInstance.post('/getCostcenter')
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data?.error || "unknown error"
        );
    }
})
const initialState = {
    payment: {},
    loading: false,
    error: null,
    costCenter:{}
}
const PaymentVotureSlice = createSlice({
    name: "PaymentVoture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetPaymentVoture.pending, (state) => {
                state.loading = true
            })
            .addCase(GetPaymentVoture.fulfilled, (state, action) => {
                state.loading = false,
                state.payment = action.payload
            })
            .addCase(GetPaymentVoture.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })
            .addCase(GetCostCenter.fulfilled,(state,action)=>{
                state.costCenter = action.payload
            })
    }

});
export default PaymentVotureSlice.reducer;