import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import axios from 'axios'



if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}



axios.defaults.withCredentials = false;
axios.defaults.baseURL = "/api";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={setupStore({})}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster />
    {/* </Provider> */}
  </React.StrictMode>,
)
