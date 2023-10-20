import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery/Gallery'
import LandingPage from './Pages/LandingPage/LandingPage'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import About from './Pages/About/About'
import Donate from './Pages/Donate/Donate'

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<About />} />
          <Route path='/donate' element={<Donate />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
