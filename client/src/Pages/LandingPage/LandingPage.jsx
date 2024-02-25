import AboutUs from '../../Components/AboutUs/AboutUs'
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Hero from '../../Components/Hero/Hero'
import Info from '../../Components/Info/Info'
import Navbar from '../../Components/Navbar/Navbar'
import Ngo from '../../Components/Ngo/Ngo'
import Slides from '../../Components/Slides/Slides'
import Video from '../../Components/Video/Video'
import { aboutUsData, infoDataOne } from '../../data/infoSection'
import { sliderData } from '../../data/slides'
import  './LandingPage.css'

function LandingPage() {
  return (
    <div className='landingPage'>
        <Navbar />
        <Hero />
        <Info {...infoDataOne} />
        <AboutUs {...aboutUsData} />
        <Ngo />
        <Slides data={sliderData} />
        <Video />
        <Banner />
        <Footer />
    </div>
  )
}

export default LandingPage