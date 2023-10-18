import { Link } from 'react-router-dom'
import menuData from '../../data/menu'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <div className='footer'>
        <div className="overlay"></div>
        <div className="padding content">
            <div className="left">
                <h2>Quick Links</h2>

                <div className="item">
                    {
                        menuData.map((item, idx) => (
                            <Link key={idx} to={`${item.link}`} className='link links'>
                                &gt; {item.title}
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className="middle">
                <h2>Connect With Us</h2>
                
                <div className="icons">
                    <a href=""><FacebookIcon  className='icon'/></a>
                    <a href=""><InstagramIcon  className='icon'/></a>
                    <a href=""><YouTubeIcon  className='icon'/></a>
                </div>

            </div>

            <div className="right">
                <h2>Subscribe To Our Newsletter</h2>

                <p>Get all the latest event from us straight to your email</p>

                <form>
                    <input type="email" placeholder='Email Address' />

                    <button className="btn">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Footer