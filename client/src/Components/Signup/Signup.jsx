import { Link } from 'react-router-dom'
import './Signup.css'
import { registerUser } from '../../helpers/api'

function Signup(){
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [comfirmPassword, setComfirmPassword] = useState('')
   
  const handleRegister = async (e) => {
    e.preventDefault();
    

    if(password !== comfirmPassword){
      setPassword('')
      setComfirmPassword('')
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('Passwords do not match')
    }

    if(username.length <= 1){
      setUsername('')
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('Invalid Username')
    }

    try {
      console.log(username, email, password)
      setIsLoading(true)
      const errorMsg = await registerUser({ username, email, password })
      //console.log(username, email, password)
      
      if(errorMsg){
        setError(errorMsg)
        setTimeout(() => {
          setError('')
        }, 3000)
      } else{
        navigate('/home')
        
      }
    } catch (error) {
      console.log('ERROR REGISTEREING USER:', error)
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('An Error occurred. please try again.')
    } finally{
      setIsLoading(false)
    }
  }
  return (
        <div className='box'>
                <div class="signup-box">
      <h1>Sign Up | Get Started</h1>
      <h4>Heart of Gold Foundation</h4>
      <form onSubmit={handleRegister}>
        <label>Username</label>
        <input type="text" placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <label>Confirm Password</label>
        <input type="password" placeholder="" value={comfirmPassword} onChange={(e) => setComfirmPassword(e.target.value)} />
        {error && <p className='error'>{error}</p>}
        <input type="button" value="Submit" />
      </form>
{/*      <p>
        By clicking the Sign Up button,you agree to our <br />
        <a href="#">Terms and Condition</a> and <a href="#">Policy Privacy</a>
    </p>*/}
    </div>
    <p class="para-2">
      Already have an account? <Link to="/login" className='link'>Login here</Link>
    </p>
        </div>
    )
}

export default Signup