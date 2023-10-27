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
import Appericiation from './Pages/Appericiation/Appericiation'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import EditCampaign from './Pages/EditCampaign/EditCampaign'
import Profile from './Pages/Profile/Profile'
import { AdminUser, AuthorizeUser, ValidToken } from './auth/PrivateRoute'

function App() {

  return (
    <div className="app">
      <Toaster position='top-center'></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<About />} />
          <Route path='/campaign' element={<Campaign />} />
          <Route path='/newCampaign' element={<AuthorizeUser><ValidToken><AdminUser><NewCampaign /></AdminUser></ValidToken></AuthorizeUser>} />
          <Route path='/editCampaign/:id' element={<AuthorizeUser><ValidToken><AdminUser><EditCampaign /></AdminUser></ValidToken></AuthorizeUser>} />
          <Route path='/campaign/:id' element={<CampaignPage />} />
          <Route path='/donate' element={<Donate />} />
          <Route path='/events' element={<Events />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='passwordReset/:resetToken' element={<ResetPassword />} /> 
          <Route path='/appericiation' element={<Appericiation />} />
          <Route path='/profile' element={<AuthorizeUser><ValidToken><Profile /></ValidToken></AuthorizeUser>} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
