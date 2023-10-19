import { Link } from 'react-router-dom'
import './Login.css'

function Login(){
    return (
        <div>
        <div class="login-box">
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="" />
        <label>Password</label>
        <input type="password" placeholder="" />
        <input type="button" value="Submit" />
      </form>
    </div>
    <p class="para-2">
      Not have an account? <Link to="/signup" className='link'>Sign Up Here</Link>
    </p>
        </div>
    )
}

export default Login