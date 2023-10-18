import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <div className='padding hero'>
        <div className="left">
            <h1>
                Providing Help to Widow, Fatherless and Less Previlage in Our Society
            </h1>

            <p>
            we are dedicated to making a meaningful difference in our community. we strive to provide essential support and assistance to widows, fatherless children, and those less privileged in our society.
            </p>

            <div className="campaingn">
                <Link to='/campaign' className='link'>
                    <span>See All Campaingns</span>
                </Link>
            </div>
        </div>

        <div className="right">

        </div>
    </div>
  )
}

export default Hero