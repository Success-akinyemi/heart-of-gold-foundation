import jsonwebtoken from 'jsonwebtoken'
import UserModel from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js';

export default async function Protect(req, res, next){
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({ success: false, data: 'Not Authorized to access this route'})
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id)

        if(!user){
            return res.status(404).json({ success: false, data: 'No User Found with this ID'})
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ success: false, data: 'Not Authorized to access this routes'})
    }
}