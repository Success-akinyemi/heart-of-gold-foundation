import UserModel from "../models/User.js"
import Mailgen from 'mailgen'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import SubscribersModel from "../models/Subscribers.js";

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: `${process.env.MAIL_SENDER_NAME}`,
        link: `${process.env.MAIL_WEBSITE_LINK}`
    }
})


export async function register (req, res){
    const {username, email, password} = req.body
    console.log('SEEN')

    if(!username || !email || !password){
        console.log('ERROR FILL')
        return res.status(400).json({ success: false, data: 'please provide all requiredd fields'})
    }
    try {

        const existingEmail = await UserModel.findOne({ email });
        if(existingEmail){
            console.log('ERROR EXIST')
            return res.status(400).json({ success: false, data: 'Email Alreay exists. Please use another email'})
        }

        
        const user = await UserModel.create({
            username, email, password,
        })
        console.log('USER CREATED')

        sendToken(user, 201, res)
    } catch (error) {
        console.log('ERROR', error)
        return res.status(500).json({ success: false, data: 'Fail to register user'})
    }
}

export async function login (req, res){
    const { emailOrphoneNumber, password } = req.body;
    console.log('LOGIN')

    if(!emailOrphoneNumber || !password){
        return res.status(400).json({ success: false, data: 'Please provide an email and password'})
    }

    try {
        const isEmail = emailOrphoneNumber.includes('@');

        let user;
        if(isEmail){
            user = await UserModel.findOne({ email: emailOrphoneNumber }).select('+password')
        } else {
            user = await UserModel.findOne({ phoneNumber: emailOrphoneNumber }).select('+password')
        }

        
        if (!user) {
            return res.status(401).json({ subject: false, data: 'Invalid Credentials'})
            
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return res.status(401).json({ subject: false, data: 'Invalid Credentials'})
        }

        sendToken(user, 200, res)
    } catch (error) {
        console.log('ERROR',error)
        res.status(500).json({ success: false, data: error.message})
    }
}

export async function forgotPassword (req, res, next){
    const { email} = req.body

    try {
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(404).json({ success: false, data: 'Email does not exist'})
        }

        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetUrl = `${process.env.RESET_URL}/passwordReset/${resetToken}`

        try {
            // send mail
            const emailContent = {
                body: {
                    intro: 'You have Requested a password reset.',
                    action: {
                        instructions: 'Please click the following button to reset your password',
                        button: {
                            color: '#33b5e5',
                            text: 'Reset Your Password',
                            link: resetUrl
                        },
                    },
                    outro: `
                        If you cannot click the reset button, copy and paste the usl here in your browser ${resetUrl}

                        If you did not request this reset, please ignore this email.
                    `
                },
            };

            const emailTemplate = mailGenerator.generate(emailContent)
            const emailText = mailGenerator.generatePlaintext(emailContent)
            
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: emailTemplate
            })

            res.status(200).json({success: true, data: `Email sent. Please Check your Email inbox`})
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            return res.status(500).json({ success: false, data: 'Email could not be sent'})
        }
    } catch (error) {
        next(error)
    }
}

export async function resetPassword (req, res, next){
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return res.status(404).json({ success: false, data: 'Invalid Reset Token'})
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save();

        res.status(201).json({
            success: true,
            data: 'Password Reset success'
        })
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})
}

export async function getUser (req, res){
    const { id } = req.params;

    try {
        const user = await UserModel.findById({ _id: id})
        if(!user){
            return res.status(404).json({ success: false, data: 'Cannot find user'});
        }
        return res.status(200).json({success: true, data: user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, data: 'Could not get User'})   
    }
}

export async function getAllUser (req, res){
    const { id } = req.params

    try {
        const user = await UserModel.findById({ _id: id })
        
        if(!user){
            return res.status(404).json({ success: false, data: 'Cannot find users'});
        }
        
        if(!user.isAdmin){
            return res.status(403).json({ success: false, data: 'Permission denied.'})
        }

        const users = await UserModel.find();
        return res.status(200).json({ success: true, data: users})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, data: 'Could not get Users'})   
    }
}

export async function subscriber(req, res){
    const { email } = req.body

    try {
        if(!email){
            return res.status(400).json({ success: false, data: 'Invalid Email'})
        }
        const isExist = await SubscribersModel.findOne({ email: email})

        if(isExist){
            return res.status(400).json({ success: false, data: 'Email Already Exist'})
        }

        const subscribe = await new SubscribersModel({ email }).save()
        res.status(201).json({success: true, data: 'Email Added Subscribed Successful'})
    } catch (error) {
        res.status(500).json({ success: false, data: error.message})
    }
}

export async function getAllSubscriber(req, res){
    const { id } = req.params
    try {
        const isAdmin = await UserModel.findById({ _id: id })

        if(!isAdmin.isAdmin){
            return res.status(404).json({ success: true, data: 'NOT ALLOWED'})
        }
        const subscribers = await  SubscribersModel.find()

        res.status(200).json({success: true, data: subscribers})
    } catch (error) {
        res.status(500).json({ success: false, data: error.message})
    }
}