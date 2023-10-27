import { useState } from 'react';
import './ForgotPassword.css'
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../helpers/api';

function ForgotPassword() {
    const [ email, setEmail ] = useState('')
    const [success, setSuccess] = useState('')
    const [ error, setError ] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState('')

    const handleRecovery = async (e) => {
        e.preventDefault()
        try {
          setIsLoading(true)
          console.log(email)
          const errorMsg = await forgotPassword({ email })
    
          if(errorMsg){
            setSuccess(errorMsg)
            setTimeout(() => {
              setSuccess('')
            }, 5000);
            setEmailSent('EMAIL SENT CHECK YOUR INBOX')
          }
        } catch (error) {
          setError(error)
          setTimeout(() => {
            setError('')
          }, 5000);
        } finally{
          setIsLoading(false)
        }
    }

  return (
    <div className="box">
      <div class="forgotPassword-box">
        <h1>Forgot Password</h1>
        <h4>Enter Email Used To Register Your Account</h4>
        <form onSubmit={handleRecovery}>
        {emailSent && <p className='success'>{emailSent}</p>}
          <label>Email</label>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className='success'>{success}</p>}
          <input type="submit" value="Submit" />
        </form>
      </div>
      <p class="forgotPassword-para-2">
        Remeber Password?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword