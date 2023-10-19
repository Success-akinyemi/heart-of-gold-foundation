import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Register from './Pages/Register/Register'
import Gallery from './Pages/Gallery/Gallery'

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
