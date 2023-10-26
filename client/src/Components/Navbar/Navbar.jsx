import { Link } from 'react-router-dom'
import menuData from '../../data/menu'
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function Navbar() {
    const [ menu, setMenu ] = useState(false)
    
    const toggle = () => {
        setMenu(!menu)
    }

    return (
    <div className='padding navbar' >
        <div className="logo">
            <Link className='link' to='/'>
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