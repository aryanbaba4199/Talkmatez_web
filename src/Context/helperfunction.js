import axios from "axios";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dltniftfn/image/upload'; // Cloudinary URL
const UPLOAD_PRESET = 'talkmatez'; // Unsigned upload preset



export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      return res.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
    }
};