require('dotenv').config();

const cloudinary = require('cloudinary').v2; 

cloudinary.config({
    cloud_name: 'provina',
    api_key: '321712427966297',
    api_secret: 'XLljRXg4EKgNqmrRGA9jZGDW8gU'
});

module.exports = {cloudinary};