const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

cloudinary.config({
      cloud_name: 'adriansyah-course-laravel7',
      api_key: '362124478144354',
      api_secret: '08Y6ihLuF09Y2OGrbf6x3wbZt1M'
});

module.exports = cloudinary