import { Link } from 'react-router-dom'
import './Info.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function Info({ image, text, title, subTitle}) {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

  return (
    <div className='padding info'>
        <div data-aos='fade-down' className="content">
            <h3 className="title">{title}</h3>
            <div className="card">
                <div className="cardImg">
                    <img src={image} alt={title} />
                </div>
                <div className="cardInfo">
                    <h4>{subTitle}</h4>

                    <p>{text}</p>
                </div>
            </div>
            <div className="btn">
                <span><Link className='link' to='/events'>Learn More about HOGF</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Info