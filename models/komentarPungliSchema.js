const mongoose = require('mongoose');

// Connect MongoDB
// Connect MongoDB
mongoose.connect(`mongodb+srv://adrimediawebdevindonesia:ynrt!e_WyC3F_vv@bantaipunglimongo.ag0xudb.mongodb.net/db_pungli?retryWrites=true&w=majority`).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error: ' + err);
});

const komentarPungliSchema = new mongoose.Schema({
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
      },
      pelaporanPungliId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PelaporanPungli',
      },
      komentar: {
            type: String,
            required: [true, 'Komentar is required'],
            max: [100, 'Komentar must be less than 200 characters'],
      },
      jumlah_upvote: {
            type: Number,
            default: 0
      },
      tanggal_komentar: {
            type: Date,
            required: [true, 'Tangal Lahir is required'],
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

const KomentarPungli = mongoose.model('KomentarPungli', komentarPungliSchema);
module.exports = {
      KomentarPungli
};