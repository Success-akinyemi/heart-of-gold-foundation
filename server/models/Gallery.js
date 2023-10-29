import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Please Provide an Image']
    },
    desc: {
        type: String
    }
},
{timestamps: true}
)

const GalleryModel = mongoose.model('heartofgoldgallery', GallerySchema)
export default GalleryModel