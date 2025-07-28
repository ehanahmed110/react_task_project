import React from 'react'
import { useSelector } from 'react-redux';
import { ProtectedRouter } from './Router/ProtectedRouter';
import { PublicRouter } from './Router/PublicRouter';
import { Toaster } from 'react-hot-toast';
function App() {
  const {token} = useSelector((state)=>state.auth)

  
   return (
    <>
      <Toaster position="top-right" reverseOrder={false}
      toastOptions={{
    success: {
      duration: 4000,
      style: {
        background: "black",
        color: "white",
      },
    },
    error: {
      duration: 4000,
      style: {
        background: "#fee2e2",
        color: "#991b1b",
      },
    },
  }} />
      {token ? <ProtectedRouter /> : <PublicRouter />}
    </>
  );
}

export default App
