import { Link } from 'react-router-dom'
import { contact } from '../../data/contact'
import './Ngo.css'
import PhoneIcon  from '@mui/icons-material/LocalPhone'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import BannerImg from '../../assets/hogfFlyer.png'

function Ngo() {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    
    const { phoneNumber, phoneNumber2 } = contact
  return (
    <div className='ngo'>
        <div data-aos='zoom-in'  className="padding content">
            {
                /**
                 * 
            <p className='intro'>We're non-profit organisation</p>

            <h1>Join Us Build a Happy Society</h1>

            <p className="text-1">
            The joy on the widows' faces coupled with the remarkable feedback we got after the first outreach propelled us to continue in this good cause and boom!
            </p>

            <p className="text-2">
                Heart of Gold Foundation was birthed with the burning desire to put smile on widows face. This foundation cuts across age, tribe and religion without any political barier.
            </p>

            <div className="btn">
                <span><Link to='/donate' className='link'>Support Us</Link></span>
            </div>

            <p className='footNote'>
                We Touch Many Lives
            </p>
                 */
            }
            <div className="bannerImg">
                <img src={BannerImg} alt='banner' />
            </div>

            <div className="call">
                <h3>Call to Support us</h3>

                <a href={`tel:+${phoneNumber}`} className='link phoneIcon'><PhoneIcon className='icon' /></a>
                
                <a href={`tel:+${phoneNumber}`} className='link phoneText'>{`${phoneNumber}`}</a>
            </div>

            <div className="call">

                <a href={`tel:+${phoneNumber2}`} className='link phoneIcon'><PhoneIcon className='icon' /></a>
                
                <a href={`tel:+${phoneNumber2}`} className='link phoneText'>{`${phoneNumber2}`}</a>
            </div>
        </div>
    </div>
  )
}

export default Ngo