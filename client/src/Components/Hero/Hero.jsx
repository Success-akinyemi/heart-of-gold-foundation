import { Link } from 'react-router-dom'
import './Hero.css'
import LogoImg from '../../assets/HOGF -Logo-1.png'
import LogoImgTwo from '../../assets/HOGF-Logo2.png'

function Hero() {
  return (
    <div className='hero'>
        <div className="content">
            <div className="outer">
                <div className="padding details">
                    <div className="left">
                        <h1 className='fade-in'>
                            Supporting widows and Less Privileged Women in our Society
                        </h1>

                        <p>
                        we are dedicated to making a meaningful difference in our community. we strive to provide essential support and assistance to widows, and those less privileged women in our society.
                        </p>

                        <div className="campaingn">
                            <Link to='/campaign' className='link campaingnLink'>
                                <span>See All Campaingns</span>
                            </Link>
                        </div>
                    </div>

                    <div className="right">
                        <img src={LogoImgTwo} className='logoImage' alt='heart of gold' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero