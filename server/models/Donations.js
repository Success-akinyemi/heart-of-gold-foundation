import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Provide an Email Address'],
    },
    amount: {
        type: Number,
        required: [true, 'Please Provide an Email Address'],
    },
    purpose: {
        type: String
    },
    valid: {
        type: Boolean,
        default: false
    },
    transactionRef: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{timestamps: true}
)

const DonationModel =  mongoose.model('heartOfGoldDonations', DonationSchema)
export default DonationModel