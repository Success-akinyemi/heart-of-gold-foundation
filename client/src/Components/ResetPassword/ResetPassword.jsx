import './ResetPassword.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../../helpers/api'

function ResetPassword() {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const resetToken = path
    const [password, setPassword] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleReset = async (e) => {
        e.preventDefault()
    
        if(password !== comfirmPassword){
          setPassword('')
          setComfirmPassword('')
          setTimeout(() => {
            setError('')
          }, 3000)
          return setError('Passwords do not match')
        }
    
        try {
          setIsLoading(true)
          const errorMsg = await resetPassword({ resetToken, password })
          
          if(errorMsg){
            setError(errorMsg)
            setTimeout(() => {
              setError('')
            }, 3000)
          }
        } catch (error) {
          setTimeout(() => {
            setError('')
          }, 3000)
          return setError('An Error occurred. please try again.')
        } finally{
          setIsLoading(false)
        }
      }
    
  return (
    <div className="box">
      <div class="resetPassword-box">
        <h1>Reset Password</h1>
        <h4>Enter new password to reset your password</h4>
        <form onSubmit={handleReset}>
          <label>Password</label>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         <label>Comfirm Password</label>
            <input
            type="password"
            placeholder="Comfirm Password"
            value={comfirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <input type="submit" value="Submit" disabled={isLoading} />
        </form>
      </div>

    </div>
  )
}

export default ResetPassword