import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery/Gallery'
import LandingPage from './Pages/LandingPage/LandingPage'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import About from './Pages/About/About'
import Donate from './Pages/Donate/Donate'
import Campaign from './Pages/Campaign/Campaign'
import { Toaster } from 'react-hot-toast'
import CampaignPage from './Pages/CampaignPage/CampaignPage'
import Events from './Pages/Events/Events'
import NewCampaign from './Pages/NewCampaign/NewCampaign'

function App() {

  return (
    <div className="app">
      <Toaster position='top-center'></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<About />} />
          <Route path='/campaign' element={<Campaign />} />
          <Route path='/newCampaign' element={<NewCampaign />} />
          <Route path='/campaign/:id' element={<CampaignPage />} />
          <Route path='/donate' element={<Donate />} />
          <Route path='/events' element={<Events />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
