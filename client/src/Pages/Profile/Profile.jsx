import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Profile.css'

function Profile() {
  return (
    <div className='profile'>
        <Navbar />
        <div className="p-container">
            Profile
        </div>
        <Footer />
    </div>
  )
}

export default Profile