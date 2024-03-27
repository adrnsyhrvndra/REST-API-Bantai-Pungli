const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

cloudinary.config({
      cloud_name: dotenv.parsed.CLOUDINARY_CLOUD_NAME,
      api_key: dotenv.parsed.CLOUDINARY_API_KEY,
      api_secret: dotenv.parsed.CLOUDINARY_SECRET_KEY
});

module.exports = cloudinary