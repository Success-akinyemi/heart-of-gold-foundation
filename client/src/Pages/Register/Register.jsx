import './Register.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

function Register() {
  return (
    <div className='register'>
        <div className="container">
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
                                <EmailIcon className='icon' />
                                <input type="submit"  value='Submit'   />
                            </div>
                            <div className="text">Don't have an account? <label htmlFor="">Signup Now</label></div>
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
                                <EmailIcon className='icon' />
                                <input type="submit"  value='Submit'   />
                            </div>
                            <div className="text">Already have an account? <label htmlFor="">Login Now</label></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register