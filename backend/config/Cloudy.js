import { v2 as cloudinary } from 'cloudinary'

export const configCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    } catch (error) {
        console.log(error, "error in configuration");

    }
}
const cloudUploder = cloudinary.uploader
export default cloudUploder;