const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(`mongodb://127.0.0.1:27017/pungli_db`).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error: ' + err);
});

module.exports = mongoose;