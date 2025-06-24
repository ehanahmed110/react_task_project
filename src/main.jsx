import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'primereact/resources/themes/lara-light-blue/theme.css';  
import 'primereact/resources/primereact.min.css';               
import 'primeicons/primeicons.css'; 
import { PrimeReactProvider } from 'primereact/api'; 
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './App/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PrimeReactProvider value={{ripple:true}}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>,
)
