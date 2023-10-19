import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:8080'


/**Get user from token */
export async function getUser(){
    const token = localStorage.getItem('authToken')
    if(!token) return Promise.reject('Cannot get Token')
    try {
        const decoded = jwt_decode(token);
        console.log('decoded>>', decoded);
        
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return Promise.reject('Error decoding token');
      }
}

/**REGISTER USER */
export async function registerUser({ username, email, password }){
    try {
        //console.log('before send',username, email, password, phoneNumber)
        const response  = await axios.post('/api/register', { username, email, password })
        //console.log('resPonse', response)
        const { data } =response
        localStorage.setItem('authToken', data.token)
        console.log(data.token)
        toast.success(`Welcome ${username}`)

        
        return null
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**LOGIN USER */
export async function loginUser({ emailOrphoneNumber, password }){
    try {
        const { data } = await axios.post('/api/login', { emailOrphoneNumber, password })
        //console.log( email, password)
        localStorage.setItem('authToken', data.token)
        console.log('STATUS>>', data.success)
        console.log('User Logged in', data.token)

        
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**FORGOT PASSWORD */
export async function forgotPassword({ email }){
    try {
        const recover = await axios.post('/api/forgotPassword', { email })
        const res = recover.data.data
        console.log('RES', res)
        return res
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**RESET PASSWORD */
export async function resetPassword({ resetToken, password }){
    try {
        const reset = await axios.put(`/api/resetPassword/${resetToken}`, { password })
        const res = reset.data.data
        const success = reset.data.success
        console.log('RESET', res, success)
        const navigate = useNavigate()

        if(success === true){
            toast.success(res)
            navigate('/registration')
        }

    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}