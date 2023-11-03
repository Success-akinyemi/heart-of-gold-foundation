import { Link } from 'react-router-dom'
import './AboutUs.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function AboutUs({ image, text, subTitle, title}) {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div className='padding aboutUs'>
      <div data-aos='fade-up' className="content">
        <h3 className='title'>{title}</h3>
        <div className="card">
          <div className="cardInfo">
            <h4>{subTitle}</h4>

            <p>{text}</p>
          </div>

          <div className="cardImg">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="btn">
          <span><Link className='link' to='/about' >Learn More About Us</Link></span>
        </div>
      </div>
    </div>
  )
}

export default AboutUs