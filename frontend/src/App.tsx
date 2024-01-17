// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { NavBar } from './components/navbar/index.tsx'
import LoginPage from './pages/Auth/index.tsx'
import { useAppSelector } from './app/hooks.ts'
import { getCurrentUser } from './app/features/auth/index.ts'




function App() {
  const user = useAppSelector(getCurrentUser);
  // useEffect(() => {
  //   console.log(axios.defaults.baseURL)

  //   axios.get("/").then((res) => {
  //     console.log(res.data);
  //   }).catch((err) => {
  //     console.error(err);
  //   })
  // }, [])
  return (
    <>
      <NavBar className="nav" />
      <Routes>{
        (!user) ?
          <Route path='/' element={<LoginPage />} />
          : <>

          </>
      }</Routes>
    </>
  )
}

export default App
