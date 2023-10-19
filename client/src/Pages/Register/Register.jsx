import './Register.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import FrontImg from '../../assets/a.jpg'
import BackImg from '../../assets/b.jpg'

function Register() {
  return (
    <div className='register'>
        <div className="container">
            <input type="checkbox" id='flip' />
            <div className="cover">
                <div className="front">
                    <img src={FrontImg} alt="flip image" />
                    <div className="text">
                        <span className="text-1">
                            Touching Life in Every Little Way
                        </span>
                        <span className="text-2">
                            Continue to Touch Lives Today
                        </span>
                    </div>
                </div>

                <div className="back">
                    <img className='backImg' src={BackImg} alt="flip image" />
                    <div className="text">
                        <span className="text-1">
                            Touching Life in Every Little Way
                        </span>
                        <span className="text-2">
                            Join Us Today
                        </span>
                    </div>
                </div>
            </div>
            
            <form>
                <div className="form-content">
                    <div className="login-form">
                        <div className="title">Login</div>
                        <div className="input-boxes">
                            <div className="input-box">
                                <EmailIcon className='icon' />
                                <input type="text" placeholder='Enter your email' required />
                            </div>
                            <div className="input-box">
                                <LockIcon className='icon' />
                                <input type="password" placeholder='Enter your password' required />
                            </div>
                            <div className="text">Forgot Password?</div>
                            <div className="submit input-box">
                                <input type="submit"  value='Submit'   />
                            </div>
                            <div className="text login-text">Don't have an account? <label htmlFor="flip">Signup Now</label></div>
                        </div>
                    </div>

                    <div className="signup-form">
                        <div className="title">Signup</div>
                        <div className="input-boxes">
                            <div className="input-box">
                                <PersonIcon className='icon' />
                                <input type="text" placeholder='Enter your name' required />
                            </div>
                            <div className="input-box">
                                <EmailIcon className='icon' />
                                <input type="email" placeholder='Enter your email' required />
                            </div>
                            <div className="input-box">
                                <LockIcon className='icon' />
                                <input type="password" placeholder='Enter your password' required />
                            </div>
                            <div className="submit input-box">
                                <input type="submit"  value='Submit'   />
                            </div>
                            <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login Now</label></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register