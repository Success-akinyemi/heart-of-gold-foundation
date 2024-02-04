import { Link } from 'react-router-dom'
import './Hero.css'
import LogoImg from '../../assets/HOGF -Logo-1.png'

function Hero() {
  return (
    <div className='hero'>
        <div className="content">
            <div className="outer">
                <div className="padding details">
                    <div className="left">
                        <h1 className='fade-in'>
                            Providing Help to Widows and Less Previlage women in Our Society
                        </h1>

                        <p>
                        we are dedicated to making a meaningful difference in our community. we strive to provide essential support and assistance to widows, fatherless children, and those less privileged in our society.
                        </p>

                        <div className="campaingn">
                            <Link to='/campaign' className='link campaingnLink'>
                                <span>See All Campaingns</span>
                            </Link>
                        </div>
                    </div>

                    <div className="right">
                        <img src={LogoImg} className='logoImage' alt='heart of gold' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero