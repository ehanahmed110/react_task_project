import authReducer from "../Features/AuthSlice";
//import DashboardRedeucer from "../Features/DashboardSlice"
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { injectStore } from "../utils/Axios";

const rootReducer =combineReducers({
    auth:authReducer,
   // dashboard:DashboardRedeucer,
   
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