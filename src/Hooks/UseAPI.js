import { useCallback, useState } from "react";
import axiosInstance from "../utils/Axios";

const UseAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const CallAPI = useCallback(async({
    url,
    method = "get",
    body = {},
    params = {},
      onSuccess,
  onError
  })=>{
    setLoading(true);
    setError(null);
    try{
      const response = await axiosInstance({
        url,
        method,
        data:body,
        params
      });
        setData(response.data);
         if (onSuccess) {
      onSuccess(response.data);
    }
        return response.data
    }catch(err){
       setError(err?.response?.data?.error || "Unknown error");
       if (onError) {
      onError(err);
    }
      return null;
    }finally{
        setLoading(false)
    }
  },[]) ;
  return{
    data,
    loading,
    error,
    CallAPI
  }
};
export default UseAPI;