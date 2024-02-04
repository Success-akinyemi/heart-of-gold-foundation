import { Link, useNavigate } from 'react-router-dom'
import menuData from '../../data/menu'
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import LogoImg from '../../assets/HOGF-Logo.png'
import { useFetch } from '../../hooks/fetch.hooks';

function Navbar() {
    const { apiData } = useFetch()
    const userId = apiData?.data._id
    const [ menu, setMenu ] = useState(false)
    const navigate = useNavigate()
    
    const toggle = () => {
        setMenu(!menu)
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/')
    }

    return (
    <div className='padding navbar' >
        <div className="logo">
            <Link className='link logoLink' to='/'>
                <img className='logoImg' src={LogoImg} alt='Logo' />
                Heart of Gold Foundation
            </Link>
        </div>

        <div className={`menu ${menu ? 'show' : 'hide'}`}>
            <div className='closeBtn' onClick={toggle}>
                <CloseIcon className='icon' />
            </div>
            <div className="item">
                {
                    menuData.map((item, idx) => (
                        <Link key={idx} to={`${item.link}`} className='link links'>
                            {item.title}
                        </Link>
                    ))
                }
                {
                    apiData && (
                        <span onClick={handleLogout} className="links">Logout</span>
                    )
                }
            </div>

            <div className="n-donate">
                <span><Link to='/donate' className='link'>Donate Now</Link></span>
            </div>
        </div>
            <div className='menuBtn' onClick={toggle}>
                <MenuIcon className='icon' />
            </div>
    </div>
  )
}

export default Navbar