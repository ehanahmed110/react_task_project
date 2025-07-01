import { createSlice } from "@reduxjs/toolkit";
import { DashboardData } from "./DashboardThunk";

const initialState = {
    stats :{
    totalSales: 0,
    totalPurchase: 0,
    bankTransfer: 0,
    cashInflow: 0,
    },
    loading:false,
    error:null
}

const DashboardSlice = createSlice({
     name :"Dashboard",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
        builder
        .addCase(DashboardData.pending,(state)=>{
            state.loading = true
        })
        .addCase(DashboardData.fulfilled,(state,action)=>{
            state.loading = false,
            state.stats = action.payload
        })
        .addCase(DashboardData.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
     }
});
export default DashboardSlice.reducer;