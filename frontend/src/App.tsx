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
        <Route path='/' element={<DashboardPage className="container" />} />
        <Route path='/board' element={<BoardPage className="container" />} />
      </Routes>
    </>
  )
}

export default App
