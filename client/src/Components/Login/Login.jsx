import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import { loginUser } from '../../helpers/api'

function Login(){
    const [emailOrphoneNumber, setEmailOrphoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();

      if(!emailOrphoneNumber || !password){
        setTimeout(() => {
          setError('')
        }, 3000)
        return setError('Provide all Information')
      }

        e.preventDefault()
        try {
          setIsLoading(true)
          const errorMsg = await loginUser({emailOrphoneNumber, password})
    
          if(errorMsg){
            setError(errorMsg)
            setTimeout(() => {
              setError('')
            }, 3000)
          } else{
            navigate('/')

          }
        } catch (error) {
    
        } finally{
          setIsLoading(false)
        }
      }

    return (
        <div className='box'>
        <div class="login-box">
      <h1>Login</h1>
      <h4>Lets continue to touch lives</h4>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" placeholder="" value={emailOrphoneNumber} onChange={(e) => setEmailOrphoneNumber(e.target.value)} />
        <label>Password</label>
        <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className='error'>{error}</p>}
        <input type="submit" value="Submit" />
      </form>
    </div>
    <p class="login-para-2">
      Don't have an account? <Link to="/signup" className='link'>Sign Up Here</Link>
    </p>
        </div>
    )
}

export default Login