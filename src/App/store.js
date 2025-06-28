import authReducer from "../Features/AuthSlice";
import dataReducer from "../Features/ChartAccountSlice"
import journalReducer from "../Features/JournalSlice";
import employeeReducer from "../Features/Payroll/EmployeeSlice"
import attendenceReducer from "../Features/Payroll/AttendenceSlice"
import leaveReducer from "../Features/Payroll/LeaveSlice"
import deductionReducer from "../Features/Payroll/DeductionSlice"
import allowanceReducer from "../Features/Payroll/Allowence"
import payslipReducer from "../Features/Payroll/PayslipsSlice"
import payrunsReducer from "../Features/Payroll/PayrunsSlice"
//import DashboardRedeucer from "../Features/DashboardSlice"
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { injectStore } from "../utils/Axios";

const rootReducer =combineReducers({
    auth:authReducer,
   // dashboard:DashboardRedeucer,
   data:dataReducer,
   journal: journalReducer,
   employee:employeeReducer,
   attendence:attendenceReducer,
   leave:leaveReducer,
   deduction:deductionReducer,
   allowance:allowanceReducer,
   payslip:payslipReducer,
   payruns:payrunsReducer
})
const persistConfig ={
    key :'root',
     storage,
     whitelist:['auth']
}
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer : persistedReducer,
     middleware:(getMiddleWear)=>
    getMiddleWear({
        serializableCheck:false
    })
 })

 injectStore(store);
 export const persistor = persistStore(store)