import mongoose from "mongoose";

const SubscribersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Provide an Email Address'],
        unique: [true, 'Email Address already in use']
    },
})

const SubscribersModel =  mongoose.model('heartOfGoldSubscribers', SubscribersSchema)
export default SubscribersModel