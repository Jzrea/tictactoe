import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { NavBar } from './components/navbar/index.tsx'
import { DashboardPage } from './pages/dashboard/index.tsx'
import { BoardPage } from './pages/game/index.tsx'




function App() {



  return (
    <>
      <NavBar className="nav" />
      <Routes>
        <Route path='/' element={<DashboardPage className="main" />} />
        <Route path='/board' element={<BoardPage className="main" />} />
      </Routes>
    </>
  )
}

export default App
