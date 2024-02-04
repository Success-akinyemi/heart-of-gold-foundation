import { Link } from 'react-router-dom'
import './Banner.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import BannerImg from '../../assets/banner.jpeg'

function Banner() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div data-aos='zoom-in'  className='banner'>
        <div className="overlay"></div>
        <div className="content">
            <div data-aos='fade-right' className="left">
                <p>We are here to improve lives,</p>
                <h2>
                  Some Widows and Vulnerable women in our Society Need Help And We Give It!
                </h2>
                <span>We support many people in communities</span>
            </div>

            <div data-aos='fade-down' className="right">
              <div className="imgCard">
                <img src={BannerImg} alt='banner' />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Banner