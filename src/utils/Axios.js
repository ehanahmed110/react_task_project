import axios from "axios";
//import { store } from "../App/store";

const axiosInstance = axios.create({
  baseURL:'https://acc2.api.supergitsa.com/api/v1/'
})
let store;
export const injectStore = (_store) =>{
    store = _store;
} 
axiosInstance.interceptors.request.use((config)=>{
    const token = store?.getState()?.auth?.token
    if(token){
      config.headers['athurization'] = `Bearer ${token}`
    }
    return config;
})
export default axiosInstance;