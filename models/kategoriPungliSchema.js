const mongoose = require('mongoose');

// Connect MongoDB
require('../utils/connection_db');

const kategoriPungliSchema = new mongoose.Schema({
      nama_kategori_pungli: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
      },
      created_at: {
            type: Date,
            default: Date.now
      },
      updated_at: {
            type: Date,
            default: Date.now
      },
});

const KategoriPungli = mongoose.model('KategoriPungli', kategoriPungliSchema);
module.exports = {
      KategoriPungli
};