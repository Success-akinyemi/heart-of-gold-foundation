import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

//axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'https://heart-of-gold-foundation.onrender.com'



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

        if(response.data.success){
            const { data } = response
            localStorage.setItem('authToken', data.token)
            console.log(data.token)
            console.log('DATA', response)
            toast.success(`Welcome ${username}`)
            return null
        }else{
            return response.data.data
        }
        
    
    } catch (error) {
        const errorMsg = error.response.data.data
        console.log(errorMsg)
        return errorMsg
    }
}

/**LOGIN USER */
export async function loginUser({ emailOrphoneNumber, password }){
    try {
        const response = await axios.post('/api/login', { emailOrphoneNumber, password })
        //console.log( email, password)

        if(response.data.success){
            const { data } = response
            localStorage.setItem('authToken', data.token)
            console.log('STATUS>>', data.success)
            console.log('User Logged in', data.token)
            return null
        }else{
            return response.data.data
        }

    } catch (error) {
        const errorMsg = error.response.data.data
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
        console.log('ERROR', error)
        const errorMsg = error.response.data.data
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

        if(success){
            toast.success(res)
            navigate('/registration')
        }

    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**DONATE  */
export async function donate({name, email, amount, purpose}){
    try {
        const response = await axios.post('/api/donation', { name, email, amount, purpose})
        
        console.log(response.data);

        const authorizationUrl = response.data.authorizationUrl; //paystack
        console.log('url', authorizationUrl)
        window.location.href = authorizationUrl; // Redirect the user to the Paystack checkout page
        
    } catch (error) {
        const errorMsg = error.response.data.data
        console.log(errorMsg)
        return errorMsg
    }
}

/**VERIFY DONATION */
export async function verifyDonation({ reference }){
    try {
        const response = await axios.post('/api/verifyDonation', { reference })
        console.log(response.data)
        const res = response.data
        return res
    } catch (error) {
        const errorMsg = error.response.data.data
        console.log(errorMsg)
        return errorMsg
    }
}

/**SUBSCRIBE */
export async function subscribe({ email }){
    try {
        const response = await axios.post('/api/subscriber', { email })
        
        if(response.data.success){
            console.log(response.data.data)
            toast.success(response.data.data)
        }

    } catch (error) {
        const errorMsg = error.response.data.data
        console.log(errorMsg)
        toast.error(errorMsg)
        return errorMsg
    }
}


/** New Campaign */
export async function newCampaign({ id, title, message, image }){
    const token = await localStorage.getItem('authToken')
    try {
        const response = await axios.post('/api/newCampaign', { id, title, message, image }, {headers: {Authorization: `Bearer ${token}`}})
        
        if(response.data.success){
            const res = response.data.data
            toast.success(res)
            return res
        }
    } catch (error) {
        const errorMsg = error.response.data.data
        toast.error(errorMsg)
        return errorMsg
    }
}

/**Edit Campaign */
export async function editCampaign({ userId, id, title, message, image }){
    const token = await localStorage.getItem('authToken')
    try {
        const response = await axios.put('/api/editCampaign', { userId, id, title, message, image }, {headers: {Authorization: `Bearer ${token}`}})

        if(response.data.success){
            const res = response.data.data
            toast.success(res)
            return res
        }
    } catch (error) {
        const errorMsg = error.response.data.data
        toast.error(errorMsg)
        return errorMsg
    }
}

/**Delete Campaign */
export async function deleteCampaign({userId, id}){

    try {
        const token = await localStorage.getItem('authToken')
        const response = await axios.delete(`/api/deleteCampaign?userId=${userId}&id=${id}`, {headers: {Authorization: `Bearer, ${token}`}})
        console.log('response>>', response.data.success)
        if(response.data.success === true){
            const res = response.data.data
            console.log(res)
            toast.success(res)
            window.location.href = '/campaign'
            return res
        }
    } catch (error) {
        const errorMsg = error.response.data.data
        toast.error(errorMsg)
        console.log(errorMsg)
        return errorMsg
    }
}