import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
    title: {
        type: String
    },
    message: {
        type: String
    },
    image: {
        type: String
    }
},
{timestamps: true},
)

const CampaignModel = mongoose.model('heartofgoldcampaing', CampaignSchema)
export default CampaignModel