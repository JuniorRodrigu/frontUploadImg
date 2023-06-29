import axios from 'axios';

export default axios.create({
    baseURL: "https://back-upload-img.vercel.app/upload-image"
});