const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect MongoDB
// Connect MongoDB
mongoose.connect(`mongodb+srv://adrimediawebdevindonesia:ynrt!e_WyC3F_vv@bantaipunglimongo.ag0xudb.mongodb.net/db_pungli?retryWrites=true&w=majority`).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error: ' + err);
});

const baseOptions = {
      discriminatorKey: 'kind', // our discriminator key
      collection: 'pelaporanPungli', // collection name
};

const pelaporanPungliSchema = new Schema({
      kategoriPungliId: {
        type: Schema.Types.ObjectId,
        ref: 'KategoriPungli',
      },
      judul_pelaporan: {
        type: String,
        required: [true, 'Judul Pelaporan is required'],
        max: [165, 'Judul Pelaporan must be less than 100 characters'],
      },
      deskripsi_pelaporan: {
        type: String,
        required: [true, 'Deskripsi Pelaporan is required'],
        max: [100, 'Deskripsi Pelaporan must be less than 100 characters'],
      },
      tanggal_pelaporan: {
        type: Date,
        required: [true, 'Tanggal Pelaporan is required'],
      },
      status_pelaporan: {
        type: String,
        required: [true, 'Status Pelaporan is required'],
        enum: ['Belum Selesai', 'Selesai', 'Dalam Proses'],
      },
      bukti_pendukung: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
}, baseOptions);

// Model utama
const PelaporanPungli = mongoose.model('PelaporanPungli', pelaporanPungliSchema);

// Sub-skema untuk Users
const PelaporanPungliUsers = PelaporanPungli.discriminator('Users', new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
}));

// Sub-skema untuk Admin
const PelaporanPungliAdmin = PelaporanPungli.discriminator('Admin', new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
}));

module.exports = {
      PelaporanPungli,
      PelaporanPungliUsers,
      PelaporanPungliAdmin
};