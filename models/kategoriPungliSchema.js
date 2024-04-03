const mongoose = require('mongoose');

// Connect MongoDB
// Connect MongoDB
mongoose.connect(`mongodb+srv://adrimediawebdevindonesia:ynrt!e_WyC3F_vv@bantaipunglimongo.ag0xudb.mongodb.net/db_pungli?retryWrites=true&w=majority`).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error: ' + err);
});

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